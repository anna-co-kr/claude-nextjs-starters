"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// 전역 에러 바운더리 (Client Component 필수)
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 실제 앱: 에러 리포팅 서비스 (Sentry 등)에 전송
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-6 text-destructive" />
      </div>
      <h2 className="text-xl font-semibold">예상치 못한 오류가 발생했습니다</h2>
      <p className="text-sm text-muted-foreground">
        {error.message || "다시 시도해주세요."}
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
