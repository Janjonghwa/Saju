import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "사주 리포트 - 정확한 사주팔자 해석",
  description: "AI 기반 사주팔자 해석 서비스. 오늘운세, 올해운세, 배우자운, 취업운 리포트를 제공합니다.",
  keywords: "사주, 사주팔자, 운세, 오늘운세, 올해운세, 배우자운, 취업운",
  authors: [{ name: "Saju Report" }],
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  openGraph: {
    title: "사주 리포트 - 정확한 사주팔자 해석",
    description: "AI 기반 사주팔자 해석 서비스. 오늘운세, 올해운세, 배우자운, 취업운 리포트를 제공합니다.",
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "사주 리포트",
  },
  twitter: {
    card: "summary_large_image",
    title: "사주 리포트 - 정확한 사주팔자 해석",
    description: "AI 기반 사주팔자 해석 서비스. 오늘운세, 올해운세, 배우자운, 취업운 리포트를 제공합니다.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
