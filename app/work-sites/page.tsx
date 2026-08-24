import type { Metadata } from "next";
import { workCases } from "./cases-data";

export const metadata: Metadata = {
  title: "배관 시공현장 사례 | 우리동네전문가",
  description: "우리동네전문가의 실제 싱크대·변기·하수구막힘, 배관 내시경과 고압세척 시공현장 기록. 지역·증상·진단·장비·작업 결과를 확인하세요.",
  alternates: { canonical: "/work-sites" },
  openGraph: { title: "배관 시공현장 사례 | 우리동네전문가", description: "지역과 증상, 진단 과정, 사용 장비와 결과를 기록한 실제 시공현장", url: "/work-sites", images: [{ url: "/images/inspection-equipment.webp", alt: "우리동네전문가 배관 시공현장 장비" }] },
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
    <section className="workSitesHero"><div><p className="kicker">REAL WORK RECORD</p><h1>말보다 현장으로<br /><em>작업 과정을 보여드립니다</em></h1><p>광고용 가상 사례가 아닌 실제 시공현장의 지역, 증상, 확인 과정, 사용 장비와 작업 결과를 한 건씩 기록합니다.</p></div><figure><img src="/images/inspection-equipment.webp" alt="배관 시공현장에 사용하는 내시경과 고압세척 장비" width="1536" height="1024" fetchPriority="high" /><figcaption><b>현장 기록 원칙</b><span>지역 · 증상 · 진단 · 장비 · 결과</span></figcaption></figure></section>
    <section className="workRecordStandard"><article><b>01</b><h2>실제 사진</h2><p>현장에서 직접 촬영한 사진과 작업 내용을 사용합니다.</p></article><article><b>02</b><h2>구체적인 지역</h2><p>시·구·동과 건물 형태를 확인 가능한 범위에서 기록합니다.</p></article><article><b>03</b><h2>진단과 장비</h2><p>확인한 배관 구간과 실제 사용한 장비를 구분합니다.</p></article><article><b>04</b><h2>작업 결과</h2><p>작업 후 확인한 배수 상태와 관리 안내를 남깁니다.</p></article></section>
    <section className="regionDirectory workRecordDirectory"><div className="regionTitle"><p className="kicker">LATEST WORK</p><h2>최근 시공현장</h2><p>새 현장은 등록 즉시 해당 지역 대표페이지와 서비스 안내에 연결됩니다.</p></div>{workCases.length ? <div className="workCaseGrid">{workCases.map((work) => <a key={work.slug} href={`/work-sites/${work.slug}`}><figure><img src={work.image} alt={work.imageAlt || work.title} /></figure><span>{work.area} · {work.service}</span><h3>{work.title}</h3><p>{work.summary}</p><small>{work.date} · 현장 기록 보기 →</small></a>)}</div> : <div className="workCaseEmpty"><b>시공현장 등록 구조가 준비되었습니다</b><p>첫 현장의 사진과 아래 다섯 가지 정보가 들어오면 이곳과 해당 지역 대표페이지에 동시에 게시됩니다.</p><div><span>① 지역·동</span><span>② 막힘 증상</span><span>③ 확인한 원인</span><span>④ 사용 장비</span><span>⑤ 작업 결과</span></div></div>}</section>
    <section className="workUpdateGuide"><div><p className="kicker light">UPDATE GUIDE</p><h2>시공현장은 이렇게<br />계속 쌓으면 됩니다</h2><p>사진을 많이 올리는 것보다 한 현장마다 검색자가 궁금해하는 내용을 빠짐없이 기록하는 것이 중요합니다.</p></div><ol><li><b>사진</b><span>작업 전·진단 중·작업 후 사진 3~6장</span></li><li><b>위치</b><span>시·구·동과 아파트·빌라·상가 등 건물 형태</span></li><li><b>증상</b><span>배수 지연·역류·악취·반복 막힘 등 실제 증상</span></li><li><b>작업</b><span>진단 내용, 사용 장비와 작업 후 확인 결과</span></li></ol></section>
    <section className="finalCta"><p>배관막힘 상담</p><h2>현재 위치와 증상을 알려주세요.</h2><a href="tel:16681321"><span>대표 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 배관 내시경 · 고압세척</p><p className="footerLegalV2">© 우리동네전문가</p></footer>
  </main>;
}
