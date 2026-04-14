"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/common/page-header";
import { profileSchema, type ProfileInput } from "@/lib/validations/profile";

// Combobox 옵션 데이터
const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "svelte", label: "Svelte" },
  { value: "nuxt", label: "Nuxt.js" },
];

export default function FormsPage() {
  const [date, setDate] = useState<Date>();
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [comboboxValue, setComboboxValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounceValue(searchTerm, 300);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      website: "",
    },
  });

  function onSubmit(values: ProfileInput) {
    // TODO: API 호출 구현
    void values;
    toast.success("프로필이 저장되었습니다.");
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <PageHeader
          title="폼 예제"
          description="React Hook Form + Zod 기반 다양한 폼 패턴"
        />

        {/* 프로필 수정 폼 */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            프로필 수정 (RHF + Zod)
          </h2>
          <div className="max-w-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>소개</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="자기소개를 작성하세요 (최대 200자)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length ?? 0}/200
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>웹사이트</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  저장
                </Button>
              </form>
            </Form>
          </div>
        </section>

        <Separator />

        {/* DatePicker */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            DatePicker (Calendar + Popover)
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-60 justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="size-4" />
                {date ? format(date, "PPP", { locale: ko }) : "날짜 선택"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ko}
              />
            </PopoverContent>
          </Popover>
          {date && (
            <p className="text-sm text-muted-foreground">
              선택된 날짜: {format(date, "yyyy년 MM월 dd일", { locale: ko })}
            </p>
          )}
        </section>

        <Separator />

        {/* Combobox */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Combobox (Command + Popover)
          </h2>
          <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={comboboxOpen}
                className="w-60 justify-between"
              >
                {comboboxValue
                  ? frameworks.find((f) => f.value === comboboxValue)?.label
                  : "프레임워크 선택..."}
                <ChevronsUpDown className="size-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0">
              <Command>
                <CommandInput placeholder="검색..." />
                <CommandList>
                  <CommandEmpty>결과 없음</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setComboboxValue(
                            currentValue === comboboxValue ? "" : currentValue
                          );
                          setComboboxOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "size-4",
                            comboboxValue === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </section>

        <Separator />

        {/* Select */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Select</h2>
          <Select>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="역할 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">관리자</SelectItem>
              <SelectItem value="editor">편집자</SelectItem>
              <SelectItem value="viewer">뷰어</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <Separator />

        {/* RadioGroup */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Radio Group</h2>
          <RadioGroup defaultValue="option-1">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-1" id="radio-1" />
              <Label htmlFor="radio-1">옵션 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-2" id="radio-2" />
              <Label htmlFor="radio-2">옵션 2</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-3" id="radio-3" />
              <Label htmlFor="radio-3">옵션 3</Label>
            </div>
          </RadioGroup>
        </section>

        <Separator />

        {/* usehooks-ts: useDebounceValue 데모 */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            usehooks-ts · useDebounceValue (300ms)
          </h2>
          <div className="max-w-sm space-y-2">
            <div className="flex items-center gap-2">
              <Switch id="notify" />
              <Label htmlFor="notify">알림 활성화</Label>
            </div>
            <Input
              placeholder="입력 후 300ms 뒤 반영..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              디바운스 값: <code className="text-foreground">{debouncedSearch || "—"}</code>
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
