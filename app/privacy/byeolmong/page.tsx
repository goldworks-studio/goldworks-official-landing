import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { basePath } from "@/lib/site";

const description =
  "How Byeolmong processes personal information, including account synchronization, location and photos, service providers and deletion.";
export const metadata: Metadata = {
  title: "Byeolmong Privacy Notice",
  description,
  alternates: { canonical: `${basePath}/privacy/byeolmong/` },
  openGraph: {
    title: "Byeolmong Privacy Notice | GoldWorks",
    description,
    locale: "en_US",
    url: `${basePath}/privacy/byeolmong/`,
  },
};

export default function ByeolmongPrivacyPage() {
  return (
    <LegalLayout
      alternateHref="/ko/privacy/byeolmong/"
      title="Byeolmong Privacy Notice"
      eyebrow="GOLDWORKS / BYEOLMONG"
      intro="This notice explains how GoldWorks processes personal information in Byeolmong. Read it together with the GoldWorks Privacy Policy, which sets out our shared principles on retention, deletion, your rights and how to contact us."
    >
      <div className="legal-content deletion-content">
        <p>
          <Link href="/privacy/">Read the GoldWorks Privacy Policy</Link>
        </p>
        <section>
          <h2>Information processed in Byeolmong</h2>
          <p>
            Saju (Four Pillars) and fortune calculations run on your device.
            When you use an account, your primary birth profile is stored and
            synchronized on a server. Place search and map display use network
            requests.
          </p>
          <div
            className="legal-table-wrap"
            tabIndex={0}
            role="region"
            aria-label="Byeolmong information processing"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Information and purpose</th>
                  <th scope="col">Where it is processed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Registration and sign-in</td>
                  <td>
                    Email address, display name, user identifier, authentication
                    information and email verification status. When you choose
                    Google or Apple sign-in, the supplied name, email address
                    and profile photo URL are used to create and authenticate
                    your account.
                  </td>
                  <td>
                    Firebase Authentication and your sign-in provider. Profile
                    names, photo URLs, and creation and update timestamps are
                    also stored in Firestore.
                  </td>
                </tr>
                <tr>
                  <td>Saju, fortunes and primary profile</td>
                  <td>
                    The name, birth date and time you enter; solar or lunar
                    calendar and leap-month selections; birthplace name,
                    address, coordinates and time zone; and calculation
                    settings. These are used for calculations, saving and
                    restoring your profile.
                  </td>
                  <td>
                    Calculations run on your device. Your signed-in account’s
                    primary profile is synchronized with Firestore.
                  </td>
                </tr>
                <tr>
                  <td>Additional profiles and preferences</td>
                  <td>
                    Names and birth information for additional people you save,
                    and app settings, used for saved profiles and comparisons.
                    Only enter another person’s information if you are
                    authorized to do so.
                  </td>
                  <td>App storage on your device</td>
                </tr>
                <tr>
                  <td>Photo selection</td>
                  <td>
                    A photo you choose is displayed as a profile image. This is
                    separate from a photo URL supplied by a social sign-in
                    provider.
                  </td>
                  <td>
                    The selected image itself is saved in app storage on your
                    device.
                  </td>
                </tr>
                <tr>
                  <td>Birthplace search and maps</td>
                  <td>
                    Your place or address search, selected coordinates or
                    location obtained through the current-location feature, the
                    map area displayed, IP address and technical request
                    information. These are used for place search, address
                    conversion and map display.
                  </td>
                  <td>
                    The OpenStreetMap Foundation’s Nominatim and map tile
                    services
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Firebase Authentication handles passwords for authentication;
            passwords are not stored in the app’s profile documents. Byeolmong
            does not send fortune calculation inputs or results to external
            generative AI services. Byeolmong currently does not include
            advertising or behavioral analytics SDKs.
          </p>
        </section>
        <section>
          <h2>Optional permissions</h2>
          <ul>
            <li>
              <strong>Location:</strong> Used when you choose to find a place
              using your current location. You can search manually or select a
              place on the map without granting location permission. The app
              does not continuously track your location in the background.
            </li>
            <li>
              <strong>Photos:</strong> When you change a profile photo, the app
              accesses the image you select through the operating system’s photo
              picker. You can use other features without selecting a photo.
            </li>
          </ul>
        </section>
        <section>
          <h2>External service providers</h2>
          <ul>
            <li>
              <strong>Google / Firebase:</strong> Provides account
              authentication and storage and synchronization of your primary
              profile. Authentication also processes IP addresses and technical
              device or request information. See{" "}
              <a href="https://firebase.google.com/support/privacy">
                Firebase Privacy and Security
              </a>{" "}
              and the{" "}
              <a href="https://policies.google.com/privacy?hl=en">
                Google Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Google or Apple:</strong> Authenticates your account when
              you choose that sign-in method. See the{" "}
              <a href="https://www.apple.com/legal/privacy/en-ww/">
                Apple Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>OpenStreetMap Foundation:</strong> Receives search terms
              or selected coordinates through Nominatim for address lookup, and
              requests for the map area to display through its tile service.
              These requests do not include your Byeolmong account email address
              or birth date. See the{" "}
              <a href="https://osmfoundation.org/wiki/Privacy_Policy">
                OpenStreetMap Foundation Privacy Policy
              </a>
              .
            </li>
          </ul>
          <p>
            Firebase Authentication information is processed on infrastructure
            in the United States. External sign-in and map requests are sent to
            each provider’s infrastructure and may be processed outside your
            country under that provider’s policies. Transfers take place over
            HTTPS when you use an account or the relevant feature, for the
            purposes and information described above. Providers’ authentication
            and technical records follow their stated retention practices.
          </p>
          <p>
            You can limit the relevant requests by not using external sign-in or
            place search and map features. You can request deletion of
            information synchronized with your account as explained below. Any
            notices and consent required for feature changes or additional
            international transfers are provided when the relevant feature is
            offered.
          </p>
        </section>
        <section>
          <h2>Additional international processing details</h2>
          <p>
            <strong>
              Google LLC / Firebase Authentication (United States):
            </strong>{" "}
            During registration, sign-in and account management, email
            addresses, account identifiers, authentication and profile
            information, IP addresses and user agents are transmitted through
            encrypted connections. The purposes are authentication, account
            management and abuse prevention. Authentication information is
            retained until account deletion is requested. According to Google’s
            documentation, removal from active and backup systems can take up to
            180 days after deletion starts. Authentication IP logs are retained
            for a few weeks. For inquiries, use the contact channels in{" "}
            <a href="https://firebase.google.com/support/privacy">
              Firebase’s privacy documentation
            </a>
            . You can stop using account features or request account deletion;
            sign-in and server synchronization will then no longer be available.
          </p>
          <p>
            <strong>
              OpenStreetMap Foundation (United Kingdom and Netherlands, with
              backups in the EU):
            </strong>{" "}
            Search terms, coordinates, IP addresses and request information are
            transmitted over HTTPS for place search or address conversion. Map
            tile requests are processed by globally distributed CDN servers
            selected at the time of the request. The purposes are search,
            address conversion, map delivery and technical operations. Records
            are subject to the provider’s retention practices for operational
            and security purposes. For retention periods applicable to a
            particular request and deletion inquiries, use the contact details
            in the{" "}
            <a href="https://osmfoundation.org/wiki/Privacy_Policy">
              OpenStreetMap Foundation Privacy Policy
            </a>
            . You can limit transfers by not using these search and map
            features.
          </p>
        </section>
        <section>
          <h2>Retention and deletion</h2>
          <p>
            Information linked to your account is retained while the account is
            maintained. An account deletion request covers the authentication
            account, server profile and primary birth information. Additional
            profiles, photos and settings stored only on your device, and
            operating system backups, must also be deleted separately on the
            device or in backup settings. Providers’ authentication records and
            backups follow the separate deletion schedules described above.
          </p>
          <p>
            Uninstalling the app or signing out does not automatically delete
            your server account or data. See the{" "}
            <Link href="/privacy/#retention">GoldWorks Privacy Policy</Link> for
            the shared retention and deletion principles.
          </p>
          <p>
            <Link href="/account-deletion/">
              Request deletion of your Byeolmong account and data
            </Link>
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Data controller: GoldWorks
            <br />
            Privacy inquiries:{" "}
            <a href="mailto:support@goldworks.net">support@goldworks.net</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
