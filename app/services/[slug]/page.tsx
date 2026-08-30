import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { drainServiceLandings, regionHubs, serviceBySlug } from "../service-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return drainServiceLandings.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = serviceBySlug((await params).slug);
  if (!service) return {};
  const title = `${service.title} 원인·증상·지역별 안내 | 우리동네전문가`;
  return {
    title,
    description: `${service.description} 서울·경기·인천·강원·충청 지역별 상담 페이지와 대표번호 1668-1321 안내.`,
    keywords: [service.title, `${service.title} 업체`, `${service.title} 원인`, `${service.title} 증상`, `지역별 ${service.title}`],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description: service.description,
      images: [{ url: service.image, alt: service.alt }],
      type: "article",
      locale: "ko_KR",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();
  const pageUrl = `https://service.drain119.co.kr/services/${service.slug}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.title} 점검·상담`,
      description: service.description,
      url: pageUrl,
      image: `https://service.drain119.co.kr${service.image}`,
      provider: { "@type": "LocalBusiness", name: "우리동네전문가", telephone: "1668-1321", url: "https://service.drain119.co.kr" },
      areaServed: regionHubs.map((region) => ({ "@type": "AdministrativeArea", name: region.name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://service.drain119.co.kr" },
        { "@type": "ListItem", position: 2, name: "배관 서비스", item: "https://service.drain119.co.kr/services" },
        { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
      ],
    },
  ];

  return <main className="regionPage serviceDetailPage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="topbar">
      <a className="brand" href="/"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a>
      <nav aria-label="주요 메뉴"><a href="/services">배관막힘 서비스</a><a href="#symptoms">주요 증상</a><a href="#regions">전국 지역</a><a href="/leak-detection">누수탐지</a><a href="/work-sites">시공현장</a></nav>
      <a className="headerCall" href="tel:16681321">1668-1321</a>
    </header>
    <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><a href="/services">배관 서비스</a><span>›</span><b>{service.title}</b></nav>
    <section className="serviceDetailHero">
      <div><p className="eyebrow"><span /> 우리동네전문가 서비스 안내</p><h1>{service.title} 증상·원인 안내,<br /><em>점검 전 확인할 내용을 살펴보세요</em></h1><p>{service.description}</p><div className="heroActions"><a className="primary" href="tel:16681321">{service.title} 상담 <b>1668-1321</b></a><a className="secondary" href="#regions">지역 페이지 찾기 ↓</a></div></div>
      <figure><img src={service.image} alt={service.alt} /><figcaption><small>{service.title} 점검</small><strong>현장 상태에 맞는<br />확인 순서를 안내합니다.</strong></figcaption></figure>
    </section>
    <section className="serviceGuidance" id="symptoms">
      <div className="serviceInfoPanel"><p className="kicker">SYMPTOM</p><h2>먼저 확인할 증상</h2><ul>{service.symptoms.map((symptom) => <li key={symptom}>{symptom}</li>)}</ul></div>
      <div className="serviceInfoPanel"><p className="kicker">CHECK POINT</p><h2>점검할 배관 구간</h2><ul>{service.checks.map((check) => <li key={check}>{check}</li>)}</ul></div>
      <div className="serviceInfoPanel equipmentPanel"><p className="kicker">EQUIPMENT</p><h2>장비 선택 기준</h2><p>{service.equipment}</p></div>
    </section>
    <section className="nationwideDirectory serviceRegions" id="regions">
      <div className="regionTitle"><p className="kicker">LOCAL SERVICE PAGES</p><h2>지역별 {service.title} 안내</h2><p>권역을 선택한 뒤 시·군·구와 읍·면·동 페이지로 이동하면 지역 지도와 인근 지역 연결을 확인할 수 있습니다.</p></div>
      <div className="nationwideGrid">{regionHubs.map((region) => <a href={region.href} key={region.href}><strong>{region.name} {service.title}</strong><span>{region.detail}</span><b>지역 페이지 보기 →</b></a>)}</div>
    </section>
    <section className="relatedServices"><div className="regionTitle"><p className="kicker">RELATED SERVICE</p><h2>다른 배관막힘 서비스</h2><p><a className="separateLeakLink" href="/leak-detection">누수 증상은 누수탐지 전용페이지에서 확인하세요 →</a></p></div><div>{drainServiceLandings.filter((item) => item.slug !== service.slug).map((item) => <a href={`/services/${item.slug}`} key={item.slug}><img src={item.image} alt={item.alt} /><span>{item.cardTitle}</span></a>)}</div></section>
    <section className="finalCta"><p>{service.title} 지역 상담</p><h2>현재 위치와 나타나는 증상을 알려주세요.</h2><a href="tel:16681321"><span>365일 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 고압세척 · 배관 내시경</p><p className="footerLegalV2">상담 가능 시간과 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 우리동네전문가</p></footer>
    <a className="floatingCall" href="tel:16681321" aria-label={`${service.title} 전화 상담`}>☎<b>전화상담</b></a>
  </main>;
}
