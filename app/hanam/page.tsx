import type { Metadata } from "next";
import HanamMap from "../HanamMap";
import { hanamDongs } from "./dong-data";
import { regionHubs } from "../services/service-data";
import { workCases } from "../work-sites/cases-data";

export const metadata: Metadata = {
  title: "하남 싱크대막힘 하수구막힘 고압세척 | 우리동네전문가",
  description: "하남 싱크대·하수구·변기 막힘, 배관 내시경·고압세척 상담. 누수탐지는 별도 전용페이지 운영. 우리동네전문가 1668-1321.",
  keywords: ["하남 싱크대막힘", "하남 하수구막힘", "하남 변기막힘", "하남 고압세척"],
  alternates: { canonical: "/hanam" },
  openGraph: {
    title: "하남 싱크대막힘 하수구막힘 | 우리동네전문가",
    description: "하남 전 지역 배관막힘·배관 내시경·고압세척 상담",
    url: "/hanam",
    images: [{ url: "/images/plumber-worker.webp", alt: "하남 배관막힘 현장 점검" }],
  },
};

const services = [
  { title: "24시간 상담", image: "/images/service-consultation.webp", alt: "우리동네전문가 전화 상담 담당자", href: "/service-area" },
  { title: "하수구 막힘", image: "/images/service-dispatch.webp", alt: "하수구막힘 현장으로 장비를 들고 출동하는 작업자", href: "/services/drain-clog" },
  { title: "배관 고압세척", image: "/images/inspection-equipment.webp", alt: "배관 고압세척 전문 장비", href: "/services/high-pressure-cleaning" },
  { title: "배관 내시경", image: "/images/plumber-worker.webp", alt: "배관 내시경으로 내부를 점검하는 작업자", href: "/services/pipe-camera" },
  { title: "싱크대 막힘", image: "/images/sink-service.webp", alt: "싱크대 하부 배관을 점검하는 작업자", href: "/services/sink-clog" },
  { title: "변기 막힘", image: "/images/service-toilet.webp", alt: "변기 막힘을 점검하는 배관 작업자", href: "/services/toilet-clog" },
];

const steps = [
  ["01", "전화 상담", "증상과 건물 형태, 위치를 먼저 확인합니다."],
  ["02", "현장 진단", "배관 구조와 막힘 원인을 장비로 점검합니다."],
  ["03", "작업 안내", "필요한 작업과 비용을 설명한 뒤 진행합니다."],
  ["04", "확인 및 정리", "배수 상태를 확인하고 현장을 정리합니다."],
];

const faqs = [
  ["싱크대 물이 천천히 내려가는데 바로 불러야 하나요?", "배수 속도가 갑자기 느려졌거나 물을 많이 쓰면 역류한다면 배관 안에 유지방이 쌓였을 가능성이 있습니다. 완전히 막히기 전에 상담하면 작업 범위를 줄이는 데 도움이 됩니다."],
  ["비용은 전화로 확정할 수 있나요?", "막힘 위치, 배관 길이, 건물 구조와 필요한 장비에 따라 달라집니다. 전화로 예상 범위를 안내하고, 현장 진단 후 작업 전 다시 설명드립니다."],
  ["하남 어디까지 출동하나요?", "미사동·망월동·풍산동·덕풍동·신장동·감일동·위례동 등 하남시 전 지역을 상담합니다. 인접 지역도 전화로 출동 가능 여부를 확인해 주세요."],
  ["약품을 부었는데도 막혀 있어요.", "강한 약품을 반복 사용하거나 서로 다른 제품을 섞지 마세요. 사용한 제품이 있다면 작업자에게 미리 알려주시면 안전한 진단에 도움이 됩니다."],
];

const causes = [
  ["유지방과 음식물 찌꺼기", "설거지 과정에서 흘러간 기름은 배관 안에서 식으며 굳습니다. 여기에 작은 음식물이 붙으면 통로가 점점 좁아져 물이 느리게 내려가거나 다시 올라올 수 있습니다."],
  ["배수 트랩과 연결부 이물질", "싱크대 바로 아래 트랩이나 주름 호스에 슬러지가 쌓이면 악취와 꿀렁거리는 소리가 먼저 나타납니다. 이 구간은 배관 깊은 곳의 막힘과 구분해 확인해야 합니다."],
  ["공용 배관과 긴 횡주관", "아파트·상가처럼 여러 배수구가 연결된 건물은 세대 내부만이 아니라 공용관이나 수평 배관에 원인이 있을 수 있습니다. 반복 막힘은 연결 구조까지 함께 살펴야 합니다."],
  ["배관 경사와 노후 상태", "배관 경사가 고르지 않거나 내부가 거칠어진 경우 찌꺼기가 한곳에 계속 쌓일 수 있습니다. 단순 통수 후 다시 막힌다면 구조와 배관 상태를 확인할 필요가 있습니다."],
];

const diagnostics = [
  ["물이 천천히 내려감", "트랩 또는 배관 초입의 부분 막힘 가능성", "트랩 분리 점검·스프링 작업 여부 확인"],
  ["물을 많이 쓰면 역류", "배관 중간이나 공용관의 통수 공간 부족 가능성", "배관 내시경·관로 위치 확인"],
  ["악취와 꿀렁 소리", "슬러지 축적 또는 배관 내부 공기 흐름 문제", "오염 구간과 연결 상태 점검"],
  ["뚫은 뒤 다시 막힘", "깊은 유지방층·긴 횡주관·구조적 원인 가능성", "내시경 확인 후 고압세척 범위 검토"],
];

const localAreas = [
  ["미사동·망월동", "공동주택과 상가가 밀집한 생활권으로 싱크대 배수 지연, 음식점 주방 배관, 공용관 연결 상태를 구분해 상담합니다."],
  ["풍산동·덕풍동", "아파트·빌라·주택·상가가 함께 있는 지역 특성을 고려해 건물 형태와 배관 접근 위치를 먼저 확인합니다."],
  ["신장동·창우동·천현동", "기존 주거지와 상업시설의 다양한 배관 구조를 고려해 반복 막힘 여부와 작업 가능한 진입 지점을 확인합니다."],
  ["감북동·감일동·위례동", "공동주택과 신축 생활권의 싱크대·욕실 배수 문제부터 상가 배관 막힘까지 증상에 맞춰 상담합니다."],
  ["초이동·춘궁동", "주택·사업장·외곽 시설은 배관 길이와 외부 맨홀, 오수관 연결 여부를 함께 확인해 작업 범위를 안내합니다."],
];

const consultationStandards = [
  ["01", "증상 확인", "막힌 위치와 배수 속도, 역류·악취 여부를 먼저 듣습니다."],
  ["02", "원인 구간 점검", "트랩·가지관·횡주관·공용관 중 확인할 범위를 구분합니다."],
  ["03", "작업 전 안내", "필요한 장비와 작업 범위, 비용을 설명한 뒤 진행합니다."],
  ["04", "작업 후 확인", "물을 흘려 배수 상태와 재역류 여부를 함께 확인합니다."],
];

export default function HanamHome() {
  const hanamCases = workCases.filter((work) => work.regionSlug === "hanam").slice(0, 6);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": "https://service.drain119.co.kr/#business",
    name: "우리동네전문가",
    telephone: "1668-1321",
    url: "https://service.drain119.co.kr",
    image: "https://service.drain119.co.kr/images/plumber-worker.webp",
    taxID: "732-67-00677",
    address: {
      "@type": "PostalAddress",
      streetAddress: "하남대로801번길 58 4층",
      addressLocality: "하남시",
      addressRegion: "경기도",
      addressCountry: "KR",
    },
    areaServed: { "@type": "City", name: "하남시" },
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+82-1668-1321", contactType: "customer service", availableLanguage: "Korean" },
    ],
    description: "하남시 싱크대막힘, 하수구막힘, 변기막힘, 배관 내시경·고압세척 상담",
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://service.drain119.co.kr/#website",
    name: "우리동네전문가",
    alternateName: "하남 배관막힘 우리동네전문가",
    url: "https://service.drain119.co.kr/",
    inLanguage: "ko-KR",
    publisher: { "@id": "https://service.drain119.co.kr/#business" },
  };
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "우리동네전문가 주요 서비스와 전국 지역 안내",
    itemListElement: [
      ...services.slice(1).map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: `https://service.drain119.co.kr${service.href}` })),
      { "@type": "ListItem", position: services.length, name: "누수탐지 전용 안내", url: "https://service.drain119.co.kr/leak-detection" },
      ...regionHubs.map((region, index) => ({ "@type": "ListItem", position: services.length + index + 1, name: region.name, url: `https://service.drain119.co.kr${region.href}` })),
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }} />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="우리동네전문가 홈"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a>
        <nav aria-label="주요 메뉴"><a href="#service">배관막힘</a><a href="/leak-detection/gyeonggi/hanam">하남 누수탐지</a><a href="#process">작업절차</a><a href="#area">하남 출동지역</a><a href="#hanam-guide">증상별 안내</a><a href="#faq">자주 묻는 질문</a></nav>
        <a className="headerCall" href="tel:16681321">1668-1321</a>
      </header>

      <section className="hero" id="top">
        <div className="heroGlow" />
        <div className="heroContent">
          <p className="eyebrow"><span /> 하남 전 지역 상담 · 365일 접수</p>
          <h1>하남 배관 서비스 지역 안내,<br /><em>동별 증상·점검 정보를 확인하세요</em></h1>
          <p className="heroCopy">물이 안 내려가고 악취까지 올라온다면<br className="mobileBreak" /> 배관 내부 상태를 먼저 확인해야 합니다.</p>
          <div className="heroActions"><a className="primary" href="tel:16681321">지금 전화 상담 <b>1668-1321</b></a></div>
          <div className="trust"><span>✓ 작업 전 설명</span><span>✓ 현장 맞춤 장비</span><span>✓ 하남 지역 출동</span></div>
        </div>
        <div className="heroVisual photoHero">
          <img src="/images/plumber-worker.webp" alt="하남 주택 싱크대 배관을 내시경 장비로 점검하는 배관 작업자" width="1672" height="941" fetchPriority="high" />
          <div className="photoLabel"><small>현장 중심 정밀 진단</small><strong>보이는 증상보다<br />배관 속 원인을 확인합니다.</strong></div>
        </div>
      </section>

      <section className="symptomBar"><b>이런 증상이라면 점검이 필요합니다</b><span>물이 천천히 내려감</span><span>싱크대 아래 악취</span><span>배수 시 꿀렁거리는 소리</span><span>사용할 때마다 역류</span></section>

      <section className="consultationStandard" aria-labelledby="consultation-standard-title">
        <div className="standardHeading"><p className="kicker">SERVICE STANDARD</p><h2 id="consultation-standard-title">상담부터 작업 확인까지<br />기준을 분명하게 안내합니다</h2><p>하남 배관막힘은 건물 구조와 막힌 위치에 따라 필요한 장비가 달라집니다. 처음부터 무조건 특정 작업을 권하지 않고, 현재 증상과 확인 가능한 구간부터 살펴봅니다.</p></div>
        <div className="standardGrid">{consultationStandards.map(([number, title, text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="businessProof"><span><b>하남 소재 사업자</b> 사업자등록번호 732-67-00677</span><span><b>대표 상담</b> 1668-1321</span></div>
      </section>

      <section className="serviceShowcase section" id="service">
        <div className="servicePanel">
          <div className="serviceHeading"><p className="kicker">DRAIN SERVICE GUIDE</p><h2>하남시 배관막힘 서비스 안내</h2><p>우리동네전문가 대표번호 <b>1668-1321</b> · 하수구막힘과 고압세척 상담</p></div>
          <div className="servicePhotoGrid drainServicePhotoGrid">{services.map((s) => <a className="servicePhotoCard" href={s.href} key={s.title} aria-label={`${s.title} 상세 안내`}><img src={s.image} alt={s.alt} width="724" height="543" loading="lazy" decoding="async" /><span><strong>{s.title}</strong><small>지역별 안내 보기</small><b>1668-1321</b></span></a>)}</div>
          <a className="inlineLeakGuide" href="/leak-detection/gyeonggi/hanam"><span>하남 누수 증상은 별도로 확인하세요</span><b>하남 누수탐지 지역페이지 보기 →</b></a>
        </div>
      </section>

      <section className="workSection" id="work">
        <div className="workTitle"><p className="kicker">REAL WORK</p><h2>현장에서 직접 확인하고<br />필요한 장비로 작업합니다</h2><p>싱크대 아래 배관부터 내시경 진단과 고압세척 장비까지, 증상과 배관 상태에 맞춰 작업 범위를 결정합니다.</p></div>
        <div className="workGallery">
          <figure className="workLarge"><img src="/images/sink-service.webp" alt="싱크대 하부 배수 트랩을 분리해 점검하는 작업" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption><b>싱크대 배관 점검</b><span>트랩과 연결 배관의 막힘 상태 확인</span></figcaption></figure>
          <figure><img src="/images/inspection-equipment.webp" alt="배관 내시경과 고압세척 전문 장비" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption><b>전문 진단·세척 장비</b><span>내시경 카메라 · 고압세척기 · 전용 호스</span></figcaption></figure>
        </div>
      </section>

      <section className="hubWorkRecords hanamWorkRecords">
        <div className="hubSectionHeading light"><p className="kicker light">REAL WORK RECORD</p><h2>하남 시공현장을<br />한 건씩 누적합니다</h2><p>지역, 증상, 진단 과정, 사용 장비와 작업 결과가 확인되는 실제 사례만 등록합니다.</p></div>
        {hanamCases.length ? <div className="workCaseGrid">{hanamCases.map((work) => <a key={work.slug} href={`/work-sites/${work.slug}`}><img src={work.image} alt={work.imageAlt || work.title} /><span>{work.area} · {work.service}</span><h3>{work.title}</h3><p>{work.summary}</p></a>)}</div> : <div className="hubWorkEmpty"><b>하남 첫 시공현장을 기다리고 있습니다</b><p>현장 사진과 동 이름, 증상, 사용 장비, 작업 결과를 전달하면 하남 대표페이지와 시공현장 게시판에 함께 연결됩니다.</p><a href="/work-sites">시공현장 게시판 보기 →</a></div>}
      </section>

      <section className="darkSection" id="process">
        <div className="processIntro"><p className="kicker light">PROCESS</p><h2>무조건 뚫기보다<br /><em>원인을 찾는 순서</em></h2><p>반복되는 막힘은 배관 깊숙한 곳의 기름때, 이물질 또는 구조적인 문제일 수 있습니다. 현장 상태에 따라 내시경, 스프링, 석션, 고압세척 장비를 선택합니다.</p><a href="tel:16681321">증상 전화로 설명하기 →</a></div>
        <div className="steps">{steps.map(([n,t,d]) => <article key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
      </section>

      <section className="section area" id="area">
        <div><p className="kicker">HANAM AREA</p><h2>하남시 생활권을<br />빠르게 상담합니다</h2><p className="areaCopy">아파트 싱크대, 주택 하수구, 음식점 주방, 상가 공용 배관까지 건물과 증상에 맞춰 출동 일정을 안내합니다.</p><a className="primary compact" href="tel:16681321">하남 출동 문의하기</a></div>
        <HanamMap />
        <div className="districts"><b>주요 출동 지역</b><p>미사동 · 망월동 · 풍산동 · 덕풍동 · 신장동 · 창우동 · 천현동 · 감북동 · 감일동 · 위례동 · 초이동 · 춘궁동</p><small>※ 현장 일정과 위치에 따라 도착 시간은 달라질 수 있습니다.</small></div>
      </section>

      <article className="seoArticle" aria-labelledby="seo-title">
        <nav className="articleToc" aria-label="하남 배관 안내 목차">
          <b>하남 배관 안내 목차</b>
          <a href="#hanam-guide">하남 싱크대막힘 점검</a>
          <a href="#clog-causes">반복 막힘 원인</a>
          <a href="#symptom-check">증상별 진단</a>
          <a href="#equipment-guide">장비 선택 기준</a>
          <a href="#building-guide">건물별 작업 차이</a>
          <a href="#district-guide">하남 동별 출동 안내</a>
        </nav>

        <section className="articleSection articleLead" id="hanam-guide">
          <p className="kicker">HANAM DRAIN GUIDE</p>
          <h2 id="seo-title">하남 싱크대막힘,<br />증상과 배관 구조부터 확인합니다</h2>
          <div className="articleColumns">
            <p>하남에서 싱크대 물이 평소보다 천천히 내려가거나 배수할 때 꿀렁거리는 소리가 들린다면 배관 통로가 이미 좁아지고 있다는 신호일 수 있습니다. 처음에는 물이 조금 늦게 내려가는 정도지만, 유지방과 음식물 찌꺼기가 계속 쌓이면 한꺼번에 물을 사용할 때 싱크대 안으로 오수가 다시 올라오거나 하부장에서 악취가 날 수 있습니다.</p>
            <p>같은 하남 싱크대막힘 증상이라도 원인은 싱크대 바로 아래 트랩, 벽 안쪽 가지관, 세대 횡주관, 건물 공용 배관 등 서로 다를 수 있습니다. 우리동네전문가는 전화 상담에서 건물 형태와 증상, 이전 작업 여부를 먼저 확인하고 현장에서는 접근 가능한 배관 구간부터 점검해 필요한 작업을 안내합니다.</p>
          </div>
          <aside className="articleNotice"><b>상담할 때 알려주시면 좋은 내용</b><span>물이 전혀 내려가지 않는지 · 많이 사용할 때만 역류하는지 · 악취나 소리가 함께 있는지 · 이전에도 같은 곳을 작업했는지</span></aside>
        </section>

        <section className="articleSection" id="clog-causes">
          <div className="articleTitle"><p className="kicker">CAUSE</p><h2>싱크대와 하수구가<br />반복해서 막히는 이유</h2><p>표면에 보이는 물만 빼는 것과 배관 안쪽에 남은 원인을 확인하는 것은 다릅니다. 반복되는 증상은 막힘 위치와 오염 범위를 구분해야 합니다.</p></div>
          <div className="causeGrid">{causes.map(([title, text], index) => <section key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></section>)}</div>
        </section>

        <section className="articleSection symptomSection" id="symptom-check">
          <div className="articleTitle"><p className="kicker">SYMPTOM CHECK</p><h2>증상에 따라 확인할<br />배관 구간이 달라집니다</h2></div>
          <div className="diagnosticTable" role="table" aria-label="싱크대막힘 증상별 점검표">
            <div className="diagnosticHead" role="row"><b>나타나는 증상</b><b>확인할 가능성</b><b>점검 방향</b></div>
            {diagnostics.map(([symptom, cause, check]) => <div className="diagnosticRow" role="row" key={symptom}><strong>{symptom}</strong><span>{cause}</span><span>{check}</span></div>)}
          </div>
        </section>

        <section className="articleSection equipmentSection" id="equipment-guide">
          <div className="equipmentCopy"><p className="kicker">EQUIPMENT</p><h2>스프링·석션·내시경·고압세척,<br />상태에 맞춰 선택합니다</h2><p>모든 막힘에 같은 장비를 사용하는 것은 아닙니다. 배관 입구의 이물질이나 짧은 구간의 막힘은 트랩 점검과 스프링 장비로 확인할 수 있습니다. 물과 찌꺼기를 흡입해야 하는 상황에서는 석션 장비를 검토하고, 막힌 위치나 배관 내부 상태를 눈으로 확인해야 할 때는 배관 내시경을 사용합니다.</p><p>긴 배관에 유지방과 슬러지가 넓게 붙어 있거나 단순 통수 후 반복해서 막히는 경우에는 고압세척이 필요한지 판단합니다. 고압세척은 배관 길이, 재질, 접근 위치와 배수 경로를 확인한 뒤 작업 범위를 정해야 하므로 전화만으로 무조건 결정하지 않습니다.</p></div>
          <figure><img src="/images/inspection-equipment.webp" alt="하남 하수구막힘 점검에 사용하는 배관 내시경과 고압세척 장비" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption>배관 내시경과 고압세척 장비는 막힘 위치와 배관 상태에 따라 선택합니다.</figcaption></figure>
        </section>

        <section className="articleSection" id="building-guide">
          <div className="articleTitle"><p className="kicker">BUILDING TYPE</p><h2>건물에 따라 배관 구조와<br />작업 범위가 달라집니다</h2></div>
          <div className="buildingGrid">
            <section><h3>아파트·오피스텔</h3><p>세대 싱크대 배관인지 공용관과 연결되는 구간인지 구분하는 것이 중요합니다. 위아래 세대의 증상과 관리 주체가 달라질 수 있어 역류 범위와 연결 상태를 확인합니다.</p></section>
            <section><h3>빌라·단독주택</h3><p>실내 배관뿐 아니라 외부 맨홀과 오수관 연결 상태가 원인일 수 있습니다. 배수구 여러 곳에서 동시에 증상이 나타나는지도 함께 살펴봅니다.</p></section>
            <section><h3>음식점·상가 주방</h3><p>기름 사용량과 영업 시간, 배관 길이에 따라 유지방이 빠르게 쌓일 수 있습니다. 집수정과 공용 배관까지 연결되는 구조인지 확인해 작업 구간을 정합니다.</p></section>
            <section><h3>공장·사업장</h3><p>배관 직경과 배출 물질, 작업 가능한 시간과 장비 진입 공간을 먼저 확인해야 합니다. 현장 조건에 따라 점검 및 세척 계획을 별도로 안내합니다.</p></section>
          </div>
        </section>

        <section className="articleSection workExample">
          <div><p className="kicker">WORK FLOW</p><h2>하남 배관막힘<br />대표 점검 흐름</h2><ol><li><b>증상 확인</b><span>배수 속도, 역류, 악취, 소리와 발생 시점을 확인합니다.</span></li><li><b>접근 구간 점검</b><span>트랩과 연결 호스, 벽 배관 등 확인 가능한 부분부터 살펴봅니다.</span></li><li><b>원인 구간 진단</b><span>필요하면 내시경과 장비로 막힘 위치와 오염 정도를 좁혀갑니다.</span></li><li><b>작업 범위 설명</b><span>현장 상태에 맞는 장비와 작업 범위를 안내한 후 진행합니다.</span></li><li><b>배수 확인</b><span>작업 뒤 물을 흘려 배수 상태와 재역류 여부를 확인합니다.</span></li></ol></div>
          <figure><img src="/images/sink-service.webp" alt="하남 싱크대막힘 현장에서 하부 배관을 점검하는 과정" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption>싱크대 하부부터 연결 배관까지 순서대로 확인하는 작업 예시</figcaption></figure>
        </section>

        <section className="articleSection" id="district-guide">
          <div className="articleTitle"><p className="kicker">LOCAL AREA</p><h2>하남시 주요 동별<br />배관 출동 상담</h2><p>하남시 전 지역의 싱크대막힘, 하수구막힘, 변기막힘과 고압세척을 상담합니다. 실제 출동 가능 시간은 현장 일정과 위치에 따라 안내합니다.</p></div>
          <div className="localAreaGrid">{localAreas.map(([area, text]) => <section key={area}><h3>{area}</h3><p>{text}</p><a href="tel:16681321" aria-label={`${area} 배관 출동 전화 상담`}>출동 상담 1668-1321 →</a></section>)}</div>
          <div className="dongLinkPanel"><b>하남시 동별 상세 안내</b><div>{hanamDongs.map((dong) => <a key={dong.slug} href={`/hanam/${dong.slug}`}>{dong.name} 배관막힘</a>)}</div></div>
          <p className="keywordLine">하남 싱크대막힘 · 하남 하수구막힘 · 하남 변기막힘 · 하남 고압세척 · 하남 배관청소</p>
        </section>
      </article>

      <section className="nationwideDirectory homeNationwide" id="nationwide-area">
        <div className="regionTitle"><p className="kicker">SERVICE AREA</p><h2>하남 외 지역별 배관 안내</h2><p>하남 이외 지역은 권역을 선택하면 시·군·구와 읍·면·동별 안내 페이지로 이동합니다.</p></div>
        <div className="nationwideGrid">{regionHubs.map((region) => <a href={region.href} key={region.href}><strong>{region.name}</strong><span>{region.detail}</span><b>지역 페이지 보기 →</b></a>)}</div>
        <a className="allServiceLink" href="/services">배관 서비스 전체 안내 보기 →</a>
      </section>

      <section className="faq section" id="faq"><div className="sectionHead"><div><p className="kicker">FAQ</p><h2>상담 전 많이<br />물어보시는 내용</h2></div><p>정확한 작업 범위는 현장 확인 후 결정됩니다.<br />현재 증상을 알려주시면 먼저 안내해 드립니다.</p></div><div className="faqList">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary><span>Q</span>{q}<b>＋</b></summary><p>{a}</p></details>)}</div></section>

      <section className="finalCta"><p>막힘은 기다린다고 없어지지 않습니다</p><h2>지금 증상을 알려주세요.<br />필요한 작업부터 안내해 드립니다.</h2><a href="tel:16681321"><span>365일 상담전화</span>1668-1321</a></section>
      <footer className="siteFooterV2">
        <div className="footerBrandV2" aria-label="우리동네전문가">

          <div><span>우리동네</span><b>전문가</b></div>
        </div>
        <p className="footerServicesV2">하수구 · 변기 · 싱크대 · 세면대 막힘 / 고압세척 · 배관청소 · <a href="/leak-detection/gyeonggi/hanam">하남 누수탐지 →</a></p>
        <p className="footerLegalV2"><span>사업자등록번호 732-67-00677 · 경기도 하남시 하남대로801번길 58 4층</span><span>상담 가능 시간 및 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 우리동네전문가</span></p>
      </footer>
      <div className="mobileContactBar" aria-label="빠른 상담"><a href="tel:16681321"><span>365일 대표번호</span><b>1668-1321</b></a></div>
    </main>
  );
}
