"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useUIStore } from "@/store";
import { SIDEBAR_LINKS, ROUTES } from "@/lib/constants";

// ⌘K 커맨드 팔레트
// Zustand 스토어로 open 상태 관리 (헤더 버튼과 공유)
export function CommandMenu() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { commandMenuOpen, setCommandMenuOpen, toggleCommandMenu } = useUIStore();

  // ⌘K / Ctrl+K 단축키 등록
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommandMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleCommandMenu]);

  const runCommand = (fn: () => void) => {
    setCommandMenuOpen(false);
    fn();
  };

  return (
    <>
      {/* 헤더에 표시되는 트리거 버튼 */}
      <Button
        variant="outline"
        size="sm"
        className="hidden gap-2 text-muted-foreground md:flex"
        onClick={() => setCommandMenuOpen(true)}
      >
        <Search className="size-3.5" />
        <span className="text-xs">검색...</span>
        <kbd className="pointer-events-none rounded border bg-muted px-1 text-[10px]">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
      >
        <CommandInput placeholder="페이지 이동, 테마 변경..." />
        <CommandList>
          <CommandEmpty>결과가 없습니다.</CommandEmpty>

          {/* 페이지 이동 그룹 */}
          <CommandGroup heading="페이지">
            <CommandItem onSelect={() => runCommand(() => router.push(ROUTES.HOME))}>
              홈
            </CommandItem>
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <CommandItem
                  key={link.href}
                  onSelect={() => runCommand(() => router.push(link.href))}
                >
                  <Icon className="size-4" />
                  {link.label}
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          {/* 테마 변경 그룹 */}
          <CommandGroup heading="테마">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              {theme === "light" && "✓ "}라이트 모드
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              {theme === "system" && "✓ "}시스템 테마
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              {theme === "dark" && "✓ "}다크 모드
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
