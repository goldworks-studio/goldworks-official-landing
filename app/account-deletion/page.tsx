import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LegalLayout } from "@/components/legal-layout";
import { basePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "계정 및 데이터 삭제 요청",
  description:
    "GoldWorks의 앱과 별몽(Byeolmong) 계정 및 관련 개인정보의 삭제를 요청하는 방법과 삭제 범위 안내입니다.",
  alternates: { canonical: `${basePath}/account-deletion/` },
  openGraph: {
    title: "계정 및 데이터 삭제 요청 | GoldWorks",
    url: `${basePath}/account-deletion/`,
  },
};
const email = `mailto:support@goldworks.net?subject=${encodeURIComponent("[GoldWorks] 계정 및 데이터 삭제 요청")}&body=${encodeURIComponent("이용 앱 이름: \n가입 이메일 또는 계정 식별자: \n요청 범위: 계정 및 관련 개인정보 전체 삭제\n\n위 계정과 관련 개인정보의 삭제를 요청합니다.")}`;

export default function AccountDeletionPage() {
  return (
    <LegalLayout
      title="계정 및 데이터 삭제 요청"
      eyebrow="GOLDWORKS / YOUR DATA, YOUR CHOICE"
      intro="별몽(Byeolmong)을 비롯해 GoldWorks가 제공하는 서비스의 계정과 개인정보 삭제를 요청할 수 있습니다. 앱을 다시 설치하거나 웹사이트에 로그인하지 않고도 아래 이메일로 요청해 주세요."
    >
      <div className="legal-content deletion-content">
        <section>
          <h2>이렇게 요청해 주세요</h2>
          <ol>
            <li>
              가능하면 가입할 때 사용한 이메일 주소로{" "}
              <a href="mailto:support@goldworks.net">support@goldworks.net</a>에
              메일을 보내주세요.
            </li>
            <li>
              앱 이름, 가입 이메일 또는 계정 식별자, 삭제할 범위(계정 전체 또는
              특정 정보)를 적어주세요.
            </li>
            <li>
              계정 소유 여부를 확인한 뒤 삭제를 처리하고 회신합니다. 추가 확인이
              필요하면 필요한 최소 정보만 요청합니다.
            </li>
          </ol>
          <a className="email-request" href={email}>
            삭제 요청 이메일 작성 <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <p>
            버튼은 이메일 앱을 엽니다. 이메일 앱이 연결되어 있지 않다면 위
            주소를 복사해 사용하시는 메일 서비스에서 보내주세요. 버튼을 누르는
            것만으로 요청이 접수되거나 계정이 삭제되지는 않습니다.
          </p>
          <div className="legal-callout">
            <p>
              <strong>비밀번호나 신분증을 보내지 마세요.</strong>가입 이메일을
              사용할 수 없거나 Apple의 이메일 가리기를 사용했다면 해당 사실을
              알려주세요. 본인 확인 방법을 개별 안내합니다.
            </p>
          </div>
        </section>
        <section>
          <h2>무엇이 삭제되나요?</h2>
          <p>
            전체 계정 삭제를 요청하면 해당 서비스의 로그인 계정, 서버에 저장된
            프로필 및 계정에 연결된 개인정보를 삭제 대상으로 처리합니다. 별몽의
            경우 인증 계정, 표시 이름·프로필 정보와 동기화된 본인의 출생정보가
            포함됩니다.
          </p>
          <p>
            계정 삭제가 완료되면 해당 계정으로 로그인하거나 삭제된 정보를 복원할
            수 없습니다. 계정을 유지하면서 일부 정보만 삭제하려면 원하는 항목을
            요청에 명시해 주세요.
          </p>
        </section>
        <section>
          <h2>기기 저장 정보도 확인해 주세요</h2>
          <p>
            기기에만 저장된 사진·추가 인물·앱 설정은 서버 계정 삭제만으로 해당
            기기에서 지워지지 않습니다. 기기의 앱 설정에서 저장 데이터를
            삭제하거나 앱을 삭제해 주세요. 운영체제나 클라우드 백업이 있다면
            해당 서비스의 백업 설정에서도 별도로 삭제해 주세요.
          </p>
        </section>
        <section>
          <h2>처리 시점과 보관 예외</h2>
          <p>
            본인 확인 후 적용 법령의 기한과 절차에 따라 처리하며, 삭제가
            완료되면 결과를 알려드립니다. 계정 유지 기간 동안 보관하던 정보는
            삭제 처리 시 지체 없이 파기합니다. 법령상 보존 의무나 진행 중인 분쟁
            등으로 일부 자료를 보관해야 하는 경우에는 해당 항목, 법적 근거와
            보관 기간을 개별 안내하고 그 목적에만 사용합니다.
          </p>
          <p>
            요청 처리용 이메일은 처리 및 관련 분쟁 해결에 필요한 기간 동안
            보관한 후 파기합니다. Google·Apple 등 외부 로그인 제공자의 계정
            자체는 GoldWorks 앱 계정 삭제와 별도로 관리됩니다.
          </p>
        </section>
        <p>
          <Link href="/privacy/">개인정보처리방침</Link> ·{" "}
          <Link href="/privacy/byeolmong/">별몽 서비스별 안내</Link>
        </p>
      </div>
    </LegalLayout>
  );
}
