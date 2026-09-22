export type Locale = "cs" | "en" | "de" | "uk";

export type PageId = "home" | "about" | "pricing" | "contact";

export interface RichTextSegment {
  text: string;
  emphasis?: boolean;
  link?: PageId;
}

export type RichParagraph = RichTextSegment[];

export interface LocalizedPriceGroup {
  title: string;
  description: string;
  items: string[];
}

export interface LocalizedCareerEntry {
  period: string;
  title: string;
  location?: string;
  description: string;
}

export interface LocalizedCertificationGroup {
  title: string;
  items: Array<{ name: string; detail?: string }>;
}

export interface Dictionary {
  metadata: {
    clinicDescription: string;
    keywords: string[];
    imageAlt: string;
    pages: Record<PageId, { title: string; description: string }>;
  };
  accessibility: {
    skipToContent: string;
    brandHome: string;
    mainNavigation: string;
    mobileNavigation: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: string;
    switchToLanguage: string;
  };
  header: {
    booking: string;
    navigation: {
      home: string;
      services: string;
      about: string;
      pricing: string;
      contact: string;
    };
  };
  bookingCta: {
    title: string;
    description: string;
    button: string;
  };
  footer: {
    title: string;
    navigationLabel: string;
    mapTitle: string;
    openMaps: string;
    mosaicLabel: string;
    instagramTrainingAlt: string;
    instagramConferenceAlt: string;
    instagramClinicAlt: string;
    instagramLabel: string;
    rights: string;
    madeBy: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    heroAnnouncement: string;
    heroBooking: string;
    discover: string;
    discoverLabel: string;
    portraitAlt: string;
    illustrativePhoto: string;
    reasonsTitle: string;
    reasons: string[];
    servicesTitle: string;
    services: string[];
    comingSoon: string;
    privateCareTitle: string;
    privateCare: RichParagraph[];
  };
  about: {
    portraitAlt: string;
    illustrativePhoto: string;
    doctorName: string;
    lead: string;
    introduction: string;
    quote: string;
    storyTitle: string;
    story: RichParagraph[];
    languages: string;
    careerTitle: string;
    career: LocalizedCareerEntry[];
    educationTitle: string;
    educationIntro: string;
    certifications: LocalizedCertificationGroup[];
    membershipsTitle: string;
    membershipsIntro: string;
    societyGroups: [string, string];
    societyLinkLabel: string;
    societyLogoAlt: string;
  };
  pricing: {
    title: string;
    groups: LocalizedPriceGroup[];
    tableLabel: string;
    note: string;
  };
  contact: {
    title: string;
    labels: {
      address: string;
      booking: string;
      hours: string;
    };
    bookingViaReservio: string;
    hours: string;
    mapHeading: string;
    temporaryNotice: string;
    openMaps: string;
    mapTitle: string;
  };
}
