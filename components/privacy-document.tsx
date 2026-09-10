import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { site } from "@/lib/site";
import { getPrivacyCopy } from "@/lib/privacy-copy";
import {
  privacySectionIds,
  type TranslatedPrivacyLocale,
} from "@/lib/legal-locales";

export function PrivacyDocument({
  locale = "en",
}: {
  locale?: TranslatedPrivacyLocale;
}) {
  const copy = getPrivacyCopy(locale);
  const contents = privacySectionIds.map((id, index) => [
    id,
    copy.contents[index],
  ]);
  return (
    <LegalLayout
      documentPath="/privacy/"
      locale={locale}
      title={copy.title}
      eyebrow={`GOLDWORKS / ${copy.title.toUpperCase()}`}
      intro={copy.intro}
    >
      <div className="legal-columns">
        <nav className="legal-toc" aria-label={copy.tocLabel}>
          <p>{copy.text.t01}</p>
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
            <h2>{copy.text.t02}</h2>
            <p>{copy.text.t03}</p>
            <div className="legal-callout">
              <p>
                <strong>{copy.text.t04}</strong>
              </p>
              <p>
                <Link href="/privacy/byeolmong/">{copy.text.t05}</Link>
              </p>
              <p>{copy.text.t06}</p>
            </div>
            <p>{copy.text.t07}</p>
          </section>
          <section id="collection">
            <h2>{copy.text.t08}</h2>
            <p>{copy.text.t09}</p>
            <div
              className="legal-table-wrap"
              tabIndex={0}
              role="region"
              aria-label={copy.tableLabel}
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col">{copy.text.t10}</th>
                    <th scope="col">{copy.text.t11}</th>
                    <th scope="col">{copy.text.t12}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{copy.text.t13}</td>
                    <td>{copy.text.t14}</td>
                    <td>{copy.text.t15}</td>
                  </tr>
                  <tr>
                    <td>{copy.text.t16}</td>
                    <td>{copy.text.t17}</td>
                    <td>{copy.text.t18}</td>
                  </tr>
                  <tr>
                    <td>{copy.text.t19}</td>
                    <td>{copy.text.t20}</td>
                    <td>{copy.text.t21}</td>
                  </tr>
                  <tr>
                    <td>{copy.text.t22}</td>
                    <td>{copy.text.t23}</td>
                    <td>{copy.text.t24}</td>
                  </tr>
                  <tr>
                    <td>{copy.text.t25}</td>
                    <td>{copy.text.t26}</td>
                    <td>{copy.text.t27}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>{copy.text.t28}</p>
            <p>{copy.text.t29}</p>
          </section>
          <section id="retention">
            <h2>{copy.text.t30}</h2>
            <ul>
              <li>
                <strong>{copy.text.t31}</strong>
                {copy.text.t32}
              </li>
              <li>
                <strong>{copy.text.t33}</strong>
                {copy.text.t34}
              </li>
              <li>
                <strong>{copy.text.t35}</strong>
                {copy.text.t36}
              </li>
              <li>
                <strong>{copy.text.t37}</strong>
                {copy.text.t38}
              </li>
            </ul>
            <p>{copy.text.t39}</p>
            <p>{copy.text.t40}</p>
          </section>
          <section id="sharing">
            <h2>{copy.text.t41}</h2>
            <p>{copy.text.t42}</p>
            <p>{copy.text.t43}</p>
            <p>{copy.text.t44}</p>
          </section>
          <section id="rights">
            <h2>{copy.text.t45}</h2>
            <p>{copy.text.t46}</p>
            <p>{copy.text.t47}</p>
            <p>
              <Link href="/account-deletion/">{copy.text.t48}</Link>
            </p>
            <p>{copy.text.t49}</p>
          </section>
          <section id="permissions">
            <h2>{copy.text.t50}</h2>
            <p>{copy.text.t51}</p>
            <p>
              {copy.text.t52}{" "}
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
                {copy.text.t53}
              </a>{" "}
              {copy.text.t54}{" "}
              <a href="https://www.cloudflare.com/privacypolicy/">
                {copy.text.t55}
              </a>
              {copy.text.t56}
            </p>
            <p>{copy.text.t57}</p>
          </section>
          <section id="security">
            <h2>{copy.text.t58}</h2>
            <p>{copy.text.t59}</p>
          </section>
          <section id="children">
            <h2>{copy.text.t60}</h2>
            <p>{copy.text.t61}</p>
          </section>
          <section id="contact">
            <h2>{copy.text.t62}</h2>
            <div className="legal-contact">
              <p>
                <strong>{copy.text.t63}</strong>
                <br />
                {copy.text.t64}
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <p>
              {copy.text.t65}{" "}
              <a href="https://privacy.kisa.or.kr/">{copy.text.t66}</a>{" "}
              {copy.text.t67}{" "}
              <a href="https://www.kopico.go.kr/">{copy.text.t68}</a>
              {copy.text.t69}
            </p>
          </section>
          <section id="changes">
            <h2>{copy.text.t70}</h2>
            <p>{copy.text.t71}</p>
          </section>
        </div>
      </div>
    </LegalLayout>
  );
}
