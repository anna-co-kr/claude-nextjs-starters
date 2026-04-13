import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

// 페이지 내 max-width + padding 표준 래퍼
// 모든 페이지의 콘텐츠는 이 컴포넌트로 감싸서 일관된 너비/여백 유지
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
