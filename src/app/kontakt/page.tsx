import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt, ordinační doba a mapa privátní gynekologické ambulance Loggyn v Plzni.",
};

type ContactIconName = "location" | "phone" | "email" | "hours";

const contactCards: Array<{ label: string; value: string; href?: string; icon: ContactIconName }> = [
  { label: "Adresa", value: `${siteConfig.contact.address}, ${siteConfig.contact.city}`, href: siteConfig.contact.mapExternalUrl, icon: "location" },
  { label: "Telefon", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phoneHref}`, icon: "phone" },
  { label: "E-mail", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, icon: "email" },
  { label: "Ordinační doba", value: siteConfig.contact.hours, icon: "hours" },
];

function ContactIcon({ name }: { name: ContactIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {name === "location" && (
        <>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.4" />
        </>
      )}
      {name === "phone" && (
        <path d="M7.1 3.5 9 7.8 6.8 9.5c1.2 2.9 3.8 5.5 6.7 6.7l1.7-2.2 4.3 1.9v2.7c0 1-1 1.9-2 1.8C10 19.8 4.2 14 3.6 6.5c-.1-1 .8-2 1.8-2h1.7Z" />
      )}
      {name === "email" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {name === "hours" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </>
      )}
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="shell contact-hero__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">Kontakt</p>
            <h1>Pojďme najít termín, který vám vyhovuje.</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p>Nejrychleji si návštěvu rezervujete online. Pro ostatní dotazy jsme vám k dispozici také telefonicky a e-mailem.</p>
            <a className="button button--light" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
              Rezervace termínu <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section contact-details">
        <div className="shell">
          <div className="contact-card-grid">
            {contactCards.map((card, index) => (
              <Reveal className="contact-card" delay={index * 0.05} key={card.label}>
                <span className="contact-card__icon" aria-hidden="true"><ContactIcon name={card.icon} /></span>
                <p>{card.label}</p>
                {card.href ? (
                  <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined}>
                    {card.value}
                  </a>
                ) : (
                  <strong>{card.value}</strong>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal className="contact-map" delay={0.08}>
            <div className="contact-map__copy">
              <p className="eyebrow">Orientační umístění</p>
              <h2>V centru Plzně, na dosah.</h2>
              <p>Uvedené kontaktní údaje i poloha jsou dočasné a před otevřením ordinace budou nahrazeny skutečnými.</p>
              <a className="text-link" href={siteConfig.contact.mapExternalUrl} target="_blank" rel="noreferrer">
                Otevřít v Mapách <span aria-hidden="true">↗</span>
              </a>
            </div>
            <iframe
              title="Orientační poloha ordinace Loggyn v Plzni"
              src={siteConfig.contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      <BookingCta compact />
    </>
  );
}
