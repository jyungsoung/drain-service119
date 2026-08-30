import type { Metadata } from "next";
import { drainServiceLandings, leakDetectionService, regionHubs } from "./service-data";

export const metadata: Metadata = {
  title: "배관막힘·고압세척 서비스 안내 | 우리동네전문가",
  description: "싱크대막힘, 변기막힘, 하수구막힘, 배관 내시경과 고압세척 서비스 및 전국 지역별 상담 페이지 안내.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "배관막힘·고압세척 서비스 | 우리동네전문가",
    description: "막힘 증상에 맞는 배관 서비스와 전국 지역 안내 페이지를 확인하세요.",
    images: ["/images/inspection-equipment.webp"],
    type: "website",
    locale: "ko_KR",
  },
};

export default function ServicesIndex() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "우리동네전문가 배관 서비스",
    itemListElement: [
      ...drainServiceLandings.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `https://service.drain119.co.kr/services/${service.slug}`,
      })),
      { "@type": "ListItem", position: drainServiceLandings.length + 1, name: "누수탐지 전용 안내", url: "https://service.drain119.co.kr/leak-detection" },
    ],
  };

  return <main className="regionPage serviceHubPage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    <header className="topbar">
      <a className="brand" href="/"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a>
      <nav aria-label="주요 메뉴"><a href="#services">배관막힘 서비스</a><a href="#regions">전국 지역</a><a href="/leak-detection">누수탐지</a><a href="/work-sites">시공현장</a><a href="/">홈</a></nav>
      <a className="headerCall" href="tel:16681321">1668-1321</a>
    </header>
    <section className="regionIndexHero serviceIndexHero">
      <p className="kicker">SERVICE GUIDE</p>
      <h1>배관 증상·서비스 안내,<br /><em>필요한 점검 순서를 확인하세요</em></h1>
      <p>막힌 위치와 배관 구조에 따라 필요한 점검과 장비가 달라집니다. 배관막힘·내시경·고압세척 서비스별 확인 내용을 살펴보고 현재 지역 페이지로 이동할 수 있습니다.</p>
      <div className="heroActions"><a className="primary" href="tel:16681321">배관막힘 상담 1668-1321</a><a className="secondary messageButton" href="/leak-detection">누수탐지 전용페이지</a></div>
    </section>
    <section className="serviceDirectory" id="services">
      <div className="regionTitle"><p className="kicker">5 DRAIN SERVICES</p><h2>배관막힘 서비스를 선택하세요</h2><p>각 서비스 페이지에서 대표 증상, 확인할 구간, 사용 장비와 전국 지역별 상세 페이지를 확인할 수 있습니다.</p></div>
      <div className="serviceDirectoryGrid">{drainServiceLandings.map((service) => <a href={`/services/${service.slug}`} key={service.slug}>
        <img src={service.image} alt={service.alt} />
        <span><strong>{service.cardTitle}</strong><small>{service.description}</small><b>서비스 안내 보기 →</b></span>
      </a>)}</div>
      <a className="standaloneLeakBanner" href="/leak-detection"><img src={leakDetectionService.image} alt={leakDetectionService.alt} /><span><small>SEPARATE SPECIALTY</small><strong>누수탐지는 전용페이지에서<br />증상과 점검 과정을 확인하세요</strong><b>누수탐지 전용 안내 보기 →</b></span></a>
    </section>
    <section className="nationwideDirectory" id="regions">
      <div className="regionTitle"><p className="kicker">SERVICE AREA</p><h2>전국 지역 페이지</h2><p>권역을 선택하면 시·군·구와 읍·면·동별 배관 안내 페이지로 이동합니다.</p></div>
      <div className="nationwideGrid">{regionHubs.map((region) => <a href={region.href} key={region.href}><strong>{region.name}</strong><span>{region.detail}</span><b>지역 선택 →</b></a>)}</div>
    </section>
    <section className="finalCta"><p>배관 서비스·지역 상담</p><h2>현재 위치와 증상을 알려주세요.</h2><a href="tel:16681321"><span>365일 상담전화</span>1668-1321</a></section>
  </main>;
}
