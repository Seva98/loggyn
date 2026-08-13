import Image from "next/image";
import Link from "next/link";
import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { siteConfig, type ServiceIconName } from "@/content/site";
import botoxIcon from "../../public/images/services/botox.png";
import breastIcon from "../../public/images/services/breast.png";
import contraceptionIcon from "../../public/images/services/contraception.png";
import cytologyIcon from "../../public/images/services/cytology.png";
import examIcon from "../../public/images/services/exam.png";
import fillerIcon from "../../public/images/services/filler.png";
import firstVisitIcon from "../../public/images/services/firstVisit.png";
import menopauseIcon from "../../public/images/services/menopause.png";
import ultrasoundIcon from "../../public/images/services/ultrasound.png";

const reasons = [
  "Odborný lékařský přístup",
  "Moderní terapie",
  "Individuální a přátelská péče",
  "Neustálé vzdělávání",
];

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

export default function HomePage() {
  return (
    <>
      <section className="hero-home">
        <div className="hero-home__image" aria-hidden="true" />
        <div className="hero-home__veil" aria-hidden="true" />
        <div className="shell hero-home__content">
          <div className="hero-home__copy">
            <p className="hero-kicker">Privátní gynekologická péče</p>
            <h1>
              <span>Citlivě. Odborně. Přirozeně.</span>
              <em>V každé fázi života ženy.</em>
            </h1>
            <a className="button button--hero" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
              Rezervace termínu
            </a>
          </div>
          <a className="scroll-cue" href="#proc-loggyn" aria-label="Přejít k dalšímu obsahu">
            <span>Objevte Loggyn</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="proc-loggyn" className="section section--why">
        <div className="shell why-grid">
          <Reveal className="doctor-card">
            <div className="doctor-card__halo" aria-hidden="true" />
            <div className="doctor-card__image">
              <Image
                src="/images/doctor-portrait.png"
                alt="Ilustrační portrét lékařky v moderní ordinaci"
                fill
                sizes="(max-width: 800px) 92vw, 46vw"
                loading="eager"
              />
            </div>
            <p>Ilustrační fotografie</p>
          </Reveal>

          <div className="why-copy">
            <Reveal>
              <h2 className="display-heading">Proč si vybrat nás</h2>
            </Reveal>
            <div className="reason-list">
              {reasons.map((reason, index) => (
                <Reveal className="reason" delay={index * 0.07} key={reason}>
                  <span className="reason__mark" aria-hidden="true">✦</span>
                  <h3>{reason}</h3>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sluzby" className="section section--services">
        <div className="shell">
          <Reveal className="section-intro">
            <div>
              <h2 className="display-heading">Služby naší ordinace</h2>
            </div>
          </Reveal>

          <div className="services-grid">
            {siteConfig.services.map((service, index) => (
              <Reveal className="service-card" delay={(index % 3) * 0.07} key={service.title}>
                <span className="service-card__icon">
                  <Image
                    className="service-icon service-icon--image"
                    src={serviceIcons[service.icon]}
                    sizes="(max-width: 768px) 120px, 150px"
                    alt=""
                  />
                </span>
                <h3>{service.title}</h3>
                <span className="service-card__line" aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--private-care">
        <div className="shell private-care-grid">
          <Reveal className="private-care-title">
            <h2 className="display-heading">Privátní gynekologická péče</h2>
            <span className="editorial-mark" aria-hidden="true">L</span>
          </Reveal>
          <Reveal className="private-care-copy" delay={0.1}>
            <p>
              Naše ambulance funguje na principu <strong>přímé úhrady za péči</strong>, díky čemuž vám můžeme nabídnout více času, individuální přístup a péči přizpůsobenou právě vašim potřebám.
            </p>
            <p>
              Věříme, že dobrá gynekologická péče není jen o samotném vyšetření. Je také o <strong>důvěře, naslouchání a pocitu bezpečí</strong>. Chceme, abyste měla prostor říct, co vás trápí, zeptat se na vše, co potřebujete, a společně s námi najít řešení, které vám bude dávat smysl.
            </p>
            <p>
              Aktuální ceník našich služeb najdete <Link className="text-link" href="/cenik">zde</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
