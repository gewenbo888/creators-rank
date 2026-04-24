import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://creators.psyverse.fun"),
  title: "Creators · Ranked | 全球创作者排行榜",
  description:
    "MrBeast, Selena Gomez, MKBHD, Khaby Lame, Joe Rogan, Li Ziqi, IShowSpeed — 40+ top creators across 11 niches scored on 6 weighted criteria including engagement rate, cross-platform presence, and content quality.",
  keywords: ["creator economy", "top creators 2026", "MrBeast", "MKBHD", "Khaby Lame", "Joe Rogan", "Li Ziqi", "IShowSpeed", "Selena Gomez", "Cristiano Ronaldo", "creators ranking", "influencer ranking", "全球创作者", "网红排名"],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Creators · Ranked" }],
    title: "Creators · Ranked",
    description: "40+ top creators across 11 niches scored on 6 weighted criteria. 中英双语。",
    url: "https://creators.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: "Creators · Ranked",
    description: "40+ top creators across 11 niches scored on 6 criteria.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0a0908" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
