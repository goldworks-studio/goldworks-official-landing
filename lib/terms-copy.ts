import en from "@/lib/terms-translations/en.json";
import es from "@/lib/terms-translations/es.json";
import ja from "@/lib/terms-translations/ja.json";
import ko from "@/lib/terms-translations/ko.json";
import pt from "@/lib/terms-translations/pt-br.json";
import zh from "@/lib/terms-translations/zh-cn.json";
import type { LegalLocale } from "@/lib/legal-locales";

type TermsSection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
};
export type TermsCopy = Omit<typeof en, "sections"> & {
  sections: TermsSection[];
};
const copies: Record<LegalLocale, TermsCopy> = {
  en,
  es,
  ja,
  ko,
  "pt-br": pt,
  "zh-cn": zh,
};

export function getTermsCopy(locale: LegalLocale): TermsCopy {
  return copies[locale];
}
