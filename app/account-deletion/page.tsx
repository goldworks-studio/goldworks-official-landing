import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LegalLayout } from "@/components/legal-layout";
import { basePath } from "@/lib/site";

const description =
  "How to request deletion of your GoldWorks or Byeolmong account and related personal information, including what is deleted and retained.";
export const metadata: Metadata = {
  title: "Account & Data Deletion",
  description,
  alternates: { canonical: `${basePath}/account-deletion/` },
  openGraph: {
    title: "Account & Data Deletion | GoldWorks",
    description,
    locale: "en_US",
    url: `${basePath}/account-deletion/`,
  },
};
const email = `mailto:support@goldworks.net?subject=${encodeURIComponent("[GoldWorks] Account and data deletion request")}&body=${encodeURIComponent("App name: \nRegistered email address or account identifier: \nRequest scope: Delete my entire account and associated personal information\n\nI request deletion of the account and personal information specified above.")}`;

export default function AccountDeletionPage() {
  return (
    <LegalLayout
      alternateHref="/ko/account-deletion/"
      title="Account & Data Deletion"
      eyebrow="GOLDWORKS / YOUR DATA, YOUR CHOICE"
      intro="You can request deletion of your account and personal information from GoldWorks services, including Byeolmong. Email us using the instructions below. You do not need to reinstall the app or sign in to this website."
    >
      <div className="legal-content deletion-content">
        <section>
          <h2>How to make a request</h2>
          <ol>
            <li>
              Email{" "}
              <a href="mailto:support@goldworks.net">support@goldworks.net</a>,
              preferably from the address used to register your account.
            </li>
            <li>
              Include the app name, registered email address or account
              identifier, and what you want deleted: your entire account or
              specific information.
            </li>
            <li>
              We verify account ownership, process the deletion and reply. If
              additional verification is needed, we request only the minimum
              information necessary.
            </li>
          </ol>
          <a className="email-request" href={email}>
            Write a deletion request{" "}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <p>
            This button opens your email app. If no email app is configured,
            copy the address above into your preferred email service. Clicking
            the button alone does not submit a request or delete your account.
          </p>
          <div className="legal-callout">
            <p>
              <strong>Do not send passwords or identity documents.</strong>
              If you cannot access your registered email address, or you use
              Apple’s Hide My Email, tell us. We will explain how to verify
              ownership for your situation.
            </p>
          </div>
        </section>
        <section>
          <h2>What will be deleted?</h2>
          <p>
            A full account deletion request covers the service’s sign-in
            account, server-stored profile and personal information linked to
            that account. For Byeolmong, this includes your authentication
            account, display name, profile information and synchronized birth
            information.
          </p>
          <p>
            After deletion, you cannot sign in with that account or restore
            deleted information. If you want to keep your account and delete
            only specific information, identify that information in your
            request.
          </p>
        </section>
        <section>
          <h2>Check information stored on your device</h2>
          <p>
            Deleting a server account does not erase photos, additional profiles
            or app settings stored only on your device. Clear the app’s stored
            data in device settings or uninstall the app. If you have operating
            system or cloud backups, delete them separately in that service’s
            backup settings.
          </p>
        </section>
        <section>
          <h2>Timing and retention exceptions</h2>
          <p>
            After verifying your identity, we process requests within the time
            limits and procedures required by applicable law and notify you when
            deletion is complete. Information retained while your account is
            maintained is deleted without undue delay when deletion is
            processed. If a legal obligation or unresolved dispute requires
            retention of certain records, we explain the information, legal
            basis and retention period and use those records only for that
            purpose.
          </p>
          <p>
            Request emails are retained for as long as necessary to process the
            request and resolve related disputes, then deleted. Your account
            with an external sign-in provider, such as Google or Apple, is
            managed separately from your GoldWorks app account.
          </p>
        </section>
        <p>
          <Link href="/privacy/">Privacy Policy</Link> ·{" "}
          <Link href="/privacy/byeolmong/">Byeolmong Privacy Notice</Link>
        </p>
      </div>
    </LegalLayout>
  );
}
