import { PricingPage } from "@/components/pages/pricing-page";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "pricing", dictionary);

export default function Page() {
  return <PricingPage dictionary={dictionary} />;
}
