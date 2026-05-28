import type { Metadata, Viewport } from "next";
import { Playfair_Display, Figtree, JetBrains_Mono } from "next/font/google";
import { ClientShell } from "@/components/ClientShell";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["600", "700", "400"],
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
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tukhlievs.github.io/tukhlievs/"),
  title: {
    default: "Abubakir Tukhliev",
    template: "%s · Abubakir Tukhliev",
  },
  description:
    "Personal page of Abubakir (Abu) — 16 years old, Kokand, Uzbekistan. Python, AI/ML.",
  keywords: ["Abubakir Tukhliev", "tukhlievs", "Python", "AI", "ML", "Uzbekistan"],
  authors: [{ name: "Abubakir Tukhliev", url: "https://github.com/tukhlievs" }],
  openGraph: {
    type: "profile",
    locale: "en_US",
    title: "Abubakir Tukhliev",
    description: "16 years old. Kokand, Uzbekistan. Python, AI/ML.",
    siteName: "tukhlievs",
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
      <body className="min-h-screen antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
