import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abubakir Tukhliev",
  description:
    "16-year-old developer from Kokand, Uzbekistan. Python & AI learner. Building toward ML engineering.",
  keywords: ["Abubakir Tukhliev", "tukhlievs", "Python", "AI", "Uzbekistan", "ML Engineer"],
  authors: [{ name: "Abubakir Tukhliev", url: "https://github.com/tukhlievs" }],
  openGraph: {
    title: "Abubakir Tukhliev",
    description: "16-year-old developer from Kokand, Uzbekistan.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Abubakir Tukhliev",
    description: "16-year-old developer from Kokand, Uzbekistan.",
    creator: "@tukhlievs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-mono antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
