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
    // Anchor URLs for major sections — helps Google understand structure
    ...["servicios", "proceso", "paquetes", "trabajo", "faq", "contact"].map(
      (anchor) => ({
        url: `${site.url}/#${anchor}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }),
    ),
  ];
}
