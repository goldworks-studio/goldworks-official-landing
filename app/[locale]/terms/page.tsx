import { notFound } from "next/navigation";
import { TermsDocument } from "@/components/terms-document";
import { isLegalLocale, legalLocales } from "@/lib/legal-locales";
import { termsMetadata } from "@/lib/terms-metadata";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return legalLocales
    .filter((locale) => locale !== "en" && locale !== "ko")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLegalLocale(locale) || locale === "en" || locale === "ko") notFound();
  return termsMetadata(locale);
}

export default async function LocalizedTermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLegalLocale(locale) || locale === "en" || locale === "ko") notFound();
  return <TermsDocument locale={locale} />;
}
