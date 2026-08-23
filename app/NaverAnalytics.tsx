"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    wcs?: unknown;
    wcs_add?: Record<string, string>;
    wcs_do?: () => void;
  }
}

const NAVER_ANALYTICS_ID = "1a91e5ba132afc0";

export default function NaverAnalytics() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    window.wcs_add = window.wcs_add ?? {};
    window.wcs_add.wa = NAVER_ANALYTICS_ID;

    if (window.wcs && window.wcs_do) {
      window.wcs_do();
    }
  }, [isReady, pathname]);

  return (
    <Script
      id="naver-analytics"
      src="https://wcs.pstatic.net/wcslog.js"
      strategy="afterInteractive"
      onReady={() => setIsReady(true)}
    />
  );
}
