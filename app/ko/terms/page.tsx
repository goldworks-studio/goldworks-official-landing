import { TermsDocument } from "@/components/terms-document";
import { termsMetadata } from "@/lib/terms-metadata";

export const metadata = termsMetadata("ko");

export default function KoreanTermsPage() {
  return <TermsDocument locale="ko" />;
}
