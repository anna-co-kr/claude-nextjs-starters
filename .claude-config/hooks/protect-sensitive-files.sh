#!/bin/bash
# 민감 파일 보호 훅 (PreToolUse)
# Edit / Write 도구가 .env* 또는 package-lock.json 을 건드리려 할 때 차단

set -euo pipefail

# 안전망: 오류가 나도 Claude를 블로킹하지 않도록 (차단 의도가 아닌 오류)
trap 'exit 0' ERR

# ── stdin JSON 파싱 ───────────────────────────────────────────────────────────
INPUT="$(cat)"
[[ -z "$INPUT" ]] && exit 0

TOOL_NAME="$(echo "$INPUT" | jq -r '.tool_name // ""')"

# Edit / Write 도구만 검사
if [[ "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "MultiEdit" ]]; then
  exit 0
fi

FILE_PATH="$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')"
[[ -z "$FILE_PATH" ]] && exit 0

BASENAME="$(basename "$FILE_PATH")"

# ── 민감 파일 패턴 검사 ───────────────────────────────────────────────────────
BLOCKED=false
REASON=""

# .env, .env.local, .env.production 등 모든 .env* 파일
if [[ "$BASENAME" == .env || "$BASENAME" == .env.* ]]; then
  BLOCKED=true
  REASON=".env 파일에는 소중한 비밀 키가 담겨있어요. 함부로 건드리지 마세요! 🔐"
fi

# package-lock.json
if [[ "$BASENAME" == "package-lock.json" ]]; then
  BLOCKED=true
  REASON="package-lock.json 은 환경의 심장이에요. 직접 수정하면 의존성이 꼬일 수 있어요! 📦"
fi

# ── 차단 응답 출력 ────────────────────────────────────────────────────────────
if [[ "$BLOCKED" == "true" ]]; then
  jq -nc --arg reason "$REASON" '{"decision": "block", "reason": $reason}'
  exit 0
fi

exit 0
