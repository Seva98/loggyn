import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "Citlivě. Odborně." },
  { path: "/o-nas", heading: "Péče postavená na zkušenosti." },
  { path: "/cenik", heading: "Ceník péče" },
  { path: "/kontakt", heading: "Pojďme najít termín" },
];

for (const route of routes) {
  test(`${route.path} renders shared layout and has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

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
  await expect(booking).toHaveAttribute("href", "https://reservio.cz/");
  await expect(booking).toHaveAttribute("target", "_blank");
});

test("theme selection persists after reload", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Přepnout na světlý režim" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("hero background selection exposes six variants and persists", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-background", "wall");

  await page.getByRole("button", { name: /Vybrat pozadí/ }).click();
  const picker = page.getByRole("dialog", { name: "Výběr pozadí hero sekce" });
  await expect(picker).toBeVisible();
  await expect(picker.locator(".background-option")).toHaveCount(6);
  await picker.getByRole("button", { name: /Vzdušná stěna/ }).click();

  await expect(page.locator("html")).toHaveAttribute("data-background", "openwall");
  await expect(page.locator(".hero-home__image")).toHaveCSS("background-image", /hero-roses-open-wall-v2\.jpg/);
  await expect(page.locator(".booking-panel__texture")).toHaveCSS("background-image", /hero-roses-open-wall-v2\.jpg/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-background", "openwall");
});

test("pricing contains the detailed masseter item only once", async ({ page }) => {
  await page.goto("/cenik");
  await expect(page.getByText("Žvýkací svaly – zúžení obličeje / bruxismus")).toHaveCount(1);
  await expect(page.locator(".price-row")).toHaveCount(19);
});

test("about page shows all official professional societies", async ({ page }) => {
  await page.goto("/o-nas");

  const cards = page.locator(".membership-card");
  await expect(cards).toHaveCount(9);
  await expect(page.getByRole("heading", { name: "Česko a mezinárodní", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Německo", exact: true })).toBeVisible();
  for (let index = 0; index < 9; index += 1) {
    const logo = cards.nth(index).locator("img");
    await logo.scrollIntoViewIfNeeded();
    await expect.poll(() => logo.evaluate((image) => (
      (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0
    ))).toBe(true);
  }

  const links = await cards.evaluateAll((elements) => elements.map((element) => ({
    href: (element as HTMLAnchorElement).href,
    target: (element as HTMLAnchorElement).target,
  })));

  expect(links.every(({ target }) => target === "_blank")).toBe(true);
  expect(links.map(({ href }) => href)).toContain("https://www.degum.de/");
  expect(links.map(({ href }) => href)).toContain("https://www.menopause-gesellschaft.de/");
});

test("contact page has actionable details and map", async ({ page }) => {
  await page.goto("/kontakt");
  const main = page.getByRole("main");
  await expect(main.locator('a[href="tel:+420777123456"]')).toBeVisible();
  await expect(main.locator('a[href="mailto:ordinace@loggyn.cz"]')).toBeVisible();
  await expect(page.getByTitle("Orientační poloha ordinace Loggyn v Plzni")).toBeVisible();

  const iconAlignment = await page.locator(".contact-card__icon").evaluateAll((icons) => icons.map((icon) => {
    const iconBox = icon.getBoundingClientRect();
    const svg = icon.querySelector("svg");
    const svgBox = svg?.getBoundingClientRect();
    return {
      centered: !!svgBox
        && Math.abs(iconBox.x + iconBox.width / 2 - (svgBox.x + svgBox.width / 2)) < 0.5
        && Math.abs(iconBox.y + iconBox.height / 2 - (svgBox.y + svgBox.height / 2)) < 0.5,
      stroke: svg?.getAttribute("stroke-width"),
    };
  }));
  expect(iconAlignment).toEqual(Array.from({ length: 4 }, () => ({ centered: true, stroke: "1.7" })));
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

test("mobile navigation opens, closes, and exposes all links", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only behavior");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Otevřít menu" });
  await trigger.click();
  const nav = page.getByRole("navigation", { name: "Mobilní navigace" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link")).toHaveCount(5);
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
});

test("pages do not overflow horizontally", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow, `${route.path} should not overflow`).toBe(false);
  }
});
