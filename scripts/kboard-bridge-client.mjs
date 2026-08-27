const base = (process.env.DRAIN119_WP_BASE || "https://drain119.co.kr").replace(/\/$/, "");
const user = process.env.DRAIN119_WP_USER || "";
const appPassword = process.env.DRAIN119_WP_APP_PASSWORD || "";

function usage() {
  console.log(`Usage:\n  node scripts/kboard-bridge-client.mjs boards\n  node scripts/kboard-bridge-client.mjs publish --board-id 1 --title "제목" --content "본문" [--category1 "..."] [--category2 "..."] [--dedupe-key "..."]`);
}

function valueOf(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

if (!user || !appPassword) {
  console.error("DRAIN119_WP_USER and DRAIN119_WP_APP_PASSWORD are required.");
  process.exit(2);
}

const auth = `Basic ${Buffer.from(`${user}:${appPassword}`).toString("base64")}`;

async function request(path, options = {}) {
  const response = await fetch(`${base}${path}`, {
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
    ...options,
    headers: {
      accept: "application/json",
      authorization: auth,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = { raw: text }; }
  if (!response.ok) {
    console.error(JSON.stringify({ status: response.status, body }, null, 2));
    process.exit(1);
  }
  return body;
}

const command = process.argv[2] || "boards";

if (command === "boards") {
  const body = await request("/wp-json/drain119/v1/kboard/boards");
  console.log(JSON.stringify(body, null, 2));
} else if (command === "publish") {
  const boardId = Number(valueOf("--board-id"));
  const title = valueOf("--title");
  const content = valueOf("--content");
  if (!boardId || !title || !content) {
    usage();
    process.exit(2);
  }
  const payload = {
    board_id: boardId,
    title,
    content,
    member_display: valueOf("--member-display") || "응급배관119",
    category1: valueOf("--category1") || "",
    category2: valueOf("--category2") || "",
    dedupe_key: valueOf("--dedupe-key") || "",
  };
  const body = await request("/wp-json/drain119/v1/kboard/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  console.log(JSON.stringify(body, null, 2));
} else {
  usage();
  process.exit(2);
}
