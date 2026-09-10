import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { basePath, site } from "@/lib/site";

const description =
  "How GoldWorks handles personal information across its apps, games and website, including your rights, data retention and deletion.";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: `${basePath}/privacy/` },
  openGraph: {
    title: "Privacy Policy | GoldWorks",
    description,
    locale: "en_US",
    url: `${basePath}/privacy/`,
  },
};
const contents = [
  ["scope", "Scope"],
  ["collection", "Information we process"],
  ["retention", "Retention and deletion"],
  ["sharing", "Sharing and international transfers"],
  ["rights", "Your rights"],
  ["permissions", "Permissions and technical data"],
  ["security", "Security"],
  ["children", "Children’s privacy"],
  ["contact", "Contact and complaints"],
  ["changes", "Policy updates"],
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      alternateHref="/ko/privacy/"
      title="Privacy Policy"
      eyebrow="GOLDWORKS / PRIVACY POLICY"
      intro="GoldWorks respects your privacy. We process personal information for specified purposes in accordance with applicable law, including the Personal Information Protection Act of the Republic of Korea. This policy explains the principles that apply across our services."
    >
      <div className="legal-columns">
        <nav className="legal-toc" aria-label="Privacy policy contents">
          <p>On this page</p>
          <ol>
            {contents.map(([id, title]) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="legal-content">
          <section id="scope">
            <h2>1. Scope</h2>
            <p>
              This policy applies to the apps, games, website and customer
              support provided by GoldWorks that link to it. Features and data
              practices vary between services. The service-specific notices
              below describe the information, processing methods and providers
              that actually apply to each service. These notices form part of
              this policy.
            </p>
            <div className="legal-callout">
              <p>
                <strong>Service-specific privacy notices</strong>
              </p>
              <p>
                <Link href="/privacy/byeolmong/">
                  Byeolmong — information processing and service providers
                </Link>
              </p>
              <p>
                We update these notices when we add services or change our data
                practices, and provide any notices or consent procedures
                required by law.
              </p>
            </div>
            <p>
              If a service has its own separate privacy policy, that policy
              applies. Services operated by other companies, including those
              reached through external links, are governed by their own
              policies.
            </p>
          </section>
          <section id="collection">
            <h2>2. Information we process and why</h2>
            <p>
              The categories below apply only when you use the relevant feature.
              Each app does not collect every category listed here.
              Service-specific notices also explain whether information stays on
              your device or is sent to a server.
            </p>
            <div
              className="legal-table-wrap"
              tabIndex={0}
              role="region"
              aria-label="Information processing and purposes"
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    <th scope="col">Information</th>
                    <th scope="col">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Account creation and sign-in</td>
                    <td>
                      Email address, display name, account identifiers,
                      authentication information and profile information
                      supplied by your chosen sign-in provider
                    </td>
                    <td>
                      Authentication, account management, sign-in and account
                      recovery
                    </td>
                  </tr>
                  <tr>
                    <td>App and game features</td>
                    <td>
                      Information you enter, select or save, and settings needed
                      to use the service
                    </td>
                    <td>
                      Providing the features you request, storage and
                      synchronization
                    </td>
                  </tr>
                  <tr>
                    <td>Optional features</td>
                    <td>
                      Information explained before access, such as a photo or
                      location you select for a feature
                    </td>
                    <td>Providing the specific feature you choose to use</td>
                  </tr>
                  <tr>
                    <td>Customer support</td>
                    <td>
                      Your reply email address, messages, attachments and
                      support records
                    </td>
                    <td>
                      Responding to inquiries, resolving issues and handling
                      privacy requests
                    </td>
                  </tr>
                  <tr>
                    <td>Service delivery and operation</td>
                    <td>
                      Records needed to deliver the service, such as IP
                      addresses, request times and technical browser or device
                      information
                    </td>
                    <td>
                      Communication, reliable service delivery, security and
                      abuse prevention
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              We process information through your input, your use of features
              and the providers used by the relevant service. Where consent is
              required, we explain the information involved, purposes, retention
              periods and consequences of declining before obtaining consent.
              Where another lawful basis applies, such as performing a contract,
              we process information only within that basis.
            </p>
            <p>
              We do not sell personal information or use it beyond the disclosed
              purposes. If those purposes change, we provide the required notice
              and obtain separate consent where required.
            </p>
          </section>
          <section id="retention">
            <h2>3. Retention and deletion</h2>
            <ul>
              <li>
                <strong>Information linked to your account:</strong> We retain
                it while your account is maintained and delete it without undue
                delay when account deletion or a request to delete that
                information is processed.
              </li>
              <li>
                <strong>Information stored only on your device:</strong> It
                remains until you delete it or reset the app’s data on that
                device. Backups created through your operating system must be
                managed separately in the relevant device or account settings.
              </li>
              <li>
                <strong>Customer support information:</strong> We retain it for
                as long as necessary to resolve the inquiry or rights request,
                then delete it without undue delay. If a dispute remains
                unresolved, we retain only what is needed to address that
                dispute.
              </li>
              <li>
                <strong>Providers’ technical records:</strong> These are subject
                to the providers’ stated retention practices. See the provider
                documentation linked in the relevant service-specific notice.
              </li>
            </ul>
            <p>
              Information we must retain by law is kept separately for the
              legally required period and used only for that purpose. If this
              affects a deletion request, we explain the information retained,
              legal basis and retention period.
            </p>
            <p>
              We delete electronic information in a way intended to prevent
              recovery or reconstruction, and destroy any paper records by
              shredding or an equivalent method. Server account data and device
              data are managed separately: uninstalling an app or signing out
              does not delete your server account.
            </p>
          </section>
          <section id="sharing">
            <h2>4. Sharing, service providers and international transfers</h2>
            <p>
              We do not disclose personal information to third parties without a
              lawful basis, such as your consent or a specific legal
              requirement. We may use external providers for authentication,
              storage, communication, customer support and other service
              operations. Applicable providers, information and purposes are
              disclosed in the service-specific notices.
            </p>
            <p>
              When a provider processes information on our behalf, we establish
              and manage the requirements prescribed by law, including limits on
              use and safeguards. Providers of optional external features, such
              as sign-in or maps, may also process information under their own
              policies.
            </p>
            <p>
              Where using an external service involves an international
              transfer, we process information subject to applicable legal
              requirements. Details required by law, including recipients,
              countries, information, timing and method, purposes, retention and
              ways to decline, are provided in the relevant service notice or a
              separate notice and consent screen.
            </p>
          </section>
          <section id="rights">
            <h2>5. Your rights and how to exercise them</h2>
            <p>
              Subject to applicable law, you may request access, correction,
              deletion, restriction of processing, withdrawal of consent or
              account deletion. Use the settings supported by your app or
              contact us below. A legal representative or properly authorized
              agent may also make a request on your behalf.
            </p>
            <p>
              We verify your identity and authority using only the information
              necessary, then respond within the procedures and time limits
              required by law. If a legal restriction prevents us from
              fulfilling a request, we explain the reason and available next
              steps. Do not email passwords or full national identification
              numbers.
            </p>
            <p>
              <Link href="/account-deletion/">
                How to request account and data deletion
              </Link>
            </p>
            <p>
              Declining or deleting required information may prevent use of an
              account or the relevant feature. Declining an optional permission
              does not prevent use of features that do not need it.
            </p>
          </section>
          <section id="permissions">
            <h2>6. Device permissions and technical data</h2>
            <p>
              Features requiring access to location, photos or other device
              resources explain their purpose when used and request permissions
              required by your operating system. You can change permissions in
              device settings. See the service-specific notice for the
              permissions used by each service.
            </p>
            <p>
              The GoldWorks website does not operate its own advertising or
              behavioral analytics tools. Hosting and network providers,
              including GitHub Pages and Cloudflare, may process IP addresses
              and request information when delivering the website. See the{" "}
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
                GitHub General Privacy Statement
              </a>{" "}
              and the{" "}
              <a href="https://www.cloudflare.com/privacypolicy/">
                Cloudflare Privacy Policy
              </a>
              .
            </p>
            <p>
              Where a service uses cookies or device storage, we explain their
              features and purposes. You can clear or restrict stored
              information through browser or operating system settings, although
              this may affect features such as staying signed in or remembering
              preferences.
            </p>
          </section>
          <section id="security">
            <h2>7. How we protect information</h2>
            <p>
              We limit access to personal information to what is necessary and
              use account authentication, access controls, protection in transit
              such as HTTPS, and information-handling procedures. Information
              kept only on your device is stored within the operating system’s
              app storage. Please also protect your device lock and account
              security settings.
            </p>
          </section>
          <section id="children">
            <h2>8. Children’s privacy</h2>
            <p>
              If we offer a service that must rely on consent to process
              personal information of a child under 14, we establish the legally
              required procedures, including consent and verification of a legal
              guardian. Age eligibility and whether a service is directed to
              children are specified in its service information. If you believe
              a child’s information has been processed without required consent,
              contact us so we can investigate and take appropriate action.
            </p>
          </section>
          <section id="contact">
            <h2>9. Contact and complaints</h2>
            <div className="legal-contact">
              <p>
                <strong>Privacy contact and request handling: GoldWorks</strong>
                <br />
                Email: <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <p>
              Contact us with privacy questions, requests to exercise your
              rights or complaints. For privacy infringement assistance or
              dispute mediation in the Republic of Korea, you may also contact
              the{" "}
              <a href="https://privacy.kisa.or.kr/">
                KISA Privacy Infringement Report Center
              </a>{" "}
              or the{" "}
              <a href="https://www.kopico.go.kr/">
                Personal Information Dispute Mediation Committee
              </a>
              .
            </p>
          </section>
          <section id="changes">
            <h2>10. Policy updates</h2>
            <p>
              This policy takes effect on September 10, 2026. When it changes,
              we publish the effective date and changes on this website or
              through the relevant service. We provide advance notice of changes
              that materially affect your rights and obtain separate consent
              where required by law.
            </p>
          </section>
        </div>
      </div>
    </LegalLayout>
  );
}
