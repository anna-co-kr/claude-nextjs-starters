import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Palette,
  Layers,
  Shield,
  GitBranch,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { APP_DESCRIPTION, ROUTES } from "@/lib/constants";
import type { TechStackItem, FeatureItem } from "@/lib/types";

const techStack: TechStackItem[] = [
  {
    name: "Next.js",
    version: "16.2.3",
    description:
      "App Router, RSC, Turbopack 기본 탑재. 최신 풀스택 React 프레임워크",
    href: "https://nextjs.org",
  },
  {
    name: "React",
    version: "19.2.4",
    description:
      "use() 훅, 서버 액션, 향상된 Suspense 등 최신 React 기능 지원",
    href: "https://react.dev",
  },
  {
    name: "TailwindCSS",
    version: "v4",
    description:
      "tailwind.config 없이 globals.css에서 직접 설정하는 최신 CSS 기반 방식",
    href: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    version: "radix-nova",
    description:
      "복사 기반 UI 컴포넌트. radix-ui + OKLch 색상 시스템으로 완성도 높은 디자인",
    href: "https://ui.shadcn.com",
  },
];

const features: FeatureItem[] = [
  {
    icon: Zap,
    title: "즉시 시작 가능",
    description:
      "shadcn/ui 컴포넌트 Tier1/2 모두 설치 완료. 바로 개발을 시작하세요.",
  },
  {
    icon: Palette,
    title: "완벽한 다크 모드",
    description:
      "next-themes + OKLch 색상 변수 기반. 라이트/시스템/다크 3단계 테마 지원.",
  },
  {
    icon: Layers,
    title: "계층화된 아키텍처",
    description:
      "Foundation → Layout → Navigation → Form → Content → Feedback 계층 구조.",
  },
  {
    icon: Shield,
    title: "TypeScript 완벽 지원",
    description:
      "strict 모드, any 금지. Zod 스키마 기반 런타임 검증까지 타입 안전성 보장.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
        <Badge variant="secondary" className="gap-1.5">
          <Zap className="size-3" />
          Next.js 16 + React 19 + TailwindCSS v4
        </Badge>

        <div className="flex flex-col items-center gap-4">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            모던 웹 개발을 위한
            <br />
            <span className="text-muted-foreground">검증된 스타터킷</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            {APP_DESCRIPTION}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={ROUTES.DASHBOARD}>
              <LayoutDashboard className="size-4" />
              대시보드 보기
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch className="size-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* 기술 스택 섹션 */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              기술 스택
            </h2>
            <p className="mt-2 text-muted-foreground">
              최신 버전 기반의 검증된 스택
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech) => (
              <Card
                key={tech.name}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{tech.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {tech.version}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {tech.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* 특징 섹션 */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              주요 특징
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA 섹션 */}
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p className="mt-4 text-muted-foreground">
            대시보드와 컴포넌트 쇼케이스에서 모든 기능을 확인하세요.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href={ROUTES.DASHBOARD}>대시보드 열기</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.COMPONENTS}>컴포넌트 보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
