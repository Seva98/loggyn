import { siteConfig } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { Reveal } from "@/components/reveal";

export function BookingCta({ compact = false, dictionary }: { compact?: boolean; dictionary: Dictionary }) {
  return (
    <section className={compact ? "booking-panel-wrap booking-panel-wrap--compact" : "booking-panel-wrap"}>
      <Reveal className="shell">
        <div className="booking-panel">
          <div className="booking-panel__texture" aria-hidden="true" />
          <div className="booking-panel__copy">
            <h2>{dictionary.bookingCta.title}</h2>
            <p>{dictionary.bookingCta.description}</p>
          </div>
          <a className="button button--light" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
            {dictionary.bookingCta.button}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
