export type DongPage = {
  slug: string;
  name: string;
  areaCopy: string;
  buildingFocus: string;
  nearby: string[];
};

export const hanamDongs: DongPage[] = [
  { slug: "cheonhyeon-dong", name: "천현동", areaCopy: "주거지와 생활 상권이 함께 있는 지역으로, 실내 배수구와 외부 오수관의 증상을 구분해 확인합니다.", buildingFocus: "주택·빌라·소규모 상가", nearby: ["changwoo-dong", "sinjang-dong", "hasangok-dong"] },
  { slug: "hasangok-dong", name: "하산곡동", areaCopy: "주택과 외곽 시설이 함께 있어 배관 길이, 외부 맨홀과 오수관 연결 여부를 먼저 확인합니다.", buildingFocus: "단독주택·사업장·외부 배관", nearby: ["sangsangok-dong", "cheonhyeon-dong", "baegalmi-dong"] },
  { slug: "changwoo-dong", name: "창우동", areaCopy: "공동주택과 기존 주거지가 함께 있어 세대 배관과 공용 배관의 증상 범위를 나누어 점검합니다.", buildingFocus: "아파트·주택·생활 상가", nearby: ["sinjang-dong", "cheonhyeon-dong", "deokpung-dong"] },
  { slug: "baegalmi-dong", name: "배알미동", areaCopy: "외곽 주택과 시설은 장비 진입 위치와 배관의 긴 연결 구간을 상담 단계에서 먼저 확인합니다.", buildingFocus: "주택·외곽 시설·장거리 배관", nearby: ["hasangok-dong", "sangsangok-dong", "cheonhyeon-dong"] },
  { slug: "sangsangok-dong", name: "상산곡동", areaCopy: "주택과 사업장 배관은 실내 막힘뿐 아니라 외부 맨홀과 오수관 흐름까지 함께 살펴야 합니다.", buildingFocus: "단독주택·창고·사업장", nearby: ["hasangok-dong", "baegalmi-dong", "cheongung-dong"] },
  { slug: "sinjang-dong", name: "신장동", areaCopy: "아파트와 빌라, 상업시설이 혼재해 싱크대 가지관과 건물 공용관의 증상을 구분해 상담합니다.", buildingFocus: "아파트·빌라·상업시설", nearby: ["deokpung-dong", "changwoo-dong", "pungsan-dong"] },
  { slug: "dangjeong-dong", name: "당정동", areaCopy: "사업장과 생활권 시설은 배관 직경, 배출 특성, 작업 가능한 시간과 장비 진입 조건을 확인합니다.", buildingFocus: "사업장·상가·외부 배관", nearby: ["deokpung-dong", "pungsan-dong", "choil-dong"] },
  { slug: "deokpung-dong", name: "덕풍동", areaCopy: "공동주택, 빌라와 상가가 이어진 생활권으로 반복 막힘 시 연결 배관의 범위를 확인합니다.", buildingFocus: "아파트·빌라·상가", nearby: ["sinjang-dong", "pungsan-dong", "dangjeong-dong"] },
  { slug: "mangwol-dong", name: "망월동", areaCopy: "공동주택과 상가가 밀집해 세대 싱크대 배관과 음식점 주방 배관의 막힘 유형을 구분합니다.", buildingFocus: "아파트·오피스텔·상가", nearby: ["misa-dong", "seon-dong", "pungsan-dong"] },
  { slug: "pungsan-dong", name: "풍산동", areaCopy: "아파트와 생활 상권이 함께 있어 세대 내부 배수와 공용관 연결 상태를 순서대로 확인합니다.", buildingFocus: "아파트·상가·공용 배관", nearby: ["deokpung-dong", "mangwol-dong", "misa-dong"] },
  { slug: "misa-dong", name: "미사동", areaCopy: "공동주택과 상업시설의 싱크대·변기·하수구 증상을 건물 구조와 사용량에 맞춰 점검합니다.", buildingFocus: "아파트·오피스텔·상업시설", nearby: ["mangwol-dong", "seon-dong", "pungsan-dong"] },
  { slug: "seon-dong", name: "선동", areaCopy: "공동주택과 한강변 생활권의 배수 문제는 세대 배관과 건물 공용관의 영향을 나누어 확인합니다.", buildingFocus: "공동주택·상가·공용관", nearby: ["mangwol-dong", "misa-dong", "pungsan-dong"] },
  { slug: "gambuk-dong", name: "감북동", areaCopy: "주택과 생활시설이 함께 있는 지역으로 실내 배관과 외부 오수관 연결 상태를 함께 고려합니다.", buildingFocus: "주택·빌라·생활시설", nearby: ["gamil-dong", "gami-dong", "hang-dong"] },
  { slug: "gamil-dong", name: "감일동", areaCopy: "신축 공동주택과 상가의 배수 증상은 세대 가지관, 공용 배관과 관리 범위를 구분해 확인합니다.", buildingFocus: "아파트·상가·공용 배관", nearby: ["gami-dong", "hakam-dong", "gambuk-dong"] },
  { slug: "gami-dong", name: "감이동", areaCopy: "공동주택과 주거시설의 싱크대·욕실 배수 문제를 배관 접근 위치와 반복 여부에 따라 점검합니다.", buildingFocus: "공동주택·주택·생활 상가", nearby: ["gamil-dong", "hakam-dong", "gambuk-dong"] },
  { slug: "hakam-dong", name: "학암동", areaCopy: "위례 생활권의 공동주택과 상가는 세대 내부 배관과 공용 배관의 증상을 구분하는 것이 중요합니다.", buildingFocus: "아파트·오피스텔·상가", nearby: ["gamil-dong", "gami-dong", "gwangam-dong"] },
  { slug: "gyosan-dong", name: "교산동", areaCopy: "주택과 외곽 시설의 배수 문제는 배관 길이, 맨홀 위치와 오수관 흐름을 함께 확인합니다.", buildingFocus: "주택·농가·외부 배관", nearby: ["cheongung-dong", "hasachang-dong", "cheonhyeon-dong"] },
  { slug: "cheongung-dong", name: "춘궁동", areaCopy: "주택과 사업장이 함께 있어 실내 배수구부터 외부 맨홀까지 접근 가능한 구간을 순서대로 확인합니다.", buildingFocus: "주택·사업장·외부 오수관", nearby: ["gyosan-dong", "sangsachang-dong", "choil-dong"] },
  { slug: "hasachang-dong", name: "하사창동", areaCopy: "주택과 외곽 시설은 배관 경사와 긴 관로, 외부 맨홀의 통수 상태를 함께 살펴봅니다.", buildingFocus: "주택·사업장·장거리 배관", nearby: ["sangsachang-dong", "gyosan-dong", "cheongung-dong"] },
  { slug: "sangsachang-dong", name: "상사창동", areaCopy: "주택과 사업장 배관은 오염 구간과 맨홀 연결 위치를 확인해 필요한 작업 범위를 정합니다.", buildingFocus: "주택·사업장·외부 배관", nearby: ["hasachang-dong", "cheongung-dong", "hang-dong"] },
  { slug: "hang-dong", name: "항동", areaCopy: "외곽 주거지와 시설의 막힘은 실내 증상만으로 판단하지 않고 외부 관로 연결 상태를 확인합니다.", buildingFocus: "주택·외곽 시설·오수관", nearby: ["gambuk-dong", "sangsachang-dong", "gwangam-dong"] },
  { slug: "choil-dong", name: "초일동", areaCopy: "주택과 사업장, 물류 시설의 배관은 관경과 장비 접근성, 외부 배수 경로를 먼저 살펴봅니다.", buildingFocus: "사업장·주택·외부 배관", nearby: ["choi-dong", "cheongung-dong", "dangjeong-dong"] },
  { slug: "choi-dong", name: "초이동", areaCopy: "주택과 사업장이 혼재해 싱크대·하수구 막힘 위치와 외부 오수관 연결 여부를 구분해 확인합니다.", buildingFocus: "주택·사업장·상가", nearby: ["choil-dong", "gwangam-dong", "gambuk-dong"] },
  { slug: "gwangam-dong", name: "광암동", areaCopy: "주택과 외곽 시설은 배관 길이와 맨홀 위치, 인접 배수구의 동시 증상 여부를 확인합니다.", buildingFocus: "주택·외곽 시설·외부 관로", nearby: ["choi-dong", "hakam-dong", "hang-dong"] },
];

export const getDong = (slug: string) => hanamDongs.find((dong) => dong.slug === slug);
