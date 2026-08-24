export type WorkCase = {
  slug: string;
  title: string;
  area: string;
  // 서울 25개 구·경기도 31개 시군의 영문 대표주소 값입니다. 예: gangnam, suwon, hanam
  regionSlug?: string;
  areaHref?: string;
  service: string;
  serviceHref?: string;
  date: string;
  updatedAt?: string;
  summary: string;
  image: string;
  imageAlt?: string;
  details: string[];
  symptoms?: string[];
  diagnosis?: string[];
  equipment?: string[];
  result?: string[];
};

// 실제 시공현장만 등록합니다. 새 사례는 WORK_CASE_TEMPLATE을 복사해 아래 배열에 추가하세요.
// regionSlug만 정확히 입력하면 서울·경기 해당 지역 대표페이지에도 자동으로 연결됩니다.
// 그러면 시공현장 목록·상세페이지·해당 지역 대표페이지·사이트맵에 함께 반영됩니다.
export const workCases: WorkCase[] = [];

export const WORK_CASE_TEMPLATE: WorkCase = {
  slug: "지역-동-서비스-날짜",
  title: "지역과 증상이 드러나는 실제 시공현장 제목",
  area: "시·구 동 이름",
  regionSlug: "hanam",
  areaHref: "/hanam",
  service: "싱크대막힘",
  serviceHref: "/services/sink-clog",
  date: "YYYY-MM-DD",
  summary: "현장 도착 당시 증상과 작업 결과를 한두 문장으로 요약합니다.",
  image: "/images/work-sites/실제사진.webp",
  imageAlt: "지역·건물·작업 내용이 드러나는 실제 현장 사진 설명",
  details: ["건물 형태와 고객이 알려준 증상", "확인한 배관 구간과 진단 과정", "작업 후 배수 상태와 안내 내용"],
  symptoms: ["물이 천천히 내려감"],
  diagnosis: ["배관 내시경으로 확인한 실제 내용"],
  equipment: ["현장에서 실제로 사용한 장비"],
  result: ["작업 후 실제 확인한 결과"],
};
