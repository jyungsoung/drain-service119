import type { MetadataRoute } from "next";
import { hanamDongs } from "./hanam/dong-data";
import { allStaticSegments } from "./gyeonggi/area-data";
import { allSegments as allServiceAreaSegments } from "./service-area/area-data";
import { workCases } from "./work-sites/cases-data";
import { serviceLandings } from "./services/service-data";

const baseUrl = "https://drain-service119.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    ...hanamDongs.map((dong) => ({
      url: `${baseUrl}/hanam/${dong.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/gyeonggi`, changeFrequency: "weekly", priority: 0.9 },
    ...allStaticSegments().map((segments) => ({
      url: `${baseUrl}/gyeonggi/${segments.join("/")}`,
      changeFrequency: "monthly" as const,
      priority: segments.length === 1 ? 0.85 : segments.length === 2 && !segments[1].startsWith("d-") ? 0.8 : 0.7,
    })),
    { url: `${baseUrl}/service-area`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    ...serviceLandings.map((service) => ({
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
    })),
    ...allServiceAreaSegments().map((segments) => ({
      url: `${baseUrl}/service-area/${segments.join("/")}`,
      changeFrequency: "monthly" as const,
      priority: segments.length === 1 ? 0.85 : segments[segments.length - 1].startsWith("d-") ? 0.7 : 0.8,
    })),
  ];
}
