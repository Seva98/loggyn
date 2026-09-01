import { ContactPage } from "@/components/pages/contact-page";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata, buildPageStructuredData } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "contact", dictionary);

export default function Page() {
  return (
    <>
      <StructuredData data={buildPageStructuredData("cs", "contact", dictionary)} />
      <ContactPage dictionary={dictionary} />
    </>
  );
}
