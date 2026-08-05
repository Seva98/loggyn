import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://loggyn.cz"),
  title: {
    default: "Loggyn | Privátní gynekologická péče v Plzni",
    template: "%s | Loggyn",
  },
  description:
    "Citlivá a odborná privátní gynekologická péče s individuálním přístupem v každé fázi života ženy.",
  keywords: ["gynekologie Plzeň", "soukromá gynekologie", "ultrazvuk", "menopauza", "Loggyn"],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Loggyn",
    title: "Loggyn | Privátní gynekologická péče",
    description: "Citlivě. Odborně. Přirozeně. V každé fázi života ženy.",
    images: [{ url: "/images/hero-roses-v2.jpg", width: 1672, height: 941, alt: "Růže v barvách značky Loggyn" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#160b14" },
    { media: "(prefers-color-scheme: light)", color: "#fff9fc" },
  ],
};

const themeScript = `
  try {
    var saved = localStorage.getItem('loggyn-theme');
    var theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var savedBackground = localStorage.getItem('loggyn-background');
    var backgrounds = ['bouquet', 'wall', 'purple', 'closeup', 'editorial', 'openwall'];
    document.documentElement.dataset.background = backgrounds.indexOf(savedBackground) > -1 ? savedBackground : 'wall';
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physician"],
    name: siteConfig.legalName,
    description: "Privátní gynekologická péče v Plzni.",
    medicalSpecialty: "Gynecologic",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Plzeň",
      postalCode: "301 00",
      addressCountry: "CZ",
    },
  };

  return (
    <html lang="cs" data-theme="dark" data-background="wall" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <a className="skip-link" href="#hlavni-obsah">Přeskočit na obsah</a>
        <Header />
        <main id="hlavni-obsah">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
