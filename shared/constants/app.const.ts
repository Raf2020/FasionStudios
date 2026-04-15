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
  metadataBase: new URL("https://www.fusionstudios.es"),
  title: "Fusion Studios - Dance Classes in Coín",
  description:
    "Experience the joy of dance at Fusion Studios in Coín, Málaga, Costa del Sol! Our world-class instructors offer a variety of dance classes, from ballet to Brazilian Jiu-Jitsu, designed for all ages.",
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
    images: [{ url: "/images/home/og-image.jpg", width: 1200, height: 630, alt: "Fusion Studios" }],
    url: "https://www.fusionstudios.es",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fusion Studios - Dance Classes in Coín",
    description:
      "Join Fusion Studios in Coín, Málaga, for a wide range of dance and fitness classes, including ballet, aerial silks, Brazilian Jiu-Jitsu, yoga, and more! Perfect for families, kids, and adults. Sign up for free classes and updates.",
    images: ["/images/home/og-image.jpg"],
  },
  icons: "https://www.fusionstudios.es/favicon.ico",
};
