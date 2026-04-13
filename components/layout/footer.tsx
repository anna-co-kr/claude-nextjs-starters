import Link from "next/link";
import { Code2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";

// 마케팅 푸터 (Server Component)
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* 로고 + 저작권 */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="size-4" />
            <span>{APP_NAME}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>&copy; {currentYear}</span>
          </div>

          {/* 외부 링크 */}
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            {[
              { label: "Next.js", href: "https://nextjs.org" },
              { label: "shadcn/ui", href: "https://ui.shadcn.com" },
              { label: "Tailwind", href: "https://tailwindcss.com" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
