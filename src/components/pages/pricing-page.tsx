import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { priceDefinitions } from "@/content/site";
import type { Dictionary } from "@/content/types";

export function PricingPage({ dictionary }: { dictionary: Dictionary }) {
  return (
    <>
      <section className="section pricing-section">
        <div className="shell pricing-stack">
          <Reveal>
            <h1 className="display-heading">{dictionary.pricing.title}</h1>
          </Reveal>
          {dictionary.pricing.groups.map((group, groupIndex) => (
            <Reveal className="price-group" key={group.title} delay={groupIndex * 0.06}>
              <div className="price-group__header">
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className="price-list" role="table" aria-label={`${dictionary.pricing.tableLabel} ${group.title}`}>
                {group.items.map((item, itemIndex) => (
                  <div className="price-row" role="row" key={item}>
                    <span className="price-row__number" aria-hidden="true">✦</span>
                    <span role="cell" className="price-row__name">{item}</span>
                    <strong role="cell" className="price-row__price">{priceDefinitions[groupIndex].prices[itemIndex]}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
          <p className="price-note">{dictionary.pricing.note}</p>
        </div>
      </section>

      <BookingCta compact dictionary={dictionary} />
    </>
  );
}
