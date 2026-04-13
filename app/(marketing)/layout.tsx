import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// 마케팅 레이아웃: Header(로고+메인nav) + main + Footer
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showMainNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
