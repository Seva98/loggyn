"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { IconSwitcher } from "@/components/icon-switcher";

function BookingLink({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={compact ? "button button--primary button--compact" : "button button--primary"}
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noreferrer"
    >
      Objednat si termín
    </a>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link className="brand" href="/" aria-label="Loggyn – úvodní stránka">
          <Image src="/logo-dark.svg" alt="Loggyn" width={719} height={448} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Hlavní navigace">
          {siteConfig.navigation.map((item) => {
            const active = item.href === "/#sluzby" ? pathname === "/" : pathname === item.href;
            return (
              <Link className={active ? "nav-link is-active" : "nav-link"} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <IconSwitcher />
          <div className="desktop-booking">
            <BookingLink compact />
          </div>
          <button
            type="button"
            className={open ? "menu-button is-open" : "menu-button"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
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
            <nav className="mobile-menu__inner shell" aria-label="Mobilní navigace">
              {siteConfig.navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
                </motion.div>
              ))}
              <BookingLink />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
