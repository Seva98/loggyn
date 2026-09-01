import { ContactPage } from "@/components/pages/contact-page";
import { getDictionary } from "@/content/i18n";
import { buildPageMetadata } from "@/i18n/metadata";

const dictionary = getDictionary("cs");

export const metadata = buildPageMetadata("cs", "contact", dictionary);

export default function Page() {
  return <ContactPage dictionary={dictionary} />;
}
