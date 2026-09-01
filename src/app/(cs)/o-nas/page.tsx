import { AboutPage } from "@/components/pages/about-page";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata, buildPageStructuredData } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "about", dictionary);

export default function Page() {
  return (
    <>
      <StructuredData data={buildPageStructuredData("cs", "about", dictionary)} />
      <AboutPage locale="cs" dictionary={dictionary} />
    </>
  );
}
