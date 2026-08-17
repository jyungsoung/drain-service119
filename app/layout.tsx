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
  metadataBase: new URL("https://drain-service119.netlify.app"),
  title: "지역별 배관막힘·고압세척 | 응급배관119",
  description: "서울·경기·인천·강원·충청권 하수구·싱크대·변기 막힘, 배관 내시경·고압세척 지역별 안내. 누수탐지는 별도 전용페이지 운영. 응급배관119 1668-1321.",
  keywords: ["응급배관119", "하수구막힘", "싱크대막힘", "변기막힘", "배관 고압세척", "배관 내시경", "지역별 배관 서비스"],
  openGraph: {
    title: "지역별 배관막힘·고압세척 | 응급배관119",
    description: "서울·경기·인천·강원·충청권 배관막힘·내시경·고압세척 지역 안내",
    url: "/",
    siteName: "응급배관119",
    images: [
      { url: "/images/service-consultation.webp", alt: "응급배관119 24시간 배관 상담" },
      { url: "/images/service-dispatch.webp", alt: "응급배관119 하수구막힘 출동" },
      { url: "/images/inspection-equipment.webp", alt: "응급배관119 배관 고압세척 장비" },
      { url: "/images/plumber-worker.webp", alt: "응급배관119 배관 내시경 점검" },
      { url: "/images/sink-service.webp", alt: "응급배관119 싱크대막힘 작업" },
      { url: "/images/service-toilet.webp", alt: "응급배관119 변기막힘 작업" },
    ],
    type: "website",
    locale: "ko_KR",
  },
  alternates: { canonical: "/" },
  twitter: {
    card: "summary_large_image",
    title: "지역별 배관막힘·고압세척 | 응급배관119",
    description: "지역과 막힘 증상에 맞는 배관 서비스 안내",
    images: ["/images/service-dispatch.webp"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2MCBJGRSJL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2MCBJGRSJL');
          `}
        </Script>
      </body>
    </html>
  );
}
