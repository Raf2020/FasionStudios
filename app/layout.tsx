import type { Metadata } from "next";

import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

import "./globals.css";
import { geistMono, geistSans, instrumentSerif } from "./fonts";
import GlobalLayout from "@/components/global/global-layout";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Fusion Studio",
  description: "Fusion Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <SessionProvider>
          <GlobalLayout />
          <div className="mx-auto w-full max-w-[1440px]">
            <Header />
            {children}
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
