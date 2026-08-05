"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const backgrounds = [
  { id: "bouquet", label: "Kytice", image: "/images/hero-roses-bouquet-v2.jpg" },
  { id: "wall", label: "Růžová stěna", image: "/images/hero-roses-v2.jpg" },
  { id: "purple", label: "Fialové tóny", image: "/images/hero-roses-purple-v2.jpg" },
  { id: "closeup", label: "Detail růží", image: "/images/hero-roses-closeup-v2.jpg" },
  { id: "editorial", label: "Editorial", image: "/images/hero-roses-editorial.jpg" },
  { id: "openwall", label: "Vzdušná stěna", image: "/images/hero-roses-open-wall-v2.jpg" },
] as const;

type BackgroundId = (typeof backgrounds)[number]["id"];

function isBackgroundId(value: string | undefined): value is BackgroundId {
  return backgrounds.some((background) => background.id === value);
}

export function BackgroundSwitcher() {
  const [background, setBackground] = useState<BackgroundId>("wall");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.background;
    const frame = requestAnimationFrame(() => {
      if (isBackgroundId(current)) setBackground(current);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function selectBackground(next: BackgroundId) {
    document.documentElement.setAttribute("data-background", next);
    localStorage.setItem("loggyn-background", next);
    setBackground(next);
    setOpen(false);
  }

  const selectedIndex = backgrounds.findIndex((item) => item.id === background);
  const selected = backgrounds[selectedIndex];

  return (
    <div className="background-switcher" ref={containerRef}>
      <button
        type="button"
        className={open ? "background-switcher__trigger is-open" : "background-switcher__trigger"}
        aria-label={`Vybrat pozadí. Aktivní varianta: ${selected.label}`}
        aria-expanded={open}
        aria-controls="background-picker"
        title="Vybrat pozadí hero sekce"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="8.2" cy="9" r="1.5" />
          <path d="m5 17 4.6-4.6 3.1 3.1 2.2-2.2L19 17" />
        </svg>
        <span>BG</span>
        <strong>{selectedIndex + 1}/6</strong>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="background-picker"
            className="background-picker"
            role="dialog"
            aria-label="Výběr pozadí hero sekce"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="background-picker__heading">
              <span>Pozadí hero sekce</span>
              <small>Vyberte variantu</small>
            </div>
            <div className="background-picker__grid">
              {backgrounds.map((item, index) => (
                <button
                  type="button"
                  className={item.id === background ? "background-option is-selected" : "background-option"}
                  aria-pressed={item.id === background}
                  onClick={() => selectBackground(item.id)}
                  key={item.id}
                >
                  <span className="background-option__preview" style={{ backgroundImage: `url(${item.image})` }} />
                  <span className="background-option__label"><b>0{index + 1}</b>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
