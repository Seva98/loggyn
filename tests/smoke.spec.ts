import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { locale: "cs", path: "/", heading: "Citlivě. Odborně.", nav: "Hlavní navigace" },
  { locale: "cs", path: "/o-nas", heading: "MUDr. Aneta Logan", nav: "Hlavní navigace" },
  { locale: "cs", path: "/cenik", heading: "Ceník", nav: "Hlavní navigace" },
  { locale: "cs", path: "/kontakt", heading: "Kontakt", nav: "Hlavní navigace" },
  { locale: "en", path: "/en", heading: "Sensitive. Expert.", nav: "Main navigation" },
  { locale: "en", path: "/en/about", heading: "MUDr. Aneta Logan", nav: "Main navigation" },
  { locale: "en", path: "/en/pricing", heading: "Pricing", nav: "Main navigation" },
  { locale: "en", path: "/en/contact", heading: "Contact", nav: "Main navigation" },
  { locale: "de", path: "/de", heading: "Einfühlsam. Fachkundig.", nav: "Hauptnavigation" },
  { locale: "de", path: "/de/ueber-uns", heading: "MUDr. Aneta Logan", nav: "Hauptnavigation" },
  { locale: "de", path: "/de/preise", heading: "Preise", nav: "Hauptnavigation" },
  { locale: "de", path: "/de/kontakt", heading: "Kontakt", nav: "Hauptnavigation" },
  { locale: "uk", path: "/uk", heading: "Делікатно. Професійно.", nav: "Головна навігація" },
  { locale: "uk", path: "/uk/pro-nas", heading: "MUDr. Aneta Logan", nav: "Головна навігація" },
  { locale: "uk", path: "/uk/tsiny", heading: "Ціни", nav: "Головна навігація" },
  { locale: "uk", path: "/uk/kontakty", heading: "Контакти", nav: "Головна навігація" },
] as const;

for (const route of routes) {
  test(`${route.path} renders localized, accessible content without overflow`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator(".desktop-nav")).toHaveAttribute("aria-label", route.nav);

    const canonical = page.locator('link[rel="canonical"]');
    const canonicalPattern = route.path === "/" ? /^https:\/\/loggyn\.cz\/?$/ : new RegExp(`${route.path}$`);
    await expect(canonical).toHaveAttribute("href", canonicalPattern);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(5);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow, `${route.path} should not overflow`).toBe(false);

    const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
    const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
    expect(serious).toEqual([]);
  });
}

test("homepage exposes all nine services and safe booking links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".service-card")).toHaveCount(9);
  await expect(page.getByText("Přijímáme nové pacientky")).toHaveCount(0);

  const headline = page.locator(".hero-home h1 > span");
  await expect(headline).toHaveText("Citlivě. Odborně. Přirozeně.");
  const headlineFit = await headline.evaluate((element) => ({
    fits: element.scrollWidth <= element.clientWidth + 1,
    whiteSpace: getComputedStyle(element).whiteSpace,
  }));
  expect(headlineFit).toEqual({ fits: true, whiteSpace: "nowrap" });

  const booking = page.getByRole("link", { name: /Rezervace termínu/i }).first();
  await expect(booking).toHaveAttribute("href", "https://aneta-logan.reservio.com");
  await expect(booking).toHaveAttribute("target", "_blank");
});

test("site stays in light mode and uses the fixed editorial background", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("html")).toHaveAttribute("data-background", "editorial");
  await expect(page.locator(".theme-toggle, .background-switcher")).toHaveCount(0);
  await expect(page.locator(".hero-home__image")).toHaveCSS("background-image", /hero-roses-editorial\.jpg/);
  await expect(page.locator(".hero-home__image")).toHaveCSS("animation-name", "none");
});

for (const homepage of [
  { path: "/", nav: "Hlavní navigace", home: "Domovská stránka", services: "Služby", section: "#sluzby" },
  { path: "/en", nav: "Main navigation", home: "Home", services: "Services", section: "#services" },
  { path: "/de", nav: "Hauptnavigation", home: "Startseite", services: "Leistungen", section: "#leistungen" },
  { path: "/uk", nav: "Головна навігація", home: "Головна", services: "Послуги", section: "#posluhy" },
]) {
  test(`${homepage.path} home and services links scroll within the homepage`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Desktop navigation behavior");
    await page.goto(homepage.path);
    const navigation = page.getByRole("navigation", { name: homepage.nav });
    const home = navigation.getByRole("link", { name: homepage.home, exact: true });
    const services = navigation.getByRole("link", { name: homepage.services, exact: true });
    await expect(home).toHaveClass(/is-active/);
    await expect(services).not.toHaveClass(/is-active/);
    await services.click();
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe(homepage.section);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(services).toHaveClass(/is-active/);
    await expect(home).not.toHaveClass(/is-active/);
    await home.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
    await expect(home).toHaveClass(/is-active/);
    await expect(services).not.toHaveClass(/is-active/);
    expect(await page.evaluate(() => window.location.hash)).toBe("");
    await services.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(services).toHaveClass(/is-active/);
  });
}

test("language dropdown maps equivalent pages and service anchors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop switcher positioning");
  await page.goto("/cenik");
  const trigger = page.getByRole("button", { name: "Výběr jazyka: Čeština" });
  await expect(trigger).toBeVisible();
  await trigger.click();
  const menu = page.getByRole("menu", { name: "Výběr jazyka" });
  await expect(menu.getByRole("menuitem")).toHaveCount(4);
  await menu.getByRole("menuitem", { name: "Přepnout jazyk na English" }).click();
  await expect(page).toHaveURL(/\/en\/pricing$/);

  await page.goto("/#sluzby");
  await page.getByRole("button", { name: "Výběr jazyka: Čeština" }).click();
  await page.getByRole("menuitem", { name: "Přepnout jazyk na Deutsch" }).click();
  await expect(page).toHaveURL(/\/de#leistungen$/);
});

test("language dropdown supports keyboard navigation and Escape", async ({ page }) => {
  await page.goto("/en");
  const trigger = page.getByRole("button", { name: "Language selector: English" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("menu", { name: "Language selector" })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Switch language to English" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: "Switch language to Deutsch" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.getByRole("menu", { name: "Language selector" })).toBeHidden();
});

test("mobile header keeps the flag selector available and exposes localized navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only behavior");
  await page.goto("/uk");
  await expect(page.getByRole("button", { name: "Вибір мови: Українська" })).toBeVisible();
  const trigger = page.getByRole("button", { name: "Відкрити меню" });
  await trigger.click();
  const nav = page.getByRole("navigation", { name: "Мобільна навігація" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link")).toHaveCount(6);
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
});

for (const localeRoutes of [
  { contact: "/kontakt", pricing: "/cenik", about: "/o-nas" },
  { contact: "/en/contact", pricing: "/en/pricing", about: "/en/about" },
  { contact: "/de/kontakt", pricing: "/de/preise", about: "/de/ueber-uns" },
  { contact: "/uk/kontakty", pricing: "/uk/tsiny", about: "/uk/pro-nas" },
]) {
  test(`${localeRoutes.contact} preserves factual clinic data`, async ({ page }) => {
    await page.goto(localeRoutes.contact);
    const main = page.getByRole("main");
    await expect(main.getByText("Skrétova 47, 301 00 Plzeň", { exact: true })).toBeVisible();
    await expect(main.locator('a[href^="tel:"]')).toHaveCount(0);
    await expect(main.locator('a[href^="mailto:"]')).toHaveCount(0);
    const reservioContact = main.locator('.contact-card a[href="https://aneta-logan.reservio.com"]');
    await expect(reservioContact).toBeVisible();
    await expect(reservioContact).toHaveAttribute("target", "_blank");

    await page.goto(localeRoutes.pricing);
    await expect(page.locator(".price-row")).toHaveCount(16);
    await expect(page.getByText("6 000 Kč", { exact: true })).toHaveCount(2);

    await page.goto(localeRoutes.about);
    await expect(page.locator(".membership-card")).toHaveCount(9);
    await expect(page.getByText("Deutsche Gesellschaft für Ultraschall in der Medizin", { exact: true })).toBeVisible();
  });
}

test("sitemap contains every localized route and language alternates", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  expect((xml.match(/<loc>/g) ?? [])).toHaveLength(16);
  expect(xml).toContain("https://loggyn.cz/en/about");
  expect(xml).toContain("https://loggyn.cz/de/ueber-uns");
  expect(xml).toContain("https://loggyn.cz/uk/pro-nas");
  expect(xml).toContain('hreflang="x-default"');
});

test("homepage exposes local SEO metadata and linked structured data", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Gynekologie Plzeň | Privátní péče – Loggyn");
  await expect(page.locator(".brand img")).toHaveAttribute("src", /logo\.svg/);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/graphic/favicon_24x24px.svg",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /max-image-preview:large/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://loggyn.cz/images/hero-roses-v2.jpg",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  const jsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => (
    scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? "{}");
      return Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
    })
  ));

  const clinic = jsonLd.find((item) => item["@type"] === "MedicalClinic");
  expect(clinic).toMatchObject({
    "@id": "https://loggyn.cz/#clinic",
    name: "Loggyn – Logan Gynekologie",
    logo: {
      url: "https://loggyn.cz/logo.svg",
      width: 719,
      height: 448,
    },
    address: {
      addressLocality: "Plzeň",
      addressRegion: "Plzeňský kraj",
      postalCode: "301 00",
      addressCountry: "CZ",
    },
  });
  expect(jsonLd.some((item) => item["@type"] === "Person")).toBe(true);
  expect(jsonLd.some((item) => item["@type"] === "WebSite")).toBe(true);
  expect(jsonLd.some((item) => item["@type"] === "WebPage")).toBe(true);
});

test("homepage marks unavailable services as coming soon", async ({ page }) => {
  await page.goto("/");

  const unavailableServices = page.locator(".service-card--coming-soon");
  await expect(unavailableServices).toHaveCount(5);
  await expect(unavailableServices.locator(".service-card__status")).toHaveText([
    "Již brzy",
    "Již brzy",
    "Již brzy",
    "Již brzy",
    "Již brzy",
  ]);
  await expect(unavailableServices.first().locator(".service-card__icon")).toHaveCSS("filter", "grayscale(1)");
});

test("robots allows crawling and advertises the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);
  const text = await response.text();
  expect(text).toContain("User-Agent: *\nAllow: /");
  expect(text).toContain("Sitemap: https://loggyn.cz/sitemap.xml");
});

test("unsupported localized slugs return 404", async ({ page }) => {
  const response = await page.goto("/en/o-nas");
  expect(response?.status()).toBe(404);
});

test("interactive controls consistently use the pointer cursor", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    const cursors = await page.locator('a[href], button, [role="button"]').evaluateAll((elements) => (
      elements.map((element) => getComputedStyle(element).cursor)
    ));
    expect(cursors.every((cursor) => cursor === "pointer"), `${route.path} pointer cursors`).toBe(true);
  }
});
