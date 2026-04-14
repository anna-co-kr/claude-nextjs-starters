---
name: Next.js 스타터킷 코드베이스 패턴 및 반복 발견 이슈
description: 전체 코드 리뷰에서 발견된 패턴, 반복 이슈, 아키텍처 결정사항
type: project
---

## 아키텍처 결정사항

- Route Group으로 레이아웃 분리: (marketing), (auth), (dashboard)
- AppShell 패턴: SidebarProvider + AppSidebar + Header + SidebarInset
- Zustand persist로 사이드바 상태만 localStorage 저장 (commandMenuOpen은 제외)
- Providers 순서: ThemeProvider > QueryProvider > TooltipProvider > Toaster
- `@/` alias = 프로젝트 루트 (`tsconfig.json` paths 설정)

## 반복 발견 이슈

### 상수 중복 정의
- `APP_NAME`, `APP_DESCRIPTION`이 `lib/constants.ts`와 `app/layout.tsx` 양쪽에 선언됨
- `app/layout.tsx`에서는 constants.ts의 상수를 import하지 않고 재선언

### console.log 미제거
- 모든 폼 onSubmit 핸들러에 `console.log(values)` 남아있음
  - app/(auth)/login/page.tsx
  - app/(auth)/register/page.tsx
  - app/(dashboard)/dashboard/profile/page.tsx
  - app/(dashboard)/dashboard/settings/page.tsx
  - app/(dashboard)/dashboard/forms/page.tsx
- `app/error.tsx`의 `console.error(error)`는 의도적으로 남긴 것으로 보임

### setTimeout 미정리 (메모리 누수 위험)
- `components-interactive.tsx`의 `handleCopy`에서 setTimeout 사용하나 clearTimeout 미호출
- 컴포넌트 언마운트 시 상태 업데이트 문제 가능성

### 커맨드 메뉴 단축키 클로저 이슈
- `command-menu.tsx`에서 useEffect 의존성에 `commandMenuOpen` 포함
- 매 상태 변경마다 이벤트 리스너 재등록 → `setCommandMenuOpen(prev => !prev)` 패턴 권장

### 메타데이터 누락
- 대부분의 페이지에 `metadata` export 없음
- `app/(dashboard)/dashboard/components/page.tsx`만 메타데이터 있음

### 접근성 미흡
- `header.tsx`의 마케팅 nav에 `aria-label` 없음
- `footer.tsx`의 nav에 `aria-label` 없음
- 폼 페이지들에 `autocomplete` 속성 미설정

### DataTable rowSelection 타입
- `data-table.tsx`의 `rowSelection` 상태가 `{}` 타입으로 선언됨 (Record<string, boolean> 권장)

**Why:** 최초 전체 코드 리뷰 시 발견된 패턴들로, 향후 동일한 이슈가 반복될 수 있음
**How to apply:** 새 페이지/컴포넌트 리뷰 시 위 항목들 우선 체크
