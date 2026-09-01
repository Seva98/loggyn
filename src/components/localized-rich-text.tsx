import Link from "next/link";
import type { Locale, RichParagraph } from "@/content/types";
import { getLocalizedPath } from "@/i18n/routing";

export function LocalizedRichText({ locale, paragraphs }: { locale: Locale; paragraphs: RichParagraph[] }) {
  return paragraphs.map((paragraph, paragraphIndex) => (
    <p key={paragraphIndex}>
      {paragraph.map((segment, segmentIndex) => {
        const key = `${paragraphIndex}-${segmentIndex}`;
        if (segment.link) {
          return (
            <Link className="text-link" href={getLocalizedPath(locale, segment.link)} key={key}>
              {segment.text}
            </Link>
          );
        }
        if (segment.emphasis) return <strong key={key}>{segment.text}</strong>;
        return segment.text;
      })}
    </p>
  ));
}
