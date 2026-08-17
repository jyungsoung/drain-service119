const services=[
  ["24시간 상담","/images/service-consultation.webp","/service-area"],
  ["하수구 막힘","/images/service-dispatch.webp","/services/drain-clog"],
  ["배관 고압세척","/images/inspection-equipment.webp","/services/high-pressure-cleaning"],
  ["배관 내시경","/images/plumber-worker.webp","/services/pipe-camera"],
  ["싱크대 막힘","/images/sink-service.webp","/services/sink-clog"],
  ["변기 막힘","/images/service-toilet.webp","/services/toilet-clog"],
];
const causes=[
  ["유지방과 음식물 찌꺼기","기름과 작은 음식물이 배관 안에서 굳으면 통로가 좁아져 배수가 느려지고 다시 막힐 수 있습니다."],
  ["트랩과 연결부 이물질","싱크대 아래 트랩과 연결 호스의 슬러지는 악취와 꿀렁거리는 소리를 만들 수 있습니다."],
  ["공용관과 긴 횡주관","여러 배수구가 연결된 건물은 세대 내부뿐 아니라 공용관과 수평 배관도 함께 구분해야 합니다."],
  ["배관 경사와 노후 상태","한곳에 찌꺼기가 반복해서 쌓인다면 배관 구조와 내부 상태를 함께 확인할 필요가 있습니다."],
];
const buildings=[
  ["아파트·오피스텔","세대 배관과 공용 배관의 증상 범위를 나누어 확인합니다."],["빌라·단독주택","실내 배관과 외부 맨홀·오수관 연결 상태를 함께 살펴봅니다."],["음식점·상가 주방","유지방 사용량과 영업시간, 배관 길이와 접근 위치를 확인합니다."],["공장·사업장","배관 직경과 장비 진입 공간, 작업 가능한 시간을 먼저 확인합니다."],
];

export default function LocalLandingContent({label}:{label:string}){
  return <>
    <section className="serviceShowcase section localFullService"><div className="servicePanel"><div className="serviceHeading"><p className="kicker">DRAIN SERVICE GUIDE</p><h2>{label} 배관막힘 서비스 안내</h2><p>응급배관119 대표번호 <b>1668-1321</b> · 막힘과 배관 점검 상담</p></div><div className="servicePhotoGrid drainServicePhotoGrid">{services.map(([title,image,href])=><a className="servicePhotoCard" href={href} key={title} aria-label={`${title} 상세 안내`}><img src={image} alt={`${label} ${title} 서비스`}/><span><strong>{title}</strong><small>지역별 안내 보기</small><b>1668-1321</b></span></a>)}</div><a className="inlineLeakGuide" href="/leak-detection"><span>{label} 누수 증상은 별도로 확인하세요</span><b>누수탐지 전용페이지 보기 →</b></a></div></section>
    <article className="seoArticle localSeoArticle">
      <nav className="articleToc"><b>{label} 배관 안내 목차</b><a href="#local-guide">막힘 점검</a><a href="#local-causes">반복 원인</a><a href="#local-equipment">장비 선택</a><a href="#local-building">건물별 차이</a><a href="#work-site">시공현장</a></nav>
      <section className="articleSection articleLead" id="local-guide"><p className="kicker">LOCAL DRAIN GUIDE</p><h2>{label} 싱크대막힘,<br/>증상과 배관 구조부터 확인합니다</h2><div className="articleColumns"><p>{label}에서 물이 평소보다 천천히 내려가거나 배수할 때 소리가 난다면 배관 통로가 좁아지고 있을 수 있습니다. 유지방과 음식물 찌꺼기가 계속 쌓이면 많은 물을 사용할 때 역류하거나 하부장에서 악취가 날 수 있습니다.</p><p>같은 증상이라도 원인은 트랩, 벽 안쪽 가지관, 세대 횡주관 또는 건물 공용관처럼 서로 다를 수 있습니다. 건물 형태와 이전 작업 여부를 확인하고 접근 가능한 구간부터 점검해 필요한 작업을 안내합니다.</p></div><aside className="articleNotice"><b>상담할 때 알려주세요</b><span>배수 속도 · 역류 시점 · 악취와 소리 · 이전 작업 여부 · 건물 형태</span></aside></section>
      <section className="articleSection" id="local-causes"><div className="articleTitle"><div><p className="kicker">CAUSE</p><h2>반복해서 막히는<br/>대표적인 원인</h2></div><p>표면의 물만 빼는 것과 배관 안쪽에 남은 원인을 확인하는 것은 다릅니다.</p></div><div className="causeGrid">{causes.map(([title,text],i)=><section key={title}><b>0{i+1}</b><h3>{title}</h3><p>{text}</p></section>)}</div></section>
      <section className="articleSection equipmentSection" id="local-equipment"><div className="equipmentCopy"><p className="kicker">EQUIPMENT</p><h2>스프링·석션·내시경·고압세척,<br/>상태에 맞춰 선택합니다</h2><p>입구의 이물질과 짧은 구간은 트랩 또는 스프링 작업을 검토합니다. 물과 찌꺼기 흡입이 필요하면 석션 장비를, 내부 확인이 필요하면 배관 내시경을 사용합니다.</p><p>긴 배관에 오염이 넓게 쌓였거나 반복 막힘이 있다면 배관 길이와 재질, 접근 위치를 확인한 뒤 고압세척 범위를 정합니다.</p></div><figure><img src="/images/inspection-equipment.webp" alt={`${label} 배관 내시경과 고압세척 장비`}/><figcaption>현장 상태를 확인한 뒤 필요한 장비와 작업 범위를 안내합니다.</figcaption></figure></section>
      <section className="articleSection" id="local-building"><div className="articleTitle"><div><p className="kicker">BUILDING TYPE</p><h2>건물에 따라 달라지는<br/>배관 점검 범위</h2></div><p>{label} 안에서도 건물 형태와 배관 연결 구조에 따라 확인할 구간이 달라집니다.</p></div><div className="buildingGrid">{buildings.map(([title,text])=><section key={title}><h3>{title}</h3><p>{text}</p></section>)}</div></section>
    </article>
  </>;
}
