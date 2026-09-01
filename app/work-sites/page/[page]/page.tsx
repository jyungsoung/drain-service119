import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkCasePageCount, getWorkCasePageHref } from "../../pagination";
import WorkSitesIndex from "../../work-sites-index";

type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, getWorkCasePageCount() - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = Number((await params).page);
  const totalPages = getWorkCasePageCount();
  if (!Number.isInteger(page) || page < 2 || page > totalPages) return {};

  const title = `지역별 배관 해결 안내 ${page}페이지 | 우리동네전문가`;
  const description = `우리동네전문가 누적 지역글 ${page}/${totalPages}페이지. 싱크대막힘, 변기막힘, 하수구막힘, 누수탐지와 고압세척 안내를 확인하세요.`;
  const url = getWorkCasePageHref(page);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, images: [{ url: "/images/inspection-equipment.webp", alt: "우리동네전문가 배관 점검 장비" }] },
  };
}

export default async function WorkSitesArchivePage({ params }: Props) {
  const page = Number((await params).page);
  const totalPages = getWorkCasePageCount();
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();
  return <WorkSitesIndex currentPage={page} />;
}
