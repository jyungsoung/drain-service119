import { workCases } from "./cases-data";
import { WORK_CASES_PER_PAGE, getPaginationItems, getWorkCasePageCount, getWorkCasePageHref, getWorkCasesPage } from "./pagination";
import styles from "./pagination.module.css";

type Props = { currentPage: number };

export default function WorkSitesIndex({ currentPage }: Props) {
  const visibleWorkCases = getWorkCasesPage(currentPage);
  const totalPages = getWorkCasePageCount();
  const paginationItems = getPaginationItems(currentPage, totalPages);
  const pageHref = getWorkCasePageHref(currentPage);
  const pageLabel = currentPage === 1 ? "지역별 해결 안내" : `지역별 해결 안내 ${currentPage}페이지`;
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `우리동네전문가 ${pageLabel}`,
    numberOfItems: visibleWorkCases.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: visibleWorkCases.map((work, index) => ({
      "@type": "ListItem",
      position: (currentPage - 1) * WORK_CASES_PER_PAGE + index + 1,
      name: work.title,
      url: `https://service.drain119.co.kr/work-sites/${work.slug}`,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://service.drain119.co.kr/" },
      { "@type": "ListItem", position: 2, name: pageLabel, item: `https://service.drain119.co.kr${pageHref}` },
    ],
  };

  return <main className="regionPage workSitesPage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <header className="topbar"><a className="brand" href="/"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a><nav><a href="/services">서비스</a><a href="/service-area">출동지역</a><a href="/work-sites">지역글</a></nav><a className="headerCall" href="tel:16681321">1668-1321</a></header>
    <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span>{currentPage === 1 ? <b>지역별 해결 안내</b> : <><a href="/work-sites">지역별 해결 안내</a><span>›</span><b>{currentPage}페이지</b></>}</nav>
    <section className="workSitesHero"><div><p className="kicker">LOCAL SERVICE UPDATE</p><h1>지역별 배관 해결 정보를<br /><em>짧고 빠르게 기록합니다</em></h1><p>사진 없이 지역과 서비스, 증상과 확인할 내용을 1~3문단의 짧은 글로 정리합니다. 실제 현장 기록이 있는 경우에는 제공된 사실만 별도로 표시합니다.</p></div><figure><img src="/images/inspection-equipment.webp" alt="배관 점검에 사용하는 내시경과 고압세척 장비" width="1536" height="1024" fetchPriority="high" /><figcaption><b>지역글 구성</b><span>지역 · 서비스 · 증상 · 확인사항</span></figcaption></figure></section>
    <section className="workRecordStandard"><article><b>01</b><h2>지역명 중심</h2><p>시·구·동을 제목과 본문에 자연스럽게 기록합니다.</p></article><article><b>02</b><h2>서비스 중심</h2><p>싱크대막힘·변기막힘·하수구막힘·누수탐지·고압세척을 구분합니다.</p></article><article><b>03</b><h2>짧은 본문</h2><p>해당 증상에서 확인하면 좋은 내용을 1~3문단으로 정리합니다.</p></article><article><b>04</b><h2>지역 연결</h2><p>관련 지역 페이지와 서비스 안내 페이지로 연결합니다.</p></article></section>
    {visibleWorkCases.length > 0 && <section className="regionDirectory workRecordDirectory"><div className="regionTitle"><p className="kicker">LOCAL ARCHIVE</p><h2>{currentPage === 1 ? "최근 지역글" : `누적 지역글 ${currentPage}페이지`}</h2><p>전체 {workCases.length.toLocaleString("ko-KR")}개 지역글을 200개씩 연결했습니다. 현재 {currentPage}/{totalPages}페이지입니다.</p></div><div className="workCaseGrid">{visibleWorkCases.map((work) => <a key={work.slug} href={`/work-sites/${work.slug}`}>{work.image && <figure><img src={work.image} alt={work.imageAlt || work.title} /></figure>}<span>{work.area} · {work.service}</span><h3>{work.title}</h3><p>{work.summary}</p><small>{work.date} · 글 보기 →</small></a>)}</div>
      <nav className={styles.pagination} aria-label="지역글 페이지 번호">
        {currentPage > 1 && <a className={styles.move} href={getWorkCasePageHref(currentPage - 1)} rel="prev">← 이전</a>}
        <div>{paginationItems.map((item) => typeof item === "number" ? <a key={item} href={getWorkCasePageHref(item)} aria-current={item === currentPage ? "page" : undefined}>{item}</a> : <span key={item} aria-hidden="true">…</span>)}</div>
        {currentPage < totalPages && <a className={styles.move} href={getWorkCasePageHref(currentPage + 1)} rel="next">다음 →</a>}
      </nav>
    </section>}
    <section className="finalCta"><p>배관 상담</p><h2>현재 위치와 증상을 알려주세요.</h2><a href="tel:16681321"><span>대표 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2"><div><span>우리동네</span><b>전문가</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 배관 내시경 · 고압세척</p><p className="footerLegalV2">© 우리동네전문가</p></footer>
  </main>;
}
