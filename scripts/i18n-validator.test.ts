import assert from "node:assert/strict";
import test from "node:test";
import { validateDictionary } from "./i18n-validator";

test("reports missing keys and array entries", () => {
  const issues = validateDictionary(
    { heading: "Nadpis", items: ["Jedna", "Dvě"] },
    { items: ["One"] },
    "en",
  );
  assert.ok(issues.some((issue) => issue.path === "heading" && issue.message === "missing translation key"));
  assert.ok(issues.some((issue) => issue.path === "items[1]" && issue.message === "missing translation entry"));
});

test("reports unchanged Czech copy", () => {
  const issues = validateDictionary({ contact: "Kontakt" }, { contact: "Kontakt" }, "de");
  assert.deepEqual(issues, [{
    locale: "de",
    path: "contact",
    message: "matches the Czech source and is not allowlisted",
  }]);
});

test("accepts an explicitly approved invariant value", () => {
  const issues = validateDictionary(
    { contact: "Kontakt" },
    { contact: "Kontakt" },
    "de",
    { approvedUnchangedKeys: new Set(["de:contact"]) },
  );
  assert.deepEqual(issues, []);
});
