import { AboutPage } from "@/components/pages/about-page";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "about", dictionary);

export default function Page() {
  return <AboutPage locale="cs" dictionary={dictionary} />;
}
