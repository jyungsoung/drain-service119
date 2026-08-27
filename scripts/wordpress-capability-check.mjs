import fs from "node:fs";
import path from "node:path";

const base = (process.env.DRAIN119_WP_BASE || "https://drain119.co.kr").replace(/\/$/, "");
const user = process.env.DRAIN119_WP_USER || "";
const appPassword = process.env.DRAIN119_WP_APP_PASSWORD || "";
const outDir = process.env.WP_CAPABILITY_OUT_DIR || path.join(process.cwd(), "tmp", "wordpress-capability");
fs.mkdirSync(outDir, { recursive: true });

const authHeaders = user && appPassword
  ? { Authorization: `Basic ${Buffer.from(`${user}:${appPassword}`).toString("base64")}` }
  : {};

async function request(url, options = {}) {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      ...options,
      headers: {
        "user-agent": "drain119-wordpress-capability-check/1.1",
        accept: "application/json,text/plain,*/*",
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch {}
    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type"),
      allow: response.headers.get("allow"),
      ms: Date.now() - started,
      json,
      textPreview: json ? undefined : text.slice(0, 500),
    };
  } catch (error) {
    return { ok: false, status: 0, error: String(error), ms: Date.now() - started };
  }
}

const report = {
  checkedAt: new Date().toISOString(),
  base,
  authConfigured: Boolean(user && appPassword),
  public: {},
  authenticated: {},
  kboard: {},
  conclusion: {},
};

const restRoot = await request(`${base}/wp-json/`);
report.public.restRoot = {
  ok: restRoot.ok,
  status: restRoot.status,
  finalUrl: restRoot.finalUrl,
  contentType: restRoot.contentType,
  error: restRoot.error,
};

const types = await request(`${base}/wp-json/wp/v2/types?context=view`);
const typeKeys = types.json && typeof types.json === "object" ? Object.keys(types.json) : [];
report.public.types = {
  ok: types.ok,
  status: types.status,
  keys: typeKeys,
  error: types.error,
};

const posts = await request(`${base}/wp-json/wp/v2/posts?per_page=1&_fields=id,slug,status,link,date,modified`);
report.public.posts = {
  ok: posts.ok,
  status: posts.status,
  sample: Array.isArray(posts.json) ? posts.json[0] || null : null,
  error: posts.error,
};

const pages = await request(`${base}/wp-json/wp/v2/pages?per_page=1&_fields=id,slug,status,link,date,modified`);
report.public.pages = {
  ok: pages.ok,
  status: pages.status,
  sample: Array.isArray(pages.json) ? pages.json[0] || null : null,
  error: pages.error,
};

const rootJson = restRoot.json && typeof restRoot.json === "object" ? restRoot.json : null;
const namespaces = Array.isArray(rootJson?.namespaces) ? rootJson.namespaces : [];
const routes = rootJson?.routes && typeof rootJson.routes === "object" ? Object.keys(rootJson.routes) : [];
const explicitKboard = (value) => /(^|[\/_-])kboard([\/_-]|$)/i.test(String(value));
const explicitBoardSegment = (value) => /(^|\/)boards?(\/|$)/i.test(String(value));
const kboardNamespaces = namespaces.filter((value) => explicitKboard(value));
const kboardRoutes = routes.filter((value) => explicitKboard(value) || explicitBoardSegment(value));
const kboardTypes = typeKeys.filter((value) => explicitKboard(value));
report.kboard = {
  namespaces: kboardNamespaces,
  routes: kboardRoutes.slice(0, 100),
  postTypes: kboardTypes,
  restExposed: Boolean(kboardNamespaces.length || kboardRoutes.length || kboardTypes.length),
};

if (report.authConfigured) {
  const me = await request(`${base}/wp-json/wp/v2/users/me?context=edit`, { headers: authHeaders });
  report.authenticated.user = {
    ok: me.ok,
    status: me.status,
    id: me.json?.id,
    name: me.json?.name,
    roles: me.json?.roles,
    capabilities: me.json?.capabilities,
    error: me.error || me.json?.message,
  };

  for (const resource of ["posts", "pages"]) {
    const options = await request(`${base}/wp-json/wp/v2/${resource}`, { method: "OPTIONS", headers: authHeaders });
    const methods = options.json?.endpoints?.flatMap((endpoint) => endpoint.methods || []) || [];
    report.authenticated[resource] = {
      ok: options.ok,
      status: options.status,
      allow: options.allow,
      methods: [...new Set(methods)],
      error: options.error || options.json?.message,
    };
  }
}

report.conclusion = {
  wordpressRestReachable: Boolean(restRoot.ok && types.ok),
  publicPostRead: Boolean(posts.ok),
  publicPageRead: Boolean(pages.ok),
  authenticated: Boolean(report.authConfigured && report.authenticated.user?.ok),
  normalPostWritePotential: Boolean(report.authenticated.posts?.methods?.includes("POST")),
  normalPageWritePotential: Boolean(report.authenticated.pages?.methods?.includes("POST")),
  kboardRestExposed: report.kboard.restExposed,
  safeToAutomateNormalPosts: Boolean(report.authenticated.user?.ok && report.authenticated.posts?.methods?.includes("POST")),
  safeToAutomateKboard: false,
  note: report.kboard.restExposed
    ? "Explicit KBoard/board REST surface was discovered, but a write test is intentionally not performed by this checker."
    : "No explicit KBoard REST route or post type was discovered. Do not substitute ordinary WordPress posts for KBoard publishing without explicit approval.",
};

const output = path.join(outDir, "wordpress-capability-report.json");
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
console.log(`Report: ${output}`);

if (!report.conclusion.wordpressRestReachable) process.exitCode = 2;
