import { Metadata } from "next";

export const AppConfig = {
  AppUrl: process.env.NEXT_PUBLIC_APP_URL as string,
  // NEXT AUTH
  AuthSecret: process.env.AUTH_SECRET,
  // NODE MAILER
  SenderGmail: process.env.SENDER_GMAIL,
  SenderGmailPass: process.env.SENDER_GMAIL_PASS,
};

export const phoneInputStyle = {
  width: "100%",
  height: "48px",
  color: "black",
  fontSize: "16px",
  borderColor: "#E5E5E5",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.07)",
};

export const appMetadata: Metadata = {
  title: "Fusion Studios - Dance Classes in Coín",
  description:
    "Join the dance revolution in Coín! Fusion Studios offers a variety of classes from ballet to aerial silks. Discover your rhythm with us.",
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
      "Join the dance revolution in Coín! Fusion Studios offers a variety of classes from ballet to aerial silks. Discover your rhythm with us.",
    images: "https://www.fusionstudios.es/images/header/logo.svg",
    url: "https://www.fusionstudios.es",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fusion Studios - Dance Classes in Coín",
    description:
      "Join the dance revolution in Coín! Fusion Studios offers a variety of classes from ballet to aerial silks. Discover your rhythm with us.",
    images: "https://www.fusionstudios.es/images/header/logo.svg",
  },
  icons: "https://www.fusionstudios.es/favicon.ico",
};
