export type ServiceLanding = {
  slug: string;
  title: string;
  cardTitle: string;
  image: string;
  alt: string;
  description: string;
  symptoms: string[];
  checks: string[];
  equipment: string;
};

export const serviceLandings: ServiceLanding[] = [
  {
    slug: "sink-clog",
    title: "싱크대막힘",
    cardTitle: "싱크대 막힘",
    image: "/images/sink-service.webp",
    alt: "싱크대 하부 배관을 분리해 막힘 원인을 점검하는 작업자",
    description: "싱크대 배수 지연과 역류, 하부장 악취가 나타날 때 트랩부터 벽 배관과 공용관 연결 구간까지 원인을 구분합니다.",
    symptoms: ["물이 평소보다 천천히 내려감", "한꺼번에 사용하면 싱크대로 역류함", "하부장에서 악취나 꿀렁거리는 소리가 남"],
    checks: ["배수 트랩과 연결 호스의 이물질", "벽 안쪽 가지관의 유지방 축적", "세대 횡주관과 공용 배관의 통수 상태"],
    equipment: "트랩 점검과 스프링 장비를 먼저 검토하고, 반복되는 막힘은 내시경으로 오염 구간을 확인한 뒤 고압세척 범위를 정합니다.",
  },
  {
    slug: "toilet-clog",
    title: "변기막힘",
    cardTitle: "변기 막힘",
    image: "/images/service-toilet.webp",
    alt: "변기 막힘과 오수관 연결 상태를 확인하는 배관 작업자",
    description: "변기 물이 차오르거나 내려가지 않을 때 변기 내부 이물질과 바닥 배관, 오수관 문제를 나누어 확인합니다.",
    symptoms: ["물을 내리면 수위가 올라옴", "변기에서 꿀렁거리는 소리가 남", "화장실 바닥 배수구까지 함께 느려짐"],
    checks: ["변기 트랩 내부의 이물질", "변기와 바닥 배관 연결 상태", "여러 배수구가 연결된 오수관의 막힘 범위"],
    equipment: "증상에 따라 관통 장비와 석션 장비를 검토하고, 더 깊은 구간이 의심되면 배관 내시경으로 위치를 확인합니다.",
  },
  {
    slug: "drain-clog",
    title: "하수구막힘",
    cardTitle: "하수구 막힘",
    image: "/images/service-dispatch.webp",
    alt: "하수구막힘 현장으로 장비를 들고 출동하는 작업자",
    description: "욕실·베란다·상가 바닥 하수구가 느리거나 역류할 때 배수구 초입과 공용 배관, 외부 맨홀 연결 상태를 살펴봅니다.",
    symptoms: ["바닥 배수구에 물이 고임", "여러 곳에서 동시에 악취가 올라옴", "물을 많이 사용하면 낮은 배수구로 역류함"],
    checks: ["배수구 트랩과 짧은 가지관", "건물 공용 하수 배관", "외부 맨홀과 오수관 연결 구간"],
    equipment: "막힘 위치와 배관 길이에 따라 스프링, 석션, 내시경을 사용하며 오염이 넓게 쌓인 경우 고압세척을 검토합니다.",
  },
  {
    slug: "high-pressure-cleaning",
    title: "배관고압세척",
    cardTitle: "배관 고압세척",
    image: "/images/inspection-equipment.webp",
    alt: "배관 내부 오염을 제거하는 고압세척 장비와 전용 호스",
    description: "긴 배관에 유지방과 슬러지가 넓게 붙어 반복해서 막힐 때 배관 재질과 길이, 장비 진입 위치를 확인하고 세척 범위를 정합니다.",
    symptoms: ["단순 통수 후에도 다시 막힘", "상가 주방 배관의 배수 속도가 계속 저하됨", "긴 횡주관이나 공용관 오염이 의심됨"],
    checks: ["배관 재질과 직경", "세척 호스 진입 위치", "오염 구간과 배출 경로"],
    equipment: "내시경으로 배관 상태와 세척 가능 여부를 확인한 뒤 전용 노즐과 고압 호스를 현장 조건에 맞춰 선택합니다.",
  },
  {
    slug: "pipe-camera",
    title: "배관내시경",
    cardTitle: "배관 내시경",
    image: "/images/plumber-worker.webp",
    alt: "배관 내시경 카메라로 막힘 위치와 내부 상태를 확인하는 작업자",
    description: "겉으로 확인하기 어려운 막힘 위치와 배관 내부의 오염, 파손 의심 구간을 카메라로 살펴 작업 방향을 정합니다.",
    symptoms: ["같은 위치가 반복해서 막힘", "깊은 곳의 원인을 확인하기 어려움", "이물질 위치나 배관 상태 확인이 필요함"],
    checks: ["카메라 진입이 가능한 배관 입구", "배관 내부 오염과 이물질 위치", "연결부 이탈이나 구조적 이상 여부"],
    equipment: "배관 직경과 진입 거리에 맞는 카메라와 탐지 장비를 선택하고 화면으로 확인된 상태를 바탕으로 작업 범위를 안내합니다.",
  },
  {
    slug: "leak-detection",
    title: "누수탐지",
    cardTitle: "누수탐지",
    image: "/images/service-leak-detection.webp",
    alt: "전문 탐지 장비로 배관 누수 의심 지점을 확인하는 작업자",
    description: "계량기 움직임과 벽·바닥의 습기, 수도 압력 변화를 확인해 누수 가능 구간을 좁히고 필요한 점검 방향을 안내합니다.",
    symptoms: ["물을 사용하지 않아도 계량기가 움직임", "벽이나 바닥에 습기와 물자국이 생김", "수도 압력이 갑자기 낮아짐"],
    checks: ["급수·온수·난방 배관 구분", "압력 검사와 계량기 변화", "청음·가스식 등 현장에 맞는 탐지 방법"],
    equipment: "건물 구조와 누수 양상에 따라 압력계, 청음 장비와 탐지 장비를 조합해 의심 범위를 단계적으로 좁힙니다.",
  },
];

export const serviceBySlug = (slug: string) => serviceLandings.find((service) => service.slug === slug);

export const regionHubs = [
  { name: "경기도", href: "/gyeonggi", detail: "31개 시·군 지역 안내" },
  { name: "서울특별시", href: "/service-area/seoul", detail: "25개 자치구 지역 안내" },
  { name: "인천광역시", href: "/service-area/incheon", detail: "군·구·동 지역 안내" },
  { name: "강원특별자치도", href: "/service-area/gangwon", detail: "시·군·읍면동 지역 안내" },
  { name: "충청북도", href: "/service-area/chungbuk", detail: "시·군·읍면동 지역 안내" },
  { name: "충청남도", href: "/service-area/chungnam", detail: "시·군·읍면동 지역 안내" },
  { name: "대전광역시", href: "/service-area/daejeon", detail: "자치구·동 지역 안내" },
  { name: "세종특별자치시", href: "/service-area/sejong", detail: "읍면동 지역 안내" },
];
