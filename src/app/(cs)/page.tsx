import { HomePage } from "@/components/pages/home-page";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata, buildPageStructuredData } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "home", dictionary);

export default function Page() {
  return (
    <>
      <StructuredData data={buildPageStructuredData("cs", "home", dictionary)} />
      <HomePage locale="cs" dictionary={dictionary} />
    </>
  );
}
