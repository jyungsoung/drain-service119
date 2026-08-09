import type { Metadata } from "next";
import { regionHubs, serviceLandings } from "./service-data";

export const metadata: Metadata = {
  title: "배관막힘·고압세척·누수탐지 서비스 안내 | 응급배관119",
  description: "싱크대막힘, 변기막힘, 하수구막힘, 배관 내시경, 고압세척과 누수탐지 서비스 및 전국 지역별 상담 페이지 안내.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "배관막힘·고압세척·누수탐지 서비스 | 응급배관119",
    description: "증상에 맞는 배관 서비스와 전국 지역 안내 페이지를 확인하세요.",
    images: ["/images/inspection-equipment.webp"],
    type: "website",
    locale: "ko_KR",
  },
};

export default function ServicesIndex() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "응급배관119 배관 서비스",
    itemListElement: serviceLandings.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `https://drain-service119.netlify.app/services/${service.slug}`,
    })),
  };

  return <main className="regionPage serviceHubPage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    <header className="topbar">
      <a className="brand" href="/"><img className="brandSeal" src="/images/emergency-pipe-stamp.jpeg" alt="응급배관119 로고" /><span className="brandText"><span className="brandName">응급배관</span><span className="brandNumber">119</span></span></a>
      <nav aria-label="주요 메뉴"><a href="#services">서비스</a><a href="#regions">전국 지역</a><a href="/work-sites">시공현장</a><a href="/">홈</a></nav>
      <a className="headerCall" href="tel:16681321">1668-1321</a>
    </header>
    <section className="regionIndexHero serviceIndexHero">
      <p className="kicker">SERVICE GUIDE</p>
      <h1>증상에 맞는 배관 서비스,<br /><em>지역별 안내까지 연결합니다</em></h1>
      <p>싱크대·변기·하수구 막힘부터 배관 내시경, 고압세척과 누수탐지까지 서비스별 증상과 점검 방향을 확인하고 현재 지역 페이지로 이동할 수 있습니다.</p>
      <a className="primary" href="tel:16681321">배관 상담 1668-1321</a>
    </section>
    <section className="serviceDirectory" id="services">
      <div className="regionTitle"><p className="kicker">6 SERVICES</p><h2>서비스를 선택하세요</h2><p>각 서비스 페이지에서 대표 증상, 확인할 구간, 사용 장비와 전국 지역별 상세 페이지를 확인할 수 있습니다.</p></div>
      <div className="serviceDirectoryGrid">{serviceLandings.map((service) => <a href={`/services/${service.slug}`} key={service.slug}>
        <img src={service.image} alt={service.alt} />
        <span><strong>{service.cardTitle}</strong><small>{service.description}</small><b>서비스 안내 보기 →</b></span>
      </a>)}</div>
    </section>
    <section className="nationwideDirectory" id="regions">
      <div className="regionTitle"><p className="kicker">SERVICE AREA</p><h2>전국 지역 페이지</h2><p>권역을 선택하면 시·군·구와 읍·면·동별 배관 안내 페이지로 이동합니다.</p></div>
      <div className="nationwideGrid">{regionHubs.map((region) => <a href={region.href} key={region.href}><strong>{region.name}</strong><span>{region.detail}</span><b>지역 선택 →</b></a>)}</div>
    </section>
    <section className="finalCta"><p>배관 서비스·지역 상담</p><h2>현재 위치와 증상을 알려주세요.</h2><a href="tel:16681321"><span>365일 상담전화</span>1668-1321</a></section>
  </main>;
}
