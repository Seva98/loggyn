import type { Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/manrope";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "../globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/content/i18n";
import { buildStructuredData } from "@/i18n/metadata";
import { isTranslatedLocale, localeDetails, translatedLocales } from "@/i18n/routing";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff9fc",
};

export function generateStaticParams() {
  return translatedLocales.map((locale) => ({ locale }));
}

export default async function LocalizedLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params as { locale: string };
  if (!isTranslatedLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const structuredData = buildStructuredData(locale, dictionary);

  return (
    <html lang={localeDetails[locale].htmlLang} data-theme="light" data-background="editorial" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <StructuredData data={structuredData} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">{dictionary.accessibility.skipToContent}</a>
        <Header locale={locale} dictionary={dictionary} />
        <main id="main-content">{props.children}</main>
        <Footer locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
