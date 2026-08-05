import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Ceník",
  description: "Aktuální ceník privátní gynekologické a estetické péče Loggyn.",
};

export default function PricingPage() {
  return (
    <>
      <section className="page-hero page-hero--simple">
        <div className="shell simple-hero-grid">
          <Reveal>
            <p className="eyebrow eyebrow--light">Transparentní ceny</p>
            <h1>Ceník péče</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Naše ambulance funguje na principu přímé úhrady. Díky tomu vám můžeme nabídnout více času, soukromí a péči přizpůsobenou vašim potřebám.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="shell pricing-stack">
          {siteConfig.priceGroups.map((group, groupIndex) => (
            <Reveal className="price-group" key={group.title} delay={groupIndex * 0.06}>
              <div className="price-group__header">
                <p className="eyebrow">{group.eyebrow}</p>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className="price-list" role="table" aria-label={group.title}>
                {group.items.map((item, index) => (
                  <div className="price-row" role="row" key={item.name}>
                    <span className="price-row__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span role="cell" className="price-row__name">{item.name}</span>
                    <strong role="cell" className="price-row__price">{item.price}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
          <p className="price-note">
            Ceník je orientační a může se měnit podle individuálního rozsahu ošetření. Přesnou cenu vždy potvrdíme před výkonem.
          </p>
        </div>
      </section>

      <BookingCta compact />
    </>
  );
}
