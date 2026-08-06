import raw from "./area-data.json";

export type Local = { code:string; name:string; center:[number,number] };
export type Unit = { code:string; provinceSlug:string; provinceName:string; municipality:string; municipalitySlug:string; gu:string|null; guSlug:string|null; unitName:string; center:[number,number]; locals:Local[] };
export type Municipality = { provinceSlug:string; name:string; slug:string; units:string[] };
export type Province = { code:string; name:string; short:string; slug:string; center:[number,number]; single?:boolean; municipalities:string[] };

export const provinces=raw.provinces as Province[];
export const municipalities=raw.municipalities as Municipality[];
const normalizeDong=(name:string)=>name.replace(/(?:제)?\d+동$/,"동");
const mergeLocals=(locals:Local[])=>{const groups=new Map<string,Local[]>();for(const local of locals){const name=normalizeDong(local.name);groups.set(name,[...(groups.get(name)||[]),local]);}return[...groups.entries()].map(([name,items])=>({code:items[0].code,name,center:[items.reduce((n,x)=>n+x.center[0],0)/items.length,items.reduce((n,x)=>n+x.center[1],0)/items.length] as [number,number]}));};
export const units=(raw.units as Unit[]).map(unit=>({...unit,locals:mergeLocals(unit.locals)}));
export const provinceBySlug=(slug:string)=>provinces.find(p=>p.slug===slug);
export const municipalitiesFor=(p:Province)=>municipalities.filter(m=>m.provinceSlug===p.slug);
export const municipalityBy=(provinceSlug:string,slug:string)=>municipalities.find(m=>m.provinceSlug===provinceSlug&&m.slug===slug);
export const unitsFor=(m:Municipality)=>m.units.map(code=>units.find(u=>u.code===code)).filter(Boolean) as Unit[];
export const unitPath=(u:Unit)=>`/service-area/${u.provinceSlug}/${u.municipalitySlug}${u.guSlug?`/${u.guSlug}`:""}`;
export const localPath=(u:Unit,l:Local)=>`${unitPath(u)}/d-${l.code}`;

export type Resolved={level:"province"|"municipality"|"unit"|"local";province:Province;municipality?:Municipality;unit?:Unit;local?:Local};
export function resolve(segments:string[]):Resolved|null{
  const province=provinceBySlug(segments[0]); if(!province)return null;
  if(segments.length===1)return{level:"province",province};
  const municipality=municipalityBy(province.slug,segments[1]); if(!municipality)return null;
  if(segments.length===2)return{level:"municipality",province,municipality};
  const muniUnits=unitsFor(municipality);
  let unit:Unit|undefined; let localSegment:string|undefined;
  if(segments[2]?.startsWith("d-")){unit=muniUnits.find(u=>!u.gu);localSegment=segments[2];}
  else{unit=muniUnits.find(u=>u.guSlug===segments[2]);if(segments.length===3&&unit)return{level:"unit",province,municipality,unit};localSegment=segments[3];}
  if(!unit||!localSegment?.startsWith("d-"))return null;
  const local=unit.locals.find(l=>l.code===localSegment.slice(2));
  return local?{level:"local",province,municipality,unit,local}:null;
}

export function allSegments(){const paths:string[][]=[];for(const p of provinces){paths.push([p.slug]);for(const m of municipalitiesFor(p)){paths.push([p.slug,m.slug]);for(const u of unitsFor(m)){if(u.guSlug)paths.push([p.slug,m.slug,u.guSlug]);for(const l of u.locals)paths.push(u.guSlug?[p.slug,m.slug,u.guSlug,`d-${l.code}`]:[p.slug,m.slug,`d-${l.code}`]);}}}return paths;}
