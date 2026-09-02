import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GENERATED_FILE = path.join(ROOT, "app/work-sites/generated-cases.json");
const GYEONGGI_FILE = path.join(ROOT, "app/gyeonggi/area-data.json");
const SERVICE_AREA_FILE = path.join(ROOT, "app/service-area/area-data.json");

const SERVICES = [
  { name: "싱크대막힘", key: "sink", href: "/services/sink-clog" },
  { name: "변기막힘", key: "toilet", href: "/services/toilet-clog" },
  { name: "하수구막힘", key: "drain", href: "/services/drain-clog" },
  { name: "누수탐지", key: "leak", href: "/leak-detection" },
  { name: "고압세척", key: "pressure", href: "/services/high-pressure-cleaning" },
];

const CONTENT_MIN_LENGTH = 1450;
const CONTENT_MAX_LENGTH = 1550;

const ANGLES = [
  { key: "solve", title: "해결 안내", lead: "확인할 순서와 해결 방향", focus: "증상 범위를 먼저 나누고 원인 구간에 맞는 점검을 선택하는 것이 핵심입니다." },
  { key: "slow", title: "초기 증상 안내", lead: "초기 증상에서 확인할 내용", focus: "배수 속도나 물 사용량에 따른 변화를 기록하면 초기 이상을 구분하기 쉽습니다." },
  { key: "repeat", title: "반복 증상 점검", lead: "반복될 때 확인할 내용", focus: "잠시 좋아졌다가 되풀이된다면 통수 여부뿐 아니라 남은 오염과 배관 구조도 확인해야 합니다." },
  { key: "cause", title: "원인 확인 안내", lead: "원인 구간을 나눠 확인하는 방법", focus: "보이는 위치만으로 원인을 단정하지 않고 가까운 구간부터 순서대로 범위를 좁혀야 합니다." },
  { key: "building", title: "건물별 점검 안내", lead: "건물 형태에 따라 달라지는 점검 범위", focus: "단독주택·공동주택·상가는 배관 길이와 공용관 연결 방식이 달라 점검 범위도 달라질 수 있습니다." },
  { key: "urgent", title: "갑작스러운 증상 안내", lead: "갑자기 심해졌을 때 먼저 확인할 내용", focus: "물이 넘치거나 번질 가능성이 있으면 사용을 줄이고 주변 피해를 막는 조치를 먼저 해야 합니다." },
  { key: "check", title: "점검 방법 안내", lead: "작업 전에 확인하면 좋은 배관 상태", focus: "문제가 시작된 위치와 시점, 다른 설비의 동시 증상을 함께 확인하면 불필요한 작업을 줄일 수 있습니다." },
  { key: "prevent", title: "재발 예방 안내", lead: "재발을 줄이기 위해 확인할 관리 포인트", focus: "작업 후 원인과 관리 주기를 이해해야 같은 증상의 반복 가능성을 낮출 수 있습니다." },
  { key: "consult", title: "상담 전 확인사항", lead: "상담 전에 위치와 증상을 정리하는 방법", focus: "건물 형태, 증상 위치, 시작 시점과 이미 시도한 조치를 알려주면 상담이 더 정확해집니다." },
  { key: "method", title: "작업 방법 안내", lead: "배관 상태에 맞춰 작업 범위를 정하는 기준", focus: "장비 이름보다 막힘·누수 위치와 배관 재질에 맞는 방법인지 확인하는 것이 중요합니다." },
  { key: "deep", title: "배관 내부 점검 안내", lead: "겉으로 보이는 증상과 내부 원인을 구분하는 기준", focus: "표면 증상과 배관 내부 상태가 다를 수 있어 단계별 점검 결과를 근거로 판단해야 합니다." },
  { key: "local", title: "지역 서비스 안내", lead: "지역에서 문의가 많은 증상과 점검 방향", focus: "지역명만 바꾼 설명이 아니라 해당 건물의 형태와 실제 증상을 기준으로 점검해야 합니다." },
];

const SERVICE_COPY = {
  "싱크대막힘": {
    symptoms: "싱크대 물이 천천히 내려가거나 한 번에 많은 물을 사용할 때 배수가 늦어지는 경우가 있습니다.",
    cause: "트랩과 주방 배관 초입에는 음식물 찌꺼기와 유지방이 쌓일 수 있고, 막힘 위치에 따라 필요한 작업 범위가 달라집니다.",
    action: "물이 전혀 내려가지 않는지, 시간이 지나면 조금씩 빠지는지, 다른 배수구에도 같은 증상이 있는지를 먼저 확인하면 점검 방향을 정하는 데 도움이 됩니다.",
    process: "트랩처럼 가까운 부분부터 확인하고 필요하면 배관 내부 상태와 막힘 깊이를 살펴 작업 범위를 정합니다. 단순 이물질 제거와 배관 벽면 세척은 목적이 다르므로 확인 결과에 맞춰 선택해야 합니다.",
    caution: "강한 약품을 반복하거나 서로 다른 세정제를 섞으면 배관과 작업자에게 위험할 수 있습니다. 이미 사용한 제품이 있다면 추가로 붓지 말고 상담할 때 제품 종류와 사용 시점을 알려주는 편이 안전합니다.",
    prevention: "기름은 식힌 뒤 따로 처리하고 음식물 거름망을 관리하세요. 뜨거운 물만 반복해서 붓는 방법은 굳은 유지방을 완전히 없애지 못할 수 있어 배수 속도의 변화를 함께 살피는 것이 좋습니다.",
    faq: [
      ["물이 조금씩 내려가도 점검이 필요한가요?", "평소보다 느려졌거나 많은 물을 쓸 때 차오른다면 배관 통로가 좁아진 초기 신호일 수 있습니다. 사용량에 따른 변화를 확인해 주세요."],
      ["싱크대막힘 비용을 전화로 확정할 수 있나요?", "막힘 깊이, 배관 길이와 접근 조건에 따라 범위가 달라집니다. 증상을 먼저 설명받고 현장 확인 뒤 작업 전 안내하는 방식이 정확합니다."],
      ["상담 전에 무엇을 확인하면 되나요?", "한쪽 싱크볼만 느린지, 다른 배수구도 같은지, 약품 사용 여부와 증상이 시작된 시점을 정리하면 원인 범위를 좁히는 데 도움이 됩니다."],
    ],
  },
  "변기막힘": {
    symptoms: "변기 물이 평소보다 높게 차오르거나 내려가는 속도가 느려지고, 심하면 다시 올라오는 증상이 나타날 수 있습니다.",
    cause: "변기 내부 이물질 문제인지 오수관 연결 구간의 문제인지에 따라 확인 방법과 작업 범위가 달라집니다.",
    action: "변기 한 곳만 문제인지 다른 배수구도 함께 느린지, 최근 이물질이 들어갈 가능성이 있었는지를 확인하면 원인 범위를 좁히는 데 도움이 됩니다.",
    process: "변기 자체의 통로와 바닥 오수관을 구분해 가까운 구간부터 확인합니다. 물이 내려간다는 이유만으로 끝내지 않고 휴지 사용량이나 반복 여부를 함께 살펴 필요한 작업 범위를 정합니다.",
    caution: "물이 차오르는 상태에서 여러 번 내리면 넘칠 수 있으므로 추가 사용을 멈추는 것이 우선입니다. 단단한 도구를 무리하게 넣으면 도기나 연결 부품을 손상시킬 수 있어 주의해야 합니다.",
    prevention: "물티슈와 위생용품, 반려동물 모래처럼 물에 잘 풀리지 않는 물질은 변기에 버리지 마세요. 같은 증상이 반복되면 사용 습관뿐 아니라 오수관의 경사와 공용관 영향도 구분해 확인해야 합니다.",
    faq: [
      ["변기 물이 천천히 내려가면 막힌 건가요?", "평소보다 수위가 높거나 내려간 뒤 꾸르륵 소리가 난다면 통로가 좁아졌을 수 있습니다. 다른 배수구의 동시 증상도 확인해 주세요."],
      ["변기막힘 비용은 무엇에 따라 달라지나요?", "변기 내부 이물질인지 연결 오수관 문제인지, 탈거가 필요한지에 따라 달라집니다. 현장 확인 후 작업 전에 범위를 안내받는 것이 좋습니다."],
      ["상담할 때 어떤 정보를 말해야 하나요?", "현재 수위, 마지막 정상 사용 시점, 이물질 가능성, 다른 화장실의 상태를 알려주면 변기와 오수관 중 어디부터 볼지 판단하기 쉽습니다."],
    ],
  },
  "하수구막힘": {
    symptoms: "욕실이나 베란다 배수구에서 물이 늦게 빠지거나 여러 배수구에서 소리와 역류가 함께 나타나는 경우가 있습니다.",
    cause: "세대 가지관, 건물 공용관, 외부 오수관처럼 막힘이 생길 수 있는 구간이 여러 곳이라 증상 범위를 나눠 확인하는 것이 중요합니다.",
    action: "어느 배수구에서 먼저 증상이 시작됐는지와 많은 물을 사용할 때 증상이 심해지는지를 확인하면 필요한 점검 범위를 정하기 쉽습니다.",
    process: "증상이 있는 배수구와 인접 설비를 비교해 세대 가지관인지 공용관 영향인지 범위를 좁힙니다. 필요하면 배관 내부를 확인하고 오염 형태와 길이에 맞춰 통수 또는 세척 방법을 결정합니다.",
    caution: "역류 중에는 세탁기나 욕실처럼 같은 계통에 연결된 물 사용을 줄여야 피해 확산을 막을 수 있습니다. 배수구를 무리하게 밀봉하면 다른 낮은 배수구로 물이 올라올 수 있어 주의가 필요합니다.",
    prevention: "머리카락과 이물질이 배수구로 들어가지 않도록 거름망을 관리하고, 물 빠짐이 느려진 시점을 기록하세요. 반복 막힘은 일시적으로 뚫는 것보다 오염 범위와 공용관 영향을 함께 보는 편이 좋습니다.",
    faq: [
      ["여러 배수구가 동시에 느리면 왜 그런가요?", "각 배수구보다 뒤쪽의 합류관이나 공용관 영향일 수 있습니다. 어느 설비를 사용할 때 다른 곳에서 반응하는지 확인하면 범위 판단에 도움이 됩니다."],
      ["하수구막힘은 바로 고압세척해야 하나요?", "모든 막힘에 필요한 것은 아닙니다. 막힘 위치와 오염 형태, 반복 여부를 확인한 뒤 통수 작업과 세척 중 알맞은 방법을 정해야 합니다."],
      ["상담 전에 무엇을 준비하면 좋나요?", "처음 문제가 생긴 배수구, 역류한 위치, 물 사용량에 따른 변화와 같은 건물의 다른 세대 증상 여부를 정리해 알려주세요."],
    ],
  },
  "누수탐지": {
    symptoms: "계량기가 계속 움직이거나 벽·바닥의 습기, 아래층 천장 물자국처럼 누수가 의심되는 신호가 나타날 수 있습니다.",
    cause: "급수·온수·난방 배관과 외부 유입 등 원인이 다양해 보이는 물자국만으로 실제 시작 지점을 단정하기 어렵습니다.",
    action: "물이 보이는 위치, 처음 발견한 시점, 수도 사용 여부와 계량기 변화를 함께 확인하면 점검할 배관 계통을 나누는 데 도움이 됩니다.",
    process: "육안 확인과 계량기 상태를 바탕으로 급수·온수·난방 또는 외부 유입 가능성을 나눕니다. 필요한 검사도 이 순서에 맞춰 선택하며 한 가지 수치나 물자국만으로 원인을 확정하지 않습니다.",
    caution: "젖은 전기 설비 주변은 만지지 말고 안전을 확보해야 합니다. 마감재를 먼저 넓게 철거하면 원인 확인이 더 어려워질 수 있으므로 누수 계통과 의심 구간을 좁힌 뒤 보수 범위를 정하는 것이 좋습니다.",
    prevention: "계량기 수치와 물자국을 날짜별로 기록하고 비가 온 날, 보일러 가동, 특정 수도 사용과의 관계를 살펴보세요. 보수 뒤에도 같은 조건에서 변화가 멈췄는지 확인해야 재발 여부를 판단할 수 있습니다.",
    faq: [
      ["물자국이 있는 곳이 누수 지점인가요?", "물은 구조체와 마감재를 따라 이동할 수 있어 보이는 자리와 시작 지점이 다를 수 있습니다. 배관 계통과 외부 유입을 나눠 확인해야 합니다."],
      ["누수탐지 비용은 전화로 알 수 있나요?", "건물 구조, 검사할 배관 계통과 접근 조건에 따라 달라집니다. 증상을 바탕으로 예상 범위를 듣고 현장 확인 뒤 점검 범위를 정하는 것이 정확합니다."],
      ["상담 전에 어떤 기록이 도움이 되나요?", "최초 발견 시점, 물자국 사진, 계량기 변화, 비나 보일러 가동과의 관계, 아래층 피해 위치를 정리하면 검사 순서를 정하는 데 도움이 됩니다."],
    ],
  },
  "고압세척": {
    symptoms: "배관을 여러 번 뚫었는데 다시 막히거나 긴 배관에서 배수 속도가 계속 느린 경우 배관 내부 오염 범위를 확인할 필요가 있습니다.",
    cause: "유지방과 슬러지처럼 배관 벽면에 넓게 쌓인 오염은 단순 통수 작업만으로 충분히 제거되지 않을 수 있습니다.",
    action: "배관 길이와 접근 위치, 반복 막힘 여부를 확인한 뒤 고압세척이 필요한 구간인지 판단하는 것이 중요합니다.",
    process: "먼저 막힘 구간과 배관의 진행 방향, 작업구 접근 가능 여부를 확인합니다. 세척이 필요하면 배관 재질과 오염 상태에 맞춰 압력과 노즐을 선택하고 통수 상태를 확인하며 범위를 조절합니다.",
    caution: "배관 상태를 확인하지 않고 압력만 높이면 노후 부속이나 약한 연결부에 부담을 줄 수 있습니다. 장비 사용 전 배관 재질, 접근 위치와 물이 빠져나갈 경로를 확인하는 과정이 필요합니다.",
    prevention: "세척 뒤에는 제거된 오염의 종류와 배수 상태를 확인하고 기름이나 슬러지 유입을 줄이는 관리 방법을 정하세요. 상가처럼 사용량이 많은 곳은 고정 주기보다 배수 변화 기록을 기준으로 점검하는 편이 합리적입니다.",
    faq: [
      ["고압세척과 단순 뚫음은 어떻게 다른가요?", "단순 통수는 막힌 길을 여는 데 초점이 있고 고압세척은 배관 벽면의 넓은 오염을 씻는 작업입니다. 상태에 따라 필요한 방법이 달라집니다."],
      ["모든 배관에 고압세척을 할 수 있나요?", "배관 재질과 노후도, 작업구 위치에 따라 적용 여부가 달라집니다. 내부 상태와 배출 경로를 먼저 확인한 뒤 압력과 장비를 정해야 합니다."],
      ["상담할 때 어떤 정보를 알려줘야 하나요?", "반복 막힘 횟수, 배관 용도와 길이, 최근 작업 내용, 접근 가능한 배수구나 맨홀 위치를 알려주면 세척 필요성을 판단하는 데 도움이 됩니다."],
    ],
  },
};

const BUILDING_GUIDES = [
  "공동주택은 세대 내부 가지관과 공용관이 이어지므로 한 설비만 문제인지 여러 곳이 함께 반응하는지 비교해야 합니다. 단독주택은 외부 배관과 맨홀까지 연결 구간이 길 수 있고, 상가는 사용량과 배출물이 달라 같은 증상도 원인이 다를 수 있습니다.",
  "건물 유형만으로 원인을 확정할 수는 없습니다. 아파트·빌라에서는 위아래 세대와 공용 배관의 영향을 구분하고, 주택은 실내와 외부 연결부를, 상가는 영업 중 물 사용량과 배관 동선을 함께 확인하는 방식이 유용합니다.",
  "같은 지역 안에서도 준공 시기와 배관 재질, 층수와 설비 배치가 다릅니다. 따라서 지역에 대한 일반적인 설명은 참고로만 사용하고 실제 건물 형태, 문제가 생긴 층과 배관 연결 상태를 우선해서 판단해야 합니다.",
];

const EVIDENCE_GUIDES = [
  "점검 결과는 사진, 수치, 배수 변화처럼 다시 확인할 수 있는 정보로 설명받는 것이 좋습니다. 확인하지 않은 원인을 단정하거나 장비 이름만 나열하기보다 무엇을 확인했고 다음 판단에 어떻게 반영했는지 살펴보세요.",
  "현장 판단에는 관찰 근거가 필요합니다. 증상 재현 여부, 점검 전후의 변화와 확인하지 못한 범위를 함께 기록하면 과잉 작업을 줄이고 추후 같은 문제가 생겼을 때 비교하기 쉽습니다.",
  "작업 범위와 비용은 배관 상태를 보기 전 확정하기 어렵습니다. 우선 점검 항목과 추가 작업이 필요한 조건을 구분해서 안내받고, 확인된 내용에 근거해 진행 여부를 정하는 것이 안전합니다.",
];

const SUPPLEMENT_GUIDES = [
  ({ area, service }) => `${area} ${service} 상담에서는 지역명보다 정확한 건물 주소와 층, 문제가 생긴 설비를 함께 전달해야 출동 전 준비가 쉬워집니다.`,
  ({ area }) => `${area} 안에서도 건물별 배관 구조는 다르므로 온라인 안내만으로 원인을 확정하지 않고 현장 상태를 기준으로 판단해야 합니다.`,
  ({ service }) => `${service} 증상이 잠시 사라져도 물 사용량이 늘 때 다시 나타나는지 확인하면 일시적인 변화와 반복 문제를 구분하는 데 도움이 됩니다.`,
  () => "상담 내용에는 증상 시작 시점, 영향을 받는 설비, 이미 시도한 조치와 위험 요소를 빠짐없이 포함하는 것이 좋습니다.",
  () => "정확한 기록은 작업 전후 상태를 비교하고 필요한 범위만 선택하는 데 도움이 되며, 확인하지 못한 부분은 확인 불가로 남겨야 합니다.",
  () => "배관 문제는 같은 표현으로 보여도 원인이 다를 수 있으므로 한 가지 방법을 미리 정하기보다 단계별 확인 결과에 따라 다음 절차를 선택하세요.",
  () => "무리한 자가 조치보다 물 사용을 줄이고 주변을 정리한 뒤 현재 상태를 그대로 설명하는 편이 추가 피해와 불필요한 작업을 줄이는 데 유리합니다.",
  () => "작업을 진행한다면 예상 범위, 추가 작업 조건과 점검 후 확인 방법을 먼저 듣고 기록을 남기는 것이 좋습니다.",
];

function hashText(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function generatedBodyLength({ summary, details, faqs }) {
  return [summary, ...details, ...faqs.flatMap((item) => [item.question, item.answer])].join(" ").length;
}

function buildContent({ location, service, angle, slug }) {
  const copy = SERVICE_COPY[service.name];
  const seed = hashText(slug);
  const summaryVariants = [
    `${location.area} ${service.name} 증상의 원인, 먼저 확인할 항목과 안전한 대응 순서를 정리했습니다. 건물 구조에 따른 점검 범위와 재발 예방, 상담 전 준비사항까지 한 번에 확인할 수 있는 지역 안내입니다.`,
    `${location.area}에서 ${service.name} 문제가 생겼을 때 무엇부터 확인해야 하는지 답부터 정리합니다. 증상 구분, 점검 절차, 주의사항과 자주 묻는 질문을 실제 확인 가능한 기준으로 안내합니다.`,
    `${location.area} ${service.name} 상담 전에 필요한 핵심 정보를 모았습니다. 보이는 증상만으로 원인을 단정하지 않고 건물 형태와 배관 구간을 나눠 확인하는 방법을 설명합니다.`,
  ];
  const summary = summaryVariants[seed % summaryVariants.length];
  const details = [
    `${location.area}에서 ${service.name} 증상이 나타났다면 결론부터 말해 현재 상태와 영향을 받는 범위를 먼저 구분해야 합니다. ${angle.focus} ${copy.action}`,
    `${copy.symptoms} ${copy.cause} 같은 증상이라도 문제가 한 설비에만 있는지 여러 곳에서 동시에 나타나는지에 따라 확인할 배관 구간이 달라집니다.`,
    BUILDING_GUIDES[(seed + 1) % BUILDING_GUIDES.length],
    `${angle.lead}은 작업 방법을 미리 정하는 과정이 아닙니다. ${copy.process} 실제 범위는 현장에서 확인된 배관 상태와 접근 조건에 따라 달라질 수 있습니다.`,
    `${copy.caution} ${EVIDENCE_GUIDES[(seed + 2) % EVIDENCE_GUIDES.length]}`,
    `${copy.prevention} 우리동네전문가는 ${location.area} 지역 대표 안내와 ${service.name} 서비스 정보를 연결해 제공하며, 실제 방문하지 않은 장소를 시공사례처럼 표현하지 않습니다.`,
  ];
  const faqs = copy.faq.map(([question, answer], index) => ({
    question: index === 2 ? `${location.area} ${question}` : question,
    answer,
  }));

  let length = generatedBodyLength({ summary, details, faqs });
  for (let index = 0; length < CONTENT_MIN_LENGTH && index < SUPPLEMENT_GUIDES.length; index += 1) {
    const sentence = SUPPLEMENT_GUIDES[(seed + index) % SUPPLEMENT_GUIDES.length]({ area: location.area, service: service.name });
    if (length + sentence.length + 1 <= CONTENT_MAX_LENGTH) {
      details[details.length - 1] += ` ${sentence}`;
      length = generatedBodyLength({ summary, details, faqs });
    }
  }

  if (length < CONTENT_MIN_LENGTH || length > CONTENT_MAX_LENGTH) {
    throw new Error(`${slug}: generated body length ${length} is outside ${CONTENT_MIN_LENGTH}-${CONTENT_MAX_LENGTH}`);
  }
  return { summary, details, faqs, bodyLength: length };
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function normalizeDong(name) {
  return name.replace(/(?:제)?\d+동$/, "동");
}

function mergeLocals(locals = []) {
  const groups = new Map();
  for (const local of locals) {
    const name = normalizeDong(local.name);
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(local);
  }
  return [...groups.entries()].map(([name, items]) => ({ code: items[0].code, name }));
}

function gyeonggiLocations(raw) {
  const unitsByCode = new Map(raw.units.map((unit) => [unit.code, unit]));
  const rows = [];
  for (const city of raw.cities) {
    for (const unitCode of city.units) {
      const unit = unitsByCode.get(unitCode);
      if (!unit) continue;
      for (const local of mergeLocals(unit.locals)) {
        const guPart = unit.gu ? `${unit.gu} ` : "";
        const area = `경기도 ${city.name} ${guPart}${local.name}`.replace(/\s+/g, " ").trim();
        const areaHref = `/gyeonggi/${city.slug}${unit.guSlug ? `/${unit.guSlug}` : ""}/d-${local.code}`;
        rows.push({
          order: 1,
          key: `g-${local.code}`,
          area,
          regionSlug: city.slug,
          areaHref,
          leakHref: `/leak-detection${areaHref}`,
        });
      }
    }
  }
  return rows;
}

function generalLocations(raw, provinceSlug, order) {
  const province = raw.provinces.find((item) => item.slug === provinceSlug);
  if (!province) return [];
  const municipalities = raw.municipalities.filter((item) => item.provinceSlug === provinceSlug);
  const unitsByCode = new Map(raw.units.map((unit) => [unit.code, unit]));
  const rows = [];
  for (const municipality of municipalities) {
    for (const unitCode of municipality.units) {
      const unit = unitsByCode.get(unitCode);
      if (!unit) continue;
      for (const local of mergeLocals(unit.locals)) {
        const guPart = unit.gu && unit.gu !== municipality.name ? `${unit.gu} ` : "";
        const area = `${province.name} ${municipality.name} ${guPart}${local.name}`.replace(/\s+/g, " ").trim();
        const areaHref = `/service-area/${provinceSlug}/${municipality.slug}${unit.guSlug ? `/${unit.guSlug}` : ""}/d-${local.code}`;
        rows.push({
          order,
          key: `${provinceSlug}-${local.code}`,
          area,
          regionSlug: municipality.slug,
          areaHref,
          leakHref: areaHref.replace(/^\/service-area/, "/leak-detection"),
        });
      }
    }
  }
  return rows;
}

function kstDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function argValue(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((item) => item.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function cleanExistingItem(item) {
  if (!item?.summary) return item;
  let summary = item.summary;
  summary = summary.replace("증상이 생겼을 때 증상이 생겼을 때 확인할 순서와 해결 방향", "증상이 생겼을 때 확인할 순서와 해결 방향");
  summary = summary.replace("확인하면 좋은 증상이 생겼을 때 확인할 순서와 해결 방향", "확인하면 좋은 확인 순서와 해결 방향");
  summary = summary.replace("확인할 때 필요한 증상이 생겼을 때 확인할 순서와 해결 방향", "확인할 때 필요한 확인 순서와 해결 방향");
  return summary === item.summary ? item : { ...item, summary };
}

const date = argValue("date", kstDate());
const perService = Number(argValue("per-service", "40"));
if (!Number.isInteger(perService) || perService < 1 || perService > 200) {
  throw new Error("--per-service must be an integer between 1 and 200");
}

const rawGenerated = fs.existsSync(GENERATED_FILE) ? readJson(GENERATED_FILE) : [];
const generated = rawGenerated.map(cleanExistingItem);
const cleanupChanged = JSON.stringify(rawGenerated) !== JSON.stringify(generated);
const usedSlugs = new Set(generated.map((item) => item.slug));
const todayCounts = new Map(SERVICES.map((service) => [service.name, generated.filter((item) => item.date === date && item.service === service.name).length]));

const locations = [
  ...gyeonggiLocations(readJson(GYEONGGI_FILE)),
  ...generalLocations(readJson(SERVICE_AREA_FILE), "seoul", 2),
  ...generalLocations(readJson(SERVICE_AREA_FILE), "incheon", 3),
].sort((a, b) => a.order - b.order);

if (!locations.length) throw new Error("No local areas were found.");

const newItems = [];

for (let serviceIndex = 0; serviceIndex < SERVICES.length; serviceIndex += 1) {
  const service = SERVICES[serviceIndex];
  const alreadyToday = todayCounts.get(service.name) || 0;
  const needed = Math.max(0, perService - alreadyToday);
  if (!needed) continue;

  const candidates = [];
  for (const angle of ANGLES) {
    for (const location of locations) {
      const slug = `local-${location.key}-${service.key}-${angle.key}`;
      if (!usedSlugs.has(slug)) candidates.push({ location, angle, slug });
    }
  }

  // 서비스별 시작 위치를 약간 어긋나게 해 같은 날 같은 동에 5개 서비스가 몰리지 않게 합니다.
  const offset = (serviceIndex * 47) % Math.max(candidates.length, 1);
  const ordered = candidates.slice(offset).concat(candidates.slice(0, offset));
  const picked = ordered.slice(0, needed);
  if (picked.length < needed) {
    throw new Error(`${service.name}: only ${picked.length} unused candidates remain; ${needed} required.`);
  }

  for (let index = 0; index < picked.length; index += 1) {
    const { location, angle, slug } = picked[index];
    const content = buildContent({ location, service, angle, slug });

    const serviceHref = service.name === "누수탐지" ? location.leakHref : service.href;
    const item = {
      slug,
      title: `${location.area} ${service.name} ${angle.title}`,
      area: location.area,
      regionSlug: location.regionSlug,
      areaHref: location.areaHref,
      service: service.name,
      serviceHref,
      date,
      summary: content.summary,
      details: content.details,
      faqs: content.faqs,
      bodyLength: content.bodyLength,
      contentVersion: 2,
    };
    newItems.push(item);
    usedSlugs.add(slug);
  }
}

if (!newItems.length && !cleanupChanged) {
  console.log(`No new items needed for ${date}. Daily target is already satisfied.`);
  process.exit(0);
}

const next = [...newItems, ...generated];
fs.writeFileSync(GENERATED_FILE, `${JSON.stringify(next, null, 2)}\n`, "utf8");

const serviceSummary = SERVICES.map((service) => {
  const added = newItems.filter((item) => item.service === service.name).length;
  const totalToday = (todayCounts.get(service.name) || 0) + added;
  return `${service.name}: +${added} (today ${totalToday}/${perService})`;
});

if (cleanupChanged) console.log("Cleaned awkward wording in existing generated summaries.");
console.log(`Generated ${newItems.length} local text updates for ${date}.`);
console.log(serviceSummary.join("\n"));
if (newItems.length) {
  const lengths = newItems.map((item) => item.bodyLength);
  console.log(`Body length (including spaces): ${Math.min(...lengths)}-${Math.max(...lengths)} chars (target about 1,500)`);
}
console.log(`Region priority: Gyeonggi -> Seoul -> Incheon`);
console.log(`Store: ${path.relative(ROOT, GENERATED_FILE)}`);
