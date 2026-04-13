import {
  LayoutDashboard,
  Puzzle,
  FormInput,
  Table2,
  Settings,
} from "lucide-react";
import type { NavItem, SidebarItem } from "./types";

// 앱 기본 정보
export const APP_NAME = "Next Starter";
export const APP_DESCRIPTION =
  "Next.js 16 + React 19 + TailwindCSS v4 + shadcn/ui 기반 모던 웹 스타터킷";

// (marketing) 헤더 네비게이션 링크
export const NAV_LINKS: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "대시보드", href: "/dashboard" },
];

// (dashboard) 사이드바 네비게이션 링크
export const SIDEBAR_LINKS: SidebarItem[] = [
  {
    label: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "컴포넌트",
    href: "/dashboard/components",
    icon: Puzzle,
  },
  {
    label: "폼 예제",
    href: "/dashboard/forms",
    icon: FormInput,
  },
  {
    label: "데이터 테이블",
    href: "/dashboard/data-table",
    icon: Table2,
  },
  {
    label: "설정",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

// 라우트 상수
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  COMPONENTS: "/dashboard/components",
  FORMS: "/dashboard/forms",
  DATA_TABLE: "/dashboard/data-table",
  SETTINGS: "/dashboard/settings",
} as const;
