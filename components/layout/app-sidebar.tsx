"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_NAME, SIDEBAR_LINKS } from "@/lib/constants";

// 대시보드 사이드바 네비게이션
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* 헤더: 로고 */}
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Code2 className="size-5 text-primary" />
          <span className="font-semibold text-sm">{APP_NAME}</span>
        </div>
      </SidebarHeader>

      {/* 메인 네비게이션 */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 푸터: 버전 정보 */}
      <SidebarFooter>
        <p className="px-2 py-1 text-xs text-muted-foreground">
          Next.js 16 · React 19 · shadcn/ui
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
