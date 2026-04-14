"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/common/page-header";
import {
  profileSchema,
  changePasswordSchema,
  type ProfileInput,
  type ChangePasswordInput,
} from "@/lib/validations/profile";

export default function SettingsPage() {
  const profileForm = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "사용자", email: "user@example.com", bio: "", website: "" },
  });

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  function onProfileSubmit(values: ProfileInput) {
    // TODO: API 호출 구현
    void values;
    toast.success("프로필이 저장되었습니다.");
  }

  function onPasswordSubmit(values: ChangePasswordInput) {
    // TODO: API 호출 구현
    void values;
    toast.success("비밀번호가 변경되었습니다.");
    passwordForm.reset();
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader title="설정" description="계정 및 보안 설정을 관리하세요" />

        <Tabs defaultValue="account" className="max-w-2xl">
          <TabsList>
            <TabsTrigger value="account">계정</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
          </TabsList>

          {/* 계정 탭 */}
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
                <CardDescription>
                  공개 프로필 정보를 수정하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
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
                    <Button type="submit">저장</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 보안 탭 */}
          <TabsContent value="security" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
                <CardDescription>
                  현재 비밀번호를 입력 후 새 비밀번호로 변경하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>현재 비밀번호</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>새 비밀번호</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="8자 이상" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>새 비밀번호 확인</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">비밀번호 변경</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 알림 탭 */}
          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
                <CardDescription>
                  수신할 알림 유형을 설정하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "email-notify", label: "이메일 알림", description: "주요 업데이트를 이메일로 수신" },
                  { id: "marketing", label: "마케팅 이메일", description: "새로운 기능 및 프로모션 안내" },
                  { id: "security-alert", label: "보안 알림", description: "로그인 시도 및 보안 이슈 알림", defaultChecked: true },
                ].map(({ id, label, description, defaultChecked }) => (
                  <div key={id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={id} className="font-medium">{label}</Label>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                      <Switch id={id} defaultChecked={defaultChecked} />
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
                <Button onClick={() => toast.success("알림 설정이 저장되었습니다.")}>
                  저장
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
