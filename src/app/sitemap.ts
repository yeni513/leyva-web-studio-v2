import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/web-design-cleveland`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/terminos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Note: section anchors (#servicios, #faq, etc.) used to live here,
    // but Google ignores fragment URLs in sitemaps. They added bytes
    // without indexing benefit. Add new top-level routes as the site
    // grows (e.g. /casos/[slug] or /servicios/restaurantes).
  ];
}
