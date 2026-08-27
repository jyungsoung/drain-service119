#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const argv = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const hasArg = (name) => argv.includes(name);

const BASE = new URL(getArg('--base', 'https://service.drain119.co.kr'));
const LIMIT = Math.max(1, Number(getArg('--limit', '100')) || 100);
const CONCURRENCY = Math.min(20, Math.max(1, Number(getArg('--concurrency', '8')) || 8));
const LINK_SAMPLE = Math.max(0, Number(getArg('--link-sample', '5')) || 0);
const CHECK_IMAGES = hasArg('--check-images');
const OUT_DIR = getArg('--out-dir', path.join(os.tmpdir(), 'drain119-seo-audit'));
const USER_AGENT = 'Drain119SEOAudit/1.0 (+https://service.drain119.co.kr)';

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, '-');
const csvPath = path.join(OUT_DIR, `seo-audit-${stamp}.csv`);
const jsonPath = path.join(OUT_DIR, `seo-audit-${stamp}.json`);

const decodeXml = (s) => s
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'");

const stripTags = (s = '') => decodeXml(s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
const firstMatch = (html, re) => {
  const m = html.match(re);
  return m ? stripTags(m[1] ?? '') : '';
};

const attr = (tag, name) => {
  const re = new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i');
  const m = tag.match(re);
  return m ? decodeXml(m[1].trim()) : '';
};

const absoluteUrl = (value, base) => {
  if (!value || value.startsWith('data:') || value.startsWith('javascript:') || value.startsWith('mailto:') || value.startsWith('tel:')) return null;
  try { return new URL(value, base).href; } catch { return null; }
};

async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect: 'follow',
      ...options,
      headers: { 'user-agent': USER_AGENT, ...(options.headers || {}) },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function getText(url) {
  const res = await fetchWithTimeout(url);
  return { res, text: await res.text() };
}

async function discoverSitemaps() {
  const found = new Set();
  try {
    const { text } = await getText(new URL('/robots.txt', BASE));
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*Sitemap:\s*(\S+)/i);
      if (m) found.add(m[1]);
    }
  } catch {}
  if (!found.size) found.add(new URL('/sitemap.xml', BASE).href);
  return [...found];
}

async function collectFromSitemap(url, seenSitemaps, urls) {
  if (seenSitemaps.has(url) || urls.size >= LIMIT) return;
  seenSitemaps.add(url);
  try {
    const { res, text } = await getText(url);
    if (!res.ok) return;
    const locs = [...text.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => decodeXml(m[1].trim()));
    if (/<sitemapindex[\s>]/i.test(text)) {
      for (const loc of locs) {
        if (urls.size >= LIMIT) break;
        await collectFromSitemap(loc, seenSitemaps, urls);
      }
    } else {
      for (const loc of locs) {
        try {
          const u = new URL(loc);
          if (u.origin === BASE.origin) urls.add(u.href);
        } catch {}
        if (urls.size >= LIMIT) break;
      }
    }
  } catch {}
}

async function fallbackCrawl(urls) {
  const queue = [BASE.href];
  const seen = new Set();
  while (queue.length && urls.size < LIMIT) {
    const current = queue.shift();
    if (seen.has(current)) continue;
    seen.add(current);
    urls.add(current);
    try {
      const { res, text } = await getText(current);
      if (!res.ok || !String(res.headers.get('content-type') || '').includes('text/html')) continue;
      for (const m of text.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
        const href = absoluteUrl(decodeXml(m[1]), current);
        if (!href) continue;
        const u = new URL(href);
        u.hash = '';
        if (u.origin === BASE.origin && !seen.has(u.href)) queue.push(u.href);
        if (queue.length > LIMIT * 5) break;
      }
    } catch {}
  }
}

async function checkStatus(url) {
  try {
    let res = await fetchWithTimeout(url, { method: 'HEAD' }, 10000);
    if (res.status === 405 || res.status === 403) res = await fetchWithTimeout(url, { method: 'GET' }, 10000);
    return res.status;
  } catch { return 0; }
}

async function auditUrl(url) {
  const result = {
    url, status: 0, finalUrl: '', title: '', h1Count: 0, h1: '', canonical: '', noindex: false,
    telCount: 0, imageCount: 0, brokenImages: [], internalLinkCount: 0, brokenInternalLinks: [], error: ''
  };
  try {
    const { res, text: html } = await getText(url);
    result.status = res.status;
    result.finalUrl = res.url;
    const contentType = String(res.headers.get('content-type') || '');
    if (!contentType.includes('text/html')) return result;

    result.title = firstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i);
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
    result.h1Count = h1s.length;
    result.h1 = h1s.join(' | ');

    for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
      const tag = m[0];
      if ((attr(tag, 'rel') || '').toLowerCase().split(/\s+/).includes('canonical')) {
        result.canonical = absoluteUrl(attr(tag, 'href'), res.url) || attr(tag, 'href');
        break;
      }
    }

    for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
      const tag = m[0];
      if ((attr(tag, 'name') || '').toLowerCase() === 'robots') {
        result.noindex = /(^|,)\s*noindex\b/i.test(attr(tag, 'content'));
      }
    }

    const internalLinks = new Set();
    for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
      const hrefRaw = attr(m[0], 'href');
      if (/^tel:/i.test(hrefRaw)) result.telCount += 1;
      const href = absoluteUrl(hrefRaw, res.url);
      if (!href) continue;
      const u = new URL(href); u.hash = '';
      if (u.origin === BASE.origin) internalLinks.add(u.href);
    }
    result.internalLinkCount = internalLinks.size;

    if (LINK_SAMPLE > 0) {
      const sample = [...internalLinks].slice(0, LINK_SAMPLE);
      for (const link of sample) {
        const status = await checkStatus(link);
        if (status === 0 || status >= 400) result.brokenInternalLinks.push(`${status || 'ERR'} ${link}`);
      }
    }

    const images = [];
    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
      const src = absoluteUrl(attr(m[0], 'src'), res.url);
      if (src) images.push(src);
    }
    result.imageCount = images.length;
    if (CHECK_IMAGES) {
      for (const src of [...new Set(images)].slice(0, 20)) {
        const status = await checkStatus(src);
        if (status === 0 || status >= 400) result.brokenImages.push(`${status || 'ERR'} ${src}`);
      }
    }
  } catch (e) {
    result.error = String(e?.message || e);
  }
  return result;
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      out[i] = await fn(items[i], i);
      process.stdout.write(`\r[SEO audit] ${i + 1}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  process.stdout.write('\n');
  return out;
}

const csvCell = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;

await fs.mkdir(OUT_DIR, { recursive: true });
const urls = new Set();
const sitemapUrls = await discoverSitemaps();
const seenSitemaps = new Set();
for (const sitemap of sitemapUrls) {
  await collectFromSitemap(sitemap, seenSitemaps, urls);
  if (urls.size >= LIMIT) break;
}
if (!urls.size) await fallbackCrawl(urls);

const targets = [...urls].slice(0, LIMIT);
console.log(`[SEO audit] base=${BASE.href} urls=${targets.length} concurrency=${CONCURRENCY}`);
console.log(`[SEO audit] sitemap(s)=${[...seenSitemaps].join(', ') || 'fallback crawl'}`);

const results = await mapLimit(targets, CONCURRENCY, auditUrl);
const problems = results.filter((r) =>
  r.error || r.status !== 200 || !r.title || r.h1Count !== 1 || !r.canonical || r.noindex || r.brokenImages.length || r.brokenInternalLinks.length
);

const headers = ['url','status','finalUrl','title','h1Count','h1','canonical','noindex','telCount','imageCount','brokenImages','internalLinkCount','brokenInternalLinks','error'];
const csv = [headers.map(csvCell).join(',')]
  .concat(results.map((r) => headers.map((h) => csvCell(Array.isArray(r[h]) ? r[h].join(' | ') : r[h])).join(',')))
  .join('\n');

const summary = {
  generatedAt: now.toISOString(), base: BASE.href, checked: results.length, problems: problems.length,
  statusErrors: results.filter((r) => r.status !== 200).length,
  missingTitle: results.filter((r) => !r.title).length,
  badH1: results.filter((r) => r.h1Count !== 1).length,
  missingCanonical: results.filter((r) => !r.canonical).length,
  noindex: results.filter((r) => r.noindex).length,
  brokenImagePages: results.filter((r) => r.brokenImages.length).length,
  brokenLinkPages: results.filter((r) => r.brokenInternalLinks.length).length,
  csvPath, jsonPath,
};

await fs.writeFile(csvPath, csv, 'utf8');
await fs.writeFile(jsonPath, JSON.stringify({ summary, problems, results }, null, 2), 'utf8');

console.log(JSON.stringify(summary, null, 2));
if (problems.length) {
  console.log('\nTop problems:');
  for (const r of problems.slice(0, 20)) {
    const why = [
      r.status !== 200 && `HTTP ${r.status}`,
      !r.title && 'missing title',
      r.h1Count !== 1 && `H1=${r.h1Count}`,
      !r.canonical && 'missing canonical',
      r.noindex && 'noindex',
      r.brokenImages.length && `broken images=${r.brokenImages.length}`,
      r.brokenInternalLinks.length && `broken links=${r.brokenInternalLinks.length}`,
      r.error && `error=${r.error}`,
    ].filter(Boolean).join(', ');
    console.log(`- ${r.url} :: ${why}`);
  }
}
