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
  title: "하남 싱크대막힘 하수구막힘 고압세척 | 응급배관119",
  description: "하남 싱크대·하수구·변기 막힘, 배관 내시경·고압세척·누수탐지 상담. 응급배관119 1668-1321.",
  keywords: ["하남 싱크대막힘", "하남 하수구막힘", "하남 변기막힘", "하남 고압세척", "하남 배관청소", "하남 누수탐지", "응급배관119"],
  openGraph: {
    title: "하남 싱크대막힘 하수구막힘 | 응급배관119",
    description: "하남 전 지역 싱크대·하수구·변기 막힘, 배관 내시경과 고압세척 상담",
    url: "/",
    siteName: "응급배관119",
    images: [{ url: "/images/plumber-worker.webp", alt: "응급배관119 배관 점검 서비스" }],
    type: "website",
    locale: "ko_KR",
  },
  alternates: { canonical: "/" },
  twitter: {
    card: "summary_large_image",
    title: "하남 싱크대막힘 하수구막힘 | 응급배관119",
    description: "하남 전 지역 배관막힘·고압세척·누수탐지 상담",
    images: ["/images/plumber-worker.webp"],
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
