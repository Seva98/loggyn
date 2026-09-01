import { cs } from "@/content/locales/cs";
import { de } from "@/content/locales/de";
import { en } from "@/content/locales/en";
import { uk } from "@/content/locales/uk";
import type { Dictionary, Locale } from "@/content/types";

export const dictionaries: Record<Locale, Dictionary> = { cs, en, de, uk };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
