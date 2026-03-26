import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "사주 리포트 - 정통 사주팔자 해석",
  description: "전통 사주명리학 기반의 정확한 사주팔자 해석 서비스. 오늘운세, 올해운세, 배우자운, 취업운 리포트를 제공합니다.",
  keywords: "사주, 사주팔자, 운세, 오늘운세, 올해운세, 배우자운, 취업운, 명리학",
  authors: [{ name: "사주 리포트" }],
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  openGraph: {
    title: "사주 리포트 - 정통 사주팔자 해석",
    description: "전통 사주명리학 기반의 정확한 사주팔자 해석 서비스",
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "사주 리포트",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-['Noto_Sans_KR',sans-serif]">{children}</body>
    </html>
  );
}
