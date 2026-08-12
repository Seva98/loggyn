import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function BookingCta({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "booking-panel-wrap booking-panel-wrap--compact" : "booking-panel-wrap"}>
      <Reveal className="shell">
        <div className="booking-panel">
          <div className="booking-panel__texture" aria-hidden="true" />
          <div className="booking-panel__copy">
            <h2>Vaše zdraví si zaslouží čas a pozornost.</h2>
            <p>Objednejte se online na termín, který vám bude vyhovovat.</p>
          </div>
          <a className="button button--light" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
            Rezervace termínu
          </a>
        </div>
      </Reveal>
    </section>
  );
}
