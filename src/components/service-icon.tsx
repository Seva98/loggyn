import type { ServiceIconName } from "@/content/site";

type IconSet = "classic" | "soft" | "fine" | "seal" | "organic" | "bold";

function Glyph({ name, set }: { name: ServiceIconName; set: IconSet }) {
  const classic = {
    exam: (
      <>
        <path d="M25 19c-5-6-11-8-16-4-4 3-3 10 2 12 5 2 9-2 14 2m14-10c5-6 11-8 16-4 4 3 3 10-2 12-5 2-9-2-14 2" />
        <path d="M24 18c1 9 2 16 5 20l1 15m10-35c-1 9-2 16-5 20l-1 15M29 38h6M27 15c3 2 7 2 10 0" />
        <circle cx="14" cy="25" r="5" /><circle cx="50" cy="25" r="5" />
      </>
    ),
    ultrasound: (
      <>
        <rect x="9" y="10" width="39" height="34" rx="4" />
        <path d="M14 15h29v22H14zM20 50h18m-9-6v6" />
        <path d="M19 32c3-9 8-13 14-9 4 3 3 8-1 9-3 1-6-2-5-5" />
        <circle cx="14" cy="40" r="2" /><path d="M40 40h4M49 29h5c2 0 3 2 3 4v10c0 5-3 8-7 8s-7-3-7-8" />
      </>
    ),
    cytology: (
      <>
        <path d="m28 7 9 4-4 9-9-4Zm-2 10-7 19m15-15c8 3 12 11 10 19" />
        <path d="M12 37h25m-18 0-5 11h34l-5-7M33 20l-7 18" /><circle cx="34" cy="29" r="4" />
        <circle cx="49" cy="38" r="9" /><circle cx="46" cy="36" r="2" /><circle cx="52" cy="34" r="1.5" /><circle cx="52" cy="41" r="2" />
      </>
    ),
    contraception: (
      <>
        <g transform="rotate(-12 26 31)"><rect x="10" y="10" width="27" height="43" rx="4" /><circle cx="19" cy="20" r="4" /><circle cx="29" cy="20" r="4" /><circle cx="19" cy="32" r="4" /><circle cx="29" cy="32" r="4" /><circle cx="19" cy="44" r="4" /><circle cx="29" cy="44" r="4" /></g>
        <path d="M39 30 53 36v12c-3 5-7 8-14 11-7-3-11-6-14-11V36Z" /><circle cx="39" cy="43" r="4" /><path d="M39 47v7m-4-3h8" />
      </>
    ),
    menopause: (
      <>
        <path d="M20 41c-6-9-4-23 5-30 7-5 17-4 21 3 2 4 1 8-2 11l5 6-6 2c-1 7-6 11-12 11" />
        <path d="M21 20c5-1 10-5 13-11M18 49c-5-1-8-4-11-8m12 10c-2 4-5 7-9 8m21-13c-1 6-5 10-10 13m13-12c2 5 5 8 10 10m-3-16c4 4 8 6 13 6" />
      </>
    ),
    firstVisit: (
      <>
        <path d="M16 49c0-11 5-18 13-18s13 7 13 18M20 19c0-7 4-12 10-12s10 5 10 12-4 12-10 12-10-5-10-12Z" />
        <path d="M21 16c5 0 9-3 12-8M17 14c-2 7-1 13 3 18M40 14c4 5 4 11 1 17" />
        <path d="M43 33h9c3 0 5 2 5 5v8c0 3-2 5-5 5h-1l-5 5v-5h-3c-3 0-5-2-5-5v-8c0-3 2-5 5-5Z" /><path d="m44 41 3 3 5-6" />
      </>
    ),
    breast: (
      <>
        <path d="M23 8c1 8 0 13-4 19-4 6-6 12-4 19 2 7 8 11 15 10 8-1 13-7 13-15 0-6-3-11-8-16-5-5-8-10-8-17" />
        <path d="M45 25c5 3 8 7 9 12m-10-5c4 2 6 5 7 8m-9-2c2 1 3 3 4 5" />
      </>
    ),
    botox: (
      <>
        <path d="m10 53 28-34 11 9-28 34m13-38 10 8M18 48l5 4m0-10 5 4m0-11 5 4" />
        <path d="m39 18 5-6 12 10-5 6m-5-14 4-5 7 6-4 5" /><path d="M48 42v12m-6-6h12" />
      </>
    ),
    filler: (
      <>
        <path d="M22 11c-6 10-11 17-11 25 0 9 7 16 16 16s16-7 16-16c0-8-5-15-11-25Z" />
        <circle cx="23" cy="35" r="3" /><circle cx="31" cy="31" r="3" /><circle cx="32" cy="41" r="3" />
        <path d="m35 49 18-30m-12-5 12 7 4-7-12-7Zm5 13 7 4M41 34l7 4M37 41l7 4" />
      </>
    ),
  };

  const soft = {
    exam: <><path d="M27 22c-5-8-15-10-18-3-3 7 6 11 16 10m12-7c5-8 15-10 18-3 3 7-6 11-16 10" /><path d="M25 18c1 15 2 18 7 23 5-5 6-8 7-23M32 41v12m-5-5h10" /></>,
    ultrasound: <><path d="M14 14h36v27H14z" /><path d="M20 34c4-12 10-15 17-10 4 3 4 9-1 11-4 2-8-1-7-5" /><path d="M25 48h14m-7-7v7M49 23l7 5-7 5" /></>,
    cytology: <><path d="m24 10 12 5-4 10-12-5Zm-2 11-8 19m20-14c8 3 12 12 9 20" /><path d="M9 41h27m-18 0-5 11h39l-6-7" /><circle cx="33" cy="34" r="4" /></>,
    contraception: <><g transform="rotate(-16 32 32)"><rect x="14" y="12" width="36" height="40" rx="5" /><circle cx="24" cy="22" r="4" /><circle cx="40" cy="22" r="4" /><circle cx="24" cy="35" r="4" /><circle cx="40" cy="35" r="4" /></g><circle cx="50" cy="49" r="7" /><path d="m45 54 10-10" /></>,
    menopause: <><path d="M13 35c4-11 10-17 19-17s15 6 19 17" /><path d="M18 35c5 9 23 9 28 0M32 44v11m-6-5h12" /><path d="M22 15c2-5 5-7 10-7m10 7c-2-5-5-7-10-7" /></>,
    firstVisit: <><path d="M20 19c0-7 5-11 11-11s11 4 11 11c0 6-5 11-11 11s-11-5-11-11Z" /><path d="M13 53c2-14 8-23 18-23s16 9 18 23M22 12c4 5 10 7 18 6" /><path d="m26 42 5 5 9-10" /></>,
    breast: <><path d="M12 48c7-7 8-18 8-32m32 32c-7-7-8-18-8-32" /><path d="M20 18c7 3 9 10 12 18 3-8 5-15 12-18" /><path d="M25 46c3-4 5-8 7-14 2 6 4 10 7 14M42 34l11 6-5 9-10-6" /></>,
    botox: <><path d="M13 47c4-5 6-11 6-19 0-12 7-19 17-19s16 7 16 18c0 8-3 14-9 18" /><path d="M25 21h17M28 28h11" /><path d="m11 39 18-8m-13 1 3 7" /></>,
    filler: <><path d="M12 37c6-7 13-10 20-4 7-6 14-3 20 4-6 10-14 15-20 15S18 47 12 37Z" /><path d="M16 37c11 2 21 2 32 0M44 11l8 8-18 18m5-21 8 8" /></>,
  };

  const fine = {
    exam: <><path d="M24 21c-7-8-14-7-16-2-2 6 5 10 16 9m16-7c7-8 14-7 16-2 2 6-5 10-16 9" /><path d="M24 17c1 11 2 18 8 24 6-6 7-13 8-24M32 41v12m-5-5h10" /></>,
    ultrasound: <><path d="M9 17h30v24H9z" /><path d="M15 35c2-8 7-13 13-10 5 3 3 10-2 9" /><path d="M45 14c8 4 10 13 6 20l-8 15m2-20 8 5M40 50h14" /></>,
    cytology: <><path d="m22 9 13 6-5 10-13-6Zm-3 12-7 18m20-13c9 3 13 12 10 21" /><path d="M8 40h29m-20 0-5 12h41l-7-8" /><circle cx="32" cy="34" r="5" /></>,
    contraception: <><rect x="12" y="10" width="40" height="44" rx="7" /><circle cx="23" cy="21" r="4" /><circle cx="41" cy="21" r="4" /><circle cx="23" cy="34" r="4" /><circle cx="41" cy="34" r="4" /><circle cx="23" cy="47" r="4" /><path d="M37 47h8" /></>,
    menopause: <><path d="M16 14c12 2 21 12 21 25v14" /><path d="M48 14c-12 2-21 12-21 25v14M22 52h20" /><path d="M24 18c3 6 2 11-3 15m19-15c-3 6-2 11 3 15" /></>,
    firstVisit: <><circle cx="25" cy="19" r="8" /><path d="M11 52c2-15 6-24 14-24s12 9 14 24M18 12c3 5 8 7 14 7" /><circle cx="47" cy="42" r="9" /><path d="M47 37v10m-5-5h10" /></>,
    breast: <><path d="M18 11c1 16-4 28-8 39m36-39c-1 16 4 28 8 39" /><path d="M18 15c9 2 14 9 14 20 0-11 5-18 14-20M32 35c-2 7-6 12-12 15m12-15c2 7 6 12 12 15M43 33l11 6-5 9-9-6" /></>,
    botox: <><path d="M16 49c4-6 6-13 5-22-1-11 6-19 16-19 9 0 15 7 15 17 0 10-4 17-11 22" /><path d="M27 20h18m-15 7h12" /><path d="M9 34h20m-7-5 7 5-7 5" /></>,
    filler: <><path d="M12 37c6-10 13-15 20-15s14 5 20 15c-6 8-13 12-20 12s-14-4-20-12Z" /><path d="M18 37c9-3 19-3 28 0M32 8v9m-4-4h8" /></>,
  };

  const seal = {
    exam: <><path d="M25 20c-5-7-13-8-17-3-4 6 3 12 16 11m15-8c5-7 13-8 17-3 4 6-3 12-16 11" /><path d="M24 17c1 12 2 19 8 25 6-6 7-13 8-25M32 42v12m-6-5h12" /></>,
    ultrasound: <><path d="M12 12h32v26H12z" /><path d="M18 31c3-9 9-13 15-8 4 4 0 9-4 7" /><path d="M48 22c6 4 7 11 3 17l-9 13M38 52h16" /></>,
    cytology: <><path d="m24 8 12 6-5 11-12-6Zm-3 13-8 20m20-15c9 4 13 13 9 22" /><path d="M9 42h29m-20 0-5 11h39l-7-8" /><circle cx="33" cy="35" r="5" /></>,
    contraception: <><g transform="rotate(12 32 32)"><rect x="13" y="10" width="38" height="44" rx="6" /><circle cx="23" cy="21" r="4" /><circle cx="41" cy="21" r="4" /><circle cx="23" cy="34" r="4" /><circle cx="41" cy="34" r="4" /><circle cx="23" cy="47" r="4" /><circle cx="41" cy="47" r="4" /></g></>,
    menopause: <><path d="M12 45c5-16 12-27 20-35 8 8 15 19 20 35" /><path d="M20 45h24M25 52h14" /><path d="M25 31c4 4 10 4 14 0" /></>,
    firstVisit: <><circle cx="25" cy="18" r="8" /><path d="M11 51c2-14 7-23 14-23s12 9 14 23M17 15c7 0 11-3 13-7" /><path d="M43 35h12v16H43zM46 35v-4h6v4m-3 5v6m-3-3h6" /></>,
    breast: <><path d="M15 51c6-12 8-25 6-39m28 39c-6-12-8-25-6-39" /><circle cx="32" cy="30" r="14" /><path d="M25 39c5-3 8-8 9-15M44 35l10 6-5 8-9-5" /></>,
    botox: <><path d="M15 50c5-8 6-15 5-23C19 16 26 8 36 8s16 7 16 18c0 9-3 16-10 22" /><path d="M26 20h20m-17 7h14" /><path d="m8 38 21-8m-16 0 3 9" /></>,
    filler: <><path d="M10 38c7-8 14-10 22-4 8-6 15-4 22 4-7 10-15 15-22 15S17 48 10 38Z" /><path d="M16 38c11 2 21 2 32 0M42 9l11 10-20 19m6-24 9 9" /></>,
  };

  const organic = {
    exam: <><path d="M23 21c-6-7-14-8-18-2-3 6 4 12 17 10m19-8c6-7 14-8 18-2 3 6-4 12-17 10" /><path d="M22 18c2 13 4 19 10 25 6-6 8-12 10-25M32 43v11m-5-5h10" /></>,
    ultrasound: <><path d="M9 13c12-3 33-3 45 0v33c-12 3-33 3-45 0Z" /><path d="M17 38c4-13 11-18 19-12 5 4 2 11-3 10-4 0-5-4-3-7M24 53h16m-8-6v6" /></>,
    cytology: <><path d="m23 8 13 6-5 11-13-6Zm-3 13-8 20m21-15c9 4 13 13 9 22" /><path d="M8 42h30m-20 0-6 11h41l-8-8" /><circle cx="33" cy="35" r="5" /></>,
    contraception: <><path d="M12 15c10-5 30-5 40 0v35c-10 5-30 5-40 0Z" /><circle cx="22" cy="24" r="4" /><circle cx="33" cy="22" r="4" /><circle cx="44" cy="25" r="4" /><circle cx="22" cy="39" r="4" /><circle cx="34" cy="38" r="4" /><circle cx="45" cy="40" r="4" /></>,
    menopause: <><path d="M11 39c6-19 17-29 33-27 9 1 13 9 9 18-7 17-25 25-42 9Z" /><path d="M23 36c3-8 8-13 16-16M32 30v22m-6-5h12" /></>,
    firstVisit: <><path d="M18 19c0-7 5-12 12-12s12 5 12 12-5 12-12 12-12-5-12-12Z" /><path d="M10 54c2-15 9-23 20-23s18 8 20 23M20 13c5 6 12 8 20 5" /><path d="m24 43 6 5 10-11" /></>,
    breast: <><path d="M12 44c5-13 8-24 8-34 8 1 12 7 12 17 0-10 4-16 12-17 0 10 3 21 8 34-11 9-29 9-40 0Z" /><path d="M24 43c4-5 7-10 8-16 1 6 4 11 8 16M43 32l11 7-5 9-10-6" /></>,
    botox: <><path d="M13 49c5-7 7-15 6-23C18 15 25 7 36 8c10 1 16 8 15 19-1 9-4 16-11 21" /><path d="M25 20c7-3 14-3 21 0M27 28h17" /><path d="M8 34c8 0 14-1 20-5m-9-3 9 3-6 7" /></>,
    filler: <><path d="M10 38c8-8 15-10 22-4 7-6 14-4 22 4-7 10-15 15-22 15S17 48 10 38Z" /><path d="M16 38c11 3 21 3 32 0M43 8l11 11-21 20m6-25 9 9" /></>,
  };

  const bold = {
    exam: <><path d="M24 20C17 11 7 13 7 20c0 6 7 9 16 8m17-8c7-9 17-7 17 0 0 6-7 9-16 8" /><path d="M23 15c1 15 3 21 9 27 6-6 8-12 9-27M32 42v13M25 49h14" /></>,
    ultrasound: <><rect x="8" y="10" width="40" height="34" rx="2" /><path d="M16 36V18h24v18ZM27 50h18m-9-6v6M52 18v20" /></>,
    cytology: <><path d="m22 6 15 7-6 13-15-7Zm-4 15L9 43m25-15c10 4 14 13 10 23" /><path d="M6 44h32M15 44 10 56h46l-9-9" /><circle cx="34" cy="37" r="5" /></>,
    contraception: <><rect x="9" y="7" width="46" height="50" rx="4" /><circle cx="21" cy="20" r="5" /><circle cx="43" cy="20" r="5" /><circle cx="21" cy="34" r="5" /><circle cx="43" cy="34" r="5" /><circle cx="21" cy="48" r="5" /><circle cx="43" cy="48" r="5" /></>,
    menopause: <><path d="M10 12h44L42 39H22Z" /><path d="M32 39v15M23 54h18M21 22h22" /></>,
    firstVisit: <><circle cx="24" cy="17" r="9" /><path d="M7 56c2-17 8-29 17-29s15 12 17 29M15 10c4 6 10 8 18 7" /><rect x="41" y="34" width="17" height="22" rx="2" /><path d="M45 34v-5h9v5m-5 7v9m-4-4h9" /></>,
    breast: <><path d="M8 7h17v18c0 10 2 19 7 28 5-9 7-18 7-28V7h17M16 54h32" /><path d="m43 32 14 8-6 11-13-7" /></>,
    botox: <><path d="M12 54c5-8 7-18 6-28C17 13 25 5 37 6c11 1 18 9 17 21-1 11-5 20-13 26" /><path d="M24 19h23M27 28h18M6 39l25-9m-17 0 4 11" /></>,
    filler: <><path d="M6 39c9-10 18-13 26-5 8-8 17-5 26 5-8 12-18 18-26 18S14 51 6 39Z" /><path d="M13 39c13 3 25 3 38 0M43 5l14 13-25 22m7-29 12 12" /></>,
  };

  return { classic, soft, fine, seal, organic, bold }[set][name];
}

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
      <g className="service-icon__set service-icon__set--classic"><Glyph name={name} set="classic" /></g>
      <g className="service-icon__set service-icon__set--soft"><Glyph name={name} set="soft" /></g>
      <g className="service-icon__set service-icon__set--fine"><Glyph name={name} set="fine" /></g>
      <g className="service-icon__set service-icon__set--seal"><Glyph name={name} set="seal" /></g>
      <g className="service-icon__set service-icon__set--organic"><Glyph name={name} set="organic" /></g>
      <g className="service-icon__set service-icon__set--bold"><Glyph name={name} set="bold" /></g>
    </svg>
  );
}
