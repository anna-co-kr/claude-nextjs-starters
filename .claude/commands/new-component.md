---
argument-hint: "<ComponentName> [description]"
---

컴포넌트 이름: $ARGUMENTS

아래 규칙에 따라 새 React 컴포넌트를 생성해주세요.

## 작업 순서

1. `$ARGUMENTS`를 파싱합니다.
   - 첫 번째 단어: PascalCase 컴포넌트 이름 (예: `UserCard`)
   - 두 번째 단어 이후: 컴포넌트 설명 (없으면 컴포넌트 이름으로 대체)

2. 컴포넌트 이름을 기반으로 kebab-case 파일명을 결정합니다.
   - 예: `UserCard` → `user-card.tsx`

3. 컴포넌트 분류를 판단해 적절한 폴더에 생성합니다.
   - 레이아웃 관련 → `components/layout/`
   - 네비게이션 관련 → `components/navigation/`
   - 공통 UI 요소 → `components/common/`
   - 피드백/상태 표시 → `components/feedback/`
   - 그 외 → `components/common/`

4. 아래 템플릿을 기반으로 파일을 생성합니다.

## 생성 템플릿

```tsx
import { cn } from "@/lib/utils";

interface {ComponentName}Props {
  className?: string;
  children?: React.ReactNode;
}

// {설명}
export function {ComponentName}({ className, children }: {ComponentName}Props) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
```

## 규칙

- TypeScript strict 모드 준수 (`any` 타입 금지)
- Tailwind CSS 클래스로만 스타일 적용
- `cn()` 유틸로 className 병합
- Props 인터페이스는 컴포넌트 파일 상단에 정의
- named export 사용 (default export 금지)
- 상태나 이벤트가 필요한 경우 `"use client"` 지시어 추가
- 컴포넌트 바로 위에 한국어 주석으로 역할 설명 작성

생성 후 파일 경로와 사용 예시를 알려주세요.
