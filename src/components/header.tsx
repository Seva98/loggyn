"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/content/site";
import type { Dictionary, Locale, PageId } from "@/content/types";
import {
  getLocalizedPath,
  getPageId,
  getServicesPath,
  localeDetails,
  locales,
  serviceSectionIds,
} from "@/i18n/routing";

function BookingLink({ compact = false, label }: { compact?: boolean; label: string }) {
  return (
    <a
      className={compact ? "button button--primary button--compact" : "button button--primary"}
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
}

function LanguageSwitcher({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeIndex = locales.indexOf(locale);
  const page = getPageId(pathname) ?? "home";

  useEffect(() => {
    if (!open) return;
    optionRefs.current[activeIndex]?.focus();

    const closeOnPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeIndex, open]);

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = optionRefs.current.findIndex((option) => option === document.activeElement);
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % locales.length;
    if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + locales.length) % locales.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = locales.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    optionRefs.current[nextIndex]?.focus();
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLAnchorElement>, targetLocale: Locale) => {
    setOpen(false);
    if (!Object.values(serviceSectionIds).some((id) => window.location.hash === `#${id}`)) return;
    event.preventDefault();
    window.location.assign(getServicesPath(targetLocale));
  };

  const triggerLabel = `${dictionary.accessibility.languageSwitcher}: ${localeDetails[locale].name}`;

  return (
    <div className="language-switcher" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className={open ? "language-switcher__trigger is-open" : "language-switcher__trigger"}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="language-menu"
        aria-label={triggerLabel}
        title={triggerLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{localeDetails[locale].flag}</span>
        <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="language-menu"
            className="language-switcher__menu"
            role="menu"
            aria-label={dictionary.accessibility.languageSwitcher}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            onKeyDown={onMenuKeyDown}
          >
            {locales.map((targetLocale, index) => {
              const label = `${dictionary.accessibility.switchToLanguage} ${localeDetails[targetLocale].name}`;
              return (
                <Link
                  ref={(element) => { optionRefs.current[index] = element; }}
                  role="menuitem"
                  className={targetLocale === locale ? "language-switcher__option is-active" : "language-switcher__option"}
                  href={getLocalizedPath(targetLocale, page)}
                  hrefLang={localeDetails[targetLocale].htmlLang}
                  aria-current={targetLocale === locale ? "page" : undefined}
                  aria-label={label}
                  title={localeDetails[targetLocale].name}
                  key={targetLocale}
                  tabIndex={-1}
                  onClick={(event) => handleLanguageClick(event, targetLocale)}
                >
                  <span aria-hidden="true">{localeDetails[targetLocale].flag}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesActive, setServicesActive] = useState(false);
  const homePath = getLocalizedPath(locale, "home");
  const servicesId = serviceSectionIds[locale];
  const navigation: Array<{ id: PageId | "services"; label: string; href: string }> = [
    { id: "home", label: dictionary.header.navigation.home, href: homePath },
    { id: "services", label: dictionary.header.navigation.services, href: getServicesPath(locale) },
    { id: "about", label: dictionary.header.navigation.about, href: getLocalizedPath(locale, "about") },
    { id: "pricing", label: dictionary.header.navigation.pricing, href: getLocalizedPath(locale, "pricing") },
    { id: "contact", label: dictionary.header.navigation.contact, href: getLocalizedPath(locale, "contact") },
  ];

  useEffect(() => {
    if (pathname !== homePath) return;

    const services = document.getElementById(servicesId);
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!services || !header) return;

    const updateActiveSection = () => {
      const sectionBounds = services.getBoundingClientRect();
      const activationLine = header.getBoundingClientRect().bottom + 1;
      setServicesActive(sectionBounds.top <= activationLine && sectionBounds.bottom > activationLine);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [homePath, pathname, servicesId]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      pathname !== homePath
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, "", homePath);
    window.scrollTo({ top: 0, left: 0 });
    setServicesActive(false);
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      pathname !== homePath
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;

    const services = document.getElementById(servicesId);
    if (!services) return;

    event.preventDefault();
    const headerBottom = document.querySelector<HTMLElement>(".site-header")
      ?.getBoundingClientRect().bottom ?? 0;
    const servicesTop = window.scrollY + services.getBoundingClientRect().top - headerBottom;
    window.history.pushState(window.history.state, "", getServicesPath(locale));
    window.scrollTo({ top: Math.max(0, servicesTop), left: 0 });
    setServicesActive(true);
  };

  const isActive = (id: PageId | "services") => {
    if (id === "services") return pathname === homePath && servicesActive;
    if (id === "home") return pathname === homePath && !servicesActive;
    return pathname === getLocalizedPath(locale, id);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link
          className="brand"
          href={homePath}
          aria-label={dictionary.accessibility.brandHome}
          onClick={handleHomeClick}
        >
          <Image
            src={siteConfig.logoPath}
            alt={siteConfig.name}
            width={719}
            height={448}
            preload
          />
        </Link>

        <nav className="desktop-nav" aria-label={dictionary.accessibility.mainNavigation}>
          {navigation.map((item) => (
            <Link
              aria-current={isActive(item.id) ? "page" : undefined}
              className={isActive(item.id) ? "nav-link is-active" : "nav-link"}
              href={item.href}
              key={item.id}
              onClick={item.id === "home"
                ? handleHomeClick
                : item.id === "services"
                  ? handleServicesClick
                  : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <div className="desktop-booking">
            <BookingLink compact label={dictionary.header.booking} />
          </div>
          <LanguageSwitcher locale={locale} dictionary={dictionary} />
          <button
            type="button"
            className={open ? "menu-button is-open" : "menu-button"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? dictionary.accessibility.closeMenu : dictionary.accessibility.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mobile-menu__inner shell" aria-label={dictionary.accessibility.mobileNavigation}>
              {navigation.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <Link
                    aria-current={isActive(item.id) ? "page" : undefined}
                    href={item.href}
                    onClick={(event) => {
                      setOpen(false);
                      if (item.id === "home") handleHomeClick(event);
                      if (item.id === "services") handleServicesClick(event);
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <BookingLink label={dictionary.header.booking} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
