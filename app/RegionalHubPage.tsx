import type { PriorityRegion } from "./priority-regions";
import { cityBySlug, localPath as gyeonggiLocalPath, unitPath as gyeonggiUnitPath, unitsForCity } from "./gyeonggi/area-data";
import { municipalityBy, localPath as serviceLocalPath, unitPath as serviceUnitPath, unitsFor } from "./service-area/area-data";
import { workCases } from "./work-sites/cases-data";

const services = [
  { title: "싱크대막힘", href: "/services/sink-clog", image: "/images/sink-service.webp", text: "트랩과 벽 배관 초입부터 유지방이 쌓인 구간까지 확인합니다." },
  { title: "변기막힘", href: "/services/toilet-clog", image: "/images/service-toilet.webp", text: "변기 내부 이물질과 오수관 연결 구간의 통수 상태를 구분합니다." },
  { title: "하수구막힘", href: "/services/drain-clog", image: "/images/service-dispatch.webp", text: "욕실·베란다·상가 바닥 배수구와 연결 배관의 범위를 살펴봅니다." },
  { title: "배관 내시경", href: "/services/pipe-camera", image: "/images/plumber-worker.webp", text: "반복 막힘과 깊은 구간은 배관 내부 상태를 확인해 위치를 좁혀갑니다." },
  { title: "고압세척", href: "/services/high-pressure-cleaning", image: "/images/inspection-equipment.webp", text: "긴 배관에 넓게 쌓인 유지방과 슬러지는 현장 조건을 확인한 뒤 범위를 정합니다." },
];

const symptoms = [
  ["물이 평소보다 천천히 내려감", "트랩이나 배관 초입에 오염이 쌓여 통로가 좁아졌을 수 있습니다."],
  ["한꺼번에 사용하면 역류함", "더 깊은 배관이나 여러 배수구가 연결된 공용 구간의 영향을 확인합니다."],
  ["악취와 꿀렁거리는 소리가 남", "슬러지 축적, 트랩 상태와 배관 내부 공기 흐름을 함께 살펴봅니다."],
  ["뚫은 뒤 같은 곳이 다시 막힘", "남아 있는 오염 범위, 긴 횡주관과 배관 구조를 다시 확인할 필요가 있습니다."],
];

const faqs = (name: string) => [
  ["막힘 비용을 전화로 바로 확정할 수 있나요?", "막힌 위치와 배관 길이, 건물 구조, 필요한 장비에 따라 달라집니다. 전화로 예상 범위를 설명하고 현장 점검 뒤 작업 전에 다시 안내합니다."],
  [`${name} 어디까지 상담하나요?`, `${name} 전 지역을 상담합니다. 실제 출동 가능 시간은 현재 작업 일정과 현장 위치를 확인한 뒤 대표번호로 안내합니다.`],
  ["약품을 사용했는데도 다시 막혀요.", "서로 다른 약품을 추가로 섞지 말고 사용한 제품을 작업자에게 알려주세요. 트랩보다 깊은 구간이나 굳은 유지방은 별도 점검이 필요할 수 있습니다."],
  ["시공현장은 어떻게 확인하나요?", "실제 현장별로 지역, 증상, 확인 과정, 사용 장비와 작업 결과를 시공현장 게시판에 계속 기록합니다."],
];

function areaLinks(region: PriorityRegion) {
  if (region.source === "gyeonggi") {
    const city = cityBySlug(region.slug);
    if (!city) return [];
    const cityUnits = unitsForCity(city);
    return cityUnits.flatMap((unit) => [
      ...(unit.gu ? [{ name: unit.unitName, href: gyeonggiUnitPath(unit), kind: "구별 안내" }] : []),
      ...unit.locals.map((local) => ({ name: local.name, href: gyeonggiLocalPath(unit, local), kind: "동별 안내" })),
    ]);
  }

  const municipality = municipalityBy("seoul", region.slug);
  if (!municipality) return [];
  const municipalityUnits = unitsFor(municipality);
  return municipalityUnits.flatMap((unit) => [
    ...(unit.gu ? [{ name: unit.unitName, href: serviceUnitPath(unit), kind: "구별 안내" }] : []),
    ...unit.locals.map((local) => ({ name: local.name, href: serviceLocalPath(unit, local), kind: "동별 안내" })),
  ]);
}

export default function RegionalHubPage({ region }: { region: PriorityRegion }) {
  const links = areaLinks(region);
  const localCases = workCases.filter((work) => work.regionSlug === region.slug).slice(0, 6);
  const questions = faqs(region.name);
  const canonical = `https://service.drain119.co.kr/${region.slug}`;
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": "https://service.drain119.co.kr/#business",
    name: "우리동네전문가",
    url: canonical,
    telephone: "+82-1668-1321",
    image: "https://service.drain119.co.kr/images/service-dispatch.webp",
    address: { "@type": "PostalAddress", streetAddress: "하남대로801번길 58 4층", addressLocality: "하남시", addressRegion: "경기도", addressCountry: "KR" },
    areaServed: { "@type": "AdministrativeArea", name: `${region.province} ${region.fullName}` },
    description: `${region.name} 싱크대막힘·변기막힘·하수구막힘, 배관 내시경과 고압세척 상담`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://service.drain119.co.kr/" },
      { "@type": "ListItem", position: 2, name: `${region.fullName} 배관막힘`, item: canonical },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };

  return (
    <main className="regionHubPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header className="topbar">
        <a className="brand" href="/" aria-label="우리동네전문가 홈"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a>
        <nav aria-label="주요 메뉴"><a href="#service">막힘서비스</a><a href="#symptoms">증상확인</a><a href="#areas">지역안내</a><a href="/work-sites">시공현장</a><a href="#faq">자주 묻는 질문</a></nav>
        <a className="headerCall" href="tel:16681321">1668-1321</a>
      </header>

      <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><a href={region.source === "gyeonggi" ? "/gyeonggi" : "/service-area/seoul"}>{region.province}</a><span>›</span><b>{region.fullName}</b></nav>

      <section className="regionHubHero" id="top">
        <div className="regionHubHeroCopy">
          <p className="eyebrow"><span /> {region.fullName} 전 지역 배관 상담</p>
          <h1>{region.name} 배관 서비스 지역 안내,<br /><em>동별 안내와 지역글을 확인하세요</em></h1>
          <p>{region.heroCopy}</p>
          <div className="hubAvailability"><span>24시간 상담·출동 가능</span><span>연중무휴</span><span>현장 일정 확인 후 안내</span></div>
          <div className="heroActions"><a className="primary" href="tel:16681321">{region.name} 전화 상담 <b>1668-1321</b></a><a className="secondary" href="#areas">동별 안내 보기 ↓</a></div>
        </div>
        <figure><img src="/images/service-dispatch.webp" alt={`${region.fullName} 하수구막힘 현장으로 장비를 준비해 출동하는 작업자`} width="1448" height="1086" fetchPriority="high" /><figcaption><small>{region.name.toUpperCase()} DRAIN SERVICE</small><strong>증상과 배관 구조에 맞는<br />점검 순서를 안내합니다.</strong></figcaption></figure>
      </section>

      <section className="hubProofStrip" aria-label={`${region.fullName} 서비스 기준`}><div><b>{region.fullName}</b><span>지역 대표페이지</span></div><div><b>5가지</b><span>막힘·진단·세척 안내</span></div><div><b>작업 전</b><span>범위와 비용 안내</span></div><a href="/work-sites"><b>시공현장</b><span>실제 작업 기록 보기 →</span></a></section>

      <section className="hubServiceSection" id="service"><div className="hubSectionHeading"><p className="kicker">DRAIN SERVICE</p><h2>{region.name} 배관막힘<br />서비스 안내</h2><p>한 가지 장비를 모든 현장에 적용하지 않습니다. 막힌 위치와 증상, 배관 길이와 접근 지점을 확인한 뒤 필요한 점검과 작업을 안내합니다.</p></div><div className="hubServiceGrid">{services.map((service) => <a href={service.href} key={service.title}><figure><img src={service.image} alt={`${region.name} ${service.title} 현장 안내`} width="724" height="543" loading="lazy" decoding="async" /></figure><span><small>{region.fullName}</small><h3>{service.title}</h3><p>{service.text}</p><b>상세 안내 →</b></span></a>)}</div></section>

      <section className="hubSymptomSection" id="symptoms"><div className="hubSectionHeading light"><p className="kicker light">SYMPTOM CHECK</p><h2>같은 막힘처럼 보여도<br />확인할 구간은 다릅니다</h2><p>{region.buildingCopy}</p></div><div className="hubSymptomGrid">{symptoms.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="hubLocalGuide"><div className="hubSectionHeading"><p className="kicker">LOCAL PROFILE</p><h2>{region.fullName} 생활권별<br />배관 점검 기준</h2><p>{region.districtSummary} 등 건물과 생활권의 특성을 확인해 출동 일정을 안내합니다.</p></div><div className="hubLocalProfileGrid">{region.localProfiles.map((profile) => <article key={profile.title}><h3>{profile.title}</h3><p>{profile.text}</p></article>)}</div><div className="hubFocusLine">{region.focusAreas.map((area) => <span key={area}>✓ {area}</span>)}</div></section>

      <section className="hubEquipment"><figure><img src="/images/inspection-equipment.webp" alt={`${region.name} 하수구막힘 점검에 사용하는 배관 내시경과 고압세척 장비`} width="1536" height="1024" loading="lazy" decoding="async" /></figure><div><p className="kicker light">EQUIPMENT &amp; PROCESS</p><h2>통수만 확인하지 않고<br />반복 원인까지 살펴봅니다</h2><p>트랩과 짧은 구간은 분리 점검이나 스프링 작업을 검토하고, 내부 상태를 봐야 할 때는 배관 내시경을 사용합니다. 긴 배관에 오염이 넓게 남았을 가능성이 있다면 배관 재질과 접근 위치를 확인한 뒤 고압세척 범위를 정합니다.</p><ol><li><b>01</b><span><strong>증상 확인</strong> 배수 속도·역류·악취·반복 여부</span></li><li><b>02</b><span><strong>구간 점검</strong> 트랩·가지관·공용관·외부관</span></li><li><b>03</b><span><strong>작업 안내</strong> 장비·범위·비용 설명</span></li><li><b>04</b><span><strong>결과 확인</strong> 배수와 재역류 여부 점검</span></li></ol></div></section>

      <section className="hubAreas" id="areas"><div className="hubSectionHeading"><p className="kicker">SERVICE AREA</p><h2>{region.fullName} 동별<br />상세 안내</h2><p>대표페이지가 지역 전체 정보를 모으고, 아래 세부 지역 페이지가 생활권별 검색과 내부 연결을 받는 구조입니다.</p></div><div className="hubAreaLinks">{links.map((link) => <a href={link.href} key={link.href}><strong>{link.name} 배관막힘</strong><span>{link.kind} →</span></a>)}</div></section>

      <section className="hubWorkRecords"><div className="hubSectionHeading light"><p className="kicker light">REAL WORK RECORD</p><h2>{region.name} 시공현장을<br />한 건씩 누적합니다</h2><p>지역, 증상, 진단 과정, 사용 장비와 작업 결과가 확인되는 실제 사례만 등록합니다.</p></div>{localCases.length ? <div className="workCaseGrid">{localCases.map((work) => <a key={work.slug} href={`/work-sites/${work.slug}`}><img src={work.image} alt={work.imageAlt || work.title} /><span>{work.area} · {work.service}</span><h3>{work.title}</h3><p>{work.summary}</p></a>)}</div> : <div className="hubWorkEmpty"><b>{region.name} 첫 시공현장을 기다리고 있습니다</b><p>현장 사진과 지역·증상·사용 장비·작업 결과를 전달하면 이 대표페이지와 시공현장 게시판에 함께 연결됩니다.</p><a href="/work-sites">시공현장 게시판 보기 →</a></div>}</section>

      <section className="faq section regionFaq" id="faq"><div className="sectionHead"><div><p className="kicker">FAQ</p><h2>{region.fullName}<br />자주 묻는 질문</h2></div><p>정확한 작업 범위는 현장 상태를 확인한 뒤 안내합니다.</p></div><div className="faqList">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>Q</span>{question}<b>＋</b></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta"><p>{region.fullName} 배관막힘 상담</p><h2>현재 위치와 증상을 알려주세요.</h2><a href="tel:16681321"><span>대표 상담전화</span>1668-1321</a></section>
      <footer className="siteFooterV2"><div className="footerBrandV2"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 배관 내시경 · 고압세척</p><p className="footerLegalV2"><span>사업자등록번호 732-67-00677 · 경기도 하남시 하남대로801번길 58 4층</span><span>출동 가능 시간은 현장 일정과 위치에 따라 달라질 수 있습니다. © 우리동네전문가</span></p></footer>
      <a className="floatingCall" href="tel:16681321" aria-label={`${region.name} 배관막힘 전화 상담`}>☎<b>전화상담</b></a>
    </main>
  );
}
