import type { Metadata } from "next";
import { workCases } from "./cases-data";

export const metadata: Metadata = {
  title: "배관 시공현장 사례 | 우리동네전문가",
  description: "우리동네전문가의 지역별 싱크대·변기·하수구막힘, 누수탐지와 고압세척 현장 기록. 지역과 서비스, 간단한 사연과 해결 내용을 확인하세요.",
  alternates: { canonical: "/work-sites" },
  openGraph: { title: "배관 시공현장 사례 | 우리동네전문가", description: "지역과 서비스, 간단한 사연과 해결 내용을 기록한 현장 업데이트", url: "/work-sites", images: [{ url: "/images/inspection-equipment.webp", alt: "우리동네전문가 배관 시공현장 장비" }] },
};

export default function WorkSites() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "우리동네전문가 배관 시공현장",
    numberOfItems: workCases.length,
    itemListElement: workCases.map((work, index) => ({ "@type": "ListItem", position: index + 1, name: work.title, url: `https://service.drain119.co.kr/work-sites/${work.slug}` })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://service.drain119.co.kr/" },
      { "@type": "ListItem", position: 2, name: "시공현장", item: "https://service.drain119.co.kr/work-sites" },
    ],
  };

  return <main className="regionPage workSitesPage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <header className="topbar"><a className="brand" href="/"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a><nav><a href="/services">서비스</a><a href="/service-area">출동지역</a><a href="/work-sites">시공현장</a></nav><a className="headerCall" href="tel:16681321">1668-1321</a></header>
    <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><b>시공현장</b></nav>
    <section className="workSitesHero"><div><p className="kicker">LOCAL WORK UPDATE</p><h1>지역별 작업 소식을<br /><em>짧고 빠르게 기록합니다</em></h1><p>사진이 없어도 괜찮습니다. 어느 지역에서 어떤 문제를 해결했는지, 방문 사연과 처리 내용을 글 중심으로 간단하게 남깁니다.</p></div><figure><img src="/images/inspection-equipment.webp" alt="배관 시공현장에 사용하는 내시경과 고압세척 장비" width="1536" height="1024" fetchPriority="high" /><figcaption><b>현장 기록 원칙</b><span>지역 · 서비스 · 사연 · 해결</span></figcaption></figure></section>
    <section className="workRecordStandard"><article><b>01</b><h2>지역명 중심</h2><p>시·구·동을 제목과 본문에 자연스럽게 기록합니다.</p></article><article><b>02</b><h2>서비스 중심</h2><p>싱크대막힘·변기막힘·하수구막힘·누수탐지·고압세척 중 실제 작업을 적습니다.</p></article><article><b>03</b><h2>짧은 사연</h2><p>고객이 알려준 증상과 방문하게 된 이유를 짧게 정리합니다.</p></article><article><b>04</b><h2>해결 내용</h2><p>현장에서 확인하고 해결한 사실만 간단하게 남깁니다.</p></article></section>
    {workCases.length > 0 && <section className="regionDirectory workRecordDirectory"><div className="regionTitle"><p className="kicker">LATEST WORK</p><h2>최근 현장 기록</h2><p>지역별 작업 소식을 글 중심으로 빠르게 확인할 수 있습니다.</p></div><div className="workCaseGrid">{workCases.map((work) => <a key={work.slug} href={`/work-sites/${work.slug}`}>{work.image && <figure><img src={work.image} alt={work.imageAlt || work.title} /></figure>}<span>{work.area} · {work.service}</span><h3>{work.title}</h3><p>{work.summary}</p><small>{work.date} · 현장 기록 보기 →</small></a>)}</div></section>}
    <section className="finalCta"><p>배관막힘 상담</p><h2>현재 위치와 증상을 알려주세요.</h2><a href="tel:16681321"><span>대표 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 배관 내시경 · 고압세척</p><p className="footerLegalV2">© 우리동네전문가</p></footer>
  </main>;
}
