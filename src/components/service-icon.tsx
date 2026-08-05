import type { ServiceIconName } from "@/content/site";

const shared = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const content = {
    exam: (
      <>
        <path d="M20 12c8-8 20-8 28 0s8 20 0 28-20 8-28 0-8-20 0-28Z" />
        <path d="m17 43-7 7m2-2 5 5" />
        <path d="M27 20c4-3 10-3 14 0m-17 8c1-2 3-3 5-4m17 4c-1-2-3-3-5-4m-13 9c3 4 9 5 13 1" />
        <circle cx="42" cy="18" r="2" />
      </>
    ),
    ultrasound: (
      <>
        <rect x="12" y="10" width="40" height="34" rx="5" />
        <path d="M19 17h26v18H19zM25 39h14M32 44v7" />
        <path d="M25 29c3-8 10-9 14-3 2 3 0 7-3 7-2 0-3-2-2-4" />
        <path d="M49 36c5 1 7 5 6 11" />
      </>
    ),
    cytology: (
      <>
        <circle cx="32" cy="31" r="20" />
        <circle cx="32" cy="31" r="13" />
        <path d="M18 18 11 11m35 7 7-7M17 46l-6 7m36-7 6 7" />
        <circle cx="28" cy="28" r="3" />
        <circle cx="38" cy="34" r="2" />
        <circle cx="24" cy="38" r="1.5" />
      </>
    ),
    contraception: (
      <>
        <rect x="10" y="15" width="34" height="34" rx="5" />
        <path d="M17 22h20v20H17zM50 16v32M46 20h8M46 27h8M46 34h8M46 41h8" />
        <path d="M22 33c0-5 4-8 8-8 4 0 7 3 7 7 0 5-4 7-8 8" />
      </>
    ),
    menopause: (
      <>
        <circle cx="32" cy="28" r="15" />
        <path d="M32 43v11m-6-5h12" />
        <path d="M24 29c4-2 4-7 1-10m7 13c5-3 6-9 2-14m7 11c3-3 3-7 1-10" />
        <path d="M11 15c2-4 5-7 9-9m33 9c-2-4-5-7-9-9" />
      </>
    ),
    firstVisit: (
      <>
        <path d="M16 49V25a16 16 0 0 1 32 0v24" />
        <path d="M22 49V29a10 10 0 0 1 20 0v20" />
        <path d="M12 49h40" />
        <path d="M32 13v8m-4-4h8" />
        <path d="M27 33c2 2 3 5 2 9m8-9c-2 2-3 5-2 9" />
      </>
    ),
    breast: (
      <>
        <path d="M14 49c4-9 5-20 5-33m31 33c-4-9-5-20-5-33" />
        <path d="M19 16c4-5 10-6 13-1 3-5 9-4 13 1" />
        <path d="M19 19c0 13 4 23 13 30 9-7 13-17 13-30" />
        <circle cx="36" cy="30" r="3" />
        <path d="M31 43c-3-3-6-6-7-11" />
      </>
    ),
    botox: (
      <>
        <path d="m12 46 25-25m-6-6 6 6 4-4-6-6-4 4Z" />
        <path d="m15 39 8 8m-11-4 8 8" />
        <path d="m41 17 11-11m-3 0 3 3m-8 12 5 5" />
        <path d="M38 34c5 0 9 4 9 9s-4 9-9 9" />
      </>
    ),
    filler: (
      <>
        <path d="M32 10c8 10 14 17 14 26a14 14 0 0 1-28 0c0-9 6-16 14-26Z" />
        <path d="M23 37c2 5 5 7 10 7" />
        <path d="M46 14h8m-4-4v8M11 23h8m-4-4v8" />
        <circle cx="50" cy="42" r="4" />
      </>
    ),
  }[name];

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...shared}>
      {content}
    </svg>
  );
}
