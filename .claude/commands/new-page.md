---
argument-hint: "<slug> <PageTitle> [description]"
---

페이지 정보: $ARGUMENTS

아래 규칙에 따라 새 대시보드 페이지를 생성해주세요.

## 작업 순서

1. `$ARGUMENTS`를 파싱합니다.
   - 첫 번째 단어: URL slug (예: `analytics`, kebab-case)
   - 두 번째 단어: 페이지 제목 (예: `Analytics`)
   - 세 번째 단어 이후: 페이지 설명 (선택)

2. 다음 3가지 파일/코드를 **순서대로** 수정·생성합니다.

---

### Step 1 — `lib/constants.ts` 업데이트

`ROUTES` 객체에 새 라우트 상수를 추가합니다:
```ts
{SLUG_UPPER}: "/dashboard/{slug}",
```

`SIDEBAR_LINKS` 배열에 새 항목을 추가합니다 (기존 항목 참고):
```ts
{
  label: "{페이지 제목}",
  href: "/dashboard/{slug}",
  icon: {적절한 Lucide 아이콘},
},
```
> Lucide 아이콘은 페이지 성격에 맞게 선택하되, `lucide-react`에서 실제로 export되는 이름인지 반드시 확인하세요.

---

### Step 2 — 페이지 파일 생성

`app/(dashboard)/dashboard/{slug}/page.tsx` 파일을 생성합니다:

```tsx
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/common/page-header";

export default function {PageTitle}Page() {
  return (
    <PageContainer>
      <PageHeader
        title="{페이지 제목}"
        description="{페이지 설명}"
      />
      {/* TODO: 페이지 콘텐츠 */}
    </PageContainer>
  );
}
```

---

## 규칙

- Server Component 기본 (`"use client"` 불필요)
- `PageContainer` + `PageHeader` 래퍼 필수 적용
- 파일 경로: `app/(dashboard)/dashboard/{slug}/page.tsx`
- `any` 타입 금지, Tailwind CSS로만 스타일 적용

완료 후 생성된 파일 목록과 사이드바 반영 여부를 알려주세요.
