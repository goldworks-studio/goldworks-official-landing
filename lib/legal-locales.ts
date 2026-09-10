export const privacyLocales = [
  "en",
  "es",
  "ja",
  "ko",
  "pt-br",
  "zh-cn",
] as const;
export type PrivacyLocale = (typeof privacyLocales)[number];
export type TranslatedPrivacyLocale = Exclude<PrivacyLocale, "ko">;
export type LegalDocument =
  | "/privacy/"
  | "/privacy/byeolmong/"
  | "/account-deletion/";
export const privacySectionIds = [
  "scope",
  "collection",
  "retention",
  "sharing",
  "rights",
  "permissions",
  "security",
  "children",
  "contact",
  "changes",
] as const;

export const localeDetails = {
  en: {
    name: "English",
    language: "en",
    openGraph: "en_US",
    languageLabel: "Language",
    skip: "Skip to content",
    operator: "Operator",
    effective: "Effective date",
    contact: "Contact",
    tagline: "Small studio. Boundless curiosity.",
    privacy: "Privacy Policy",
    deletion: "Data Deletion",
    selectionHint: "Selecting a language opens that version of this document.",
  },
  es: {
    name: "Español",
    language: "es",
    openGraph: "es_ES",
    languageLabel: "Idioma",
    skip: "Ir al contenido",
    operator: "Responsable",
    effective: "Fecha de entrada en vigor",
    contact: "Contacto",
    tagline: "Un pequeño estudio. Curiosidad sin límites.",
    privacy: "Política de privacidad",
    deletion: "Eliminación de datos (inglés)",
    selectionHint:
      "Al seleccionar un idioma se abre esa versión del documento.",
  },
  ja: {
    name: "日本語",
    language: "ja",
    openGraph: "ja_JP",
    languageLabel: "言語",
    skip: "本文へ移動",
    operator: "運営者",
    effective: "適用日",
    contact: "お問い合わせ",
    tagline: "小さなスタジオ。尽きない好奇心。",
    privacy: "プライバシーポリシー",
    deletion: "データの削除（英語）",
    selectionHint: "言語を選択すると、その言語の文書が開きます。",
  },
  ko: {
    name: "한국어",
    language: "ko",
    openGraph: "ko_KR",
    languageLabel: "언어",
    skip: "본문으로 바로가기",
    operator: "운영자",
    effective: "시행일",
    contact: "문의",
    tagline: "작은 스튜디오. 끝없는 호기심.",
    privacy: "개인정보처리방침",
    deletion: "계정·데이터 삭제",
    selectionHint: "언어를 선택하면 해당 언어의 문서가 열립니다.",
  },
  "pt-br": {
    name: "Português",
    language: "pt-BR",
    openGraph: "pt_BR",
    languageLabel: "Idioma",
    skip: "Ir para o conteúdo",
    operator: "Responsável",
    effective: "Data de vigência",
    contact: "Contato",
    tagline: "Um pequeno estúdio. Curiosidade sem limites.",
    privacy: "Política de Privacidade",
    deletion: "Exclusão de dados (inglês)",
    selectionHint:
      "Ao selecionar um idioma, essa versão do documento será aberta.",
  },
  "zh-cn": {
    name: "简体中文",
    language: "zh-Hans",
    openGraph: "zh_CN",
    languageLabel: "语言",
    skip: "跳转到正文",
    operator: "运营方",
    effective: "生效日期",
    contact: "联系我们",
    tagline: "小小工作室，无限好奇心。",
    privacy: "隐私政策",
    deletion: "数据删除（英文）",
    selectionHint: "选择语言后，将打开该语言版本的文档。",
  },
} as const;

export function isPrivacyLocale(value: string): value is PrivacyLocale {
  return privacyLocales.some((locale) => locale === value);
}
export function legalPath(
  locale: PrivacyLocale,
  document: LegalDocument = "/privacy/",
) {
  // Only the shared policy has all six translations. Related notices retain their actual languages.
  const availableLocale =
    document !== "/privacy/" && locale !== "ko" ? "en" : locale;
  return `${availableLocale === "en" ? "" : `/${availableLocale}`}${document}`;
}
export function documentLanguages(document: LegalDocument) {
  return document === "/privacy/" ? privacyLocales : (["en", "ko"] as const);
}
