import generatedCasesRaw from "./generated-cases.json";

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
  image?: string;
  imageAlt?: string;
  details: string[];
  faqs?: { question: string; answer: string }[];
  // 자동 생성 본문의 summary + details + FAQ 질문·답변을 공백으로 이은 글자 수입니다.
  bodyLength?: number;
  contentVersion?: 2;
  symptoms?: string[];
  diagnosis?: string[];
  equipment?: string[];
  result?: string[];
  media?: {
    type: "image" | "video";
    src: string;
    alt: string;
    caption: string;
    poster?: string;
  }[];
};

// 자동 생성 글은 generated-cases.json에 저장하고, 실제 현장 기록은 manualWorkCases에 유지합니다.
// 자동 생성 글은 실제 방문·작업 사실을 꾸며 쓰지 않고 지역 서비스 안내 형식으로만 생성합니다.
const generatedCases = generatedCasesRaw as WorkCase[];

const manualWorkCases: WorkCase[] = [
  {
    slug: "yongsan-leak-detection-pressure-window-check-20260825",
    title: "용산 누수탐지, 배관 압력검사와 창호 균열을 함께 확인한 현장",
    area: "서울 용산구",
    regionSlug: "yongsan",
    areaHref: "/yongsan",
    service: "누수탐지",
    serviceHref: "/leak-detection/seoul/yongsan",
    date: "2026-08-25",
    summary: "용산구 누수 의심 현장에서 싱크대 하부 분배기와 배관 연결부를 확인하고 디지털 압력검사를 진행했습니다. 배관 계통과 외부 창호의 균열·실링 노후 가능성을 나누어 점검한 실제 현장입니다.",
    image: "/images/work-sites/yongsan-leak-manifold.webp",
    imageAlt: "용산 누수탐지 현장 싱크대 하부 배관 분배기와 적산열량계 점검",
    details: [
      "누수 흔적은 물이 보이는 자리와 실제 시작 지점이 다를 수 있습니다. 이번 용산 누수탐지 현장에서는 배관에서 새는 물인지, 외부 창호 틈을 통해 들어온 물인지 한 가지 원인으로 먼저 단정하지 않고 실내와 외부를 나누어 확인했습니다.",
      "싱크대 하부에 설치된 분배기와 밸브, 적산열량계, 배관 연결 부속을 육안으로 점검했습니다. 좁은 공간의 연결부에 물방울이나 부식 흔적이 있는지 살핀 뒤 확인할 배관 계통을 구분했습니다.",
      "디지털 압력게이지를 연결해 시험압력을 형성하고 시간에 따른 수치 변화를 확인했습니다. 촬영된 검사 구간에서는 약 8.18~8.20 부근의 수치가 확인됐으며 급격하게 압력이 떨어지는 모습은 나타나지 않았습니다. 짧은 촬영 수치만으로 전체 배관의 이상 유무를 단정하지 않고 다른 가능성도 함께 점검했습니다.",
      "외부 창호 주변에서는 마감재 균열과 벌어진 실링 구간이 확인됐습니다. 비가 온 뒤 증상이 심해지는 누수라면 창틀과 외벽 틈을 통한 빗물 유입 가능성도 배관 누수와 분리해서 확인해야 합니다.",
      "배관 압력 변화, 수도계량기와 보일러 상태, 누수 발생 시점과 날씨의 관계를 함께 비교해 후속 점검과 보수가 필요한 범위를 안내했습니다. 배관 문제인데 외부만 보수하거나 외부 유입인데 실내를 먼저 철거하지 않도록 원인 계통을 구분하는 과정이 중요합니다.",
    ],
    symptoms: [
      "실내 창호와 벽체 주변의 누수 의심 흔적",
      "배관 누수와 외부 빗물 유입 원인을 구분해야 하는 상태",
    ],
    diagnosis: [
      "싱크대 하부 분배기·밸브·적산열량계와 배관 연결부 육안점검",
      "디지털 압력게이지 약 8.18~8.20 구간의 압력 유지 상태 확인",
      "외부 창호 마감재 균열과 실링 벌어짐 확인",
    ],
    equipment: [
      "디지털 배관 압력게이지",
      "아날로그 압력게이지",
      "배관 계통 분리 및 연결 장비",
    ],
    result: [
      "촬영된 검사 구간에서 급격한 압력 저하가 나타나지 않음을 확인",
      "배관 계통과 외부 창호 유입 가능성을 분리해 점검",
      "추가 확인 및 보수가 필요한 창호 균열 구간 안내",
    ],
    media: [
      {
        type: "image",
        src: "/images/work-sites/yongsan-leak-valve.webp",
        alt: "용산구 누수탐지 중 싱크대 하부 배관 밸브와 연결부 확인",
        caption: "좁은 공간에 설치된 밸브와 배관 연결부의 누수 흔적을 확인했습니다.",
      },
      {
        type: "image",
        src: "/images/work-sites/yongsan-pressure-gauge-start.webp",
        alt: "용산 배관 누수검사 디지털 압력게이지 8.18 측정",
        caption: "디지털 압력게이지를 연결해 시험압력과 초기 수치를 확인했습니다.",
      },
      {
        type: "image",
        src: "/images/work-sites/yongsan-pressure-gauge-check.webp",
        alt: "용산 누수탐지 배관 압력 유지 상태 재확인",
        caption: "같은 조건에서 수치가 유지되는지 시간 간격을 두고 비교했습니다.",
      },
      {
        type: "image",
        src: "/images/work-sites/yongsan-heat-meter.webp",
        alt: "용산구 난방배관 누수 점검 적산열량계 확인",
        caption: "분배기 주변 적산열량계와 난방배관 연결 상태도 함께 확인했습니다.",
      },
      {
        type: "video",
        src: "/videos/work-sites/yongsan-window-crack-closeup.mp4",
        alt: "용산 누수탐지 외부 창호 마감재 균열 근접 점검 영상",
        caption: "외부 창호 주변 마감재의 갈라진 구간을 가까이에서 확인했습니다.",
        poster: "/images/work-sites/yongsan-window-crack-poster.webp",
      },
      {
        type: "video",
        src: "/videos/work-sites/yongsan-window-seal-gap.mp4",
        alt: "용산구 창호 누수 의심 실링 벌어짐 확인 영상",
        caption: "창틀과 외벽이 만나는 부분의 실링 벌어짐과 노후 상태를 확인했습니다.",
        poster: "/images/work-sites/yongsan-window-seal-poster.webp",
      },
      {
        type: "video",
        src: "/videos/work-sites/yongsan-window-exterior-inspection.mp4",
        alt: "용산 누수탐지 건물 외부 창호 전체 점검 영상",
        caption: "창호 한 부분만 보지 않고 외부 마감과 연결 구간을 넓게 살펴봤습니다.",
        poster: "/images/work-sites/yongsan-window-exterior-poster.webp",
      },
      {
        type: "video",
        src: "/videos/work-sites/yongsan-pressure-test.mp4",
        alt: "용산 배관 누수검사 디지털 압력게이지 유지 확인 영상",
        caption: "디지털 압력게이지의 수치 변화를 관찰하며 배관 압력 상태를 확인했습니다.",
        poster: "/images/work-sites/yongsan-pressure-video-poster.webp",
      },
    ],
  },
];

export const workCases: WorkCase[] = [...generatedCases, ...manualWorkCases];

export const WORK_CASE_TEMPLATE: WorkCase = {
  slug: "지역-동-서비스-날짜",
  title: "경기도 하남시 미사동 싱크대막힘 해결",
  area: "경기도 하남시 미사동",
  regionSlug: "hanam",
  areaHref: "/hanam",
  service: "싱크대막힘",
  serviceHref: "/services/sink-clog",
  date: "YYYY-MM-DD",
  summary: "미사동에서 싱크대 물이 잘 내려가지 않는다는 상담을 받고 방문해 막힘을 해결한 간단한 현장 기록입니다.",
  details: [
    "고객이 알려준 증상과 방문하게 된 사연을 짧게 적습니다.",
    "현장에서 확인하고 해결한 내용을 사실대로 간단히 적습니다.",
  ],
};
