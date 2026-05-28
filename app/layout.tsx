import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abubakir Tukhliev — Python & AI Developer",
  description:
    "16-year-old developer from Kokand, Uzbekistan. Learning Python and AI, working toward becoming a Fullstack Software Engineer. Quick links to all my socials.",
  keywords: [
    "Abubakir Tukhliev",
    "tukhlievs",
    "Python developer",
    "AI",
    "Uzbekistan",
    "Kokand",
    "fullstack engineer",
  ],
  authors: [{ name: "Abubakir Tukhliev" }],
  openGraph: {
    title: "Abubakir Tukhliev — Python & AI Developer",
    description:
      "16-year-old developer from Kokand, Uzbekistan. Learning Python and AI. Find me online.",
    type: "website",
    locale: "en_US",
    siteName: "tukhlievs",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <noscript>
          {/* Ensure scroll-reveal content (incl. social links) shows without JS */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
