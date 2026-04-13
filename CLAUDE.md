# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 기술 스택

- **Next.js 16.2.3** (App Router, Turbopack) — 브레이킹 체인지 있음, 반드시 `node_modules/next/dist/docs/` 참조
- **React 19.2.4**
- **TailwindCSS v4** — `globals.css`의 `@theme` 블록으로 설정, `tailwind.config.js` 없음
- **shadcn/ui** (style: `radix-nova`) — `components.json`으로 관리
- **Zustand v5** — UI 상태 관리 (`store/ui-store.ts`)
- **TanStack Query v5** — 서버 데이터 관리 (`providers/query-provider.tsx`)
- **TanStack Table v8** — 데이터 테이블 (`components/data-table/`)
- **React Hook Form v7 + Zod v4** — 폼 관리 및 검증
- **next-themes** — 라이트/시스템/다크 모드 (`attribute="class"`)
- **Sonner** — 토스트 알림

## 개발 명령어

```bash
npm run dev      # 개발 서버 (Turbopack)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

테스트 설정 없음.

## 라우팅 구조

App Router의 Route Group을 사용하여 레이아웃을 분리합니다:

```
(marketing)/         → 마케팅 레이아웃 (Header + Footer)
  /                  Landing Page

(auth)/              → 인증 레이아웃 (중앙정렬, 로고, 테마 토글)
  /login
  /register

(dashboard)/         → 대시보드 레이아웃 (AppShell: 사이드바 + 헤더)
  /dashboard
  /dashboard/profile
  /dashboard/settings
  /dashboard/forms
  /dashboard/data-table
  /dashboard/components
```

## 컴포넌트 계층

```
components/ui/          shadcn/ui 기본 컴포넌트 (70개+)
components/layout/      AppShell, AppSidebar, Header, Footer, PageContainer
components/navigation/  CommandMenu (⌘K), UserMenu, BreadcrumbNav, ThemeToggle
components/common/      PageHeader, StatsCard
components/data-table/  DataTable 래퍼 (TanStack Table 기반)
components/feedback/    EmptyState, LoadingSpinner, ConfirmDialog
```

## 주요 패턴

**폼 (React Hook Form + Zod):**
```tsx
// lib/validations/ 에서 스키마 가져와서 사용
const form = useForm<Schema>({ resolver: zodResolver(schema) });
```

**DataTable:**
```tsx
// ColumnDef 정의 후 DataTable 컴포넌트에 전달
<DataTable columns={columns} data={data} searchKey="name" />
```

**상태 관리 (Zustand):**
```tsx
// store/ui-store.ts — sidebarOpen, commandMenuOpen (localStorage persist)
const { sidebarOpen, toggleSidebar } = useUIStore();
```

**경로 alias:** `@/` = 프로젝트 루트

## 주요 파일

| 파일 | 역할 |
|------|------|
| `lib/constants.ts` | 라우트, 네비게이션 링크, 사이드바 메뉴 상수 |
| `lib/types.ts` | 전역 타입 (NavItem, SidebarItem, ApiResponse 등) |
| `lib/utils.ts` | `cn()` 유틸 (clsx + tailwind-merge) |
| `lib/validations/` | Zod 스키마 (auth, profile) |
| `providers/index.tsx` | 통합 Provider (Theme → Query → Tooltip → Toaster) |
| `store/ui-store.ts` | UI 상태 (사이드바/커맨드 메뉴 open 상태) |

## 주의사항

- **TailwindCSS v4**: `tailwind.config.js` 대신 `globals.css`의 `@theme` 블록 사용
- **Zod v4**: v3과 API 차이 있음 (`.parse()`, `.safeParse()` 등은 동일)
- **Lucide React v1.3.0**: 아이콘 이름이 이전 버전과 다를 수 있음, 실제 export 확인 필요
- **`any` 타입 사용 금지** (tsconfig strict mode)
- 새 shadcn 컴포넌트 추가: `npx shadcn@latest add <component>`
