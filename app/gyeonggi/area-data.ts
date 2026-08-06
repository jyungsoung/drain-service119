import rawData from "./area-data.json";

export type LocalArea = { code: string; name: string; center: [number, number] };
export type UnitArea = {
  code: string;
  city: string;
  citySlug: string;
  gu: string | null;
  guSlug: string | null;
  unitName: string;
  center: [number, number];
  locals: LocalArea[];
};
export type CityArea = { name: string; slug: string; units: string[] };

export const cities = rawData.cities as CityArea[];
const normalizeDong=(name:string)=>name.replace(/(?:제)?\d+동$/,"동");
const mergeLocals=(locals:LocalArea[])=>{
  const groups=new Map<string,LocalArea[]>();
  for(const local of locals){const name=normalizeDong(local.name);groups.set(name,[...(groups.get(name)||[]),local]);}
  return [...groups.entries()].map(([name,items])=>({code:items[0].code,name,center:[items.reduce((n,x)=>n+x.center[0],0)/items.length,items.reduce((n,x)=>n+x.center[1],0)/items.length] as [number,number]}));
};
export const units = (rawData.units as UnitArea[]).map(unit=>({...unit,locals:mergeLocals(unit.locals)}));

export const cityBySlug = (slug: string) => cities.find((city) => city.slug === slug);
export const unitByCode = (code: string) => units.find((unit) => unit.code === code);
export const unitsForCity = (city: CityArea) => city.units.map(unitByCode).filter(Boolean) as UnitArea[];

export const unitPath = (unit: UnitArea) => unit.guSlug ? `/gyeonggi/${unit.citySlug}/${unit.guSlug}` : `/gyeonggi/${unit.citySlug}`;
export const localPath = (unit: UnitArea, local: LocalArea) => `${unitPath(unit)}/d-${local.code}`;

export type ResolvedArea = {
  level: "city" | "unit" | "local";
  city: CityArea;
  unit?: UnitArea;
  local?: LocalArea;
};

export function resolveArea(segments: string[]): ResolvedArea | null {
  const city = cityBySlug(segments[0]);
  if (!city) return null;
  const cityUnits = unitsForCity(city);
  if (segments.length === 1) return { level: "city", city };

  let unit: UnitArea | undefined;
  let localSegment: string | undefined;
  if (segments[1]?.startsWith("d-")) {
    unit = cityUnits.find((item) => !item.gu);
    localSegment = segments[1];
  } else {
    unit = cityUnits.find((item) => item.guSlug === segments[1]);
    if (segments.length === 2 && unit) return { level: "unit", city, unit };
    localSegment = segments[2];
  }
  if (!unit || !localSegment?.startsWith("d-")) return null;
  const local = unit.locals.find((item) => item.code === localSegment.slice(2));
  return local ? { level: "local", city, unit, local } : null;
}

export function allStaticSegments() {
  const paths: string[][] = [];
  for (const city of cities) {
    paths.push([city.slug]);
    for (const unit of unitsForCity(city)) {
      if (unit.guSlug) paths.push([city.slug, unit.guSlug]);
      for (const local of unit.locals) {
        paths.push(unit.guSlug ? [city.slug, unit.guSlug, `d-${local.code}`] : [city.slug, `d-${local.code}`]);
      }
    }
  }
  return paths;
}
