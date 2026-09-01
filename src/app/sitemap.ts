import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import type { PageId } from "@/content/types";
import { getLanguageAlternates, localizedRoutes, locales } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const pages: PageId[] = ["home", "about", "pricing", "contact"];

  return locales.flatMap((locale) => pages.map((page) => ({
    url: `${baseUrl}${localizedRoutes[locale][page]}`,
    lastModified: new Date(),
    changeFrequency: page === "home" ? "monthly" as const : "yearly" as const,
    priority: page === "home" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(getLanguageAlternates(page)).map(([language, path]) => [language, `${baseUrl}${path}`]),
      ),
    },
  })));
}
