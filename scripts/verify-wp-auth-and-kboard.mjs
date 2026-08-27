import fs from 'node:fs';
import path from 'node:path';

const base = (process.env.DRAIN119_WP_BASE || 'https://drain119.co.kr').replace(/\/$/, '');
const user = process.env.DRAIN119_WP_USER || '';
const appPassword = process.env.DRAIN119_WP_APP_PASSWORD || '';
const outDir = process.env.WP_VERIFY_OUT_DIR || path.join(process.cwd(), 'tmp', 'wp-verify');
fs.mkdirSync(outDir, { recursive: true });

if (!user || !appPassword) {
  console.error('Missing DRAIN119_WP_USER or DRAIN119_WP_APP_PASSWORD');
  process.exit(2);
}

const headers = {
  Authorization: `Basic ${Buffer.from(`${user}:${appPassword}`).toString('base64')}`,
  Accept: 'application/json',
  'User-Agent': 'drain119-kboard-verify/1.0',
};

async function get(url) {
  const response = await fetch(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(20000) });
  const text = await response.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch {}
  return { status: response.status, ok: response.ok, url: response.url, json, text: json ? undefined : text.slice(0, 500) };
}

const me = await get(`${base}/wp-json/wp/v2/users/me?context=edit`);
const boards = await get(`${base}/wp-json/drain119/v1/kboard/boards`);

const report = {
  checkedAt: new Date().toISOString(),
  auth: {
    ok: me.ok,
    status: me.status,
    id: me.json?.id,
    name: me.json?.name,
    roles: me.json?.roles,
    error: me.json?.message || me.text,
  },
  kboard: {
    ok: boards.ok,
    status: boards.status,
    count: boards.json?.count,
    boards: boards.json?.boards || [],
    error: boards.json?.message || boards.text,
  },
};

fs.writeFileSync(path.join(outDir, 'wp-kboard-verify.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

if (!report.auth.ok || !report.kboard.ok) process.exitCode = 3;
