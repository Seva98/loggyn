import type { Metadata } from "next";
import Image from "next/image";
import { BookingCta } from "@/components/booking-cta";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "O nás",
  description: "Poznejte lékařku Loggyn, její profesní cestu, certifikace a přístup k péči o ženy.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="shell about-hero-grid">
          <Reveal className="about-portrait">
            <div className="about-portrait__frame">
              <Image
                src="/images/doctor-portrait.png"
                alt="Ilustrační portrét lékařky Loggyn"
                fill
                sizes="(max-width: 900px) 92vw, 44vw"
                loading="eager"
              />
            </div>
            <p>Ilustrační fotografie</p>
          </Reveal>
          <Reveal className="about-hero-copy" delay={0.1}>
            <p className="eyebrow">O nás</p>
            <h1>Péče postavená na zkušenosti. A na důvěře.</h1>
            <p className="lead">
              Jsem specialistka v oboru gynekologie a porodnictví s více než desetiletou zkušeností z českého a německého zdravotnického prostředí.
            </p>
            <p>
              Po absolvování Lékařské fakulty Univerzity Karlovy v Plzni jsem působila v německých nemocnicích. Stále pracuji v soukromé gynekologické ambulanci v Německu, kde jsem získala cenné zkušenosti s moderní ambulantní péčí a individuálním přístupem k pacientkám.
            </p>
            <blockquote>„Věřím, že dobrá medicína začíná nasloucháním.“</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section about-story">
        <div className="shell prose-grid">
          <Reveal>
            <p className="eyebrow">Můj přístup</p>
            <h2 className="display-heading">Odborná medicína s lidskou tváří.</h2>
          </Reveal>
          <Reveal className="prose" delay={0.08}>
            <p>
              Věřím, že gynekologická péče není jen o vyšetřeních, ale především o důvěře, otevřené komunikaci a pocitu bezpečí. Ve své praxi propojuji odbornou medicínu s lidským přístupem – od první gynekologické návštěvy, prevence a ultrazvukové diagnostiky až po péči v těhotenství, řešení gynekologických obtíží a podporu žen v různých životních obdobích.
            </p>
            <p>
              Mou odbornou oblastí je zejména ultrazvuková <strong>diagnostika v gynekologii a porodnictví, vyšetření prsu a kolposkopie</strong>, poradenství a nefarmakologická i farmakologická terapie v období <strong>perimenopauzy a menopauzy</strong>. Aktuálně si dále rozšiřuji vzdělání v oblasti <strong>dětské a adolescentní gynekologie v Německu</strong>.
            </p>
            <p>
              Od roku 2026 rozšiřuji svou péči také o <strong>estetickou a intimní medicínu</strong>, která přirozeně navazuje na můj dlouhodobý zájem o ženské zdraví, sebevědomí a kvalitu života. Zaměřuji se na jemné a přirozené metody estetické péče, včetně aplikace botulotoxinu a dermálních výplní.
            </p>
            <p>Péči poskytuji v češtině a plynule také v němčině a angličtině.</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--timeline">
        <div className="shell">
          <Reveal className="section-intro">
            <p className="eyebrow">Moje profesní cesta</p>
            <h2 className="display-heading">Zkušenosti napříč zeměmi i obory.</h2>
          </Reveal>
          <div className="timeline">
            {siteConfig.career.map((entry, index) => (
              <Reveal className="timeline-card" delay={(index % 2) * 0.08} key={`${entry.period}-${entry.title}`}>
                <div className="timeline-card__meta">
                  <span>{entry.period}</span>
                  <i aria-hidden="true" />
                </div>
                <div>
                  <h3>{entry.title}</h3>
                  {entry.location && <p className="timeline-card__location">{entry.location}</p>}
                  <p>{entry.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--education">
        <div className="shell">
          <Reveal className="section-intro section-intro--split">
            <div>
              <p className="eyebrow">Vzdělávání a certifikace</p>
              <h2 className="display-heading">Medicína, která se nikdy nepřestává učit.</h2>
            </div>
            <p>Odborné vzdělávání průběžně rozšiřuji v oblastech moderní gynekologické a porodnické péče.</p>
          </Reveal>
          <div className="certification-grid">
            {siteConfig.certifications.map((group, groupIndex) => (
              <Reveal className="certification-card" delay={groupIndex * 0.08} key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={`${item.name}-${item.detail ?? ""}`}>
                      <span aria-hidden="true">✦</span>
                      <p><strong>{item.name}</strong>{item.detail && <> — {item.detail}</>}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section memberships">
        <div className="shell">
          <Reveal className="section-intro">
            <p className="eyebrow">Odborné společnosti</p>
            <h2 className="display-heading">Členství a profesní propojení.</h2>
          </Reveal>
          <div className="membership-grid">
            {["Česká společnost", "Německá společnost", "Ultrazvuková společnost", "Odborná platforma"].map((label) => (
              <div className="membership-placeholder" key={label}>
                <span aria-hidden="true">L</span>
                <p>{label}</p>
                <small>logo a odkaz budou doplněny</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCta compact />
    </>
  );
}
