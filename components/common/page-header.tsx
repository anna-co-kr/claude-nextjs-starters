import { cn } from "@/lib/utils";
import type { PageHeaderProps } from "@/lib/types";

// 페이지 상단 제목 + 설명 + 우측 액션 버튼 영역
export function PageHeader({ title, description, children, className }: PageHeaderProps & { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 items-center gap-2">{children}</div>
      )}
    </div>
  );
}
