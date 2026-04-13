---
argument-hint: "<featureName> <DisplayName> [description]"
---

기능 정보: $ARGUMENTS

아래 규칙에 따라 TanStack Query + Zod + DataTable 조합의 CRUD 기능 단위를 스캐폴딩합니다.

## 작업 순서

1. `$ARGUMENTS`를 파싱합니다.
   - 첫 번째 단어: camelCase 기능 이름 (예: `product`)
   - 두 번째 단어: 화면에 표시할 한국어 또는 영문 이름 (예: `상품`)
   - 세 번째 단어 이후: 기능 설명 (선택)

2. 아래 4개 파일을 **순서대로** 생성합니다.

---

### Step 1 — Zod 스키마 (`lib/validations/{featureName}.ts`)

```ts
import { z } from "zod";

// {DisplayName} 스키마
export const {featureName}Schema = z.object({
  id: z.string(),
  name: z.string().min(1, "이름을 입력하세요"),
  // TODO: 필요한 필드 추가
  createdAt: z.string(),
});

export type {FeatureName} = z.infer<typeof {featureName}Schema>;
```

---

### Step 2 — TanStack Query Hook (`hooks/use-{featureName}.ts`)

```ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { {FeatureName} } from "@/lib/validations/{featureName}";

// 목업 데이터
const MOCK_DATA: {FeatureName}[] = [
  { id: "1", name: "샘플 1", createdAt: new Date().toISOString() },
  { id: "2", name: "샘플 2", createdAt: new Date().toISOString() },
];

// {DisplayName} 목록 조회
export function use{FeatureName}List() {
  return useQuery({
    queryKey: ["{featureName}"],
    queryFn: async (): Promise<{FeatureName}[]> => {
      // TODO: 실제 API 연동 시 교체
      return MOCK_DATA;
    },
  });
}

// {DisplayName} 삭제
export function useDelete{FeatureName}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: 실제 API 연동 시 교체
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["{featureName}"] });
    },
  });
}
```

---

### Step 3 — ColumnDef (`app/(dashboard)/dashboard/{featureName}/{featureName}-columns.tsx`)

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { {FeatureName} } from "@/lib/validations/{featureName}";

export const {featureName}Columns: ColumnDef<{FeatureName}>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="생성일" />
    ),
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString("ko-KR"),
  },
];
```

---

### Step 4 — 목록 페이지 (`app/(dashboard)/dashboard/{featureName}/page.tsx`)

```tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { {featureName}Columns } from "./{featureName}-columns";
import { use{FeatureName}List } from "@/hooks/use-{featureName}";
import { LoadingSpinner } from "@/components/feedback/loading-spinner";

export default function {FeatureName}Page() {
  const { data, isLoading } = use{FeatureName}List();

  return (
    <PageContainer>
      <PageHeader
        title="{DisplayName} 관리"
        description="{DisplayName} 목록을 조회하고 관리합니다"
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={featureName}Columns}
          data={data ?? []}
          searchKey="name"
        />
      )}
    </PageContainer>
  );
}
```

---

## 완료 후

생성된 파일 목록을 알려주고, `lib/constants.ts`에 라우트와 사이드바 항목을 추가해야 함을 안내하세요 (`/new-page` 커맨드 사용 권장).

## 규칙

- `any` 타입 금지
- Zod 타입은 `z.infer`로 추출
- TanStack Query v5 문법 사용 (`queryKey` 배열 필수)
- 목업 데이터 주석으로 TODO 표시
- named export 사용
