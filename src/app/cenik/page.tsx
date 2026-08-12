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
      <section className="section pricing-section">
        <div className="shell pricing-stack">
          <Reveal>
            <h1 className="display-heading">Ceník</h1>
          </Reveal>
          {siteConfig.priceGroups.map((group, groupIndex) => (
            <Reveal className="price-group" key={group.title} delay={groupIndex * 0.06}>
              <div className="price-group__header">
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className="price-list" role="table" aria-label={group.title}>
                {group.items.map((item) => (
                  <div className="price-row" role="row" key={item.name}>
                    <span className="price-row__number" aria-hidden="true">✦</span>
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
