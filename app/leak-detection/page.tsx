import type { Metadata } from "next";
import { leakDetectionService, regionHubs } from "../services/service-data";

export const metadata: Metadata = {
  title: "누수탐지 전문·배관 누수 점검 | 응급배관119",
  description: "계량기 움직임, 벽·바닥 습기와 물자국, 수도 압력 변화가 나타날 때 누수 가능 구간을 단계적으로 확인합니다. 응급배관119 누수탐지 전용 안내.",
  keywords: ["누수탐지", "배관누수", "누수탐지업체", "수도누수", "누수점검", "지역별 누수탐지"],
  alternates: { canonical: "/leak-detection" },
  openGraph: {
    title: "누수탐지 전문·배관 누수 점검 | 응급배관119",
    description: "보이는 물자국과 계량기 변화부터 배관별 점검 순서까지 누수탐지 전용 안내",
    url: "/leak-detection",
    images: [{ url: leakDetectionService.image, alt: leakDetectionService.alt }],
    type: "website",
    locale: "ko_KR",
  },
};

const symptoms = [
  ["계량기 변화", "물을 사용하지 않는데도 계량기 별침이나 숫자가 계속 움직이는 경우"],
  ["벽·바닥 습기", "벽지 변색, 바닥 들뜸, 곰팡이와 축축한 구간이 반복해서 나타나는 경우"],
  ["천장 물자국", "아래층 천장이나 벽면에 젖은 흔적과 물방울이 확인되는 경우"],
  ["압력·사용량 변화", "수도 압력이 낮아지거나 평소보다 수도 사용량이 갑자기 늘어난 경우"],
];

const process = [
  ["01", "증상·위치 상담", "물자국 위치와 발생 시점, 계량기 변화, 건물 형태를 먼저 확인합니다."],
  ["02", "배관 계통 구분", "급수·온수·난방 등 확인할 배관과 점검 가능한 구간을 나눕니다."],
  ["03", "탐지 범위 확인", "현장 조건에 따라 압력·청음 등 필요한 점검 방법을 검토합니다."],
  ["04", "결과·후속 범위 안내", "확인된 내용과 추가 점검 또는 보수가 필요한 범위를 설명합니다."],
];

const faqs = [
  ["물이 새는 위치와 실제 누수 지점은 같나요?", "물은 구조물과 마감재를 따라 이동할 수 있어 보이는 물자국과 실제 시작 지점이 다를 수 있습니다. 배관 계통과 주변 상태를 함께 확인해야 합니다."],
  ["누수탐지 비용을 전화로 확정할 수 있나요?", "건물 구조, 확인할 배관, 접근 범위와 필요한 장비에 따라 달라질 수 있습니다. 상담으로 예상 범위를 안내하고 현장 확인 후 점검 전에 다시 설명합니다."],
  ["탐지와 보수는 같은 작업인가요?", "누수 지점을 확인하는 탐지와 배관·마감재를 보수하는 작업은 범위가 다를 수 있습니다. 현장에서 확인한 내용에 따라 가능한 작업과 별도 작업을 구분해 안내합니다."],
  ["보험 제출용 자료도 받을 수 있나요?", "필요한 자료는 보험사와 관리 주체마다 다릅니다. 먼저 요청받은 서류 목록을 확인한 뒤 현장에서 제공 가능한 기록과 자료 범위를 안내합니다."],
];

export default function LeakDetectionPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://drain-service119.netlify.app/leak-detection#service",
      name: "응급배관119 누수탐지",
      serviceType: "배관 누수탐지 및 누수 점검",
      description: leakDetectionService.description,
      url: "https://drain-service119.netlify.app/leak-detection",
      image: `https://drain-service119.netlify.app${leakDetectionService.image}`,
      provider: { "@id": "https://drain-service119.netlify.app/#business" },
      areaServed: regionHubs.map((region) => ({ "@type": "AdministrativeArea", name: region.name })),
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
        { "@type": "ListItem", position: 1, name: "홈", item: "https://drain-service119.netlify.app/" },
        { "@type": "ListItem", position: 2, name: "누수탐지", item: "https://drain-service119.netlify.app/leak-detection" },
      ],
    },
  ];

  return <main className="leakHome">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="topbar">
      <a className="brand" href="/"><img className="brandSeal" src="/images/emergency-pipe-stamp.jpeg" alt="응급배관119 로고" width="276" height="276" /><span className="brandText"><span className="brandName">응급배관</span><span className="brandNumber">119</span></span></a>
      <nav aria-label="주요 메뉴"><a href="#symptoms">누수 증상</a><a href="#diagnosis">점검 방법</a><a href="#process">진행 순서</a><a href="#regions">상담 지역</a><a href="/services">배관막힘</a></nav>
      <a className="headerCall" href="tel:16681321">1668-1321</a>
    </header>

    <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><b>누수탐지</b></nav>

    <section className="leakHero">
      <div className="leakHeroCopy">
        <p className="eyebrow"><span /> 누수탐지 전용 안내</p>
        <h1>물자국만 보는 것이 아니라,<br /><em>누수 가능 구간을 단계적으로 좁힙니다</em></h1>
        <p>계량기 움직임과 벽·바닥의 습기, 배관별 압력 변화를 확인해 누수 가능성을 구분하고 필요한 점검 방향을 안내합니다.</p>
        <div className="heroActions"><a className="primary" href="tel:16681321">누수탐지 상담 <b>1668-1321</b></a><a className="secondary messageButton" href="sms:01057765882">물자국 사진 문자상담</a></div>
        <div className="trust"><span>✓ 배관 계통 구분</span><span>✓ 점검 전 범위 안내</span><span>✓ 확인 결과 설명</span></div>
      </div>
      <figure><img src={leakDetectionService.image} alt={leakDetectionService.alt} width="1448" height="1086" fetchPriority="high" /><figcaption><small>LEAK DETECTION</small><strong>보이는 흔적과 배관 상태를<br />함께 확인합니다.</strong></figcaption></figure>
    </section>

    <section className="leakSignalStrip" aria-label="누수탐지 핵심 기준"><div><b>계량기</b><span>사용하지 않을 때 변화 확인</span></div><div><b>배관 구분</b><span>급수·온수·난방 점검 범위</span></div><div><b>탐지 방법</b><span>현장 조건에 맞춰 선택</span></div><a href="tel:16681321"><b>1668-1321</b><span>현재 증상 상담하기 →</span></a></section>

    <section className="leakSymptoms" id="symptoms">
      <div className="leakSectionHeading"><p className="kicker">LEAK SIGNAL</p><h2>이런 변화가 보인다면<br />누수 가능성을 확인하세요</h2><p>한 가지 증상만으로 누수 위치를 단정하기보다 발생 시점과 범위, 계량기와 배관 상태를 함께 살펴야 합니다.</p></div>
      <div className="leakSymptomGrid">{symptoms.map(([title, description], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="leakDiagnosis" id="diagnosis">
      <figure><img src="/images/plumber-worker.webp" alt="배관 점검 장비로 누수 가능 구간을 확인하는 작업자" width="1672" height="941" loading="lazy" decoding="async" /></figure>
      <div><p className="kicker light">DIAGNOSIS STANDARD</p><h2>건물 구조와 배관 종류에 따라<br />확인 순서가 달라집니다</h2><p>누수는 물이 보이는 자리만 확인해서는 원인을 판단하기 어렵습니다. 급수·온수·난방 배관을 구분하고 계량기와 압력 변화, 소리와 주변 습기 등을 단계적으로 확인합니다.</p><ul><li>계량기와 밸브를 기준으로 사용 구간 구분</li><li>배관 계통별 압력 변화와 의심 범위 확인</li><li>현장 조건에 맞는 청음·탐지 방법 검토</li><li>확인된 결과와 추가 작업 범위 설명</li></ul></div>
    </section>

    <section className="leakProcess" id="process">
      <div className="leakSectionHeading"><p className="kicker">WORK FLOW</p><h2>누수탐지 진행 순서</h2><p>처음부터 보수 범위를 정하지 않고 현재 확인 가능한 증상부터 순서대로 살펴봅니다.</p></div>
      <div className="leakProcessGrid">{process.map(([number, title, description]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="leakRegions" id="regions">
      <div className="leakSectionHeading"><p className="kicker light">SERVICE AREA</p><h2>누수탐지 상담 지역</h2><p>서울·경기·인천과 강원·충청권을 상담하며 실제 출동 가능 시간은 현재 위치와 현장 일정에 따라 안내합니다.</p></div>
      <div className="leakRegionGrid">{regionHubs.map((region) => <div key={region.href}><strong>{region.name}</strong><span>{region.detail}</span><small>누수탐지 상담 가능 여부 확인</small></div>)}</div>
      <a className="leakRegionCall" href="tel:16681321">현재 지역 출동 상담하기 →</a>
    </section>

    <section className="faq section leakFaq" id="faq"><div className="sectionHead"><div><p className="kicker">FAQ</p><h2>누수탐지 상담 전<br />많이 묻는 내용</h2></div><p>현장 구조와 증상에 따라<br />점검 범위가 달라질 수 있습니다.</p></div><div className="faqList">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>Q</span>{question}<b>＋</b></summary><p>{answer}</p></details>)}</div></section>

    <section className="finalCta leakFinalCta"><p>누수 의심 증상을 알려주세요</p><h2>계량기 변화와 물자국 위치부터<br />확인할 순서를 안내합니다.</h2><a href="tel:16681321"><span>누수탐지 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2" aria-label="응급배관119"><img src="/images/emergency-pipe-footer-v2.jpeg" alt="응급배관119 로고" width="276" height="276" loading="lazy" decoding="async" /><div><span>응급배관</span><b>119</b></div></div><p className="footerServicesV2">누수탐지 전용 안내 · 계량기 변화 · 배관 압력 · 물자국 점검</p><p className="footerLegalV2"><span>사업자등록번호 732-67-00677 · 경기도 하남시 하남대로801번길 58 4층</span><span>상담 가능 시간 및 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 응급배관119</span></p></footer>
    <div className="mobileContactBar" aria-label="누수탐지 빠른 상담"><a href="sms:01057765882"><span>물자국 사진</span><b>문자상담</b></a><a href="tel:16681321"><span>누수탐지 상담</span><b>1668-1321</b></a></div>
  </main>;
}
