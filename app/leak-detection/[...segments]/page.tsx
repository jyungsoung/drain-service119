import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegionMap from "../../gyeonggi/RegionMap";
import { leakDetectionService } from "../../services/service-data";
import { allLeakRegionSegments, resolveLeakRegion } from "../region-data";

type Props = { params: Promise<{ segments: string[] }> };

export function generateStaticParams() {
  return allLeakRegionSegments().map((segments) => ({ segments }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const area = resolveLeakRegion(segments);
  if (!area) return {};
  const title = `${area.label} 누수탐지·배관 누수 점검 | 응급배관119`;
  const description = `${area.fullName} 누수탐지 안내. 계량기 움직임, 벽·바닥 습기, 천장 물자국과 수도 압력 변화를 확인해 누수 의심 구간을 점검합니다. 응급배관119 1668-1321.`;
  return {
    title,
    description,
    keywords: [`${area.label} 누수탐지`, `${area.label} 누수탐지업체`, `${area.label} 배관누수`, `${area.label} 수도누수`, `${area.label} 누수점검`],
    alternates: { canonical: area.canonical },
    openGraph: {
      title,
      description,
      url: area.canonical,
      images: [{ url: leakDetectionService.image, alt: `${area.label} 누수탐지 장비 점검` }],
      type: "website",
      locale: "ko_KR",
    },
  };
}

const symptoms = [
  ["계량기가 계속 움직임", "모든 수도를 잠갔는데도 계량기 별침이나 숫자가 변하는지 확인합니다."],
  ["벽·바닥이 반복해서 젖음", "물자국의 범위와 발생 시점, 주변 배관과 마감재 상태를 함께 살펴봅니다."],
  ["아래층 천장에 물자국", "물이 구조물을 따라 이동할 수 있어 보이는 위치와 실제 시작 구간을 구분합니다."],
  ["수도 사용량·압력 변화", "평소보다 사용량이 늘거나 압력이 낮아졌다면 배관 계통별 확인 범위를 정합니다."],
];

const process = [
  ["01", "증상과 건물 확인", "물자국 위치, 발생 시점, 계량기 변화와 건물 형태를 확인합니다."],
  ["02", "배관 계통 구분", "급수·온수·난방 중 확인할 배관과 점검 가능한 구간을 나눕니다."],
  ["03", "누수 의심 범위 점검", "현장 조건에 따라 압력과 청음 등 필요한 방법으로 의심 범위를 좁힙니다."],
  ["04", "결과와 후속 범위 안내", "확인된 내용과 추가 점검 또는 보수가 필요한 범위를 설명합니다."],
];

const localProfiles = [
  "공동주택은 세대 내부 배관과 공용부 영향을 구분하고, 아래층 물자국과 계량기 변화를 함께 확인합니다.",
  "빌라·주택·상가가 함께 있는 생활권은 건물 형태와 배관 계통, 물이 보이는 위치를 먼저 구분합니다.",
  "상업시설과 주거시설은 배관 사용 시간과 누수 흔적이 나타나는 시점이 달라 현장 조건을 함께 확인합니다.",
];

export default async function LeakRegionPage({ params }: Props) {
  const { segments } = await params;
  const area = resolveLeakRegion(segments);
  if (!area) notFound();

  const profile = area.localName
    ? localProfiles[area.localName.charCodeAt(0) % localProfiles.length]
    : `${area.label}의 아파트·빌라·주택·상가에서 나타나는 누수 흔적은 건물 구조와 배관 종류에 따라 확인 순서가 달라질 수 있습니다.`;
  const faqs = [
    ["물자국 위치가 실제 누수 지점인가요?", "물은 벽체와 바닥, 마감재를 따라 이동할 수 있어 보이는 물자국과 실제 누수 시작 지점이 다를 수 있습니다."],
    [`${area.label} 누수탐지 비용을 전화로 확정할 수 있나요?`, "건물 구조와 확인할 배관, 접근 범위와 필요한 장비에 따라 달라집니다. 현장 점검 전에 예상 범위를 설명하고 확인 후 다시 안내합니다."],
    ["누수탐지와 보수는 같은 작업인가요?", "누수 의심 지점을 확인하는 탐지와 배관·마감재를 보수하는 작업은 범위가 다를 수 있어 구분해서 안내합니다."],
    ["보험 제출용 자료도 받을 수 있나요?", "보험사와 관리 주체마다 요구 자료가 다르므로 요청받은 서류 목록을 확인한 뒤 제공 가능한 기록 범위를 안내합니다."],
  ];
  const baseUrl = "https://drain-service119.netlify.app";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${area.label} 누수탐지`,
      serviceType: "배관 누수탐지 및 누수 점검",
      url: `${baseUrl}${area.canonical}`,
      image: `${baseUrl}${leakDetectionService.image}`,
      provider: { "@type": "LocalBusiness", name: "응급배관119", telephone: "1668-1321" },
      areaServed: { "@type": "Place", name: area.fullName },
      description: `${area.fullName} 계량기 변화, 벽·바닥 습기와 배관 압력을 확인하는 누수탐지 안내`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: `${baseUrl}/` },
        ...area.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: crumb.name,
          item: `${baseUrl}${crumb.href}`,
        })),
      ],
    },
  ];

  return <main className="leakHome regionPage leakRegionPage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="topbar">
      <a className="brand" href="/"><img className="brandSeal" src="/images/emergency-pipe-stamp.jpeg" alt="응급배관119 로고" width="276" height="276" /><span className="brandText"><span className="brandName">응급배관</span><span className="brandNumber">119</span></span></a>
      <nav aria-label={`${area.label} 누수탐지 메뉴`}><a href="#symptoms">누수 증상</a><a href="#diagnosis">점검 기준</a><a href="#process">진행 순서</a><a href="#areas">인근 지역</a><a href={area.drainHref}>배관막힘</a></nav>
      <a className="headerCall" href="tel:16681321">1668-1321</a>
    </header>

    <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span>{area.breadcrumbs.map((crumb, index) => <span className="breadcrumbPair" key={`${crumb.href}-${index}`}><a href={crumb.href}>{crumb.name}</a>{index < area.breadcrumbs.length - 1 && <i>›</i>}</span>)}</nav>

    <section className="regionHero leakRegionalHero">
      <div><p className="eyebrow"><span /> {area.fullName} 누수탐지</p><h1>{area.label} 누수탐지,<br /><em>물자국과 계량기 변화부터 확인합니다</em></h1><p>{profile} 눈에 보이는 흔적만으로 위치를 단정하지 않고 배관 계통과 주변 상태를 단계적으로 확인합니다.</p><div className="heroActions"><a className="primary" href="tel:16681321">{area.label} 누수 상담 <b>1668-1321</b></a><a className="secondary messageButton" href="sms:01057765882">물자국 사진 문자상담</a></div><div className="trust"><span>✓ 지역별 누수 안내</span><span>✓ 배관 계통 구분</span><span>✓ 점검 전 범위 설명</span></div></div>
      <figure><img src={leakDetectionService.image} alt={`${area.label} 누수탐지 장비로 배관 누수 의심 구간을 확인하는 작업자`} width="1448" height="1086" fetchPriority="high" /><figcaption><small>{area.label} LEAK DETECTION</small><strong>보이는 물자국과 배관 상태를<br />함께 확인합니다.</strong></figcaption></figure>
    </section>

    <section className="dongQuick" aria-label={`${area.label} 누수탐지 핵심 안내`}><b>{area.label} 누수탐지</b><a href="#symptoms">계량기 변화</a><a href="#symptoms">벽·바닥 습기</a><a href="#diagnosis">배관 압력 확인</a><a href="#process">점검 순서</a><a href="#areas">인근 지역</a></section>

    <section className="dongSection" id="symptoms"><div className="dongSectionTitle"><p className="kicker">LOCAL LEAK SIGNAL</p><h2>{area.label} 누수 의심 증상,<br />발생 범위부터 구분합니다</h2><p>같은 물자국도 급수·온수·난방 배관이나 외부 유입 등 원인이 다를 수 있습니다. 증상이 시작된 시점과 계량기 변화, 주변 사용 상태를 함께 알려주세요.</p></div><div className="dongCheckGrid">{symptoms.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="dongEquipment leakRegionalDiagnosis" id="diagnosis"><figure><img src="/images/plumber-worker.webp" alt={`${area.label} 누수탐지 현장에서 배관 상태를 점검하는 작업자`} width="1672" height="941" loading="lazy" decoding="async" /></figure><div><p className="kicker light">DIAGNOSIS STANDARD</p><h2>건물 구조와 배관 종류에 맞춰<br />점검 순서를 정합니다</h2><p>먼저 계량기와 밸브를 기준으로 사용 구간을 나누고 급수·온수·난방 배관 중 확인할 범위를 정합니다. 현장 조건에 따라 압력 변화와 소리, 주변 습기 등을 살펴 누수 가능 구간을 좁힙니다.</p><a href="/leak-detection">누수탐지 전체 안내 보기 →</a></div></section>

    <section className="regionMapSection"><div className="regionMapCopy"><p className="kicker">LOCAL MAP</p><h2>{area.label}<br />누수탐지 지역 안내</h2><p>{area.fullName} 행정구역의 중심 위치를 무료 지도로 표시합니다. 실제 출동 가능 시간은 현재 작업 일정과 현장 위치에 따라 안내합니다.</p><a className="primary compact" href="tel:16681321">{area.label} 출동 문의하기</a></div><RegionMap label={`${area.label} 누수탐지`} center={area.center} zoom={area.zoom} /></section>

    <section className="regionAreas" id="areas"><div className="regionTitle"><p className="kicker">LEAK SERVICE AREA</p><h2>{area.directoryTitle}</h2><p>각 지역별 누수탐지 페이지에서 지역명에 맞는 증상 안내와 인접 지역 연결을 확인할 수 있습니다.</p></div><div className="regionAreaGrid">{area.directory.map((item) => <a href={item.href} key={item.href}><strong>{item.name}</strong><span>{item.detail} →</span></a>)}</div></section>

    <section className="dongProcess" id="process"><div className="dongSectionTitle"><p className="kicker">WORK FLOW</p><h2>{area.label}<br />누수탐지 진행 순서</h2></div><ol>{process.map(([number, title, text]) => <li key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>

    <section className="faq section regionFaq" id="faq"><div className="sectionHead"><div><p className="kicker">FAQ</p><h2>{area.label} 누수탐지<br />자주 묻는 질문</h2></div><p>정확한 점검 범위는 건물 구조와<br />현장 상태를 확인한 뒤 안내합니다.</p></div><div className="faqList">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>Q</span>{question}<b>＋</b></summary><p>{answer}</p></details>)}</div></section>

    <section className="leakRegionalCrosslink"><div><p className="kicker">SEPARATE SERVICE</p><h2>{area.label} 배관막힘은<br />별도 지역페이지에서 확인하세요</h2><p>싱크대·변기·하수구막힘과 고압세척은 누수탐지와 분리해 안내합니다.</p></div><a href={area.drainHref}>배관막힘 지역페이지 보기 →</a></section>

    <section className="finalCta leakFinalCta"><p>{area.label} 누수탐지 상담</p><h2>물자국 위치와 계량기 변화를 알려주세요.</h2><a href="tel:16681321"><span>누수탐지 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2"><img src="/images/emergency-pipe-footer-v2.jpeg" alt="응급배관119 로고" width="276" height="276" loading="lazy" decoding="async" /><div><span>응급배관</span><b>119</b></div></div><p className="footerServicesV2">{area.label} 누수탐지 · 계량기 변화 · 배관 압력 · 물자국 점검</p><p className="footerLegalV2">상담 가능 시간 및 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 응급배관119</p></footer>
    <div className="mobileContactBar" aria-label={`${area.label} 누수탐지 빠른 상담`}><a href="sms:01057765882"><span>물자국 사진</span><b>문자상담</b></a><a href="tel:16681321"><span>{area.label} 누수상담</span><b>1668-1321</b></a></div>
  </main>;
}
