---
argument-hint: "<FormName> <field1,field2,...> [description]"
---

폼 정보: $ARGUMENTS

아래 규칙에 따라 React Hook Form + Zod + shadcn/ui Form 조합의 폼 컴포넌트를 생성합니다.

## 작업 순서

1. `$ARGUMENTS`를 파싱합니다.
   - 첫 번째 단어: PascalCase 폼 이름 (예: `ContactForm`)
   - 두 번째 단어: 쉼표로 구분된 필드 목록 (예: `name,email,message`)
   - 세 번째 단어 이후: 폼 설명 (선택)

2. 필드 목록을 분석해 각 필드의 타입을 추론합니다:
   - `email`, `mail` 포함 → `z.string().email()`
   - `password`, `pw` 포함 → `z.string().min(8)` + `type="password"`
   - `message`, `content`, `description`, `memo` → `<Textarea>`
   - `age`, `count`, `amount`, `price` 포함 → `z.coerce.number()`
   - `agree`, `terms`, `check` 포함 → `z.boolean()` + `<Checkbox>`
   - 그 외 → `z.string().min(1)`

3. 아래 2개 파일을 **순서대로** 생성합니다.

---

### Step 1 — Zod 스키마 (`lib/validations/{formName}.ts`)

필드 목록을 기반으로 스키마를 생성합니다:

```ts
import { z } from "zod";

// {FormName} 유효성 검사 스키마
export const {formName}Schema = z.object({
  // 각 필드를 추론된 타입으로 정의
});

export type {FormName}Input = z.infer<typeof {formName}Schema>;
```

---

### Step 2 — 폼 컴포넌트 (`components/forms/{form-name}-form.tsx`)

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Textarea, Checkbox 등 필요한 shadcn 컴포넌트 추가
import { {formName}Schema, type {FormName}Input } from "@/lib/validations/{formName}";

interface {FormName}Props {
  onSubmit?: (data: {FormName}Input) => void | Promise<void>;
}

// {설명}
export function {FormName}({ onSubmit }: {FormName}Props) {
  const form = useForm<{FormName}Input>({
    resolver: zodResolver({formName}Schema),
    defaultValues: {
      // 각 필드 기본값
    },
  });

  async function handleSubmit(data: {FormName}Input) {
    try {
      await onSubmit?.(data);
      toast.success("저장되었습니다");
      form.reset();
    } catch {
      toast.error("오류가 발생했습니다. 다시 시도해주세요");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* 각 필드를 FormField로 생성 */}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "저장 중..." : "저장"}
        </Button>
      </form>
    </Form>
  );
}
```

---

## 규칙

- `"use client"` 필수 (훅 사용)
- `zodResolver`로 Zod 스키마 연결
- 모든 필드는 shadcn `<FormField>` + `<FormItem>` + `<FormMessage>` 구조 사용
- Sonner `toast`로 성공/실패 피드백
- `isSubmitting` 상태로 submit 버튼 비활성화
- named export 사용
- `any` 타입 금지
- `components/forms/` 폴더가 없으면 생성

완료 후 파일 경로 2개와 사용 예시를 알려주세요.
