import Image from "next/image";
import { BookingCta } from "@/components/booking-cta";
import { LocalizedRichText } from "@/components/localized-rich-text";
import { Reveal } from "@/components/reveal";
import { serviceDefinitions, siteConfig, type ServiceIconName } from "@/content/site";
import type { Dictionary, Locale } from "@/content/types";
import { serviceSectionIds } from "@/i18n/routing";
import botoxIcon from "../../../public/images/services/botox.png";
import breastIcon from "../../../public/images/services/breast.png";
import contraceptionIcon from "../../../public/images/services/contraception.png";
import cytologyIcon from "../../../public/images/services/cytology.png";
import examIcon from "../../../public/images/services/exam.png";
import fillerIcon from "../../../public/images/services/filler.png";
import firstVisitIcon from "../../../public/images/services/firstVisit.png";
import menopauseIcon from "../../../public/images/services/menopause.png";
import ultrasoundIcon from "../../../public/images/services/ultrasound.png";

const serviceIcons = {
  exam: examIcon,
  ultrasound: ultrasoundIcon,
  cytology: cytologyIcon,
  contraception: contraceptionIcon,
  menopause: menopauseIcon,
  firstVisit: firstVisitIcon,
  breast: breastIcon,
  botox: botoxIcon,
  filler: fillerIcon,
} satisfies Record<ServiceIconName, typeof examIcon>;

export function HomePage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <>
      <section className="hero-home">
        <div className="hero-home__image" aria-hidden="true" />
        <div className="hero-home__veil" aria-hidden="true" />
        <div className="shell hero-home__content">
          <div className="hero-home__copy">
            <p className="hero-kicker">{dictionary.home.heroKicker}</p>
            <h1>
              <span>{dictionary.home.heroTitle}</span>
              <em>{dictionary.home.heroSubtitle}</em>
            </h1>
            <p className="hero-announcement">{dictionary.home.heroAnnouncement}</p>
            <a className="button button--hero" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
              {dictionary.home.heroBooking}
            </a>
          </div>
          <a className="scroll-cue" href="#why-loggyn" aria-label={dictionary.home.discoverLabel}>
            <span>{dictionary.home.discover}</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="why-loggyn" className="section section--why">
        <div className="shell why-grid">
          <Reveal className="doctor-card">
            <div className="doctor-card__halo" aria-hidden="true" />
            <div className="doctor-card__image">
              <Image
                src="/images/doctor-profile.webp"
                alt={dictionary.home.portraitAlt}
                fill
                sizes="(max-width: 800px) 92vw, 46vw"
                loading="eager"
              />
            </div>
            <p>{dictionary.home.illustrativePhoto}</p>
          </Reveal>

          <div className="why-copy">
            <Reveal>
              <h2 className="display-heading">{dictionary.home.reasonsTitle}</h2>
            </Reveal>
            <div className="reason-list">
              {dictionary.home.reasons.map((reason, index) => (
                <Reveal className="reason" delay={index * 0.07} key={reason}>
                  <span className="reason__mark" aria-hidden="true">✦</span>
                  <h3>{reason}</h3>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id={serviceSectionIds[locale]} className="section section--services">
        <div className="shell">
          <Reveal className="section-intro">
            <div>
              <h2 className="display-heading">{dictionary.home.servicesTitle}</h2>
            </div>
          </Reveal>

          <div className="services-grid">
            {serviceDefinitions.map((service, index) => (
              <Reveal
                className={`service-card${service.comingSoon ? " service-card--coming-soon" : ""}`}
                delay={(index % 3) * 0.07}
                key={service.id}
              >
                <span className="service-card__icon">
                  <Image
                    className="service-icon service-icon--image"
                    src={serviceIcons[service.icon]}
                    sizes="(max-width: 768px) 120px, 150px"
                    alt=""
                  />
                </span>
                <h3>{dictionary.home.services[index]}</h3>
                {service.comingSoon && <p className="service-card__status">{dictionary.home.comingSoon}</p>}
                <span className="service-card__line" aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--private-care">
        <div className="shell private-care-grid">
          <Reveal className="private-care-title">
            <h2 className="display-heading">{dictionary.home.privateCareTitle}</h2>
            <span className="editorial-mark" aria-hidden="true">L</span>
          </Reveal>
          <Reveal className="private-care-copy" delay={0.1}>
            <LocalizedRichText locale={locale} paragraphs={dictionary.home.privateCare} />
          </Reveal>
        </div>
      </section>

      <BookingCta dictionary={dictionary} />
    </>
  );
}
