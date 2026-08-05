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
  description: string;
  icon: ServiceIconName;
}

export interface PriceItem {
  name: string;
  price: string;
}

export interface PriceGroup {
  title: string;
  eyebrow: string;
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
}

export const siteConfig: SiteConfig = {
  name: "Loggyn",
  legalName: "Loggyn – Logan Gynekologie",
  bookingUrl: "https://reservio.cz/",
  navigation: [
    { label: "O nás", href: "/o-nas" },
    { label: "Služby naší ordinace", href: "/#sluzby" },
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
    hours: "Po–Pá pouze po objednání",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Plze%C5%88%2C%20%C4%8Cesko&z=14&output=embed",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=Plze%C5%88%2C%20%C4%8Cesko",
  },
  services: [
    {
      title: "Gynekologické vyšetření",
      description: "Citlivá prevence, diagnostika a prostor pro všechny vaše otázky.",
      icon: "exam",
    },
    {
      title: "Ultrazvuková gynekologická vyšetření",
      description: "Moderní sonografická diagnostika přímo v ordinaci.",
      icon: "ultrasound",
    },
    {
      title: "Cytologie – LBC",
      description: "Šetrný odběr a přesná laboratorní metoda prevence.",
      icon: "cytology",
    },
    {
      title: "Antikoncepční poradna",
      description: "Výběr bezpečného řešení, které respektuje váš život.",
      icon: "contraception",
    },
    {
      title: "Poradna pro ženy v menopauze",
      description: "Individuální podpora v období hormonálních změn.",
      icon: "menopause",
    },
    {
      title: "První gynekologická návštěva pro dívky",
      description: "Klidné a bezpečné seznámení s gynekologickou péčí.",
      icon: "firstVisit",
    },
    {
      title: "Sonografie prsu",
      description: "Neinvazivní ultrazvukové vyšetření prsní tkáně.",
      icon: "breast",
    },
    {
      title: "Aplikace botulotoxinu",
      description: "Precizní ošetření s důrazem na přirozený výsledek.",
      icon: "botox",
    },
    {
      title: "Aplikace kyseliny hyaluronové",
      description: "Jemná estetická péče respektující vaši individualitu.",
      icon: "filler",
    },
  ],
  priceGroups: [
    {
      title: "Gynekologická péče",
      eyebrow: "Konzultace a vyšetření",
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
      eyebrow: "Estetická medicína",
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
};
