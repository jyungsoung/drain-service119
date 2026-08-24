export type PriorityRegion = {
  slug: "seongnam" | "guri" | "songpa" | "gangdong";
  name: string;
  fullName: string;
  province: string;
  source: "gyeonggi" | "service-area";
  legacyPath: string;
  heroCopy: string;
  buildingCopy: string;
  districtSummary: string;
  focusAreas: string[];
  localProfiles: { title: string; text: string }[];
};

export const priorityRegions: PriorityRegion[] = [
  {
    slug: "seongnam",
    name: "성남",
    fullName: "성남시",
    province: "경기도",
    source: "gyeonggi",
    legacyPath: "/gyeonggi/seongnam",
    heroCopy: "수정구·중원구의 기존 주거지와 분당구의 공동주택·상업시설은 배관 길이와 공용관 연결 방식이 서로 다릅니다. 건물 형태와 반복 여부부터 확인해 점검 범위를 나눕니다.",
    buildingCopy: "분당의 아파트·오피스텔, 모란·야탑·정자 생활권의 상가, 수정·중원구 주택과 빌라는 세대 배관과 공용 배관의 증상을 구분하는 과정이 중요합니다.",
    districtSummary: "수정구 · 중원구 · 분당구",
    focusAreas: ["분당구 공동주택", "수정구 주택·빌라", "중원구 상가", "판교·야탑 생활권"],
    localProfiles: [
      { title: "수정구", text: "신흥·태평·수진동의 주택과 상가, 위례 생활권 공동주택의 배수 증상을 건물 구조에 맞춰 구분합니다." },
      { title: "중원구", text: "성남동·금광동·은행동의 주거·상업 혼합 건물은 반복 막힘과 공용관 영향 여부를 함께 확인합니다." },
      { title: "분당구", text: "야탑·서현·정자·판교의 아파트와 오피스텔은 세대 횡주관과 공용관 연결 구간을 나누어 점검합니다." },
      { title: "상업시설", text: "음식점과 다중이용시설은 유지방 사용량, 배관 길이, 작업 가능한 시간과 장비 진입 위치를 먼저 확인합니다." },
    ],
  },
  {
    slug: "guri",
    name: "구리",
    fullName: "구리시",
    province: "경기도",
    source: "gyeonggi",
    legacyPath: "/gyeonggi/guri",
    heroCopy: "인창·수택 생활권의 아파트와 상가, 갈매지구 공동주택, 교문·토평의 주택과 빌라는 배관 접근 위치가 다릅니다. 한 곳만 느린지 여러 배수구가 함께 문제인지부터 구분합니다.",
    buildingCopy: "구리 도심의 주거·상업 혼합 건물과 갈매 생활권의 공동주택은 세대 내부 막힘, 건물 공용관, 외부 오수관 중 영향을 받는 구간을 먼저 확인해야 합니다.",
    districtSummary: "갈매동 · 인창동 · 교문동 · 수택동 · 토평동",
    focusAreas: ["인창·수택 상가", "갈매 공동주택", "교문동 주택", "토평동 생활권"],
    localProfiles: [
      { title: "인창동·수택동", text: "공동주택과 생활 상가가 밀집한 지역은 싱크대 배수 지연과 공용 배관 증상을 나누어 확인합니다." },
      { title: "갈매동", text: "공동주택과 상업시설은 세대 배관의 막힘인지 여러 시설이 연결된 배관 문제인지 범위를 좁혀갑니다." },
      { title: "교문동", text: "아파트·빌라·주택이 함께 있어 건물 형태와 외부 맨홀 위치, 이전 작업 여부를 먼저 확인합니다." },
      { title: "토평동", text: "주거지와 사업장은 배관 연결 거리와 장비 접근 위치를 살핀 뒤 필요한 점검 순서를 안내합니다." },
    ],
  },
  {
    slug: "songpa",
    name: "송파",
    fullName: "송파구",
    province: "서울특별시",
    source: "service-area",
    legacyPath: "/service-area/seoul/songpa",
    heroCopy: "잠실의 대단지 공동주택과 상업시설, 가락·문정의 주거·업무시설, 위례 생활권은 배관 사용량과 공용관 연결 범위가 다릅니다. 증상이 나타나는 배수구와 시간대를 함께 확인합니다.",
    buildingCopy: "고층 공동주택과 오피스텔은 세대 횡주관과 입상관 영향을 구분해야 하고, 음식점과 상가 주방은 유지방이 쌓인 배관 길이와 집수정 연결 상태를 확인해야 합니다.",
    districtSummary: "잠실 · 가락 · 문정 · 방이 · 석촌 · 위례",
    focusAreas: ["잠실 공동주택", "가락시장 생활권", "문정 업무시설", "위례 상가·주거"],
    localProfiles: [
      { title: "잠실동·신천동", text: "대단지 공동주택과 상업시설은 세대 내부 배관과 공용 배관에서 나타나는 증상 범위를 구분합니다." },
      { title: "가락동·문정동", text: "주거·업무·상업시설이 함께 있는 생활권은 사용량과 반복 시점, 배관 접근 위치를 먼저 확인합니다." },
      { title: "방이동·석촌동", text: "주택과 다세대, 음식점 상가는 싱크대 트랩부터 긴 횡주관까지 가능한 원인 구간을 순서대로 살펴봅니다." },
      { title: "위례동·장지동", text: "공동주택과 상가는 한 배수구의 문제인지 연결 배관의 문제인지 확인한 뒤 작업 범위를 안내합니다." },
    ],
  },
  {
    slug: "gangdong",
    name: "강동",
    fullName: "강동구",
    province: "서울특별시",
    source: "service-area",
    legacyPath: "/service-area/seoul/gangdong",
    heroCopy: "천호·길동의 기존 주거·상업시설과 고덕·강일의 공동주택은 배관 연식과 연결 구조가 다릅니다. 단순 통수보다 막힘 위치와 오염 범위를 구분해 필요한 작업을 안내합니다.",
    buildingCopy: "강동구는 기존 빌라·주택·상가와 대단지 공동주택이 함께 있어 트랩, 세대 가지관, 공용관, 외부 맨홀 중 확인할 구간을 건물별로 나누어야 합니다.",
    districtSummary: "천호 · 길동 · 암사 · 명일 · 고덕 · 강일",
    focusAreas: ["천호·길동 상가", "암사·명일 주거지", "고덕 대단지", "강일 공동주택"],
    localProfiles: [
      { title: "천호동·길동", text: "상가와 주거가 혼합된 건물은 배관 사용량과 반복 막힘, 공용관 연결 여부를 함께 확인합니다." },
      { title: "암사동·명일동", text: "아파트·빌라·주택이 함께 있어 배수구 한 곳의 문제인지 건물 연결 배관의 문제인지 나누어 살펴봅니다." },
      { title: "고덕동·상일동", text: "대단지 공동주택은 세대 배관과 공용 배관의 관리 범위를 구분하고 접근 가능한 지점부터 확인합니다." },
      { title: "강일동", text: "공동주택과 생활 상가는 증상이 나타난 위치, 물 사용량과 이전 작업 기록을 바탕으로 점검 순서를 정합니다." },
    ],
  },
];

export const priorityRegionBySlug = (slug: string) => priorityRegions.find((region) => region.slug === slug);

export const priorityRegionHref = (slug?: string) => {
  if (!slug) return undefined;
  return priorityRegionBySlug(slug) ? `/${slug}` : undefined;
};

export const priorityLegacyPaths = new Set(priorityRegions.map((region) => region.legacyPath));
