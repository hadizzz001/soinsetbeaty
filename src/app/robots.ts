import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // JSON endpoints for the dashboard, not pages.
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
