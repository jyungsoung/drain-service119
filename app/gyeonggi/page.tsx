import type { Metadata } from "next";
import { cities, unitsForCity } from "./area-data";
import RegionMap from "./RegionMap";

export const metadata: Metadata = {
  title: "경기도 싱크대막힘·변기막힘·하수구막힘 지역 안내 | 응급배관119",
  description: "경기도 31개 시·군, 일반구와 600개 읍면동의 싱크대막힘·변기막힘·하수구막힘·고압세척 상담 지역 안내.",
  alternates: { canonical: "/gyeonggi" },
};

export default function GyeonggiIndex() {
  return <main className="regionPage">
    <header className="topbar"><a className="brand" href="/"><img className="brandSeal" src="/images/emergency-pipe-stamp.jpeg" alt="응급배관 도장 로고" /><span className="brandText"><span className="brandName">응급배관</span><span className="brandNumber">119</span></span></a><nav><a href="#cities">시·군 선택</a><a href="/">하남 대표 페이지</a></nav><a className="headerCall" href="tel:16681321">1668-1321</a></header>
    <section className="regionIndexHero"><p className="kicker">GYEONGGI SERVICE AREA</p><h1>경기도 싱크대막힘·변기막힘,<br /><em>시·군·구·동별 안내</em></h1><p>경기도 31개 시·군과 일반구, 600개 읍·면·동을 연결했습니다. 현재 위치를 선택하면 지역별 배관막힘 증상과 상담 내용을 확인할 수 있습니다.</p><a className="primary" href="tel:16681321">경기도 배관 상담 1668-1321</a></section>
    <section className="regionMapSection regionOverviewMap"><div className="regionMapCopy"><p className="kicker">GYEONGGI MAP</p><h2>경기도 전체<br />지역 위치 안내</h2><p>아래 지도에서 경기도 중심 위치를 확인하고, 이어지는 지역 목록에서 시·군을 선택하면 구와 읍·면·동 상세 페이지로 이동합니다.</p><a className="primary compact" href="#cities">시·군 선택하기</a></div><RegionMap label="경기도" center={[37.4138,127.5183]} zoom={9} /></section>
    <section className="regionDirectory" id="cities"><div className="regionTitle"><p className="kicker">31 CITIES & COUNTIES</p><h2>시·군을 선택하세요</h2></div><div className="cityDirectoryGrid">{cities.map(city => { const units = unitsForCity(city); return <a key={city.slug} href={`/gyeonggi/${city.slug}`}><strong>{city.name}</strong><span>{units.length > 1 ? `${units.length}개 구 · ` : ""}{units.reduce((n,u)=>n+u.locals.length,0)}개 읍면동</span></a> })}</div></section>
    <section className="finalCta"><p>경기도 배관막힘 상담</p><h2>현재 지역과 증상을 알려주세요.</h2><a href="tel:16681321"><span>365일 상담전화</span>1668-1321</a></section>
    <footer className="siteFooterV2"><div className="footerBrandV2"><img src="/images/emergency-pipe-stamp.jpeg" alt="응급배관 도장 로고" /><div><span>응급배관</span><b>119</b></div></div><p className="footerServicesV2">싱크대 · 변기 · 하수구 막힘 / 고압세척 · 배관청소</p><p className="footerLegalV2">상담 가능 시간 및 출동 여부는 현장 일정에 따라 달라질 수 있습니다. © 응급배관119</p></footer>
  </main>;
}
