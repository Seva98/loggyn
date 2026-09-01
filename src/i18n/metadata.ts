import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import type { Dictionary, Locale, PageId } from "@/content/types";
import {
  getLanguageAlternates,
  getLocalizedPath,
  localeDetails,
  locales,
} from "@/i18n/routing";

const metadataBase = new URL("https://loggyn.cz");

export function buildPageMetadata(locale: Locale, page: PageId, dictionary: Dictionary): Metadata {
  const content = dictionary.metadata.pages[page];
  return {
    metadataBase,
    title: content.title,
    description: content.description,
    keywords: dictionary.metadata.keywords,
    alternates: {
      canonical: getLocalizedPath(locale, page),
      languages: getLanguageAlternates(page),
    },
    openGraph: {
      type: "website",
      url: getLocalizedPath(locale, page),
      locale: localeDetails[locale].openGraphLocale,
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => localeDetails[candidate].openGraphLocale),
      siteName: siteConfig.name,
      title: content.title,
      description: content.description,
      images: [{
        url: "/images/hero-roses-v2.jpg",
        width: 1672,
        height: 941,
        alt: dictionary.metadata.imageAlt,
      }],
    },
  };
}

export function buildStructuredData(dictionary: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physician"],
    name: siteConfig.legalName,
    description: dictionary.metadata.clinicDescription,
    medicalSpecialty: "Gynecologic",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Plzeň",
      postalCode: "301 00",
      addressCountry: "CZ",
    },
  };
}
