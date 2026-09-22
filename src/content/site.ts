export type ServiceIconName =
  | "exam"
  | "ultrasound"
  | "cytology"
  | "contraception"
  | "menopause"
  | "firstVisit"
  | "breast"
  | "botox"
  | "filler";

export interface ProfessionalSociety {
  name: string;
  abbreviation: string;
  group: "czechInternational" | "germany";
  url: string;
  logo: string;
}

export const siteConfig = {
  url: "https://loggyn.cz",
  name: "Loggyn",
  legalName: "Loggyn – Logan Gynekologie",
  doctorName: "MUDr. Aneta Logan",
  logoPath: "/logo.svg",
  faviconPath: "/graphic/favicon_24x24px.svg",
  socialImagePath: "/images/hero-roses-v2.jpg",
  bookingUrl: "https://aneta-logan.reservio.com",
  instagramUrl: "https://www.instagram.com/drlogana/",
  contact: {
    address: "Skrétova 47",
    city: "301 00 Plzeň",
    locality: "Plzeň",
    postalCode: "301 00",
    region: "Plzeňský kraj",
    countryCode: "CZ",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Skr%C3%A9tova%2047%2C%20301%2000%20Plze%C5%88&z=16&output=embed",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=Skr%C3%A9tova%2047%2C%20301%2000%20Plze%C5%88",
  },
} as const;

export const serviceDefinitions: Array<{ id: string; icon: ServiceIconName; comingSoon?: boolean }> = [
  { id: "exam", icon: "exam", comingSoon: true },
  { id: "ultrasound", icon: "ultrasound" },
  { id: "cytology", icon: "cytology", comingSoon: true },
  { id: "contraception", icon: "contraception", comingSoon: true },
  { id: "menopause", icon: "menopause", comingSoon: true },
  { id: "firstVisit", icon: "firstVisit", comingSoon: true },
  { id: "breast", icon: "breast" },
  { id: "botox", icon: "botox" },
  { id: "filler", icon: "filler" },
];

export const priceDefinitions = [
  {
    id: "gynaecology",
    prices: ["1 200 Kč", "1 500 Kč", "1 200 Kč", "700 Kč", "900 Kč"],
  },
  {
    id: "botox",
    prices: [
      "3 000 Kč",
      "5 500 Kč",
      "3 000 Kč",
      "2 500 Kč",
      "2 500 Kč",
      "4 000 Kč",
      "2 500 Kč",
      "2 500 Kč",
      "2 500 Kč",
      "6 000 Kč",
      "2 500 Kč",
      "2 500 Kč",
      "2 000 Kč",
      "6 000 Kč",
    ],
  },
] as const;

export const professionalSocieties: ProfessionalSociety[] = [
  {
    name: "Česká lékařská komora",
    abbreviation: "ČLK",
    group: "czechInternational",
    url: "https://www.lkcr.cz/",
    logo: "/images/societies/lkcr.png",
  },
  {
    name: "Česká komora estetické medicíny",
    abbreviation: "ČKEM",
    group: "czechInternational",
    url: "https://www.ckem.cz/",
    logo: "/images/societies/ckem.png",
  },
  {
    name: "European Society of Aesthetic Gynecology",
    abbreviation: "ESAG",
    group: "czechInternational",
    url: "https://esag.org/",
    logo: "/images/societies/esag.png",
  },
  {
    name: "Bayerische Landesärztekammer",
    abbreviation: "BLÄK",
    group: "germany",
    url: "https://www.blaek.de/",
    logo: "/images/societies/blaek.svg",
  },
  {
    name: "Deutsche Gesellschaft für Gynäkologie und Geburtshilfe",
    abbreviation: "DGGG",
    group: "germany",
    url: "https://www.dggg.de/",
    logo: "/images/societies/dggg.svg",
  },
  {
    name: "Deutsche Gesellschaft für Ultraschall in der Medizin",
    abbreviation: "DEGUM",
    group: "germany",
    url: "https://www.degum.de/",
    logo: "/images/societies/degum.png",
  },
  {
    name: "Arbeitsgemeinschaft Gynäkologische Endoskopie",
    abbreviation: "AGE",
    group: "germany",
    url: "https://ag-endoskopie.de/",
    logo: "/images/societies/age.svg",
  },
  {
    name: "Arbeitsgemeinschaft Kinder- und Jugendgynäkologie",
    abbreviation: "AG KJG",
    group: "germany",
    url: "https://www.kindergynaekologie.de/startseite/",
    logo: "/images/societies/kindergynaekologie.png",
  },
  {
    name: "Deutsche Menopause Gesellschaft",
    abbreviation: "DMG",
    group: "germany",
    url: "https://www.menopause-gesellschaft.de/",
    logo: "/images/societies/menopause.png",
  },
];
