import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDong, hanamDongs } from "../dong-data";
import LocalLandingContent from "../../LocalLandingContent";
import RegionMap from "../../gyeonggi/RegionMap";
import { units } from "../../gyeonggi/area-data";

type PageProps = { params: Promise<{ dong: string }> };

export function generateStaticParams() {
  return hanamDongs.map(({ slug }) => ({ dong: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dong } = await params;
  const area = getDong(dong);
  if (!area) return {};
  const title = `${area.name} 싱크대막힘·변기막힘·하수구막힘 | 우리동네전문가`;
  const description = `하남시 ${area.name} 싱크대막힘, 변기막힘, 하수구막힘 원인 점검과 배관 내시경·고압세척 상담. 우리동네전문가 1668-1321.`;
  return {
    title,
    description,
    keywords: [`${area.name} 싱크대막힘`, `${area.name} 변기막힘`, `${area.name} 하수구막힘`, `${area.name} 고압세척`, "우리동네전문가"],
    alternates: { canonical: `/hanam/${area.slug}` },
    openGraph: { title, description, type: "website", locale: "ko_KR" },
  };
}

const checks = [
  ["싱크대 물이 천천히 내려감", "트랩과 벽 배관 초입의 유지방·음식물 축적 가능성을 확인합니다."],
  ["변기 물이 차오르거나 넘침", "변기 내부 이물질과 오수관 연결 구간의 통수 상태를 구분합니다."],
  ["여러 배수구에서 동시에 소리", "세대 배관보다 깊은 공용관 또는 외부 배관의 영향을 살펴봅니다."],
  ["작업 후 다시 막힘", "내시경으로 남은 오염 범위와 긴 횡주관의 상태를 확인할 수 있습니다."],
];

export default async function DongDrainPage({ params }: PageProps) {
  const { dong } = await params;
  const area = getDong(dong);
  if (!area) notFound();
  const neighbors = area.nearby.map(getDong).filter(Boolean);
  const hanamUnit = units.find((unit) => unit.city === "하남시");
  const leakLocal = hanamUnit?.locals.find((local) => local.name === area.name);
  const mapCenter: [number, number] = leakLocal?.center || hanamUnit?.center || [37.5393, 127.2148];
  const leakHref = leakLocal ? `/leak-detection/gyeonggi/hanam/d-${leakLocal.code}` : "/leak-detection/gyeonggi/hanam";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${area.name} 싱크대막힘·변기막힘·하수구막힘 상담`,
    provider: { "@type": "LocalBusiness", name: "우리동네전문가", telephone: "1668-1321" },
    areaServed: { "@type": "Place", name: `경기도 하남시 ${area.name}` },
    description: `${area.name} 배관막힘 원인 점검, 배관 내시경과 고압세척 상담`,
  };

  return (
    <main className="dongPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="topbar">
        <a className="brand" href="/" aria-label="우리동네전문가 하남 홈"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a>
        <nav aria-label="동별 페이지 메뉴"><a href="#service">서비스</a><a href="#process">작업절차</a><a href="#work-site">시공현장</a><a href="#faq">자주 묻는 질문</a></nav>
        <a className="headerCall" href="tel:16681321">1668-1321</a>
      </header>

      <section className="dongHero">
        <div>
          <p className="eyebrow"><span /> 하남시 {area.name} 배관 상담</p>
          <h1>{area.name} 싱크대막힘·변기막힘,<br /><em>원인부터 정확하게 확인합니다</em></h1>
          <p>{area.areaCopy}</p>
          <div className="heroActions"><a className="primary" href="tel:16681321">{area.name} 전화 상담 <b>1668-1321</b></a><a className="secondary" href="#symptom">증상별 점검 보기 ↓</a></div>
          <div className="trust"><span>✓ 작업 전 설명</span><span>✓ 증상별 장비 선택</span><span>✓ 하남 지역 상담</span></div>
        </div>
        <figure><img src="/images/plumber-worker.webp" alt={`${area.name} 배관막힘 현장에서 내시경 장비로 점검하는 작업자`} /><figcaption><small>{area.name} 배관 점검</small><strong>눈앞의 물만 빼기보다<br />막힌 구간을 먼저 확인합니다.</strong></figcaption></figure>
      </section>

      <section className="dongQuick" id="service"><b>{area.name} 주요 상담</b><span>싱크대막힘</span><span>변기막힘</span><span>하수구막힘</span><span>배관 내시경</span><span>고압세척</span></section>

      <LocalLandingContent label={`하남시 ${area.name}`} leakHref={leakHref} />

      <section className="dongSection" id="symptom">
        <div className="dongSectionTitle"><p className="kicker">SYMPTOM CHECK</p><h2>{area.name} 배관막힘,<br />증상부터 구분합니다</h2><p>{area.buildingFocus}처럼 건물 형태가 다양하면 같은 막힘 증상도 원인 구간이 다를 수 있습니다. 전화 상담에서 배수 속도, 역류 범위, 악취와 소리, 이전 작업 여부를 알려주세요.</p></div>
        <div className="dongCheckGrid">{checks.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="dongEquipment" id="work-site">
        <figure><img src="/images/inspection-equipment.webp" alt={`${area.name} 하수구막힘 점검용 배관 내시경과 고압세척 장비`} /></figure>
        <div><p className="kicker light">EQUIPMENT</p><h2>막힘 위치와 오염 범위에<br />맞는 장비를 선택합니다</h2><p>짧은 구간의 이물질은 트랩 점검이나 스프링 작업을 검토하고, 배관 안쪽 상태를 확인해야 할 때는 내시경을 사용합니다. 긴 배관에 유지방과 슬러지가 넓게 쌓였거나 반복해서 막힌다면 배관 재질과 접근 위치를 확인한 뒤 고압세척 범위를 안내합니다.</p><a href="/work-sites">시공현장 업데이트 보기 →</a></div>
      </section>

      <section className="regionMapSection"><div className="regionMapCopy"><p className="kicker">LOCAL MAP</p><h2>하남시 {area.name}<br />지역 위치 안내</h2><p>{area.name} 행정구역의 중심 위치를 무료 지도로 표시합니다.</p><a className="primary compact" href="tel:16681321">{area.name} 출동 문의하기</a></div><RegionMap label={`하남시 ${area.name}`} center={mapCenter} zoom={14} /></section>

      <section className="dongSection dongProcess" id="process">
        <div className="dongSectionTitle"><p className="kicker">WORK FLOW</p><h2>{area.name} 현장<br />대표 점검 순서</h2></div>
        <ol><li><b>01</b><div><h3>증상과 건물 확인</h3><p>막힌 배수구, 건물 형태와 증상이 시작된 시점을 확인합니다.</p></div></li><li><b>02</b><div><h3>배관 구간 점검</h3><p>트랩, 벽 배관, 세대 횡주관과 외부 연결부 중 가능한 구간부터 살펴봅니다.</p></div></li><li><b>03</b><div><h3>작업 범위 안내</h3><p>필요한 장비와 작업 범위를 설명한 뒤 진행합니다.</p></div></li><li><b>04</b><div><h3>배수 상태 확인</h3><p>작업 후 물을 흘려 배수와 재역류 여부를 확인합니다.</p></div></li></ol>
      </section>

      <section className="faq section regionFaq" id="faq"><div className="sectionHead"><div><p className="kicker">FAQ</p><h2>{area.name}<br />자주 묻는 질문</h2></div><p>정확한 작업 범위는 현장 상태를 확인한 뒤 안내합니다.</p></div><div className="faqList"><details open><summary><span>Q</span>물이 천천히 내려가는데 점검해야 하나요?<b>＋</b></summary><p>배수 속도가 갑자기 느려졌거나 많은 물을 사용할 때 역류한다면 현재 증상을 상담해 주세요.</p></details><details><summary><span>Q</span>전화로 비용을 확정할 수 있나요?<b>＋</b></summary><p>막힘 위치와 배관 길이, 건물 구조, 필요한 장비에 따라 달라져 현장 점검 후 작업 전에 안내합니다.</p></details><details><summary><span>Q</span>{area.name} 출동 시간은 얼마나 걸리나요?<b>＋</b></summary><p>현재 작업 일정과 위치에 따라 달라지므로 대표번호로 확인해 주세요.</p></details></div></section>

      <section className="dongNearby" id="nearby">
        <p className="kicker">NEARBY AREA</p><h2>{area.name} 인근 배관 상담 지역</h2>
        <div>{neighbors.map((neighbor) => neighbor && <a key={neighbor.slug} href={`/hanam/${neighbor.slug}`}><strong>{neighbor.name}</strong><span>싱크대·변기·하수구막힘 안내 →</span></a>)}</div>
        <a className="allAreaLink" href="/">하남시 전체 배관 서비스 보기</a>
      </section>

      <section className="finalCta"><p>{area.name} 배관막힘 상담</p><h2>지금 증상을 알려주세요.<br />필요한 작업부터 안내합니다.</h2><a href="tel:16681321"><span>365일 상담전화</span>1668-1321</a></section>
      <footer className="siteFooterV2"><div className="footerBrandV2"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 고압세척 · 배관청소</p><p className="footerLegalV2">상담 가능 시간 및 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 우리동네전문가</p></footer>
      <a className="floatingCall" href="tel:16681321" aria-label={`${area.name} 배관 전화 상담`}>☎<b>전화상담</b></a>
    </main>
  );
}
