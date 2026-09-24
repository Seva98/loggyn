import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/content/site";
import type { Dictionary } from "@/content/types";

type ContactIconName = "location" | "booking" | "email" | "hours";

function ContactIcon({ name }: { name: ContactIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {name === "location" && (
        <>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.4" />
        </>
      )}
      {name === "booking" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18M8 15l2.5 2.5L16 13" />
        </>
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

export function ContactPage({ dictionary }: { dictionary: Dictionary }) {
  const contactCards: Array<{ label: string; value: string; href?: string; icon: ContactIconName }> = [
    {
      label: dictionary.contact.labels.address,
      value: `${siteConfig.contact.address}, ${siteConfig.contact.city}`,
      href: siteConfig.contact.mapExternalUrl,
      icon: "location",
    },
    {
      label: dictionary.contact.labels.booking,
      value: dictionary.contact.bookingViaReservanto,
      href: siteConfig.bookingUrl,
      icon: "booking",
    },
    {
      label: dictionary.contact.labels.email,
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: "email",
    },
    {
      label: dictionary.contact.labels.hours,
      value: dictionary.contact.hours,
      icon: "hours",
    },
  ];

  return (
    <>
      <section className="section contact-details">
        <div className="shell">
          <Reveal className="contact-details__title">
            <h1 className="display-heading">{dictionary.contact.title}</h1>
          </Reveal>
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
              <h2>{dictionary.contact.mapHeading}</h2>
              <p>{dictionary.contact.temporaryNotice}</p>
              <a className="text-link" href={siteConfig.contact.mapExternalUrl} target="_blank" rel="noreferrer">
                {dictionary.contact.openMaps}
              </a>
            </div>
            <iframe
              title={dictionary.contact.mapTitle}
              src={siteConfig.contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      <BookingCta compact dictionary={dictionary} />
    </>
  );
}
