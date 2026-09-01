import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import type { Dictionary, Locale } from "@/content/types";
import { getLocalizedPath, getServicesPath } from "@/i18n/routing";

export function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const year = new Date().getFullYear();
  const navigation = [
    { label: dictionary.header.navigation.home, href: getLocalizedPath(locale, "home") },
    { label: dictionary.header.navigation.services, href: getServicesPath(locale) },
    { label: dictionary.header.navigation.about, href: getLocalizedPath(locale, "about") },
    { label: dictionary.header.navigation.pricing, href: getLocalizedPath(locale, "pricing") },
    { label: dictionary.header.navigation.contact, href: getLocalizedPath(locale, "contact") },
  ];

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-column footer-contact">
          <h2>{dictionary.footer.title}</h2>
          <address>
            <span>{siteConfig.contact.address}</span>
            <span>{siteConfig.contact.city}</span>
          </address>
          <a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
            {dictionary.contact.bookingViaReservio}
          </a>
          <span>{dictionary.contact.hours}</span>
          <nav className="footer-links" aria-label={dictionary.footer.navigationLabel}>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-location">
          <div className="mini-map">
            <iframe
              title={dictionary.footer.mapTitle}
              src={siteConfig.contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a className="text-link" href={siteConfig.contact.mapExternalUrl} target="_blank" rel="noreferrer">
            {dictionary.footer.openMaps}
          </a>
        </div>

        <div className="footer-column footer-social">
          <div className="social-mosaic" aria-label={dictionary.footer.mosaicLabel}>
            <div className="social-tile social-tile--photo">
              <Image src="/images/doctor-portrait.png" alt={dictionary.footer.portraitAlt} fill sizes="180px" loading="eager" />
            </div>
            <div className="social-tile social-tile--rose">
              <Image src="/images/hero-roses-v2.jpg" alt={dictionary.footer.rosesAlt} fill sizes="180px" />
            </div>
            <div className="social-tile social-tile--quote"><span>{dictionary.footer.careWord}</span></div>
            <div className="social-tile social-tile--line" aria-hidden="true" />
            <div className="social-tile social-tile--rose social-tile--rose-alt">
              <Image src="/images/hero-roses-v2.jpg" alt={dictionary.footer.flowersAlt} fill sizes="180px" />
            </div>
            <div className="social-tile social-tile--quote"><span>{dictionary.footer.trustWord}</span></div>
          </div>
          <p className="footer-placeholder">{dictionary.footer.socialPlaceholder}</p>
        </div>
      </div>

      <div className="footer-bottom shell">
        <p>© {year} {siteConfig.legalName}. {dictionary.footer.rights}</p>
        <p>
          {dictionary.footer.madeBy} <a href="https://sevcik.dev" target="_blank" rel="noreferrer">sevcik.dev</a>
        </p>
      </div>
    </footer>
  );
}
