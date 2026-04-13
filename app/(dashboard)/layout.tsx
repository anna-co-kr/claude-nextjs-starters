import { AppShell } from "@/components/layout/app-shell";

// 대시보드 레이아웃: AppShell (사이드바 + 헤더 포함)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
