import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/sections/footer";
import { site } from "@/lib/site";

type Props = {
  title: string;
  eyebrow: string;
  intro: string;
  children: ReactNode;
};

export function LegalLayout({ title, eyebrow, intro, children }: Props) {
  return (
    <div lang="ko">
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>
      <SiteHeader />
      <main id="main" className="legal-page">
        <div className="legal-wrap">
          <p className="legal-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <div className="legal-meta">
            <span>운영자: {site.name} (골드웍스)</span>
            <span>
              시행일: <time dateTime={site.policyDate}>2026년 9월 10일</time>
            </span>
            <span>
              문의: <a href={`mailto:${site.email}`}>{site.email}</a>
            </span>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
