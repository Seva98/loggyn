"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ServiceIcon } from "@/components/service-icon";

const iconSets = [
  { id: "classic", label: "Růžová linka 01" },
  { id: "soft", label: "Růžová linka 02" },
  { id: "fine", label: "Růžová linka 03" },
  { id: "seal", label: "Růžová linka 04" },
  { id: "organic", label: "Růžová linka 05" },
  { id: "bold", label: "Růžová linka 06" },
] as const;

type IconSetId = (typeof iconSets)[number]["id"];

function isIconSetId(value: string | undefined): value is IconSetId {
  return iconSets.some((set) => set.id === value);
}

export function IconSwitcher() {
  const [iconSet, setIconSet] = useState<IconSetId>("classic");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.iconSet;
    const frame = requestAnimationFrame(() => {
      if (isIconSetId(current)) setIconSet(current);
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

  function selectIconSet(next: IconSetId) {
    document.documentElement.setAttribute("data-icon-set", next);
    localStorage.setItem("loggyn-icon-set", next);
    setIconSet(next);
    setOpen(false);
  }

  const selectedIndex = iconSets.findIndex((set) => set.id === iconSet);
  const selected = iconSets[selectedIndex];

  return (
    <div className="icon-switcher" ref={containerRef}>
      <button
        type="button"
        className={open ? "icon-switcher__trigger is-open" : "icon-switcher__trigger"}
        aria-label={`Vybrat styl ikon. Aktivní varianta: ${selected.label}`}
        aria-expanded={open}
        aria-controls="icon-picker"
        title="Vybrat styl ikon služeb"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v10M7 12h10" />
        </svg>
        <span>IK</span>
        <strong>{selectedIndex + 1}/6</strong>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="icon-picker"
            className="icon-picker"
            role="dialog"
            aria-label="Výběr stylu ikon služeb"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="background-picker__heading">
              <span>Styl ikon služeb</span>
              <small>Vyberte variantu</small>
            </div>
            <div className="icon-picker__grid">
              {iconSets.map((set, index) => (
                <button
                  type="button"
                  className={set.id === iconSet ? "icon-option is-selected" : "icon-option"}
                  aria-pressed={set.id === iconSet}
                  onClick={() => selectIconSet(set.id)}
                  key={set.id}
                >
                  <span className="icon-option__preview" data-preview-icon-set={set.id}>
                    <ServiceIcon name="cytology" />
                  </span>
                  <span className="background-option__label"><b>0{index + 1}</b>{set.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
