import { PricingPage } from "@/components/pages/pricing-page";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata, buildPageStructuredData } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "pricing", dictionary);

export default function Page() {
  return (
    <>
      <StructuredData data={buildPageStructuredData("cs", "pricing", dictionary)} />
      <PricingPage dictionary={dictionary} />
    </>
  );
}
