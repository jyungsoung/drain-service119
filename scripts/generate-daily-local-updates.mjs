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

const ANGLES = [
  { key: "solve", title: "해결 안내", lead: "확인할 순서와 해결 방향" },
  { key: "slow", title: "초기 증상 안내", lead: "초기 증상에서 확인할 내용" },
  { key: "repeat", title: "반복 증상 점검", lead: "반복될 때 확인할 내용" },
  { key: "cause", title: "원인 확인 안내", lead: "원인 구간을 나눠 확인하는 방법" },
  { key: "building", title: "건물별 점검 안내", lead: "건물 형태에 따라 달라지는 점검 범위" },
  { key: "urgent", title: "갑작스러운 증상 안내", lead: "갑자기 심해졌을 때 먼저 확인할 내용" },
  { key: "check", title: "점검 방법 안내", lead: "작업 전에 확인하면 좋은 배관 상태" },
  { key: "prevent", title: "재발 예방 안내", lead: "재발을 줄이기 위해 확인할 관리 포인트" },
  { key: "consult", title: "상담 전 확인사항", lead: "상담 전에 위치와 증상을 정리하는 방법" },
  { key: "method", title: "작업 방법 안내", lead: "배관 상태에 맞춰 작업 범위를 정하는 기준" },
  { key: "deep", title: "배관 내부 점검 안내", lead: "겉으로 보이는 증상과 내부 원인을 구분하는 기준" },
  { key: "local", title: "지역 서비스 안내", lead: "지역에서 문의가 많은 증상과 점검 방향" },
];

const SERVICE_COPY = {
  "싱크대막힘": {
    symptoms: "싱크대 물이 천천히 내려가거나 한 번에 많은 물을 사용할 때 배수가 늦어지는 경우가 있습니다.",
    cause: "트랩과 주방 배관 초입에는 음식물 찌꺼기와 유지방이 쌓일 수 있고, 막힘 위치에 따라 필요한 작업 범위가 달라집니다.",
    action: "물이 전혀 내려가지 않는지, 시간이 지나면 조금씩 빠지는지, 다른 배수구에도 같은 증상이 있는지를 먼저 확인하면 점검 방향을 정하는 데 도움이 됩니다.",
  },
  "변기막힘": {
    symptoms: "변기 물이 평소보다 높게 차오르거나 내려가는 속도가 느려지고, 심하면 다시 올라오는 증상이 나타날 수 있습니다.",
    cause: "변기 내부 이물질 문제인지 오수관 연결 구간의 문제인지에 따라 확인 방법과 작업 범위가 달라집니다.",
    action: "변기 한 곳만 문제인지 다른 배수구도 함께 느린지, 최근 이물질이 들어갈 가능성이 있었는지를 확인하면 원인 범위를 좁히는 데 도움이 됩니다.",
  },
  "하수구막힘": {
    symptoms: "욕실이나 베란다 배수구에서 물이 늦게 빠지거나 여러 배수구에서 소리와 역류가 함께 나타나는 경우가 있습니다.",
    cause: "세대 가지관, 건물 공용관, 외부 오수관처럼 막힘이 생길 수 있는 구간이 여러 곳이라 증상 범위를 나눠 확인하는 것이 중요합니다.",
    action: "어느 배수구에서 먼저 증상이 시작됐는지와 많은 물을 사용할 때 증상이 심해지는지를 확인하면 필요한 점검 범위를 정하기 쉽습니다.",
  },
  "누수탐지": {
    symptoms: "계량기가 계속 움직이거나 벽·바닥의 습기, 아래층 천장 물자국처럼 누수가 의심되는 신호가 나타날 수 있습니다.",
    cause: "급수·온수·난방 배관과 외부 유입 등 원인이 다양해 보이는 물자국만으로 실제 시작 지점을 단정하기 어렵습니다.",
    action: "물이 보이는 위치, 처음 발견한 시점, 수도 사용 여부와 계량기 변화를 함께 확인하면 점검할 배관 계통을 나누는 데 도움이 됩니다.",
  },
  "고압세척": {
    symptoms: "배관을 여러 번 뚫었는데 다시 막히거나 긴 배관에서 배수 속도가 계속 느린 경우 배관 내부 오염 범위를 확인할 필요가 있습니다.",
    cause: "유지방과 슬러지처럼 배관 벽면에 넓게 쌓인 오염은 단순 통수 작업만으로 충분히 제거되지 않을 수 있습니다.",
    action: "배관 길이와 접근 위치, 반복 막힘 여부를 확인한 뒤 고압세척이 필요한 구간인지 판단하는 것이 중요합니다.",
  },
};

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
    const copy = SERVICE_COPY[service.name];
    const variant = (index + serviceIndex) % 3;
    const summaryVariants = [
      `${location.area}에서 ${service.name} 증상이 생겼을 때 ${angle.lead}을 간단히 정리한 지역 안내입니다.`,
      `${location.area} ${service.name} 관련 문의 전에 ${angle.lead}을 짧게 안내합니다.`,
      `${location.area}에서 ${service.name} 문제를 확인할 때 ${angle.lead}을 지역 기준으로 정리했습니다.`,
    ];
    const detailVariants = [
      `${location.area}에서 ${service.name} 증상이 나타났다면 먼저 현재 상태를 구분하는 것이 중요합니다. ${copy.symptoms}`,
      `${copy.cause} ${location.area}처럼 공동주택·주택·상가가 함께 있는 지역에서는 건물 형태와 문제가 나타나는 위치를 함께 알려주면 확인 범위를 정하는 데 도움이 됩니다.`,
      `${copy.action} 실제 작업 방법과 범위는 현장 배관 상태에 따라 달라질 수 있으므로 증상을 기준으로 필요한 점검부터 안내받는 것이 좋습니다.`,
    ];
    const details = variant === 0
      ? [detailVariants[0], detailVariants[1], detailVariants[2]]
      : variant === 1
        ? [detailVariants[1], detailVariants[0], detailVariants[2]]
        : [detailVariants[0], detailVariants[2]];

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
      summary: summaryVariants[variant],
      details,
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
console.log(`Region priority: Gyeonggi -> Seoul -> Incheon`);
console.log(`Store: ${path.relative(ROOT, GENERATED_FILE)}`);
