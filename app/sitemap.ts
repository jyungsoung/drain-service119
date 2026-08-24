import type { MetadataRoute } from "next";
import { hanamDongs } from "./hanam/dong-data";
import { allStaticSegments } from "./gyeonggi/area-data";
import { allSegments as allServiceAreaSegments } from "./service-area/area-data";
import { workCases } from "./work-sites/cases-data";
import { drainServiceLandings } from "./services/service-data";
import { allLeakRegionSegments } from "./leak-detection/region-data";
import { priorityRegions } from "./priority-regions";

const baseUrl = "https://service.drain119.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/hanam`, changeFrequency: "weekly", priority: 0.95 },
    ...priorityRegions.map((region) => ({
      url: `${baseUrl}/${region.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    })),
    ...hanamDongs.map((dong) => ({
      url: `${baseUrl}/hanam/${dong.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/gyeonggi`, changeFrequency: "weekly", priority: 0.9 },
    ...allStaticSegments().filter((segments) => !(segments.length === 1 && ["hanam", ...priorityRegions.map((region) => region.slug)].includes(segments[0]))).map((segments) => ({
      url: `${baseUrl}/gyeonggi/${segments.join("/")}`,
      changeFrequency: "monthly" as const,
      priority: segments.length === 1 ? 0.85 : segments.length === 2 && !segments[1].startsWith("d-") ? 0.8 : 0.7,
    })),
    { url: `${baseUrl}/service-area`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/leak-detection`, changeFrequency: "weekly", priority: 0.95, images: [`${baseUrl}/images/service-leak-detection.webp`] },
    ...allLeakRegionSegments().map((segments) => ({
      url: `${baseUrl}/leak-detection/${segments.join("/")}`,
      changeFrequency: "monthly" as const,
      priority: segments[segments.length - 1].startsWith("d-") ? 0.74 : segments.length <= 2 ? 0.86 : 0.8,
      images: [`${baseUrl}/images/service-leak-detection.webp`],
    })),
    ...drainServiceLandings.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [`${baseUrl}${service.image}`],
    })),
    { url: `${baseUrl}/work-sites`, changeFrequency: "weekly", priority: 0.8 },
    ...workCases.map((work) => ({
      url: `${baseUrl}/work-sites/${work.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      lastModified: work.updatedAt || work.date,
      images: [`${baseUrl}${work.image}`],
    })),
    ...allServiceAreaSegments().filter((segments) => {
      if (segments[0] === "gyeonggi") return false;
      return !(segments.length === 2 && segments[0] === "seoul" && priorityRegions.some((region) => region.slug === segments[1]));
    }).map((segments) => ({
      url: `${baseUrl}/service-area/${segments.join("/")}`,
      changeFrequency: "monthly" as const,
      priority: segments.length === 1 ? 0.85 : segments[segments.length - 1].startsWith("d-") ? 0.7 : 0.8,
    })),
  ];
}
