import { regionHubs } from "./services/service-data";
import { priorityRegions } from "./priority-regions";

const gyeonggiRegionHubs = priorityRegions.filter((region) => region.source === "gyeonggi");
const seoulRegionHubs = priorityRegions.filter((region) => region.source === "service-area");

const drainServices = [
  { title: "24시간 상담", image: "/images/service-consultation.webp", alt: "우리동네전문가 전화 상담 담당자", href: "tel:16681321" },
  { title: "하수구 막힘", image: "/images/service-dispatch.webp", alt: "하수구막힘 현장으로 장비를 들고 출동하는 작업자", href: "/services/drain-clog" },
  { title: "배관 고압세척", image: "/images/inspection-equipment.webp", alt: "배관 고압세척 전문 장비", href: "/services/high-pressure-cleaning" },
  { title: "배관 내시경", image: "/images/plumber-worker.webp", alt: "배관 내시경으로 내부를 점검하는 작업자", href: "/services/pipe-camera" },
  { title: "싱크대 막힘", image: "/images/sink-service.webp", alt: "싱크대 하부 배관을 점검하는 작업자", href: "/services/sink-clog" },
  { title: "변기 막힘", image: "/images/service-toilet.webp", alt: "변기 막힘을 점검하는 배관 작업자", href: "/services/toilet-clog" },
];

const steps = [
  ["01", "지역·증상 상담", "현재 위치와 건물 형태, 막힌 배수구와 나타나는 증상을 먼저 확인합니다."],
  ["02", "현장 확인", "접근 가능한 배관 구간과 필요한 장비를 현장에서 확인합니다."],
  ["03", "범위·비용 안내", "작업 방법과 범위를 설명하고 동의한 내용으로 진행합니다."],
  ["04", "작업 후 점검", "배수와 재역류 여부를 확인하고 현장을 정리합니다."],
];

const faqs = [
  ["어느 지역까지 상담할 수 있나요?", "서울·경기·인천과 강원·충청권의 지역별 페이지를 운영합니다. 실제 출동 가능 시간은 현재 위치와 작업 일정에 따라 대표번호로 안내합니다."],
  ["어떤 증상을 사진으로 보내면 되나요?", "막힌 배수구와 주변 상태, 물이 차오르거나 역류하는 위치를 촬영해 문자로 보내주시면 초기 상담에 도움이 됩니다. 누수 의심 증상은 누수탐지 전용페이지를 이용해 주세요."],
  ["비용을 전화로 바로 확정할 수 있나요?", "막힌 위치와 배관 길이, 건물 구조, 필요한 장비에 따라 달라질 수 있습니다. 전화로 예상 범위를 안내하고 현장 확인 후 작업 전에 다시 설명합니다."],
  ["지역 페이지는 어떻게 찾나요?", "아래 출장지역에서 권역을 선택한 다음 시·군·구와 읍·면·동을 순서대로 선택하면 해당 지역 안내 페이지로 이동합니다."],
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": "https://service.drain119.co.kr/#business",
    name: "우리동네전문가",
    telephone: "1668-1321",
    url: "https://service.drain119.co.kr/",
    image: "https://service.drain119.co.kr/images/service-dispatch.webp",
    taxID: "732-67-00677",
    address: {
      "@type": "PostalAddress",
      streetAddress: "하남대로801번길 58 4층",
      addressLocality: "하남시",
      addressRegion: "경기도",
      addressCountry: "KR",
    },
    areaServed: regionHubs.map((region) => ({ "@type": "AdministrativeArea", name: region.name })),
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+82-1668-1321", contactType: "customer service", availableLanguage: "Korean" },
    ],
    description: "서울·경기·인천·강원·충청권 하수구·싱크대·변기 막힘, 배관 내시경·고압세척 상담",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://service.drain119.co.kr/#website",
    name: "우리동네전문가",
    alternateName: "지역별 배관 서비스 우리동네전문가",
    url: "https://service.drain119.co.kr/",
    inLanguage: "ko-KR",
    publisher: { "@id": "https://service.drain119.co.kr/#business" },
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "우리동네전문가 서비스와 출장지역 안내",
    itemListElement: [
      ...drainServices.slice(1).map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: `https://service.drain119.co.kr${service.href}` })),
      { "@type": "ListItem", position: drainServices.length, name: "누수탐지 전용 안내", url: "https://service.drain119.co.kr/leak-detection" },
      ...regionHubs.map((region, index) => ({ "@type": "ListItem", position: drainServices.length + index + 1, name: region.name, url: `https://service.drain119.co.kr${region.href}` })),
    ],
  };

  return (
    <main className="nationHome">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }} />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="우리동네전문가 최상위 홈"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a>
        <nav aria-label="주요 메뉴"><a href="#services">배관막힘</a><a href="#core-regions">서울·경기</a><a href="#regions">출장지역</a><a href="#process">작업절차</a><a href="/work-sites">시공현장</a><a href="/leak-detection">누수탐지</a></nav>
        <a className="headerCall" href="tel:16681321">1668-1321</a>
      </header>

      <section className="hero nationalHero" id="top">
        <div className="heroGlow" />
        <div className="heroContent">
          <p className="eyebrow"><span /> 지역별 배관막힘·고압세척 서비스</p>
          <h1>우리동네 배관 증상·지역 안내,<br /><em>현재 위치와 증상을 확인하세요</em></h1>
          <p className="heroCopy">배수 지연과 역류, 악취가 반복될 때 막힌 구간을 구분하고 배관 내시경·고압세척 등 필요한 작업을 지역별로 상담합니다.</p>
          <div className="trust availabilityTrust"><span>✓ 24시간 상담·출동 가능</span><span>✓ 연중무휴</span><span>✓ 새벽 3시 상담 가능</span></div>
          <div className="heroActions"><a className="primary" href="tel:16681321">전화 상담 <b>1668-1321</b></a></div>
          <div className="trust"><span>✓ 증상별 현장 점검</span><span>✓ 작업 전 범위·비용 안내</span><span>✓ 배관 상태에 맞는 장비</span></div>
        </div>
        <div className="heroVisual photoHero nationalHeroPhoto">
          <img src="/images/service-dispatch.webp" alt="배관 장비를 준비해 현장으로 출동하는 우리동네전문가 작업자" width="724" height="543" fetchPriority="high" />
          <div className="photoLabel"><small>REGIONAL SERVICE NETWORK</small><strong>현재 지역을 선택하고<br />필요한 서비스를 확인하세요.</strong></div>
        </div>
      </section>

      <section className="nationalPulse" aria-label="우리동네전문가 핵심 안내">
        <div><b>{regionHubs.length}</b><span>배관막힘 상담 권역</span></div><div><b>5</b><span>막힘·진단·세척 서비스</span></div><div><b>1668-1321</b><span>대표 상담번호</span></div><a href="#regions"><b>지역 선택</b><span>시·군·구·동 안내 보기 →</span></a>
      </section>

      <section className="serviceTrackSplit" aria-labelledby="service-track-title">
        <div className="serviceTrackHeading"><p className="kicker">SPECIALTY GUIDE</p><h2 id="service-track-title">증상에 맞는 전문 영역을<br />선택하세요</h2><p>배수구 막힘과 누수는 확인하는 증상과 장비가 다르기 때문에 각각의 전용 안내로 구분했습니다.</p></div>
        <a className="serviceTrackCard drainTrack" href="/services"><span>01</span><small>DRAIN &amp; CLEANING</small><h3>배관막힘·고압세척</h3><p>싱크대·변기·하수구막힘, 배관 내시경과 고압세척 서비스</p><b>배관막힘 서비스 보기 →</b></a>
        <a className="serviceTrackCard leakTrack" href="/leak-detection"><span>02</span><small>LEAK DETECTION</small><h3>누수탐지 전용 안내</h3><p>계량기 변화, 벽·바닥 습기와 물자국, 배관별 누수 가능 구간 점검</p><b>누수탐지 전용페이지 →</b></a>
      </section>

      <section className="equipmentStatement" aria-labelledby="equipment-statement-title">
        <img src="/images/inspection-equipment.webp" alt="배관 내시경과 고압세척 장비를 준비한 현장" width="1536" height="1024" loading="eager" decoding="async" />
        <div className="equipmentStatementInner">
          <p className="equipmentKicker">EQUIPMENT &amp; DIAGNOSIS</p>
          <h2 id="equipment-statement-title">막힘은 같아 보여도<br /><em>필요한 장비는 다릅니다</em></h2>
          <p className="equipmentLead">배수구 입구의 이물질부터 긴 배관 안쪽의 유지방과 슬러지까지 원인 구간은 서로 다릅니다. 증상과 배관 구조를 확인한 뒤 필요한 점검과 작업 범위를 안내합니다.</p>
          <div className="equipmentProof">
            <span><b>01</b><strong>배관 내시경</strong><small>내부 상태와 막힘 구간 확인</small></span>
            <span><b>02</b><strong>고압세척</strong><small>배관 오염 범위에 맞춰 검토</small></span>
            <span><b>03</b><strong>작업 전 안내</strong><small>장비·범위·비용을 먼저 설명</small></span>
          </div>
          <div className="equipmentActions"><a href="tel:16681321">전화로 증상 상담 <b>1668-1321</b></a></div>
        </div>
      </section>

      <section className="diagnosisEditorial" aria-labelledby="diagnosis-editorial-title">
        <div className="diagnosisEditorialCopy">
          <p className="kicker">FIELD-BASED SERVICE</p>
          <h2 id="diagnosis-editorial-title">보이는 증상보다<br />배관 속 원인을 확인합니다</h2>
          <p>물이 천천히 내려가거나 악취와 꿀렁거리는 소리가 반복되면 막힌 위치를 구분하는 과정이 먼저입니다. 싱크대·변기·하수구의 배수 상태와 연결 배관을 현장 상황에 맞춰 확인합니다.</p>
          <ul><li>건물 형태와 배관 접근 위치 확인</li><li>증상에 맞는 진단·세척 장비 선택</li><li>작업 완료 후 배수와 재역류 여부 점검</li></ul>
          <a href="#services">서비스별 안내 확인하기 →</a>
        </div>
        <div className="diagnosisEditorialGallery">
          <figure className="diagnosisGalleryLarge"><img src="/images/sink-service.webp" alt="싱크대 하부 배관을 점검하는 현장" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption><b>싱크대·하수구 막힘</b><span>트랩부터 연결 배관까지 순서대로 확인</span></figcaption></figure>
          <figure><img src="/images/service-toilet.webp" alt="변기 막힘을 점검하는 작업자" width="1448" height="1086" loading="lazy" decoding="async" /><figcaption><b>변기 막힘</b><span>배수 상태와 막힘 구간 점검</span></figcaption></figure>
          <figure><img src="/images/service-dispatch.webp" alt="하수구막힘 현장으로 장비를 들고 출동하는 작업자" width="1448" height="1086" loading="lazy" decoding="async" /><figcaption><b>하수구 막힘</b><span>배수구와 연결 배관의 막힘 범위 확인</span></figcaption></figure>
        </div>
      </section>

      <section className="serviceShowcase section nationalServices" id="services">
        <div className="servicePanel">
          <div className="serviceHeading"><p className="kicker">DRAIN SERVICE GUIDE</p><h2>배관막힘 서비스 안내</h2><p>막힌 위치와 증상을 선택하면 점검 내용과 지역 안내를 확인할 수 있습니다.</p></div>
          <div className="servicePhotoGrid drainServicePhotoGrid">{drainServices.map((service) => <a className="servicePhotoCard" href={service.href} key={service.title} aria-label={`${service.title} 상세 안내`}><img src={service.image} alt={service.alt} width="724" height="543" loading="lazy" decoding="async" /><span><strong>{service.title}</strong><small>배관막힘 안내 보기</small><b>1668-1321</b></span></a>)}</div>
          <a className="inlineLeakGuide" href="/leak-detection"><span>누수 증상은 별도로 확인하세요</span><b>누수탐지 전용페이지 보기 →</b></a>
        </div>
      </section>

      <section className="nationwideDirectory topRegionDirectory" id="regions">
        <div className="regionTitle"><p className="kicker">SERVICE AREA</p><h2>현재 지역을 선택하세요</h2><p>권역을 선택하면 시·군·구와 읍·면·동별 배관 서비스 안내로 이동합니다.</p></div>
        <div className="nationwideGrid">{regionHubs.map((region) => <a href={region.href} key={region.href}><strong>{region.name}</strong><span>{region.detail}</span><b>지역 페이지 보기 →</b></a>)}</div>
        <div className="regionDirectoryActions"><a className="primary compact" href="/service-area">전체 지역 한눈에 보기</a><a href="/services">서비스별 안내 보기 →</a></div>
      </section>

      <section className="priorityRegionDirectory" id="core-regions">
        <div className="regionTitle"><p className="kicker">SEO LOCAL HUB</p><h2>서울·경기 전 지역 대표페이지</h2><p>서울 25개 구와 경기도 31개 시·군을 짧은 대표주소로 구성했습니다. 각 대표페이지에서 구·동 상세정보와 해당 지역 시공현장으로 연결됩니다.</p></div>
        <div className="priorityRegionGroups">
          <a className="priorityRegionMain" href="/hanam"><small>BUSINESS BASE</small><strong>하남시</strong><span>미사 · 덕풍 · 신장 · 감일 · 위례</span><b>하남 대표페이지 →</b></a>
          <section className="priorityRegionGroup" aria-labelledby="seoul-hub-title"><header><small>SEOUL</small><h3 id="seoul-hub-title">서울특별시 25개 구</h3><p>구 대표페이지 → 동별 상세페이지 → 지역 시공현장</p></header><div className="priorityRegionLinkGrid">{seoulRegionHubs.map((region) => <a href={`/${region.slug}`} key={region.slug}><strong>{region.fullName}</strong><span>{region.name} 배관막힘 →</span></a>)}</div></section>
          <section className="priorityRegionGroup gyeonggiRegionGroup" aria-labelledby="gyeonggi-hub-title"><header><small>GYEONGGI</small><h3 id="gyeonggi-hub-title">경기도 31개 시·군</h3><p>하남을 포함한 시·군 대표페이지 → 구·동 상세페이지 → 지역 시공현장</p></header><div className="priorityRegionLinkGrid">{gyeonggiRegionHubs.map((region) => <a href={`/${region.slug}`} key={region.slug}><strong>{region.fullName}</strong><span>{region.name} 배관막힘 →</span></a>)}</div></section>
        </div>
      </section>

      <section className="featuredRegion">
          <div><p className="kicker">FEATURED LOCAL PAGE</p><h2>하남시 대표 배관 안내</h2><p>우리동네전문가의 사업장 소재 지역인 하남시는 별도의 대표페이지에서 미사동·망월동·풍산동·덕풍동·신장동 등 동별 안내와 배관 증상별 점검 정보를 제공합니다.</p><div className="featuredActions"><a className="primary compact" href="/hanam">하남 대표페이지 보기</a><a href="/work-sites">실제 시공현장 보기 →</a></div></div>
        <figure><img src="/images/plumber-worker.webp" alt="하남 배관막힘 현장에서 배관 내시경으로 점검하는 작업자" width="1672" height="941" loading="lazy" decoding="async" /><figcaption><small>하남시 지역 안내</small><strong>증상·건물·동별로<br />더 자세하게 확인하세요.</strong></figcaption></figure>
      </section>

      <section className="darkSection" id="process">
        <div className="processIntro"><p className="kicker light">PROCESS</p><h2>무조건 작업하기보다<br /><em>확인하고 안내하는 순서</em></h2><p>배관막힘은 건물 구조와 문제 구간에 따라 필요한 장비가 달라집니다. 현재 증상과 위치를 확인한 뒤 현장 상태에 맞는 점검 방향을 안내합니다.</p><a href="tel:16681321">현재 증상 전화로 설명하기 →</a></div>
        <div className="steps">{steps.map(([number, title, description]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </section>

      <section className="workSection nationalWork">
        <div className="workTitle"><p className="kicker">WORK RECORD</p><h2>현장 기록과 장비를<br />직접 확인하세요</h2><p>서비스 소개만 나열하지 않고 실제 현장에서 확인한 증상, 사용 장비와 작업 과정을 기록합니다.</p><a className="allServiceLink" href="/work-sites">시공현장 전체 보기 →</a></div>
        <div className="workGallery"><figure className="workLarge"><img src="/images/sink-service.webp" alt="싱크대 하부 배관을 점검하는 작업" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption><b>싱크대 배관 점검</b><span>트랩과 연결 배관의 막힘 상태 확인</span></figcaption></figure><figure><img src="/images/inspection-equipment.webp" alt="배관 내시경과 고압세척 전문 장비" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption><b>진단·세척 장비</b><span>내시경 카메라 · 고압세척기 · 전용 호스</span></figcaption></figure></div>
      </section>

      <section className="faq section" id="faq"><div className="sectionHead"><div><p className="kicker">FAQ</p><h2>상담 전 많이<br />물어보시는 내용</h2></div><p>현재 지역과 증상을 알려주시면<br />확인할 순서부터 안내해 드립니다.</p></div><div className="faqList">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>Q</span>{question}<b>＋</b></summary><p>{answer}</p></details>)}</div></section>

      <section className="finalCta"><p>지역과 막힘 증상을 알려주세요</p><h2>배관막힘 상담부터<br />필요한 점검 방향을 안내합니다.</h2><a href="tel:16681321" aria-label="대표번호 1668-1321로 전화 연결"><span>배관막힘 상담전화</span>1668-1321</a></section>
      <footer className="siteFooterV2"><div className="footerBrandV2" aria-label="우리동네전문가"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">하수구 · 변기 · 싱크대 · 세면대 막힘 / 고압세척 · 배관청소 · <a href="/leak-detection">누수탐지 전용페이지 →</a></p><p className="footerLegalV2"><span>사업자등록번호 732-67-00677 · 경기도 하남시 하남대로801번길 58 4층</span><span>상담 가능 시간 및 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 우리동네전문가</span></p></footer>
      <div className="mobileContactBar" aria-label="빠른 상담"><a href="tel:16681321"><span>24시간 대표번호</span><b>1668-1321</b></a></div>
    </main>
  );
}
