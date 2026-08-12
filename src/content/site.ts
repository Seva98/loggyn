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

export interface Service {
  title: string;
  icon: ServiceIconName;
}

export interface PriceItem {
  name: string;
  price: string;
}

export interface PriceGroup {
  title: string;
  description: string;
  items: PriceItem[];
}

export interface CareerEntry {
  period: string;
  title: string;
  location?: string;
  description: string;
}

export interface CertificationGroup {
  title: string;
  items: Array<{ name: string; detail?: string }>;
}

export interface ProfessionalSociety {
  name: string;
  abbreviation: string;
  group: "Česko a mezinárodní" | "Německo";
  url: string;
  logo: string;
}

export interface ContactDetails {
  address: string;
  city: string;
  email: string;
  phone: string;
  phoneHref: string;
  hours: string;
  mapEmbedUrl: string;
  mapExternalUrl: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  bookingUrl: string;
  navigation: Array<{ label: string; href: string }>;
  contact: ContactDetails;
  services: Service[];
  priceGroups: PriceGroup[];
  career: CareerEntry[];
  certifications: CertificationGroup[];
  professionalSocieties: ProfessionalSociety[];
}

export const siteConfig: SiteConfig = {
  name: "Loggyn",
  legalName: "Loggyn – Logan Gynekologie",
  bookingUrl: "https://reservio.cz/",
  navigation: [
    { label: "Domovská stránka", href: "/" },
    { label: "O nás", href: "/o-nas" },
    { label: "Ceník", href: "/cenik" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  // Dočasné kontaktní údaje – před spuštěním nahradit údaji ordinace.
  contact: {
    address: "Růžová 12",
    city: "301 00 Plzeň",
    email: "ordinace@loggyn.cz",
    phone: "+420 777 123 456",
    phoneHref: "+420777123456",
    hours: "pouze po objednání",
    mapEmbedUrl:
      "https://www.google.com/maps?q=R%C5%AF%C5%BEov%C3%A1%2012%2C%20301%2000%20Plze%C5%88&z=16&output=embed",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=R%C5%AF%C5%BEov%C3%A1%2012%2C%20301%2000%20Plze%C5%88",
  },
  services: [
    {
      title: "Gynekologické vyšetření",
      icon: "exam",
    },
    {
      title: "Ultrazvuková gynekologická vyšetření",
      icon: "ultrasound",
    },
    {
      title: "Cytologie – LBC",
      icon: "cytology",
    },
    {
      title: "Antikoncepční poradna",
      icon: "contraception",
    },
    {
      title: "Poradna pro ženy v menopauze",
      icon: "menopause",
    },
    {
      title: "První gynekologická návštěva pro dívky",
      icon: "firstVisit",
    },
    {
      title: "Sonografie prsu",
      icon: "breast",
    },
    {
      title: "Aplikace botulotoxinu",
      icon: "botox",
    },
    {
      title: "Aplikace kyseliny hyaluronové",
      icon: "filler",
    },
  ],
  priceGroups: [
    {
      title: "Gynekologická péče",
      description: "Cena zahrnuje čas lékařky, konzultaci a uvedená vyšetření.",
      items: [
        { name: "Gynekologická konzultace včetně ultrazvukového vyšetření", price: "1 200 Kč" },
        {
          name: "Gynekologická konzultace včetně ultrazvukového vyšetření a cytologického stěru",
          price: "1 500 Kč",
        },
        { name: "Vyšetření těhotné pacientky", price: "1 200 Kč" },
        { name: "LBC", price: "700 Kč" },
        { name: "Mammasonografie", price: "900 Kč" },
      ],
    },
    {
      title: "Aplikace botulotoxinu",
      description: "Konkrétní rozsah ošetření vždy doporučíme až po osobní konzultaci.",
      items: [
        { name: "Čelo", price: "3 000 Kč" },
        { name: "Čelo + mračivka", price: "5 500 Kč" },
        { name: "Mračivka (glabela)", price: "3 000 Kč" },
        { name: "Zvednutí obočí – obě strany", price: "2 500 Kč" },
        { name: "Krčení nosu", price: "2 500 Kč" },
        { name: "Kolem očí – obě strany", price: "4 000 Kč" },
        { name: "Snížení špičky nosu", price: "2 500 Kč" },
        { name: "Zvednutí špičky nosu", price: "2 500 Kč" },
        { name: "Horní ret – zvednutí rtu, mírné zvětšení", price: "2 500 Kč" },
        { name: "Žvýkací svaly – zúžení obličeje / bruxismus", price: "6 000 Kč" },
        { name: "Gummy smile (kobylí úsměv / odhalená dáseň)", price: "2 500 Kč" },
        { name: "Koutky úst", price: "2 500 Kč" },
        { name: "Brada", price: "2 000 Kč" },
        { name: "Krk – platysma", price: "6 000 Kč" },
      ],
    },
  ],
  career: [
    {
      period: "2007–2014",
      title: "Lékařská fakulta Univerzity Karlovy v Plzni",
      location: "Studium všeobecného lékařství",
      description:
        "Během studia jsem absolvovala zahraniční odborné stáže v Indonésii na gynekologicko-porodnickém oddělení a v Rumunsku a Ázerbájdžánu na chirurgických pracovištích. V rámci programu Erasmus jsem strávila semestr na Univerzitě Umeå ve Švédsku, kde jsem se věnovala ženskému a dětskému zdraví.",
    },
    {
      period: "2014–2021",
      title: "Gynekologie a porodnictví – Německo",
      location: "Sulzbach-Rosenberg, Amberg a Tirschenreuth",
      description:
        "Po ukončení studia jsem působila na gynekologicko-porodnických odděleních německých nemocnic a získala zkušenosti v širokém spektru gynekologické, porodnické i operační péče.",
    },
    {
      period: "2021–dosud",
      title: "Soukromá gynekologická ambulance",
      location: "Waldsassen, Německo",
      description:
        "Věnuji se komplexní ambulantní péči o ženy všech věkových kategorií – od prevence a ultrazvukové diagnostiky přes péči v těhotenství až po řešení obtíží a péči v období hormonálních změn.",
    },
    {
      period: "2022",
      title: "Atestace v oboru gynekologie a porodnictví",
      location: "Mnichov, Německo",
      description:
        "Získání německé specializované způsobilosti završilo mou dlouholetou klinickou přípravu v oboru gynekologie a porodnictví.",
    },
  ],
  certifications: [
    {
      title: "Odborné certifikace",
      items: [
        { name: "DEGUM I", detail: "gynekologická a porodnická ultrazvuková diagnostika" },
        { name: "DEGUM I", detail: "ultrazvuková diagnostika prsu (mammasonografie)" },
        { name: "MIC I", detail: "endoskopická gynekologie" },
        { name: "Kolposkopická certifikace", detail: "kolposkopie a cervikální patologie" },
      ],
    },
    {
      title: "Současné odborné zaměření",
      items: [
        { name: "Menopauzální a gynekologická endokrinologie" },
        { name: "Dětská a adolescentní gynekologie" },
        { name: "Estetická a intimní medicína" },
        { name: "Prenatální a porodnická medicína" },
        { name: "Dopplerovská sonografie" },
        { name: "Psychosomatická péče v gynekologii" },
        { name: "Humánní genetika" },
      ],
    },
  ],
  professionalSocieties: [
    {
      name: "Česká lékařská komora",
      abbreviation: "ČLK",
      group: "Česko a mezinárodní",
      url: "https://www.lkcr.cz/",
      logo: "/images/societies/lkcr.png",
    },
    {
      name: "Česká komora estetické medicíny",
      abbreviation: "ČKEM",
      group: "Česko a mezinárodní",
      url: "https://www.ckem.cz/",
      logo: "/images/societies/ckem.png",
    },
    {
      name: "European Society of Aesthetic Gynecology",
      abbreviation: "ESAG",
      group: "Česko a mezinárodní",
      url: "https://esag.org/",
      logo: "/images/societies/esag.png",
    },
    {
      name: "Bayerische Landesärztekammer",
      abbreviation: "BLÄK",
      group: "Německo",
      url: "https://www.blaek.de/",
      logo: "/images/societies/blaek.svg",
    },
    {
      name: "Deutsche Gesellschaft für Gynäkologie und Geburtshilfe",
      abbreviation: "DGGG",
      group: "Německo",
      url: "https://www.dggg.de/",
      logo: "/images/societies/dggg.svg",
    },
    {
      name: "Deutsche Gesellschaft für Ultraschall in der Medizin",
      abbreviation: "DEGUM",
      group: "Německo",
      url: "https://www.degum.de/",
      logo: "/images/societies/degum.png",
    },
    {
      name: "Arbeitsgemeinschaft Gynäkologische Endoskopie",
      abbreviation: "AGE",
      group: "Německo",
      url: "https://ag-endoskopie.de/",
      logo: "/images/societies/age.svg",
    },
    {
      name: "Arbeitsgemeinschaft Kinder- und Jugendgynäkologie",
      abbreviation: "AG KJG",
      group: "Německo",
      url: "https://www.kindergynaekologie.de/startseite/",
      logo: "/images/societies/kindergynaekologie.png",
    },
    {
      name: "Deutsche Menopause Gesellschaft",
      abbreviation: "DMG",
      group: "Německo",
      url: "https://www.menopause-gesellschaft.de/",
      logo: "/images/societies/menopause.png",
    },
  ],
};
