import "../globals.css";

import GlobalLayout from "@/components/global/global-layout";
import { geistMono, geistSans, instrumentSerif } from "../fonts";
import { SessionProvider } from "next-auth/react";
import { appMetadata } from "@/shared/constants/app.const";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";
import { CookieBanner } from "@/components/global/cookie-banner";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  const titles: Record<string, string> = {
    es: "Fusion Studios Coín Málaga | Clases de Baile, Yoga, Pilates, Pole y Aéreos",
    en: "Fusion Studios Coín Málaga | Dance, Yoga, Pilates, Pole & Aerial Classes",
  };

  const descriptions: Record<string, string> = {
    es:
      "Escuela de baile en Coín (Málaga) con clases de ballet, danza urbana, contemporáneo, salsa, bachata, yoga, pilates, pole dance, telas y aros aéreos. Actividades para niños y adultos con profesores internacionales.",
    en:
      "Dance school in Coín (Málaga) offering ballet, urban dance, contemporary, salsa, bachata, yoga, pilates, pole dance, aerial silks and hoops. Activities for children and adults taught by international instructors.",
  };

  const title = titles[locale] ?? appMetadata.title;
  const description = descriptions[locale] ?? appMetadata.description;

  const siteUrl =
    (appMetadata.openGraph && (appMetadata.openGraph as any).url) ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "";
  const baseUrl = siteUrl.replace(/\/$/, "");
  const heroImage = baseUrl ? `${baseUrl}/images/home/hero.svg` : "/images/home/hero.svg";

  return {
    ...appMetadata,
    title,
    description,
    openGraph: {
      ...appMetadata.openGraph,
      title,
      description,
      images: [heroImage],
    },
    twitter: {
      ...appMetadata.twitter,
      title,
      description,
      images: [heroImage],
      card: "summary_large_image",
    },
  };
}

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
            {children}
            <CookieBanner />
          </NextIntlClientProvider>
        </SessionProvider>
        <Toaster/>
      </body>
    </html>
  );
}
