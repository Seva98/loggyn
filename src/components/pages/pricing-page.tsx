import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { priceDefinitions } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { Fragment } from "react";

export function PricingPage({ dictionary }: { dictionary: Dictionary }) {
  return (
    <>
      <section className="section pricing-section">
        <div className="shell pricing-stack">
          <Reveal>
            <h1 className="display-heading">{dictionary.pricing.title}</h1>
          </Reveal>
          {dictionary.pricing.groups.map((group, groupIndex) => (
            <Fragment key={group.title}>
              {groupIndex === 1 && <h2 className="price-category-title">{dictionary.pricing.aestheticTitle}</h2>}
              <Reveal className="price-group" delay={groupIndex * 0.06}>
                <div className="price-group__header">
                  {groupIndex === 0 ? <h2>{group.title}</h2> : <h3>{group.title}</h3>}
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
            </Fragment>
          ))}
          <p className="price-note">{dictionary.pricing.note}</p>
        </div>
      </section>

      <BookingCta compact dictionary={dictionary} />
    </>
  );
}
