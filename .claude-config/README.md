# Claude Code 글로벌 설정 백업

`~/.claude/` 경로에 위치하는 Claude Code 글로벌 설정 파일 백업본입니다.

## 파일 구조

```
.claude-config/
├── settings.json                      # 훅 등록, 권한, 모델 설정
├── CLAUDE.md                          # 글로벌 코딩 규칙
└── hooks/
    ├── slack-notify.sh                # Slack 알림 훅 (stop / permission / subagent)
    └── protect-sensitive-files.sh     # 민감 파일 수정 차단 훅 (.env*, package-lock.json)
```

## 설치 방법

```bash
cp .claude-config/settings.json ~/.claude/
cp .claude-config/CLAUDE.md ~/.claude/
cp .claude-config/hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
```

## 주의사항

- `~/.claude/hooks/slack-webhook.env` 는 보안상 이 저장소에 포함되지 않습니다.
- 직접 생성 후 아래 형식으로 작성하세요:
  ```
  SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
  ```
