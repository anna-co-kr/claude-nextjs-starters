"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/common/page-header";

// 목업 데이터 타입
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "pending";
  createdAt: string;
}

// 목업 데이터 (30건)
const users: User[] = Array.from({ length: 30 }, (_, i) => ({
  id: `USR-${String(i + 1).padStart(3, "0")}`,
  name: ["김민준", "이서연", "박지우", "최예진", "정수호", "강나연", "조현우", "윤채원", "임도현", "한소희"][i % 10],
  email: `user${i + 1}@example.com`,
  role: (["admin", "editor", "viewer"] as const)[i % 3],
  status: (["active", "inactive", "pending"] as const)[i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2],
  createdAt: new Date(2025, i % 12, (i % 28) + 1).toLocaleDateString("ko-KR"),
}));

const roleConfig: Record<User["role"], string> = {
  admin: "관리자",
  editor: "편집자",
  viewer: "뷰어",
};

const statusConfig: Record<
  User["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  active: { label: "활성", variant: "default" },
  inactive: { label: "비활성", variant: "secondary" },
  pending: { label: "대기중", variant: "outline" },
};

// TanStack Table 컬럼 정의
const columns: ColumnDef<User>[] = [
  // 행 선택 체크박스
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="전체 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="행 선택"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ID
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  // 이름
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  // 이메일
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이메일" />
    ),
  },
  // 역할
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="역할" />
    ),
    cell: ({ row }) => {
      const role = row.getValue<User["role"]>("role");
      return <span className="text-sm">{roleConfig[role]}</span>;
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  // 상태
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="상태" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<User["status"]>("status");
      const config = statusConfig[status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  // 가입일
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="가입일" />
    ),
  },
  // 액션
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                toast.success("ID가 복사되었습니다.");
              }}
            >
              ID 복사
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="size-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => toast.error(`${user.name} 삭제됨`)}
            >
              <Trash2 className="size-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTablePage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader
          title="데이터 테이블"
          description="TanStack Table v8 기반 정렬 · 필터 · 페이지네이션 · 행 선택"
        >
          <Button onClick={() => toast.success("내보내기 완료!")}>내보내기</Button>
        </PageHeader>

        <DataTable
          columns={columns}
          data={users}
          searchKey="name"
          searchPlaceholder="이름으로 검색..."
        />
      </div>
    </PageContainer>
  );
}
