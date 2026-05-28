import type { Metadata, Viewport } from "next";
import { Playfair_Display, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["600", "700", "400", "500"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tukhlievs.github.io/tukhlievs/"),
  title: {
    default: "Abubakir Tukhliev — Personal page",
    template: "%s · Abubakir Tukhliev",
  },
  description:
    "Personal page of Abubakir (Abu) — 16 years old, Kokand, Uzbekistan. Python, AI/ML, frontend.",
  keywords: [
    "Abubakir Tukhliev",
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
    locale: "en_US",
    title: "Abubakir Tukhliev — Personal page",
    description:
      "16 years old. Kokand, Uzbekistan. Python, AI/ML, frontend. Telegram · Threads · GitHub.",
    siteName: "tukhlievs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abubakir Tukhliev",
    description: "Python · AI/ML · Software Engineer in progress",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0EAD9" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0A08" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
