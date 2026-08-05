"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const frame = requestAnimationFrame(() => setTheme(current));
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem("loggyn-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}
      title={theme === "dark" ? "Světlý režim" : "Tmavý režim"}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <svg className="theme-toggle__sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg className="theme-toggle__moon" viewBox="0 0 24 24">
          <path d="M20 15.4A8.1 8.1 0 0 1 8.6 4a8.2 8.2 0 1 0 11.4 11.4Z" />
        </svg>
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  );
}
