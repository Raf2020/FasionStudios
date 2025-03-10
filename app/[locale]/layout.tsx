import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

import "../globals.css";
import { geistMono, geistSans, instrumentSerif } from "../fonts";
import GlobalLayout from "@/components/global/global-layout";
import { SessionProvider } from "next-auth/react";
import { appMetadata } from "@/shared/constants/app.const";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

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

  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <GlobalLayout />
            <div className="w-full">
              <Header />
              {children}
              <Footer />
            </div>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
