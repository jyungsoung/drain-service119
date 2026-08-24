import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegionalHubPage from "../RegionalHubPage";
import { priorityRegionBySlug, priorityRegions } from "../priority-regions";

type Props = { params: Promise<{ region: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return priorityRegions.map((region) => ({ region: region.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = priorityRegionBySlug((await params).region);
  if (!region) return {};
  const title = `${region.name} 싱크대막힘 변기막힘 하수구막힘 | 우리동네전문가`;
  const description = `${region.fullName} 싱크대막힘·변기막힘·하수구막힘 원인 점검, 배관 내시경과 고압세척 상담. 실제 시공현장과 동별 안내. 1668-1321.`;
  return {
    title,
    description,
    keywords: [`${region.name} 싱크대막힘`, `${region.name} 변기막힘`, `${region.name} 하수구막힘`, `${region.name} 고압세척`, `${region.name} 배관내시경`],
    alternates: { canonical: `/${region.slug}` },
    openGraph: { title, description, url: `/${region.slug}`, type: "website", locale: "ko_KR", images: [{ url: "/images/service-dispatch.webp", alt: `${region.fullName} 하수구막힘 현장 출동` }] },
  };
}

export default async function PriorityRegionPage({ params }: Props) {
  const region = priorityRegionBySlug((await params).region);
  if (!region) notFound();
  return <RegionalHubPage region={region} />;
}
