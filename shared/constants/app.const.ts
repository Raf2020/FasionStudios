import { Metadata } from "next";

export const AppConfig = {
  AppUrl: process.env.NEXT_PUBLIC_APP_URL as string,
  // NEXT AUTH
  AuthSecret: process.env.AUTH_SECRET,
  // NODE MAILER
  SenderGmail: process.env.SENDER_GMAIL,
  SenderGmailPass: process.env.SENDER_GMAIL_PASS,
  // RECAPTCHA
  RecaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  RecaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
};

export const appMetadata: Metadata = {
  title: "Fusion Studios - Dance Classes in Coín",
  description:
    "Join Fusion Studios in Coín, Málaga, for a wide range of dance and fitness classes, including ballet, aerial silks, Brazilian Jiu-Jitsu, yoga, and more! Perfect for families, kids, and adults. Sign up for free classes and updates.",
  keywords: [
    "dance classes",
    "ballet",
    "aerial silks",
    "Coín",
    "Fusion Studios",
    "dance studio",
    "dance lessons",
    "kids dance classes",
    "adult dance classes",
  ],
  authors: { name: "Fusion Studios" },
  openGraph: {
    title: "Fusion Studios - Dance Classes in Coín",
    description:
      "Join Fusion Studios in Coín, Málaga, for a wide range of dance and fitness classes, including ballet, aerial silks, Brazilian Jiu-Jitsu, yoga, and more! Perfect for families, kids, and adults. Sign up for free classes and updates.",
    images: "https://www.fusionstudios.es/images/header/logo.svg",
    url: "https://www.fusionstudios.es",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fusion Studios - Dance Classes in Coín",
    description:
      "Join Fusion Studios in Coín, Málaga, for a wide range of dance and fitness classes, including ballet, aerial silks, Brazilian Jiu-Jitsu, yoga, and more! Perfect for families, kids, and adults. Sign up for free classes and updates.",
    images: "https://www.fusionstudios.es/images/header/logo.svg",
  },
  icons: "https://www.fusionstudios.es/favicon.ico",
};
