import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string; // 스크린리더용 레이블
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

// 로딩 인디케이터
export function LoadingSpinner({
  size = "md",
  className,
  label = "로딩 중...",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center justify-center", className)}
    >
      <Loader2 className={cn("animate-spin text-muted-foreground", sizeMap[size])} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

// 전체 화면 로딩 오버레이
export function PageLoading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
