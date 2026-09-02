import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { priorityRegionHref } from "../../priority-regions";
import { workCases } from "../cases-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = workCases.find((item) => item.slug === slug);
  if (!work) return {};
  return {
    title: `${work.title} | 우리동네전문가`,
    description: work.summary,
    keywords: [work.area, work.service, `${work.area} ${work.service}`, "우리동네전문가"],
    robots: { index: true, follow: true },
    alternates: { canonical: `/work-sites/${work.slug}` },
    openGraph: {
      title: work.title,
      description: work.summary,
      url: `/work-sites/${work.slug}`,
      type: "article",
      publishedTime: work.date,
      modifiedTime: work.updatedAt || work.date,
      ...(work.image ? { images: [{ url: work.image, alt: work.imageAlt || work.title }] } : {}),
    },
  };
}

function DetailList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return <section className="workCaseInfo"><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

export default async function WorkCasePage({ params }: Props) {
  const { slug } = await params;
  const work = workCases.find((item) => item.slug === slug);
  if (!work) notFound();
  const isAutoGuide = work.slug.startsWith("local-");
  const regionHref = work.areaHref || priorityRegionHref(work.regionSlug);
  const related = workCases.filter((item) => item.slug !== work.slug && (item.regionSlug === work.regionSlug || item.service === work.service)).slice(0, 3);
  const canonical = `https://service.drain119.co.kr/work-sites/${work.slug}`;
  const articleImages = [
    work.image,
    ...(work.media || []).filter((media) => media.type === "image").map((media) => media.src),
  ].filter((image): image is string => Boolean(image)).map((image) => `https://service.drain119.co.kr${image}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: work.title,
    description: work.summary,
    ...(articleImages.length ? { image: articleImages } : {}),
    datePublished: work.date,
    dateModified: work.updatedAt || work.date,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "우리동네전문가", url: "https://service.drain119.co.kr/" },
    publisher: { "@type": "Organization", name: "우리동네전문가", url: "https://service.drain119.co.kr/" },
    keywords: `${work.area}, ${work.service}, ${work.area} ${work.service}, 배관 점검 안내`,
    about: [{ "@type": "Place", name: work.area }, { "@type": "Service", name: work.service }],
    contentLocation: { "@type": "Place", name: work.area },
    mentions: { "@type": "Service", name: work.service, areaServed: { "@type": "Place", name: work.area } },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://service.drain119.co.kr/" },
      { "@type": "ListItem", position: 2, name: "지역별 해결 안내", item: "https://service.drain119.co.kr/work-sites" },
      { "@type": "ListItem", position: 3, name: work.title, item: canonical },
    ],
  };
  const faqSchema = work.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: work.faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } : null;

  return <main className="regionPage workCasePage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    <header className="topbar"><a className="brand" href="/"><span className="brandText"><span className="brandName">우리동네</span><span className="brandNumber">전문가</span></span></a><nav><a href="/services">서비스</a><a href="/service-area">출동지역</a><a href="/work-sites">지역글</a></nav><a className="headerCall" href="tel:16681321">1668-1321</a></header>
    <nav className="regionBreadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><a href="/work-sites">지역별 해결 안내</a><span>›</span><b>{work.title}</b></nav>
    <article className="workCaseDetail"><header><p className="kicker">{work.area} · {work.service}</p><h1>{isAutoGuide ? `지역별 점검 안내 | ${work.title}` : work.title}</h1><div className="workCaseMeta"><time dateTime={work.date}>{work.date}</time>{regionHref && <a href={regionHref}>{work.area} 지역 안내 →</a>}{work.serviceHref && <a href={work.serviceHref}>{work.service} 서비스 안내 →</a>}</div></header>{work.image && <figure className="workCaseMainImage"><img src={work.image} alt={work.imageAlt || work.title} /><figcaption>{work.imageAlt || `${work.area} ${work.service} 현장`}</figcaption></figure>}<p className="workCaseLead">{work.summary}</p><section className="workCaseStory"><h2>{isAutoGuide ? `${work.area} ${work.service} 증상과 점검 순서` : "현장 사연과 해결 내용"}</h2>{work.details.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>{work.faqs && work.faqs.length > 0 && <section className="workCaseFaq" aria-labelledby="work-case-faq"><h2 id="work-case-faq">{work.area} {work.service} 자주 묻는 질문</h2>{work.faqs.map(({ question, answer }) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</section>}{work.media && work.media.length > 0 && <section className="workCaseMedia"><div className="workCaseMediaHeading"><p className="kicker">FIELD MEDIA</p><h2>{work.area} {work.service} 현장 사진과 영상</h2></div><div className="workCaseMediaGrid">{work.media.map((media) => <figure key={media.src}>{media.type === "image" ? <img src={media.src} alt={media.alt} loading="lazy" decoding="async" /> : <video controls playsInline preload="metadata" poster={media.poster} aria-label={media.alt}><source src={media.src} type="video/mp4" /><p>{media.alt}</p></video>}<figcaption>{media.caption}</figcaption></figure>)}</div></section>}<div className="workCaseFacts"><DetailList title="현장 증상" items={work.symptoms} /><DetailList title="진단 내용" items={work.diagnosis} /><DetailList title="사용 장비" items={work.equipment} /><DetailList title="점검 결과" items={work.result} /></div><a className="primary compact" href="tel:16681321">비슷한 증상 상담하기</a></article>
    {related.length > 0 && <section className="relatedWorkCases"><div className="regionTitle"><p className="kicker">RELATED UPDATE</p><h2>관련 지역글</h2></div><div className="workCaseGrid">{related.map((item) => <a key={item.slug} href={`/work-sites/${item.slug}`}>{item.image && <img src={item.image} alt={item.imageAlt || item.title} />}<span>{item.area} · {item.service}</span><h3>{item.title}</h3><p>{item.summary}</p></a>)}</div></section>}
    <section className="finalCta"><p>{work.area} {work.service} 상담</p><h2>현재 증상과 위치를 알려주세요.</h2><a href="tel:16681321"><span>대표 상담전화</span>1668-1321</a></section>
  </main>;
}
