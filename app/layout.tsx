import Header from "@/components/global/header";
import Footer from "@/components/global/footer";

import "./globals.css";
import { geistMono, geistSans, instrumentSerif } from "./fonts";
import GlobalLayout from "@/components/global/global-layout";
import { SessionProvider } from "next-auth/react";
import { appMetadata } from "@/shared/constants/app.const";

export const metadata = appMetadata;

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
          <div className="w-full">
            <Header />
            {children}
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
