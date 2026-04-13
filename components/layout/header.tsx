"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { UserMenu } from "@/components/navigation/user-menu";
import { CommandMenu } from "@/components/navigation/command-menu";
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";

interface HeaderProps {
  // 사이드바 트리거 표시 여부 (대시보드: true, 마케팅: false)
  showSidebarTrigger?: boolean;
  // 마케팅 메인 nav 표시 여부
  showMainNav?: boolean;
}

// 공용 헤더 컴포넌트
// - 대시보드: SidebarTrigger + BreadcrumbNav + CommandMenu + ThemeToggle + UserMenu
// - 마케팅: 로고 + MainNav + ThemeToggle
export function Header({
  showSidebarTrigger = false,
  showMainNav = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full items-center gap-2 px-4">
        {/* 사이드바 토글 (대시보드 전용) */}
        {showSidebarTrigger && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
          </>
        )}

        {/* 로고 (마케팅 전용) */}
        {showMainNav && (
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Code2 className="size-5 text-primary" />
            <span className="text-sm">{APP_NAME}</span>
          </Link>
        )}

        {/* 브레드크럼 (대시보드 전용) */}
        {showSidebarTrigger && (
          <div className="flex-1">
            <BreadcrumbNav />
          </div>
        )}

        {/* 마케팅 메인 네비게이션 */}
        {showMainNav && (
          <nav className="hidden flex-1 items-center gap-1 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* 우측 액션 영역 */}
        <div className="ml-auto flex items-center gap-2">
          <CommandMenu />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
