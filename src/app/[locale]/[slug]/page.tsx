import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/pages/about-page";
import { ContactPage } from "@/components/pages/contact-page";
import { PricingPage } from "@/components/pages/pricing-page";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/content/i18n";
import type { PageId } from "@/content/types";
import { buildPageMetadata, buildPageStructuredData } from "@/i18n/metadata";
import {
  getPageIdForLocalizedSlug,
  isTranslatedLocale,
  localizedRoutes,
} from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  if (!isTranslatedLocale(locale)) return [{ slug: "invalid" }];
  return (["about", "pricing", "contact"] as const).map((page) => ({
    slug: localizedRoutes[locale][page].split("/").at(-1),
  }));
}

async function resolvePage(params: Promise<{ locale: string; slug: string }>) {
  const { locale, slug } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  const page = getPageIdForLocalizedSlug(locale, slug);
  if (!page || page === "home") notFound();
  return { locale, page, dictionary: getDictionary(locale) };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, page, dictionary } = await resolvePage(params);
  return buildPageMetadata(locale, page, dictionary);
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, page, dictionary } = await resolvePage(params);
  const pages: Record<Exclude<PageId, "home">, React.ReactNode> = {
    about: <AboutPage locale={locale} dictionary={dictionary} />,
    pricing: <PricingPage dictionary={dictionary} />,
    contact: <ContactPage dictionary={dictionary} />,
  };
  return (
    <>
      <StructuredData data={buildPageStructuredData(locale, page, dictionary)} />
      {pages[page]}
    </>
  );
}
