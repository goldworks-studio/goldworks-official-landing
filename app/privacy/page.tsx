import { PrivacyDocument } from "@/components/privacy-document";
import { getPrivacyCopy } from "@/lib/privacy-copy";
import { privacyMetadata } from "@/lib/privacy-metadata";

export const metadata = privacyMetadata("en", getPrivacyCopy("en").description);
export default function PrivacyPage() {
  return <PrivacyDocument locale="en" />;
}
