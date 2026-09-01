import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/home-page";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata, buildPageStructuredData } from "@/i18n/metadata";
import { isTranslatedLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return buildPageMetadata(locale, "home", getDictionary(locale));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <>
      <StructuredData data={buildPageStructuredData(locale, "home", dictionary)} />
      <HomePage locale={locale} dictionary={dictionary} />
    </>
  );
}
