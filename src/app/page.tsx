import Image from "next/image";
import Link from "next/link";
import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";
import { siteConfig } from "@/content/site";

const reasons = [
  { title: "Odborný lékařský přístup", text: "Péče založená na zkušenostech, současných doporučeních a otevřené komunikaci." },
  { title: "Moderní terapie", text: "Přirozená, bezpečná a vždy zvolená s respektem k vašim potřebám." },
  { title: "Individuální a přátelská péče", text: "Dostatek času, klidné prostředí a prostor skutečně se ptát." },
  { title: "Neustálé vzdělávání", text: "České i zahraniční zkušenosti a nejnovější postupy uváděné citlivě do praxe." },
];

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
              Rezervace termínu <span aria-hidden="true">↗</span>
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
              <p className="eyebrow">Proč Loggyn</p>
              <h2 className="display-heading">Péče, která začíná nasloucháním.</h2>
              <p className="lead">
                Odbornost a lidskost pro nás nejsou protiklady. Patří k sobě stejně přirozeně jako důvěra a bezpečí.
              </p>
            </Reveal>
            <div className="reason-list">
              {reasons.map((reason, index) => (
                <Reveal className="reason" delay={index * 0.07} key={reason.title}>
                  <span className="reason__number">0{index + 1}</span>
                  <div>
                    <h3>{reason.title}</h3>
                    <p>{reason.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sluzby" className="section section--services">
        <div className="shell">
          <Reveal className="section-intro section-intro--split">
            <div>
              <p className="eyebrow">Služby naší ordinace</p>
              <h2 className="display-heading">Pro zdraví, jistotu a dobrý pocit.</h2>
            </div>
            <p>
              Komplexní ambulantní péče spojující prevenci, moderní diagnostiku a citlivá řešení pro každé životní období.
            </p>
          </Reveal>

          <div className="services-grid">
            {siteConfig.services.map((service, index) => (
              <Reveal className="service-card" delay={(index % 3) * 0.07} key={service.title}>
                <div className="service-card__top">
                  <span className="service-card__icon"><ServiceIcon name={service.icon} /></span>
                  <span className="service-card__index">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-card__line" aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--private-care">
        <div className="shell private-care-grid">
          <Reveal className="private-care-title">
            <p className="eyebrow">Jiný standard péče</p>
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
              Aktuální ceník našich služeb najdete <Link className="text-link" href="/cenik">zde <span aria-hidden="true">→</span></Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
