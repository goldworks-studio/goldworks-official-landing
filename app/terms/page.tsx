import { TermsDocument } from "@/components/terms-document";
import { termsMetadata } from "@/lib/terms-metadata";

export const metadata = termsMetadata("en");

export default function TermsPage() {
  return <TermsDocument locale="en" />;
}
