import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import type { Dictionary, Locale, PageId } from "@/content/types";
import {
  getLanguageAlternates,
  getLocalizedPath,
  localeDetails,
  locales,
} from "@/i18n/routing";

const metadataBase = new URL(siteConfig.url);

function absoluteUrl(path: string): string {
  return new URL(path, metadataBase).toString();
}

export function buildPageMetadata(locale: Locale, page: PageId, dictionary: Dictionary): Metadata {
  const content = dictionary.metadata.pages[page];
  return {
    metadataBase,
    applicationName: siteConfig.name,
    title: content.title,
    description: content.description,
    keywords: dictionary.metadata.keywords,
    authors: [{ name: siteConfig.doctorName, url: getLocalizedPath(locale, "about") }],
    creator: siteConfig.doctorName,
    publisher: siteConfig.legalName,
    category: "healthcare",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [{ url: siteConfig.faviconPath, type: "image/svg+xml" }],
    },
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
        url: siteConfig.socialImagePath,
        width: 1672,
        height: 941,
        alt: dictionary.metadata.imageAlt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [{
        url: siteConfig.socialImagePath,
        alt: dictionary.metadata.imageAlt,
      }],
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export function buildStructuredData(locale: Locale, dictionary: Dictionary) {
  const clinicId = `${siteConfig.url}/#clinic`;
  const doctorId = `${siteConfig.url}/#doctor`;
  const websiteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": clinicId,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        description: dictionary.metadata.clinicDescription,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.logoPath),
          width: 719,
          height: 448,
        },
        image: absoluteUrl(siteConfig.socialImagePath),
        medicalSpecialty: "Gynecologic",
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address,
          addressLocality: siteConfig.contact.locality,
          addressRegion: siteConfig.contact.region,
          postalCode: siteConfig.contact.postalCode,
          addressCountry: siteConfig.contact.countryCode,
        },
        areaServed: {
          "@type": "City",
          name: siteConfig.contact.locality,
        },
        hasMap: siteConfig.contact.mapExternalUrl,
        priceRange: "800–9 500 Kč",
        currenciesAccepted: "CZK",
        employee: { "@id": doctorId },
        potentialAction: {
          "@type": "ReserveAction",
          target: siteConfig.bookingUrl,
        },
      },
      {
        "@type": "Person",
        "@id": doctorId,
        name: siteConfig.doctorName,
        jobTitle: "Gynecologist and obstetrician",
        description: dictionary.about.lead,
        image: absoluteUrl("/images/doctor-portrait.png"),
        worksFor: { "@id": clinicId },
        knowsLanguage: ["cs", "de", "en"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.legalName,
        inLanguage: localeDetails[locale].htmlLang,
        publisher: { "@id": clinicId },
      },
    ],
  };
}

export function buildPageStructuredData(locale: Locale, page: PageId, dictionary: Dictionary) {
  const pageUrl = absoluteUrl(getLocalizedPath(locale, page));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: dictionary.metadata.pages[page].title,
    description: dictionary.metadata.pages[page].description,
    inLanguage: localeDetails[locale].htmlLang,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#clinic` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.socialImagePath),
      width: 1672,
      height: 941,
    },
  };
}
