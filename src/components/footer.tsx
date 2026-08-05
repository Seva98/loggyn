import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-column footer-contact">
          <p className="eyebrow">Kontakty</p>
          <h2>Jsme vám nablízku.</h2>
          <address>
            <span>{siteConfig.contact.address}</span>
            <span>{siteConfig.contact.city}</span>
          </address>
          <a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phone}</a>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          <span>{siteConfig.contact.hours}</span>
          <nav className="footer-links" aria-label="Navigace v zápatí">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-location">
          <p className="eyebrow">Kde nás najdete</p>
          <div className="mini-map">
            <iframe
              title="Orientační mapa ordinace Loggyn v Plzni"
              src={siteConfig.contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a className="text-link" href={siteConfig.contact.mapExternalUrl} target="_blank" rel="noreferrer">
            Otevřít v Mapách <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="footer-column footer-social">
          <p className="eyebrow">Naše atmosféra</p>
          <div className="social-mosaic" aria-label="Ilustrační fotografie ordinace">
            <div className="social-tile social-tile--photo">
              <Image src="/images/doctor-portrait.png" alt="Ilustrační portrét lékařky" fill sizes="180px" loading="eager" />
            </div>
            <div className="social-tile social-tile--rose">
              <Image src="/images/hero-roses-v2.jpg" alt="Detail růží v barvách Loggyn" fill sizes="180px" />
            </div>
            <div className="social-tile social-tile--quote"><span>péče</span></div>
            <div className="social-tile social-tile--line" aria-hidden="true" />
            <div className="social-tile social-tile--rose social-tile--rose-alt">
              <Image src="/images/hero-roses-v2.jpg" alt="Jemné růžové květy" fill sizes="180px" />
            </div>
            <div className="social-tile social-tile--quote"><span>důvěra</span></div>
          </div>
          <p className="footer-placeholder">Sociální profily budou doplněny.</p>
        </div>
      </div>

      <div className="footer-bottom shell">
        <p>© {year} {siteConfig.legalName}. Všechna práva vyhrazena.</p>
        <p>
          Made by <a href="https://sevcik.dev" target="_blank" rel="noreferrer">sevcik.dev</a>
        </p>
      </div>
    </footer>
  );
}
