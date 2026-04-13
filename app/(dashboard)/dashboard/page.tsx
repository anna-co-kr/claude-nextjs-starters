import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/common/page-header";
import { StatsCard } from "@/components/common/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { StatsItem } from "@/lib/types";

// 목업 통계 데이터
const stats: StatsItem[] = [
  { label: "전체 사용자", value: "12,345", change: 12, icon: Users },
  { label: "이번달 매출", value: "₩2,345,000", change: 8.2, icon: DollarSign },
  { label: "신규 주문", value: "234", change: -3.1, icon: ShoppingCart },
  { label: "월간 성장률", value: "18.2%", change: 4.5, icon: TrendingUp },
];

// 목업 최근 주문 데이터
const recentOrders = [
  { id: "ORD-001", customer: "김철수", amount: "₩89,000", status: "완료" },
  { id: "ORD-002", customer: "이영희", amount: "₩123,000", status: "처리중" },
  { id: "ORD-003", customer: "박민준", amount: "₩45,000", status: "완료" },
  { id: "ORD-004", customer: "최지아", amount: "₩234,000", status: "취소" },
  { id: "ORD-005", customer: "정수현", amount: "₩67,000", status: "처리중" },
];

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive"; label: string }> = {
  완료: { variant: "default", label: "완료" },
  처리중: { variant: "secondary", label: "처리중" },
  취소: { variant: "destructive", label: "취소" },
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader
          title="대시보드"
          description="서비스 현황을 한눈에 파악하세요"
        />

        {/* 통계 카드 그리드 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* 최근 주문 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle>최근 주문</CardTitle>
            <CardDescription>최근 5건의 주문 내역입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객명</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => {
                  const config = statusConfig[order.status];
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
