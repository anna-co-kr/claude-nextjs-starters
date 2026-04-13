// 앱 전역 공통 TypeScript 타입 정의

// 네비게이션 메뉴 아이템
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

// 사이드바 네비게이션 아이템 (아이콘 포함)
export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: SidebarItem[];
}

// 통계 카드 데이터
export interface StatsItem {
  label: string;
  value: string | number;
  change?: number; // 퍼센트 변화율 (양수: 증가, 음수: 감소)
  icon: React.ComponentType<{ className?: string }>;
}

// 기술 스택 아이템 (랜딩 페이지)
export interface TechStackItem {
  name: string;
  version: string;
  description: string;
  href: string;
}

// 특징 아이템 (랜딩 페이지)
export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 페이지 헤더 Props
export interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode; // 우측 액션 버튼 영역
}

// API 응답 공통 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// 페이지네이션 메타
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
