import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/common/page-header";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { ComponentsInteractive } from "./_components/components-interactive";

export const metadata: Metadata = {
  title: "컴포넌트",
};

export default function ComponentsPage() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <PageHeader
          title="컴포넌트 쇼케이스"
          description="shadcn/ui radix-nova 스타일 컴포넌트 전체 목록"
        />

        {/* Badge */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Badge</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="outline">외곽선</Badge>
            <Badge variant="destructive">위험</Badge>
          </div>
        </section>

        <Separator />

        {/* Button */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Button</h2>
          <div className="flex flex-wrap gap-2">
            <Button>기본</Button>
            <Button variant="secondary">보조</Button>
            <Button variant="outline">외곽선</Button>
            <Button variant="ghost">고스트</Button>
            <Button variant="destructive">위험</Button>
            <Button variant="link">링크</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <Separator />

        {/* Input & Label */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Input & Label</h2>
          <div className="grid gap-4 max-w-sm">
            <div className="space-y-1.5">
              <Label htmlFor="demo-email">이메일</Label>
              <Input id="demo-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-disabled">비활성화</Label>
              <Input id="demo-disabled" disabled placeholder="비활성화된 입력" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Card */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Card</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>기본 카드</CardTitle>
                <CardDescription>카드 설명 텍스트</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">카드 내용입니다.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">액션</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Avatar & Skeleton */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Avatar & Skeleton</h2>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Progress & Slider */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Progress & Slider</h2>
          <div className="max-w-sm space-y-4">
            <Progress value={60} />
            <Progress value={30} className="h-2" />
            <Slider defaultValue={[40]} max={100} step={1} />
          </div>
        </section>

        <Separator />

        {/* Switch */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Switch</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="switch-1" />
              <Label htmlFor="switch-1">알림 허용</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="switch-2" defaultChecked />
              <Label htmlFor="switch-2">이메일 수신</Label>
            </div>
          </div>
        </section>

        <Separator />

        {/* Alert */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Alert</h2>
          <div className="max-w-lg space-y-3">
            <Alert>
              <Info className="size-4" />
              <AlertTitle>안내</AlertTitle>
              <AlertDescription>
                일반 안내 메시지입니다.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>
                오류가 발생했습니다. 다시 시도해주세요.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <Separator />

        {/* Tabs */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Tabs</h2>
          <Tabs defaultValue="tab1" className="max-w-lg">
            <TabsList>
              <TabsTrigger value="tab1">계정</TabsTrigger>
              <TabsTrigger value="tab2">보안</TabsTrigger>
              <TabsTrigger value="tab3">알림</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p className="text-sm text-muted-foreground">계정 설정 내용</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p className="text-sm text-muted-foreground">보안 설정 내용</p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p className="text-sm text-muted-foreground">알림 설정 내용</p>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Accordion */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Accordion</h2>
          <Accordion type="single" collapsible className="max-w-lg">
            <AccordionItem value="item-1">
              <AccordionTrigger>자주 묻는 질문 1</AccordionTrigger>
              <AccordionContent>
                첫 번째 답변 내용입니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>자주 묻는 질문 2</AccordionTrigger>
              <AccordionContent>
                두 번째 답변 내용입니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>자주 묻는 질문 3</AccordionTrigger>
              <AccordionContent>
                세 번째 답변 내용입니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Tooltip & HoverCard */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Tooltip & HoverCard</h2>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">툴팁 hover</Button>
              </TooltipTrigger>
              <TooltipContent>툴팁 내용입니다</TooltipContent>
            </Tooltip>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@Next.js</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Next.js</h4>
                  <p className="text-xs text-muted-foreground">
                    The React Framework for Production. Next.js 16.2.3
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </section>

        <Separator />

        {/* ScrollArea */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">ScrollArea</h2>
          <ScrollArea className="h-40 w-64 rounded-md border p-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="py-1 text-sm">
                스크롤 아이템 {i + 1}
              </p>
            ))}
          </ScrollArea>
        </section>

        <Separator />

        {/* 인터랙티브 컴포넌트 (Client Component) */}
        <ComponentsInteractive />
      </div>
    </PageContainer>
  );
}
