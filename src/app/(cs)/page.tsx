import { HomePage } from "@/components/pages/home-page";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "home", dictionary);

export default function Page() {
  return <HomePage locale="cs" dictionary={dictionary} />;
}
