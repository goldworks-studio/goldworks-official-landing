import Link from "next/link";
import { Wordmark } from "@/components/site-header";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Wordmark />
        <p>작은 스튜디오. 끝없는 호기심.</p>
        <a href="mailto:support@goldworks.net">support@goldworks.net</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GoldWorks</span>
        <div>
          <Link href="/privacy/">개인정보처리방침</Link>
          <Link href="/account-deletion/">계정·데이터 삭제</Link>
        </div>
      </div>
    </footer>
  );
}
