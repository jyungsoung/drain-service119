import fs from "node:fs";
import path from "node:path";

// Source: 행정안전부 행정표준코드관리시스템 법정동코드 전체자료
// Data date used for the committed map: 2026-07-08 (공공누리 제1유형)

const sourcePath = process.argv[2];
if (!sourcePath) {
  throw new Error("Usage: node scripts/build-legacy-area-redirects.mjs <legal-code-utf8.txt>");
}

const root = process.cwd();
const service = JSON.parse(fs.readFileSync(path.join(root, "app/service-area/area-data.json"), "utf8"));
const gyeonggi = JSON.parse(fs.readFileSync(path.join(root, "app/gyeonggi/area-data.json"), "utf8"));

const legalRows = new Map();
for (const line of fs.readFileSync(sourcePath, "utf8").split(/\r?\n/).slice(1)) {
  const [code, name, status] = line.split("\t");
  if (code && name && status === "존재") legalRows.set(name.trim(), code.trim());
}

const redirects = {};
const add = (name, target) => {
  const code = legalRows.get(name);
  if (code) redirects[code] = target;
};
const addProvince = (name, target) => {
  const code = legalRows.get(name);
  if (code) {
    redirects[code] = target;
    redirects[code.slice(0, 2)] = target;
  }
};

for (const province of service.provinces) {
  addProvince(province.name, `/service-area/${province.slug}`);
  const municipalities = service.municipalities.filter((item) => item.provinceSlug === province.slug);
  for (const municipality of municipalities) {
    const municipalityName = `${province.name} ${municipality.name}`;
    add(municipalityName, `/service-area/${province.slug}/${municipality.slug}`);
    for (const unitCode of municipality.units) {
      const unit = service.units.find((item) => item.code === unitCode);
      if (!unit) continue;
      const unitTarget = `/service-area/${province.slug}/${municipality.slug}${unit.guSlug ? `/${unit.guSlug}` : ""}`;
      const unitName = unit.gu ? `${municipalityName} ${unit.gu}` : municipalityName;
      add(unitName, unitTarget);
      for (const local of unit.locals) {
        add(`${unitName} ${local.name}`, `${unitTarget}/d-${local.code}`);
      }
    }
  }
}

addProvince("경기도", "/gyeonggi");
for (const city of gyeonggi.cities) {
  const cityName = `경기도 ${city.name}`;
  add(cityName, `/gyeonggi/${city.slug}`);
  for (const unitCode of city.units) {
    const unit = gyeonggi.units.find((item) => item.code === unitCode);
    if (!unit) continue;
    const unitTarget = `/gyeonggi/${city.slug}${unit.guSlug ? `/${unit.guSlug}` : ""}`;
    const unitName = unit.gu ? `${cityName} ${unit.gu}` : cityName;
    add(unitName, unitTarget);
    for (const local of unit.locals) {
      add(`${unitName} ${local.name}`, `${unitTarget}/d-${local.code}`);
    }
  }
}

const output = path.join(root, "app/area/legacy-area-redirects.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(redirects, null, 2)}\n`);
console.log(`Generated ${Object.keys(redirects).length} exact legacy redirects at ${output}`);
