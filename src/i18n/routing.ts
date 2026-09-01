import type { Locale, PageId } from "@/content/types";

export const locales = ["cs", "en", "de", "uk"] as const satisfies readonly Locale[];
export const translatedLocales = ["en", "de", "uk"] as const;

export const localeDetails: Record<Locale, {
  flag: string;
  name: string;
  htmlLang: string;
  openGraphLocale: string;
}> = {
  cs: { flag: "🇨🇿", name: "Čeština", htmlLang: "cs", openGraphLocale: "cs_CZ" },
  en: { flag: "🇬🇧", name: "English", htmlLang: "en", openGraphLocale: "en_GB" },
  de: { flag: "🇩🇪", name: "Deutsch", htmlLang: "de", openGraphLocale: "de_DE" },
  uk: { flag: "🇺🇦", name: "Українська", htmlLang: "uk", openGraphLocale: "uk_UA" },
};

export const localizedRoutes: Record<Locale, Record<PageId, string>> = {
  cs: { home: "/", about: "/o-nas", pricing: "/cenik", contact: "/kontakt" },
  en: { home: "/en", about: "/en/about", pricing: "/en/pricing", contact: "/en/contact" },
  de: { home: "/de", about: "/de/ueber-uns", pricing: "/de/preise", contact: "/de/kontakt" },
  uk: { home: "/uk", about: "/uk/pro-nas", pricing: "/uk/tsiny", contact: "/uk/kontakty" },
};

export const serviceSectionIds: Record<Locale, string> = {
  cs: "sluzby",
  en: "services",
  de: "leistungen",
  uk: "posluhy",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isTranslatedLocale(value: string): value is Exclude<Locale, "cs"> {
  return translatedLocales.includes(value as Exclude<Locale, "cs">);
}

export function getLocalizedPath(locale: Locale, page: PageId): string {
  return localizedRoutes[locale][page];
}

export function getServicesPath(locale: Locale): string {
  return `${localizedRoutes[locale].home}#${serviceSectionIds[locale]}`;
}

export function getPageId(pathname: string): PageId | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  for (const locale of locales) {
    for (const page of Object.keys(localizedRoutes[locale]) as PageId[]) {
      if (localizedRoutes[locale][page] === normalized) return page;
    }
  }
  return undefined;
}

export function getLocaleFromPath(pathname: string): Locale | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  for (const locale of locales) {
    if (Object.values(localizedRoutes[locale]).includes(normalized)) return locale;
  }
  return undefined;
}

export function getPageIdForLocalizedSlug(locale: Exclude<Locale, "cs">, slug: string): PageId | undefined {
  const candidate = `/${locale}/${slug}`;
  return (Object.keys(localizedRoutes[locale]) as PageId[])
    .find((page) => localizedRoutes[locale][page] === candidate);
}

export function getLanguageAlternates(page: PageId): Record<string, string> {
  const entries = locales.map((locale) => [locale, localizedRoutes[locale][page]]);
  return Object.fromEntries([...entries, ["x-default", localizedRoutes.cs[page]]]);
}
