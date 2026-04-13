import Link from "next/link";
import { Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { APP_NAME } from "@/lib/constants";

// 인증 레이아웃: 중앙 정렬, 로고 + 테마토글만 표시
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 최소 헤더 */}
      <header className="flex h-14 items-center justify-between border-b px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Code2 className="size-5 text-primary" />
          <span className="text-sm">{APP_NAME}</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* 중앙 정렬 콘텐츠 */}
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
