import Image from "next/image";
import { BookingCta } from "@/components/booking-cta";
import { LocalizedRichText } from "@/components/localized-rich-text";
import { Reveal } from "@/components/reveal";
import { professionalSocieties } from "@/content/site";
import type { Dictionary, Locale } from "@/content/types";

const societyGroupIds = ["czechInternational", "germany"] as const;

export function AboutPage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="shell about-hero-grid">
          <Reveal className="about-portrait">
            <div className="about-portrait__frame">
              <Image
                src="/images/doctor-profile.webp"
                alt={dictionary.about.portraitAlt}
                fill
                sizes="(max-width: 900px) 92vw, 44vw"
                loading="eager"
              />
            </div>
            <p>{dictionary.about.illustrativePhoto}</p>
          </Reveal>
          <Reveal className="about-hero-copy" delay={0.1}>
            <h1>{dictionary.about.doctorName}</h1>
            <p className="lead">{dictionary.about.lead}</p>
            <p>{dictionary.about.introduction}</p>
            <blockquote>{dictionary.about.quote}</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section about-story">
        <div className="shell prose-grid">
          <Reveal>
            <h2 className="display-heading">{dictionary.about.storyTitle}</h2>
          </Reveal>
          <Reveal className="prose" delay={0.08}>
            <LocalizedRichText locale={locale} paragraphs={dictionary.about.story} />
            <p>{dictionary.about.languages}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--timeline">
        <div className="shell">
          <Reveal className="section-intro">
            <h2 className="display-heading">{dictionary.about.careerTitle}</h2>
          </Reveal>
          <div className="timeline">
            {dictionary.about.career.map((entry, index) => (
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
              <h2 className="display-heading">{dictionary.about.educationTitle}</h2>
            </div>
            <p>{dictionary.about.educationIntro}</p>
          </Reveal>
          <div className="certification-grid">
            {dictionary.about.certifications.map((group, groupIndex) => (
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
          <Reveal className="section-intro section-intro--split">
            <div>
              <h2 className="display-heading">{dictionary.about.membershipsTitle}</h2>
            </div>
            <p>{dictionary.about.membershipsIntro}</p>
          </Reveal>
          <div className="membership-groups">
            {societyGroupIds.map((group, groupIndex) => (
              <div className="membership-group" key={group}>
                <Reveal className="membership-group__heading" delay={groupIndex * 0.04}>
                  <h3>{dictionary.about.societyGroups[groupIndex]}</h3>
                </Reveal>
                <div className="membership-grid">
                  {professionalSocieties
                    .filter((society) => society.group === group)
                    .map((society, index) => (
                      <Reveal delay={(index % 3) * 0.05} key={society.abbreviation}>
                        <a
                          className="membership-card"
                          href={society.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${society.name} – ${dictionary.about.societyLinkLabel}`}
                        >
                          <span className="membership-card__logo">
                            <Image
                              src={society.logo}
                              alt={`${society.name} – ${dictionary.about.societyLogoAlt}`}
                              fill
                              sizes="(max-width: 640px) 75vw, (max-width: 1120px) 36vw, 25vw"
                            />
                          </span>
                          <span className="membership-card__body">
                            <span className="membership-card__meta">{society.abbreviation}</span>
                            <span className="membership-card__name">{society.name}</span>
                          </span>
                        </a>
                      </Reveal>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCta compact dictionary={dictionary} />
    </>
  );
}
