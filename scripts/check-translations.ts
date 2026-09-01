import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { dictionaries } from "../src/content/i18n";
import type { Locale } from "../src/content/types";
import { validateDictionary, type TranslationIssue } from "./i18n-validator";

const approvedUnchangedKeys = new Set([
  "*:metadata.keywords[7]",
  "*:about.doctorName",
  "*:about.career[0].period",
  "*:about.career[1].period",
  "*:about.career[3].period",
  "*:about.certifications[0].items[0].name",
  "*:about.certifications[0].items[1].name",
  "*:about.certifications[0].items[2].name",
  "*:pricing.groups[0].items[3]",
  "*:home.privateCare[2][1].link",
  "de:metadata.pages.contact.title",
  "de:header.navigation.contact",
  "de:pricing.groups[0].items[4]",
  "de:contact.title",
  "de:contact.labels.phone",
]);

const localeIssues = (Object.keys(dictionaries) as Locale[])
  .filter((locale) => locale !== "cs")
  .flatMap((locale) => validateDictionary(dictionaries.cs, dictionaries[locale], locale, {
    approvedUnchangedKeys,
    ignoredResidueTerms: ["Plzeň"],
  }));

const localizedSourceFiles = [
  "src/components/booking-cta.tsx",
  "src/components/footer.tsx",
  "src/components/header.tsx",
  "src/components/localized-rich-text.tsx",
  "src/components/pages/about-page.tsx",
  "src/components/pages/contact-page.tsx",
  "src/components/pages/home-page.tsx",
  "src/components/pages/pricing-page.tsx",
  "src/app/(cs)/layout.tsx",
  "src/app/[locale]/layout.tsx",
];

const approvedVisibleLiterals = new Set(["✦", "L", "Loggyn", "sevcik.dev", "©", ".", "—"]);
const userFacingAttributes = new Set(["alt", "aria-label", "title"]);

function scanForHardcodedVisibleText(filePath: string): TranslationIssue[] {
  const sourceText = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const issues: TranslationIssue[] = [];

  const report = (node: ts.Node, value: string) => {
    const normalized = value.replace(/\s+/g, " ").trim();
    if (!normalized || approvedVisibleLiterals.has(normalized)) return;
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    issues.push({
      locale: "source",
      path: `${path.relative(process.cwd(), filePath)}:${line + 1}:${character + 1}`,
      message: `hard-coded visible text: ${JSON.stringify(normalized)}`,
    });
  };

  const visit = (node: ts.Node) => {
    if (ts.isJsxText(node)) report(node, node.getText(sourceFile));
    if (
      ts.isJsxAttribute(node)
      && userFacingAttributes.has(node.name.getText(sourceFile))
      && node.initializer
      && ts.isStringLiteral(node.initializer)
    ) {
      report(node, node.initializer.text);
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return issues;
}

const sourceIssues = localizedSourceFiles.flatMap((relativePath) => (
  scanForHardcodedVisibleText(path.join(process.cwd(), relativePath))
));
const issues = [...localeIssues, ...sourceIssues];

if (issues.length > 0) {
  console.error(`Translation validation failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- [${issue.locale}] ${issue.path || "<root>"}: ${issue.message}`);
  }
  process.exitCode = 1;
} else {
  console.log("Translation validation passed for cs, en, de and uk.");
}
