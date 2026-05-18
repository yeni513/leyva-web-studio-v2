import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} ${site.brandSub}`,
    short_name: site.brand,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070608",
    theme_color: "#070608",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    lang: "es-US",
    categories: ["business", "productivity", "design"],
  };
}
