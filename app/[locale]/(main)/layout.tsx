import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

import { appMetadata } from "@/shared/constants/app.const";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata = appMetadata;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  return (
    <div className="w-full mb-16 md:mb-0">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
