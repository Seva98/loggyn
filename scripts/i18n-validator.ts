export interface TranslationIssue {
  locale: string;
  path: string;
  message: string;
}

export interface TranslationValidationOptions {
  approvedUnchangedKeys?: ReadonlySet<string>;
  ignoredResidueTerms?: readonly string[];
}

function valueType(value: unknown): string {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function childPath(parent: string, key: string | number): string {
  if (typeof key === "number") return `${parent}[${key}]`;
  return parent ? `${parent}.${key}` : key;
}

function hasWords(value: string): boolean {
  return /\p{L}/u.test(value);
}

export function validateDictionary(
  reference: unknown,
  candidate: unknown,
  locale: string,
  options: TranslationValidationOptions = {},
): TranslationIssue[] {
  const issues: TranslationIssue[] = [];
  const approved = options.approvedUnchangedKeys ?? new Set<string>();
  const ignoredResidueTerms = options.ignoredResidueTerms ?? [];

  const visit = (referenceValue: unknown, candidateValue: unknown, path: string) => {
    const referenceType = valueType(referenceValue);
    const candidateType = valueType(candidateValue);
    if (referenceType !== candidateType) {
      issues.push({ locale, path, message: `expected ${referenceType}, received ${candidateType}` });
      return;
    }

    if (typeof referenceValue === "string" && typeof candidateValue === "string") {
      const approvalKey = `${locale}:${path}`;
      const globallyApprovedKey = `*:${path}`;
      if (
        candidateValue === referenceValue
        && hasWords(referenceValue)
        && !approved.has(approvalKey)
        && !approved.has(globallyApprovedKey)
      ) {
        issues.push({ locale, path, message: "matches the Czech source and is not allowlisted" });
      }

      const residueCandidate = ignoredResidueTerms.reduce(
        (value, term) => value.replaceAll(term, ""),
        candidateValue,
      );
      if (/[ěščřžýůúďťň]/iu.test(residueCandidate)) {
        issues.push({ locale, path, message: "contains likely untranslated Czech text" });
      }
      return;
    }

    if (Array.isArray(referenceValue) && Array.isArray(candidateValue)) {
      if (referenceValue.length !== candidateValue.length) {
        issues.push({
          locale,
          path,
          message: `expected ${referenceValue.length} items, received ${candidateValue.length}`,
        });
      }
      const length = Math.max(referenceValue.length, candidateValue.length);
      for (let index = 0; index < length; index += 1) {
        const nextPath = childPath(path, index);
        if (index >= referenceValue.length) {
          issues.push({ locale, path: nextPath, message: "unexpected translation entry" });
        } else if (index >= candidateValue.length) {
          issues.push({ locale, path: nextPath, message: "missing translation entry" });
        } else {
          visit(referenceValue[index], candidateValue[index], nextPath);
        }
      }
      return;
    }

    if (
      referenceValue
      && candidateValue
      && typeof referenceValue === "object"
      && typeof candidateValue === "object"
    ) {
      const referenceObject = referenceValue as Record<string, unknown>;
      const candidateObject = candidateValue as Record<string, unknown>;
      for (const key of Object.keys(referenceObject)) {
        const nextPath = childPath(path, key);
        if (!(key in candidateObject)) {
          issues.push({ locale, path: nextPath, message: "missing translation key" });
        } else {
          visit(referenceObject[key], candidateObject[key], nextPath);
        }
      }
      for (const key of Object.keys(candidateObject)) {
        if (!(key in referenceObject)) {
          issues.push({ locale, path: childPath(path, key), message: "unexpected translation key" });
        }
      }
    }
  };

  visit(reference, candidate, "");
  return issues;
}
