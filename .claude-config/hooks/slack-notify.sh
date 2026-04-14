#!/bin/bash
# Claude Code → Slack 알림 스크립트
# 권한 요청(permission) / 작업 완료(stop) 이벤트를 Slack으로 전송

set -euo pipefail

# 안전망: 어떤 오류도 Claude를 블로킹하지 않도록
safe_exit() { exit 0; }
trap safe_exit EXIT ERR

# ── Webhook URL 로드 ──────────────────────────────────────────────────────
ENV_FILE="$HOME/.claude/hooks/slack-webhook.env"
[[ ! -f "$ENV_FILE" ]] && exit 0
# shellcheck source=/dev/null
source "$ENV_FILE"
[[ -z "${SLACK_WEBHOOK_URL:-}" ]] && exit 0

# ── 필수 도구 확인 ────────────────────────────────────────────────────────
command -v jq   >/dev/null 2>&1 || exit 0
command -v curl >/dev/null 2>&1 || exit 0

# ── stdin JSON 파싱 ───────────────────────────────────────────────────────
INPUT="$(cat)"
[[ -z "$INPUT" ]] && exit 0

CWD="$(echo "$INPUT"             | jq -r '.cwd // "unknown"')"
TOOL_NAME="$(echo "$INPUT"       | jq -r '.tool_name // ""')"
SESSION_ID="$(echo "$INPUT"      | jq -r '.session_id // ""')"
STOP_REASON="$(echo "$INPUT"     | jq -r '.stop_reason // "정상 완료"')"
AGENT_TYPE="$(echo "$INPUT"      | jq -r '.agent_type // "unknown"')"
AGENT_DESC="$(echo "$INPUT"      | jq -r '.description // ""')"
TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S %Z')"
PROJECT_NAME="$(basename "$CWD")"
EVENT_TYPE="${1:-}"

# ── 이벤트별 Slack Block Kit 메시지 생성 ─────────────────────────────────
if [[ "$EVENT_TYPE" == "permission" ]]; then
  DISPLAY_TOOL="${TOOL_NAME:-알 수 없음}"
  BLOCKS="$(jq -nc \
    --arg project "$PROJECT_NAME" \
    --arg cwd "$CWD" \
    --arg tool "$DISPLAY_TOOL" \
    --arg ts "$TIMESTAMP" \
    --arg session "$SESSION_ID" \
    '{
      "blocks": [
        {
          "type": "header",
          "text": {"type": "plain_text", "text": ":bell: Claude Code 권한 요청 대기 중", "emoji": true}
        },
        {"type": "divider"},
        {
          "type": "section",
          "fields": [
            {"type": "mrkdwn", "text": "*프로젝트*\n`\($project)`"},
            {"type": "mrkdwn", "text": "*상태*\n⏳ 권한 승인 대기 중"},
            {"type": "mrkdwn", "text": "*요청 도구*\n`\($tool)`"},
            {"type": "mrkdwn", "text": "*발생 시각*\n\($ts)"},
            {"type": "mrkdwn", "text": "*경로*\n`\($cwd)`"}
          ]
        },
        {
          "type": "context",
          "elements": [{"type": "mrkdwn", "text": "세션 ID: `\($session)`"}]
        }
      ]
    }')"

elif [[ "$EVENT_TYPE" == "stop" ]]; then
  BLOCKS="$(jq -nc \
    --arg project "$PROJECT_NAME" \
    --arg cwd "$CWD" \
    --arg ts "$TIMESTAMP" \
    --arg session "$SESSION_ID" \
    --arg reason "$STOP_REASON" \
    '{
      "blocks": [
        {
          "type": "header",
          "text": {"type": "plain_text", "text": ":white_check_mark: Claude Code 작업 완료", "emoji": true}
        },
        {"type": "divider"},
        {
          "type": "section",
          "fields": [
            {"type": "mrkdwn", "text": "*프로젝트*\n`\($project)`"},
            {"type": "mrkdwn", "text": "*상태*\n✅ \($reason)"},
            {"type": "mrkdwn", "text": "*완료 시각*\n\($ts)"},
            {"type": "mrkdwn", "text": "*경로*\n`\($cwd)`"}
          ]
        },
        {
          "type": "context",
          "elements": [{"type": "mrkdwn", "text": "세션 ID: `\($session)`"}]
        }
      ]
    }')"

elif [[ "$EVENT_TYPE" == "subagent" ]]; then
  DISPLAY_AGENT="${AGENT_TYPE:-알 수 없음}"
  DISPLAY_DESC="${AGENT_DESC:-설명 없음}"
  BLOCKS="$(jq -nc \
    --arg project "$PROJECT_NAME" \
    --arg cwd "$CWD" \
    --arg ts "$TIMESTAMP" \
    --arg session "$SESSION_ID" \
    --arg agent "$DISPLAY_AGENT" \
    --arg desc "$DISPLAY_DESC" \
    --arg reason "$STOP_REASON" \
    '{
      "blocks": [
        {
          "type": "header",
          "text": {"type": "plain_text", "text": ":robot_face: 서브에이전트 작업 완료", "emoji": true}
        },
        {"type": "divider"},
        {
          "type": "section",
          "fields": [
            {"type": "mrkdwn", "text": "*프로젝트*\n`\($project)`"},
            {"type": "mrkdwn", "text": "*상태*\n✅ \($reason)"},
            {"type": "mrkdwn", "text": "*에이전트 타입*\n`\($agent)`"},
            {"type": "mrkdwn", "text": "*완료 시각*\n\($ts)"},
            {"type": "mrkdwn", "text": "*작업 내용*\n\($desc)"},
            {"type": "mrkdwn", "text": "*경로*\n`\($cwd)`"}
          ]
        },
        {
          "type": "context",
          "elements": [{"type": "mrkdwn", "text": "세션 ID: `\($session)`"}]
        }
      ]
    }')"

else
  exit 0
fi

# ── Slack POST (5초 타임아웃, 재시도 없음) ───────────────────────────────
curl --silent --max-time 5 --connect-timeout 3 --retry 0 \
  -o /dev/null -w "%{http_code}" \
  -H "Content-Type: application/json" \
  -d "$BLOCKS" \
  "$SLACK_WEBHOOK_URL" 2>/dev/null || true

exit 0
