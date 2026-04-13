import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatsItem } from "@/lib/types";

interface StatsCardProps extends StatsItem {
  className?: string;
}

// 통계 카드: 지표 이름 + 값 + 변화율 + 아이콘
export function StatsCard({
  label,
  value,
  change,
  icon: Icon,
  className,
}: StatsCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-xs",
              isPositive && "text-green-600 dark:text-green-400",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}
          >
            {isPositive && <TrendingUp className="size-3" />}
            {isNegative && <TrendingDown className="size-3" />}
            {!isPositive && !isNegative && <Minus className="size-3" />}
            <span>
              {isPositive && "+"}
              {change}% 지난달 대비
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
