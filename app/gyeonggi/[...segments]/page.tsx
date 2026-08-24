import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allStaticSegments, localPath, resolveArea, unitPath, unitsForCity } from "../area-data";
import RegionMap from "../RegionMap";
import LocalLandingContent from "../../LocalLandingContent";

type Props = { params: Promise<{ segments: string[] }> };

export function generateStaticParams() { return allStaticSegments().map(segments => ({ segments })); }

function areaLabel(area: NonNullable<ReturnType<typeof resolveArea>>) {
  if (area.level === "local") return `${area.unit?.unitName} ${area.local?.name}`;
  if (area.level === "unit") return area.unit?.unitName || area.city.name;
  return area.city.name;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const segments = (await params).segments;
  const area = resolveArea(segments);
  if (!area) return {};
  const label = areaLabel(area);
  const title = `${label} 싱크대막힘·변기막힘·하수구막힘 | 우리동네전문가`;
  const description = `경기도 ${label} 싱크대막힘, 변기막힘, 하수구막힘 원인 점검과 배관 내시경·고압세척 상담. 우리동네전문가 1668-1321.`;
  return { title, description, keywords:[`${label} 싱크대막힘`,`${label} 변기막힘`,`${label} 하수구막힘`,`${label} 고압세척`], alternates:{canonical:`/gyeonggi/${segments.join("/")}`}, openGraph:{title,description,images:[{url:"/images/plumber-worker.webp",alt:`${label} 배관막힘 현장 점검`}],type:"website",locale:"ko_KR"} };
}

const symptoms = [
  ["싱크대 물이 천천히 내려감", "트랩과 벽 배관 초입의 유지방·음식물 축적 가능성을 확인합니다."],
  ["변기 물이 차오르거나 넘침", "변기 내부 이물질과 오수관 연결 구간의 통수 상태를 구분합니다."],
  ["여러 배수구에서 소리가 남", "세대 배관보다 깊은 공용관 또는 외부 배관의 영향을 살펴봅니다."],
  ["뚫은 뒤 다시 막힘", "내시경으로 남은 오염 범위와 긴 배관 구간의 상태를 확인할 수 있습니다."],
];

function localProfile(name: string) {
  if (name.endsWith("읍") || name.endsWith("면")) return "주택·사업장·외부 맨홀처럼 배관 연결 거리가 길 수 있어 실내 배수구와 외부 오수관을 함께 구분합니다.";
  const n = name.charCodeAt(0) % 3;
  return ["아파트·오피스텔·생활 상가에서는 세대 배관과 공용 배관의 증상 범위를 나누어 확인합니다.","주택·빌라·상가가 함께 있는 생활권은 건물 형태와 배관 접근 위치를 먼저 확인합니다.","공동주택과 상업시설의 배수 문제는 사용량, 반복 여부와 연결 배관 구조를 함께 살펴봅니다."][n];
}

export default async function GyeonggiAreaPage({ params }: Props) {
  const segments = (await params).segments;
  const area = resolveArea(segments);
  if (!area) notFound();
  const label = areaLabel(area);
  const cityUnits = unitsForCity(area.city);
  const profile = area.local ? localProfile(area.local.name) : `${label}의 공동주택, 주택, 상가와 사업장 배관은 건물 형태와 막힘 범위를 구분해 확인합니다.`;
  const mapCenter: [number, number] = area.local?.center || area.unit?.center || [cityUnits.reduce((sum,u)=>sum+u.center[0],0)/cityUnits.length, cityUnits.reduce((sum,u)=>sum+u.center[1],0)/cityUnits.length];
  const mapZoom = area.local ? 14 : area.unit ? 12 : 11;
  const schema = {"@context":"https://schema.org","@type":"Service",name:`${label} 배관막힘 상담`,provider:{"@type":"LocalBusiness",name:"우리동네전문가",telephone:"1668-1321"},areaServed:{"@type":"Place",name:`경기도 ${label}`},description:`${label} 싱크대·변기·하수구막힘 원인 점검 및 고압세척 상담`};

  const directory = area.level === "city"
    ? (cityUnits.length > 1 ? cityUnits : cityUnits[0]?.locals || [])
    : area.level === "unit" ? area.unit!.locals : area.unit!.locals.filter(item => item.code !== area.local!.code).slice(0,8);

  return <main className="regionPage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <header className="topbar"><a className="brand" href="/"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a><nav><a href="#service">서비스</a><a href="#process">작업절차</a><a href="#work-site">시공현장</a><a href="#faq">자주 묻는 질문</a></nav><a className="headerCall" href="tel:16681321">1668-1321</a></header>
    <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/gyeonggi">경기도</a><span>›</span><a href={`/gyeonggi/${area.city.slug}`}>{area.city.name}</a>{area.unit?.gu && <><span>›</span><a href={unitPath(area.unit)}>{area.unit.gu}</a></>}{area.local && <><span>›</span><b>{area.local.name}</b></>}</nav>
    <section className="regionHero"><div><p className="eyebrow"><span /> 경기도 {label} 배관 상담</p><h1>{label} 싱크대막힘·변기막힘,<br /><em>원인부터 정확하게 확인합니다</em></h1><p>{profile} 물이 느리게 내려가는지, 한꺼번에 사용할 때 역류하는지, 악취나 소리가 함께 나타나는지를 알려주시면 점검 방향을 안내합니다.</p><div className="heroActions"><a className="primary" href="tel:16681321">{label} 전화 상담 <b>1668-1321</b></a><a className="secondary" href="#symptoms">증상별 점검 보기 ↓</a></div><div className="trust"><span>✓ 작업 전 설명</span><span>✓ 현장 맞춤 장비</span><span>✓ 경기도 지역 상담</span></div></div><figure><img src="/images/plumber-worker.webp" alt={`${label} 배관막힘 현장에서 내시경으로 확인하는 작업자`} /><figcaption><small>{label} 배관 점검</small><strong>보이는 증상보다<br />배관 속 원인을 확인합니다.</strong></figcaption></figure></section>
    <section className="dongQuick" id="service"><b>{label} 주요 상담</b><a href="/services/sink-clog">싱크대막힘</a><a href="/services/toilet-clog">변기막힘</a><a href="/services/drain-clog">하수구막힘</a><a href="/services/pipe-camera">배관 내시경</a><a href="/services/high-pressure-cleaning">고압세척</a></section>
    {area.local&&<LocalLandingContent label={label} leakHref={`/leak-detection/gyeonggi/${segments.join("/")}`}/>}
    <section className="dongSection" id="symptoms"><div className="dongSectionTitle"><p className="kicker">SYMPTOM CHECK</p><h2>{label} 배관막힘,<br />증상부터 구분합니다</h2><p>같은 막힘이라도 트랩, 세대 가지관, 건물 공용관 또는 외부 오수관 중 원인 구간이 다를 수 있습니다. 이전 작업 여부와 여러 배수구에서 동시에 증상이 나타나는지도 확인합니다.</p></div><div className="dongCheckGrid">{symptoms.map(([title,text],i)=><article key={title}><b>0{i+1}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="dongEquipment" id="work-site"><figure><img src="/images/inspection-equipment.webp" alt={`${label} 하수구막힘 점검용 배관 내시경과 고압세척 장비`} /></figure><div><p className="kicker light">WORK SITE</p><h2>시공 현장에서 확인하고<br />맞는 장비를 선택합니다</h2><p>짧은 구간의 이물질은 트랩 점검이나 스프링 작업을 검토하고, 배관 내부 확인이 필요할 때는 내시경을 사용합니다. 긴 배관에 유지방과 슬러지가 넓게 쌓였거나 반복 막힘이 있다면 배관 재질과 접근 위치를 확인한 뒤 고압세척 범위를 안내합니다.</p><a href="/work-sites">시공현장 업데이트 보기 →</a></div></section>
    <section className="regionMapSection"><div className="regionMapCopy"><p className="kicker">LOCAL MAP</p><h2>{label}<br />지역 위치 안내</h2><p>{label} 행정구역의 중심 위치를 무료 지도로 표시합니다. 핀을 누르면 배관 상담 전화로 바로 연결할 수 있습니다.</p><a className="primary compact" href="tel:16681321">{label} 출동 문의하기</a></div><RegionMap label={label} center={mapCenter} zoom={mapZoom} /></section>
    <section className="regionAreas" id="areas"><div className="regionTitle"><p className="kicker">SERVICE AREA</p><h2>{area.level === "local" ? `${area.unit?.unitName} 인근 읍면동` : `${label} 하위 지역 안내`}</h2><p>각 지역 페이지에서 지역명에 맞는 검색 제목, 증상 안내와 인근 지역 연결을 확인할 수 있습니다.</p></div><div className="regionAreaGrid">{directory.map((item:any) => {
      const isUnit = "unitName" in item;
      const href = isUnit ? unitPath(item) : localPath(area.level === "city" ? cityUnits[0] : area.unit!, item);
      const name = isUnit ? item.unitName : item.name;
      const sub = isUnit ? `${item.locals.length}개 읍면동` : "싱크대·변기·하수구막힘";
      return <a key={isUnit ? item.code : item.code} href={href}><strong>{name}</strong><span>{sub} →</span></a>})}</div></section>
    <section className="dongProcess" id="process"><div className="dongSectionTitle"><p className="kicker">WORK FLOW</p><h2>{label} 현장<br />대표 점검 순서</h2></div><ol><li><b>01</b><div><h3>증상과 건물 확인</h3><p>막힌 배수구, 건물 형태와 증상이 시작된 시점을 확인합니다.</p></div></li><li><b>02</b><div><h3>배관 구간 점검</h3><p>트랩, 벽 배관, 세대 횡주관과 외부 연결부 중 가능한 구간부터 살펴봅니다.</p></div></li><li><b>03</b><div><h3>작업 범위 안내</h3><p>필요한 장비와 작업 범위를 설명한 뒤 진행합니다.</p></div></li><li><b>04</b><div><h3>배수 상태 확인</h3><p>작업 후 물을 흘려 배수와 재역류 여부를 확인합니다.</p></div></li></ol></section>
    <section className="faq section regionFaq" id="faq"><div className="sectionHead"><div><p className="kicker">FAQ</p><h2>{label}<br />자주 묻는 질문</h2></div><p>정확한 작업 범위는 배관 구조와 현장 상태를 확인한 후 안내합니다.</p></div><div className="faqList"><details open><summary><span>Q</span>물이 천천히 내려가는데 바로 점검해야 하나요?<b>＋</b></summary><p>배수 속도가 갑자기 느려졌거나 많은 물을 사용할 때 역류한다면 배관 통로가 좁아졌을 가능성이 있습니다. 완전히 막히기 전에 현재 증상을 상담해 주세요.</p></details><details><summary><span>Q</span>전화로 작업 비용을 확정할 수 있나요?<b>＋</b></summary><p>막힘 위치, 배관 길이, 건물 구조와 필요한 장비에 따라 달라집니다. 전화로 예상 범위를 설명하고 현장 점검 뒤 작업 전에 다시 안내합니다.</p></details><details><summary><span>Q</span>약품을 사용했는데도 계속 막혀 있어요.<b>＋</b></summary><p>서로 다른 약품을 추가로 섞지 말고 사용한 제품을 작업자에게 알려주세요. 트랩보다 깊은 구간이나 굳은 유지방은 별도 점검이 필요할 수 있습니다.</p></details><details><summary><span>Q</span>{label} 출동 시간은 얼마나 걸리나요?<b>＋</b></summary><p>출동 가능 시간은 현재 작업 일정과 현장 위치에 따라 달라집니다. 대표번호로 위치와 증상을 알려주시면 가능한 시간을 안내합니다.</p></details></div></section>
    <section className="finalCta"><p>{label} 배관막힘 상담</p><h2>현재 위치와 증상을 알려주세요.</h2><a href="tel:16681321"><span>365일 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 고압세척 · 배관청소</p><p className="footerLegalV2">상담 가능 시간 및 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 우리동네전문가</p></footer><a className="floatingCall" href="tel:16681321" aria-label={`${label} 배관 전화 상담`}>☎<b>전화상담</b></a>
  </main>;
}
