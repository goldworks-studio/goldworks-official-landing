import Link from "next/link";
import { Wordmark } from "@/components/site-header";

export function Footer({ locale = "en" }: { locale?: "en" | "ko" }) {
  const korean = locale === "ko";
  const prefix = korean ? "/ko" : "";
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Wordmark />
        <p>
          {korean
            ? "작은 스튜디오. 끝없는 호기심."
            : "Small studio. Boundless curiosity."}
        </p>
        <a href="mailto:support@goldworks.net">support@goldworks.net</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GoldWorks</span>
        <div>
          <Link href={`${prefix}/privacy/`}>
            {korean ? "개인정보처리방침" : "Privacy Policy"}
          </Link>
          <Link href={`${prefix}/account-deletion/`}>
            {korean ? "계정·데이터 삭제" : "Data Deletion"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
