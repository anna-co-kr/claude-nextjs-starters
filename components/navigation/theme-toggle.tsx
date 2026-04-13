"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const themes = ["light", "system", "dark"] as const;
type Theme = (typeof themes)[number];

const themeConfig: Record<
  Theme,
  { next: Theme; icon: typeof Sun; label: string }
> = {
  light: { next: "system", icon: Sun, label: "라이트 모드" },
  system: { next: "dark", icon: Monitor, label: "시스템 테마" },
  dark: { next: "light", icon: Moon, label: "다크 모드" },
};

// 라이트 → 시스템 → 다크 순서로 테마 순환
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current = (theme as Theme) ?? "system";
  const config = themeConfig[current] ?? themeConfig.system;
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(config.next)}
          aria-label={`현재: ${config.label}. 클릭하여 변경`}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{config.label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
