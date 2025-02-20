import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
