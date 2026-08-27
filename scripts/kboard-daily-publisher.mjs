import fs from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const ROOT = process.cwd();
const SOURCE_FILE = path.join(ROOT, "app/work-sites/generated-cases.json");
const OUT_DIR = process.env.KBOARD_DAILY_OUT_DIR || path.join(ROOT, "tmp", "kboard-daily");
const BASE = (process.env.DRAIN119_WP_BASE || "https://drain119.co.kr").replace(/\/$/, "");
const USER = process.env.DRAIN119_WP_USER || "";
const APP_PASSWORD = process.env.DRAIN119_WP_APP_PASSWORD || "";
const BOARD_ID = Number(process.env.DRAIN119_KBOARD_BOARD_ID || "1");

const SERVICES = ["싱크대막힘", "변기막힘", "하수구막힘", "누수탐지", "고압세척"];
const PER_SERVICE = 40;
const DAILY_TOTAL = SERVICES.length * PER_SERVICE;

const ANGLE_TITLES = {
  solve: "문제 해결 전 확인사항",
  slow: "초기 증상 점검 안내",
  repeat: "반복 증상 원인 확인",
  cause: "원인 구간 확인 방법",
  building: "건물 형태별 점검 포인트",
  urgent: "갑작스러운 증상 확인사항",
  check: "배관 상태 점검 순서",
  prevent: "재발을 줄이는 관리 방법",
  consult: "상담 전에 확인할 내용",
  method: "작업 범위 확인 기준",
  deep: "배관 내부 점검 포인트",
  local: "지역 서비스 상담 안내",
};

const ANGLE_GUIDE = {
  solve: "막힘이나 누수 증상은 보이는 위치와 실제 원인이 다를 수 있어 증상이 나타나는 범위를 먼저 구분하는 것이 좋습니다.",
  slow: "초기에는 완전히 막히지 않아도 배수 속도나 수위 변화처럼 작은 신호가 먼저 나타날 수 있습니다.",
  repeat: "같은 증상이 반복된다면 단순 통수 여부보다 문제가 다시 생기는 구간과 원인을 함께 확인할 필요가 있습니다.",
  cause: "한 지점만 단정하기보다 가까운 배관부터 공용 배관까지 순서대로 범위를 좁혀 확인하는 방식이 도움이 됩니다.",
  building: "아파트·주택·상가처럼 건물 형태가 달라지면 배관 길이와 공용 구간, 접근 위치도 달라질 수 있습니다.",
  urgent: "갑자기 증상이 심해졌다면 물 사용을 늘리기보다 현재 수위와 역류 여부, 주변 배수구 상태부터 확인하는 편이 좋습니다.",
  check: "상담 전에 물이 내려가는 속도, 소리, 악취, 수위 변화와 발생 위치를 정리하면 점검 범위를 정하기 쉽습니다.",
  prevent: "재발을 줄이려면 반복되는 사용 습관과 배관 오염 가능성을 함께 살피고 필요할 때 점검 주기를 정하는 것이 좋습니다.",
  consult: "현재 위치, 건물 형태, 문제가 시작된 시점과 증상을 알려주면 필요한 점검 순서를 안내하는 데 도움이 됩니다.",
  method: "작업 방법은 증상만으로 정하지 않고 배관 구조와 막힘·누수 의심 구간을 확인한 뒤 선택하는 것이 중요합니다.",
  deep: "겉으로 보이는 배수 상태만으로 판단하기 어려운 경우에는 배관 내부 상태나 연결 구조를 확인해야 할 수 있습니다.",
  local: "같은 지역이라도 건물 구조와 배관 상태가 다르므로 주소와 증상을 기준으로 필요한 확인 범위를 정하는 것이 좋습니다.",
};

const SERVICE_COPY = {
  "싱크대막힘": {
    symptom: "싱크대 물이 천천히 내려가거나 한 번에 물을 많이 사용할 때 배수가 늦어지는 증상이 나타날 수 있습니다.",
    cause: "주방 트랩과 연결 배관에는 음식물 찌꺼기와 유지방이 누적될 수 있고, 막힘 위치에 따라 필요한 작업 범위가 달라집니다.",
    check: "물이 전혀 내려가지 않는지, 시간이 지나면 조금씩 빠지는지, 다른 배수구도 함께 느린지를 확인해두면 좋습니다.",
  },
  "변기막힘": {
    symptom: "변기 물이 평소보다 높게 차오르거나 내려가는 속도가 느려지고 다시 올라오는 증상이 나타날 수 있습니다.",
    cause: "변기 내부 이물질인지 오수관 연결 구간의 문제인지에 따라 확인 위치와 작업 범위가 달라집니다.",
    check: "변기 한 곳만 문제인지 다른 배수구도 함께 느린지, 최근 이물질이 들어갈 가능성이 있었는지를 확인해두면 좋습니다.",
  },
  "하수구막힘": {
    symptom: "욕실·베란다·세탁실 배수구의 물이 늦게 빠지거나 여러 곳에서 소리와 역류가 함께 나타날 수 있습니다.",
    cause: "세대 가지관과 공용관, 외부 오수관 등 문제가 생길 수 있는 구간이 여러 곳이어서 증상 범위를 나눠 확인하는 것이 중요합니다.",
    check: "어느 배수구에서 먼저 시작됐는지와 많은 물을 사용할 때 증상이 심해지는지를 확인해두면 좋습니다.",
  },
  "누수탐지": {
    symptom: "수도계량기 움직임, 벽·바닥 습기, 아래층 천장 물자국처럼 누수가 의심되는 신호가 나타날 수 있습니다.",
    cause: "급수·온수·난방 배관과 방수, 외부 유입 등 원인이 다양해 물이 보이는 자리만으로 시작 지점을 단정하기 어렵습니다.",
    check: "물이 보이는 위치와 처음 발견한 시점, 수도 사용 여부, 계량기나 보일러 압력 변화를 함께 확인해두면 좋습니다.",
  },
  "고압세척": {
    symptom: "배관을 여러 번 뚫었는데 다시 막히거나 긴 배관에서 배수 속도가 계속 느린 경우 내부 오염 범위를 확인할 필요가 있습니다.",
    cause: "유지방과 슬러지처럼 배관 벽면에 넓게 쌓인 오염은 단순 통수 작업만으로 충분히 제거되지 않을 수 있습니다.",
    check: "반복 막힘 여부와 배관 길이, 접근 가능한 위치를 확인한 뒤 고압세척이 필요한 구간인지 판단하는 것이 중요합니다.",
  },
};

function kstDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function argValue(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((item) => item.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function angleFromSlug(slug = "") {
  const key = slug.split("-").at(-1);
  return ANGLE_TITLES[key] ? key : "local";
}

function variantNumber(text) {
  let sum = 0;
  for (const char of text) sum = (sum + char.charCodeAt(0)) % 997;
  return sum % 3;
}

function htmlParagraph(text) {
  return `<p>${text}</p>`;
}

function buildPayload(source) {
  const angle = angleFromSlug(source.slug);
  const copy = SERVICE_COPY[source.service];
  const variant = variantNumber(source.slug);
  const title = `${source.area} ${source.service} ${ANGLE_TITLES[angle]}`;
  const areaLine = `${source.area}에서 ${source.service} 관련 문의가 있을 때는 현재 증상과 발생 범위를 먼저 구분하는 것이 중요합니다.`;
  const angleLine = ANGLE_GUIDE[angle];
  const closing = `실제 작업 방법과 범위는 ${source.area} 현장의 배관 구조와 상태에 따라 달라질 수 있으므로, 위치와 증상을 기준으로 필요한 점검부터 확인하는 것이 좋습니다.`;
  const paragraphs = variant === 0
    ? [areaLine + " " + copy.symptom, copy.cause + " " + copy.check, angleLine + " " + closing]
    : variant === 1
      ? [areaLine + " " + angleLine, copy.symptom + " " + copy.check, copy.cause + " " + closing]
      : [copy.symptom + " " + areaLine, angleLine + " " + copy.cause, copy.check + " " + closing];

  return {
    board_id: BOARD_ID,
    title,
    content: paragraphs.map(htmlParagraph).join(""),
    member_display: "응급배관119",
    category1: "",
    category2: "",
    dedupe_key: `kb-${source.slug}`,
    source_slug: source.slug,
    source_service: source.service,
    source_area: source.area,
  };
}

async function postOne(payload, authHeader) {
  const body = {
    board_id: payload.board_id,
    title: payload.title,
    content: payload.content,
    member_display: payload.member_display,
    category1: payload.category1,
    category2: payload.category2,
    dedupe_key: payload.dedupe_key,
  };

  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${BASE}/wp-json/drain119/v1/kboard/posts`, {
        method: "POST",
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
        headers: {
          authorization: authHeader,
          accept: "application/json",
          "content-type": "application/json",
          "user-agent": "drain119-kboard-daily/1.0",
        },
        body: JSON.stringify(body),
      });
      const text = await response.text();
      let json = null;
      try { json = text ? JSON.parse(text) : null; } catch {}
      if (response.ok) return { ok: true, status: response.status, body: json };
      lastError = { status: response.status, body: json || text.slice(0, 500) };
      if (![429, 500, 502, 503, 504].includes(response.status)) break;
    } catch (error) {
      lastError = { status: 0, error: String(error) };
    }
    await sleep(attempt * 800);
  }
  return { ok: false, ...lastError };
}

const dryRun = process.argv.includes("--dry-run");
const date = argValue("date", kstDate());
if (!fs.existsSync(SOURCE_FILE)) throw new Error(`Missing source file: ${SOURCE_FILE}`);
if (!Number.isInteger(BOARD_ID) || BOARD_ID < 1) throw new Error("DRAIN119_KBOARD_BOARD_ID must be a positive integer");

const source = JSON.parse(fs.readFileSync(SOURCE_FILE, "utf8"));
const todayItems = source.filter((item) => item.date === date && SERVICES.includes(item.service));
const serviceCounts = Object.fromEntries(SERVICES.map((service) => [service, todayItems.filter((item) => item.service === service).length]));

if (todayItems.length !== DAILY_TOTAL) {
  throw new Error(`Expected ${DAILY_TOTAL} source items for ${date}, found ${todayItems.length}. Counts: ${JSON.stringify(serviceCounts)}`);
}
for (const service of SERVICES) {
  if (serviceCounts[service] !== PER_SERVICE) {
    throw new Error(`${service}: expected ${PER_SERVICE}, found ${serviceCounts[service]}`);
  }
}

const payloads = todayItems.map(buildPayload);
const dedupeKeys = new Set(payloads.map((item) => item.dedupe_key));
const titles = new Set(payloads.map((item) => item.title));
if (dedupeKeys.size !== DAILY_TOTAL) throw new Error("Duplicate dedupe_key detected in daily batch");
if (titles.size !== DAILY_TOTAL) throw new Error("Duplicate title detected in daily batch");

fs.mkdirSync(OUT_DIR, { recursive: true });

if (dryRun) {
  const report = {
    mode: "dry-run",
    date,
    boardId: BOARD_ID,
    total: payloads.length,
    serviceCounts,
    sample: payloads.slice(0, 5).map(({ title, dedupe_key, source_area, source_service }) => ({ title, dedupe_key, source_area, source_service })),
  };
  fs.writeFileSync(path.join(OUT_DIR, "kboard-daily-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

if (!USER || !APP_PASSWORD) throw new Error("DRAIN119_WP_USER and DRAIN119_WP_APP_PASSWORD are required for publishing");
const authHeader = `Basic ${Buffer.from(`${USER}:${APP_PASSWORD}`).toString("base64")}`;

const results = [];
let created = 0;
let duplicates = 0;
let errors = 0;

for (let index = 0; index < payloads.length; index += 1) {
  const payload = payloads[index];
  const response = await postOne(payload, authHeader);
  if (response.ok && response.body?.created === true) created += 1;
  else if (response.ok && response.body?.duplicate === true) duplicates += 1;
  else errors += 1;

  results.push({
    index: index + 1,
    title: payload.title,
    dedupe_key: payload.dedupe_key,
    ok: response.ok,
    status: response.status,
    created: response.body?.created,
    duplicate: response.body?.duplicate,
    content_uid: response.body?.content_uid,
    error: response.ok ? undefined : response.body || response.error,
  });

  if ((index + 1) % 20 === 0 || index + 1 === payloads.length) {
    console.log(`Progress ${index + 1}/${payloads.length} - created ${created}, duplicates ${duplicates}, errors ${errors}`);
  }
  await sleep(120);
}

const report = {
  mode: "publish",
  date,
  boardId: BOARD_ID,
  total: payloads.length,
  serviceCounts,
  created,
  duplicates,
  errors,
  firstResults: results.slice(0, 10),
  failedResults: results.filter((item) => !item.ok).slice(0, 50),
};

fs.writeFileSync(path.join(OUT_DIR, "kboard-daily-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ date, boardId: BOARD_ID, total: payloads.length, serviceCounts, created, duplicates, errors }, null, 2));
if (errors > 0) process.exitCode = 3;
