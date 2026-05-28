import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tukhlievs.vercel.app"),
  title: {
    default: "Абубакир Тухлиев — AI & Software Engineer (в процессе)",
    template: "%s · Abubakir Tukhliev",
  },
  description:
    "Личная страница Абубакира (Абу) — 16 лет, г. Коканд, Узбекистан. Python, AI/ML, frontend.",
  keywords: [
    "Abubakir Tukhliev",
    "Абубакир Тухлиев",
    "tukhlievs",
    "Python",
    "AI",
    "ML",
    "Software Engineer",
    "Uzbekistan",
    "Kokand",
  ],
  authors: [{ name: "Abubakir Tukhliev", url: "https://github.com/tukhlievs" }],
  creator: "Abubakir Tukhliev",
  openGraph: {
    type: "profile",
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    title: "Абубакир Тухлиев — AI & Software Engineer (в процессе)",
    description:
      "16 лет. Коканд, Узбекистан. Python, AI/ML, frontend. Telegram · Threads · GitHub.",
    siteName: "tukhlievs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Абубакир Тухлиев",
    description: "Python · AI/ML · Software Engineer in progress",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#06070b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased grain">{children}</body>
    </html>
  );
}
