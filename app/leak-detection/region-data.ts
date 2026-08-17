import {
  allStaticSegments as allGyeonggiSegments,
  cities as gyeonggiCities,
  localPath as gyeonggiLocalPath,
  resolveArea,
  unitPath as gyeonggiUnitPath,
  unitsForCity,
} from "../gyeonggi/area-data";
import {
  allSegments as allServiceAreaSegments,
  localPath as serviceLocalPath,
  municipalitiesFor,
  resolve as resolveServiceArea,
  unitPath as serviceUnitPath,
  unitsFor,
} from "../service-area/area-data";

export type LeakBreadcrumb = { name: string; href: string };
export type LeakDirectoryItem = { name: string; href: string; detail: string };

export type LeakRegionData = {
  label: string;
  fullName: string;
  level: "province" | "municipality" | "unit" | "local";
  canonical: string;
  drainHref: string;
  center: [number, number];
  zoom: number;
  localName?: string;
  breadcrumbs: LeakBreadcrumb[];
  directoryTitle: string;
  directory: LeakDirectoryItem[];
};

const toGyeonggiLeakPath = (path: string) => `/leak-detection${path}`;
const toServiceLeakPath = (path: string) => path.replace(/^\/service-area/, "/leak-detection");

export function allLeakRegionSegments() {
  return [
    ["gyeonggi"],
    ...allGyeonggiSegments().map((segments) => ["gyeonggi", ...segments]),
    ...allServiceAreaSegments(),
  ];
}

function resolveGyeonggiLeak(segments: string[]): LeakRegionData | null {
  if (segments.length === 1) {
    return {
      label: "경기도",
      fullName: "경기도",
      level: "province",
      canonical: "/leak-detection/gyeonggi",
      drainHref: "/gyeonggi",
      center: [37.4138, 127.5183],
      zoom: 9,
      breadcrumbs: [
        { name: "누수탐지", href: "/leak-detection" },
        { name: "경기도", href: "/leak-detection/gyeonggi" },
      ],
      directoryTitle: "경기도 시·군별 누수탐지 지역",
      directory: gyeonggiCities.map((city) => ({
        name: city.name,
        href: `/leak-detection/gyeonggi/${city.slug}`,
        detail: "시·군 누수탐지 안내",
      })),
    };
  }
  const areaSegments = segments.slice(1);
  const area = resolveArea(areaSegments);
  if (!area) return null;

  const label = area.level === "local"
    ? `${area.unit?.unitName} ${area.local?.name}`
    : area.level === "unit"
      ? area.unit?.unitName || area.city.name
      : area.city.name;
  const cityUnits = unitsForCity(area.city);
  const center: [number, number] = area.local?.center
    || area.unit?.center
    || [
      cityUnits.reduce((sum, unit) => sum + unit.center[0], 0) / cityUnits.length,
      cityUnits.reduce((sum, unit) => sum + unit.center[1], 0) / cityUnits.length,
    ];

  let directory: LeakDirectoryItem[] = [];
  if (area.level === "city") {
    directory = cityUnits.length > 1
      ? cityUnits.map((unit) => ({
        name: unit.unitName,
        href: toGyeonggiLeakPath(gyeonggiUnitPath(unit)),
        detail: `${unit.locals.length}개 읍면동 누수탐지`,
      }))
      : (cityUnits[0]?.locals || []).map((local) => ({
        name: local.name,
        href: toGyeonggiLeakPath(gyeonggiLocalPath(cityUnits[0], local)),
        detail: "동별 누수탐지 안내",
      }));
  } else if (area.level === "unit") {
    directory = area.unit!.locals.map((local) => ({
      name: local.name,
      href: toGyeonggiLeakPath(gyeonggiLocalPath(area.unit!, local)),
      detail: "동별 누수탐지 안내",
    }));
  } else {
    directory = area.unit!.locals
      .filter((local) => local.code !== area.local!.code)
      .slice(0, 8)
      .map((local) => ({
        name: local.name,
        href: toGyeonggiLeakPath(gyeonggiLocalPath(area.unit!, local)),
        detail: "인근 누수탐지 안내",
      }));
  }

  const breadcrumbs: LeakBreadcrumb[] = [
    { name: "누수탐지", href: "/leak-detection" },
    { name: "경기도", href: "/leak-detection/gyeonggi" },
  ];
  if (area.level !== "city") {
    breadcrumbs.push({ name: area.city.name, href: `/leak-detection/gyeonggi/${area.city.slug}` });
  }
  if (area.unit?.gu && area.level === "local") {
    breadcrumbs.push({ name: area.unit.gu, href: toGyeonggiLeakPath(gyeonggiUnitPath(area.unit)) });
  }
  if (area.level === "local") breadcrumbs.push({ name: area.local!.name, href: `/leak-detection/${segments.join("/")}` });
  if (area.level === "unit") breadcrumbs.push({ name: area.unit!.unitName, href: `/leak-detection/${segments.join("/")}` });
  if (area.level === "city") breadcrumbs.push({ name: area.city.name, href: `/leak-detection/${segments.join("/")}` });

  return {
    label,
    fullName: `경기도 ${label}`,
    level: area.level === "city" ? "municipality" : area.level,
    canonical: `/leak-detection/${segments.join("/")}`,
    drainHref: `/gyeonggi/${areaSegments.join("/")}`,
    center,
    zoom: area.local ? 14 : area.unit ? 12 : 11,
    localName: area.local?.name,
    breadcrumbs,
    directoryTitle: area.level === "local" ? `${area.unit?.unitName} 인근 누수탐지 지역` : `${label} 하위 누수탐지 지역`,
    directory,
  };
}

function resolveGeneralLeak(segments: string[]): LeakRegionData | null {
  const area = resolveServiceArea(segments);
  if (!area) return null;

  const label = area.local
    ? `${area.unit?.unitName} ${area.local.name}`
    : area.unit?.unitName || area.municipality?.name || area.province.name;
  const municipalities = municipalitiesFor(area.province);
  const municipalityUnits = area.municipality ? unitsFor(area.municipality) : [];
  const center: [number, number] = area.local?.center
    || area.unit?.center
    || (municipalityUnits.length
      ? [
        municipalityUnits.reduce((sum, unit) => sum + unit.center[0], 0) / municipalityUnits.length,
        municipalityUnits.reduce((sum, unit) => sum + unit.center[1], 0) / municipalityUnits.length,
      ]
      : area.province.center);

  let directory: LeakDirectoryItem[] = [];
  if (area.level === "province") {
    directory = municipalities.map((municipality) => ({
      name: municipality.name,
      href: `/leak-detection/${area.province.slug}/${municipality.slug}`,
      detail: "시·군·구 누수탐지 안내",
    }));
  } else if (area.level === "municipality") {
    directory = municipalityUnits.length > 1
      ? municipalityUnits.map((unit) => ({
        name: unit.unitName,
        href: toServiceLeakPath(serviceUnitPath(unit)),
        detail: `${unit.locals.length}개 읍면동 누수탐지`,
      }))
      : (municipalityUnits[0]?.locals || []).map((local) => ({
        name: local.name,
        href: toServiceLeakPath(serviceLocalPath(municipalityUnits[0], local)),
        detail: "동별 누수탐지 안내",
      }));
  } else if (area.level === "unit") {
    directory = area.unit!.locals.map((local) => ({
      name: local.name,
      href: toServiceLeakPath(serviceLocalPath(area.unit!, local)),
      detail: "동별 누수탐지 안내",
    }));
  } else {
    directory = area.unit!.locals
      .filter((local) => local.code !== area.local!.code)
      .slice(0, 8)
      .map((local) => ({
        name: local.name,
        href: toServiceLeakPath(serviceLocalPath(area.unit!, local)),
        detail: "인근 누수탐지 안내",
      }));
  }

  const breadcrumbs: LeakBreadcrumb[] = [
    { name: "누수탐지", href: "/leak-detection" },
    { name: area.province.short, href: `/leak-detection/${area.province.slug}` },
  ];
  if (area.municipality && area.level !== "province") {
    breadcrumbs.push({ name: area.municipality.name, href: `/leak-detection/${area.province.slug}/${area.municipality.slug}` });
  }
  if (area.unit?.gu && area.level === "local") {
    breadcrumbs.push({ name: area.unit.gu, href: toServiceLeakPath(serviceUnitPath(area.unit)) });
  }
  if (area.level === "unit") breadcrumbs.push({ name: area.unit!.unitName, href: `/leak-detection/${segments.join("/")}` });
  if (area.level === "local") breadcrumbs.push({ name: area.local!.name, href: `/leak-detection/${segments.join("/")}` });

  return {
    label,
    fullName: label.includes(area.province.short) ? label : `${area.province.short} ${label}`,
    level: area.level,
    canonical: `/leak-detection/${segments.join("/")}`,
    drainHref: `/service-area/${segments.join("/")}`,
    center,
    zoom: area.local ? 14 : area.unit ? 12 : area.municipality ? 11 : 9,
    localName: area.local?.name,
    breadcrumbs,
    directoryTitle: area.level === "local" ? `${area.unit?.unitName} 인근 누수탐지 지역` : `${label} 하위 누수탐지 지역`,
    directory,
  };
}

export function resolveLeakRegion(segments: string[]) {
  return segments[0] === "gyeonggi" ? resolveGyeonggiLeak(segments) : resolveGeneralLeak(segments);
}
