"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { ChevronDown, Settings, LogOut, User, Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ConfirmDialog } from "@/components/feedback/confirm-dialog";

// 인터랙티브 컴포넌트 (Client Component)
// Dialog, DropdownMenu, Sheet, Toast, ConfirmDialog 데모
export function ComponentsInteractive() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  // 타이머 ref: 언마운트 시 clearTimeout으로 메모리 누수 방지
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    await copy("복사된 텍스트입니다!");
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Dialog */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Dialog</h2>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">다이얼로그 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>다이얼로그 제목</DialogTitle>
                <DialogDescription>
                  중요한 정보를 표시하는 다이얼로그입니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setDialogOpen(false)}>확인</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="text-destructive"
            onClick={() => setConfirmOpen(true)}
          >
            삭제 확인
          </Button>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="정말 삭제하시겠습니까?"
            description="이 작업은 되돌릴 수 없습니다."
            confirmLabel="삭제"
            destructive
            onConfirm={() => toast.success("삭제되었습니다.")}
          />
        </div>
      </section>

      <Separator />

      {/* DropdownMenu */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Dropdown Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              메뉴 열기
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="size-4" />
              프로필
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" />
              설정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="size-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <Separator />

      {/* Sheet */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Sheet</h2>
        <div className="flex flex-wrap gap-2">
          {(["left", "right", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Sheet ({side})</SheetTitle>
                  <SheetDescription>
                    {side} 방향 슬라이드 패널
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>

      <Separator />

      {/* Toast (Sonner) */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Toast (Sonner)</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast("기본 토스트 메시지")}>
            기본
          </Button>
          <Button variant="outline" onClick={() => toast.success("성공!")}>
            성공
          </Button>
          <Button variant="outline" onClick={() => toast.error("오류 발생")}>
            오류
          </Button>
          <Button variant="outline" onClick={() => toast.warning("주의 필요")}>
            경고
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise((res) => setTimeout(res, 2000)),
                { loading: "처리 중...", success: "완료!", error: "실패" }
              )
            }
          >
            Promise
          </Button>
        </div>
      </section>

      <Separator />

      {/* usehooks-ts: useCopyToClipboard 데모 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          usehooks-ts · useCopyToClipboard
        </h2>
        <Button variant="outline" onClick={handleCopy} className="gap-2">
          {copied ? (
            <>
              <Check className="size-4 text-green-500" />
              복사됨!
            </>
          ) : (
            <>
              <Copy className="size-4" />
              클립보드에 복사
            </>
          )}
        </Button>
      </section>
    </div>
  );
}
