import { notFound } from "next/navigation";
import { PrivacyDocument } from "@/components/privacy-document";
import { getPrivacyCopy } from "@/lib/privacy-copy";
import { isPrivacyLocale, privacyLocales } from "@/lib/legal-locales";
import { privacyMetadata } from "@/lib/privacy-metadata";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return privacyLocales
    .filter((locale) => locale !== "en" && locale !== "ko")
    .map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isPrivacyLocale(locale) || locale === "en" || locale === "ko")
    notFound();
  return privacyMetadata(locale, getPrivacyCopy(locale).description);
}
export default async function LocalizedPrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isPrivacyLocale(locale) || locale === "en" || locale === "ko")
    notFound();
  return <PrivacyDocument locale={locale} />;
}
