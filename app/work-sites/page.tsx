import type { Metadata } from "next";
import WorkSitesIndex from "./work-sites-index";

export const metadata: Metadata = {
  title: "지역별 배관 해결 안내 | 우리동네전문가",
  description: "우리동네전문가의 지역별 싱크대·변기·하수구막힘, 누수탐지와 고압세척 해결 안내와 실제 현장 기록을 확인하세요.",
  alternates: { canonical: "/work-sites" },
  openGraph: { title: "지역별 배관 해결 안내 | 우리동네전문가", description: "지역과 서비스 중심의 짧은 배관 해결 안내와 현장 업데이트", url: "/work-sites", images: [{ url: "/images/inspection-equipment.webp", alt: "우리동네전문가 배관 점검 장비" }] },
};

export default function WorkSites() {
  return <WorkSitesIndex currentPage={1} />;
}
