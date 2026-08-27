#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const argv = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};

const mode = getArg('--mode', 'daily');
const outDir = getArg('--out-dir', path.join(os.tmpdir(), 'drain119-seo-audit'));
const auditScript = path.resolve('scripts/seo-audit.mjs');

const presets = {
  daily: ['--limit', '500', '--link-sample', '0', '--concurrency', '6'],
  full: ['--limit', '10000', '--link-sample', '0', '--concurrency', '8'],
};

if (!presets[mode]) {
  console.error(`[SEO gate] unsupported mode: ${mode}`);
  process.exit(2);
}

await fs.mkdir(outDir, { recursive: true });

const before = new Set((await fs.readdir(outDir)).filter((name) => /^seo-audit-.*\.json$/.test(name)));
const args = [auditScript, ...presets[mode], '--out-dir', outDir];
console.log(`[SEO gate] mode=${mode}`);
console.log(`[SEO gate] running: node ${args.slice(1).join(' ')}`);

const run = spawnSync(process.execPath, args, { stdio: 'inherit' });
if (run.status !== 0) {
  console.error(`[SEO gate] audit process failed with exit code ${run.status}`);
  process.exit(run.status || 1);
}

const after = (await fs.readdir(outDir)).filter((name) => /^seo-audit-.*\.json$/.test(name));
const created = after.filter((name) => !before.has(name));
const candidates = created.length ? created : after;
if (!candidates.length) {
  console.error('[SEO gate] no JSON report was produced');
  process.exit(1);
}

const newest = (await Promise.all(candidates.map(async (name) => ({
  name,
  stat: await fs.stat(path.join(outDir, name)),
})))).sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)[0].name;

const reportPath = path.join(outDir, newest);
const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
const summary = report.summary || {};
const problems = Array.isArray(report.problems) ? report.problems : [];
const fetchErrors = problems.filter((item) => item?.error).length;

const critical = {
  statusErrors: Number(summary.statusErrors || 0),
  missingTitle: Number(summary.missingTitle || 0),
  badH1: Number(summary.badH1 || 0),
  missingCanonical: Number(summary.missingCanonical || 0),
  noindex: Number(summary.noindex || 0),
  fetchErrors,
};

const totalCritical = Object.values(critical).reduce((sum, value) => sum + value, 0);

console.log('\n[SEO gate] summary');
console.log(JSON.stringify({
  mode,
  checked: summary.checked || 0,
  problems: summary.problems || 0,
  ...critical,
  reportPath,
}, null, 2));

if (totalCritical > 0) {
  console.error(`[SEO gate] FAILED: ${totalCritical} critical condition(s)`);
  process.exit(1);
}

console.log('[SEO gate] PASS');
