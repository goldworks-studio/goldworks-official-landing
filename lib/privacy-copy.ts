import en from "@/lib/privacy-translations/en.json";
import es from "@/lib/privacy-translations/es.json";
import ja from "@/lib/privacy-translations/ja.json";
import pt from "@/lib/privacy-translations/pt-br.json";
import zh from "@/lib/privacy-translations/zh-cn.json";
import type { TranslatedPrivacyLocale } from "@/lib/legal-locales";

export type PrivacyCopy = typeof en;
const copies = { en, es, ja, "pt-br": pt, "zh-cn": zh } satisfies Record<
  TranslatedPrivacyLocale,
  PrivacyCopy
>;
export function getPrivacyCopy(locale: TranslatedPrivacyLocale) {
  return copies[locale];
}
