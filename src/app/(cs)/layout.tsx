import type { Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "../globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getDictionary } from "@/content/i18n";
import { buildStructuredData } from "@/i18n/metadata";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff9fc",
};

export default function CzechLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dictionary = getDictionary("cs");
  const structuredData = buildStructuredData(dictionary);

  return (
    <html lang="cs" data-theme="light" data-background="editorial" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">{dictionary.accessibility.skipToContent}</a>
        <Header locale="cs" dictionary={dictionary} />
        <main id="main-content">{children}</main>
        <Footer locale="cs" dictionary={dictionary} />
      </body>
    </html>
  );
}
