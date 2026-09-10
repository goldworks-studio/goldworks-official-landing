import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { basePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "별몽 개인정보 안내",
  description:
    "별몽(Byeolmong)의 개인정보 처리 항목, 계정 동기화, 위치와 사진 권한, 외부 서비스 및 삭제 방법 안내입니다.",
  alternates: { canonical: `${basePath}/privacy/byeolmong/` },
  openGraph: {
    title: "별몽 개인정보 안내 | GoldWorks",
    url: `${basePath}/privacy/byeolmong/`,
  },
};

export default function ByeolmongPrivacyPage() {
  return (
    <LegalLayout
      title="별몽 개인정보 안내"
      eyebrow="GOLDWORKS / BYEOLMONG"
      intro="이 안내는 골드웍스가 제공하는 별몽(Byeolmong)의 개인정보 처리 방식을 설명합니다. 보관·파기, 이용자 권리 및 문의에 관한 공통 기준은 GoldWorks 개인정보처리방침과 함께 적용됩니다."
    >
      <div className="legal-content deletion-content">
        <p>
          <Link href="/privacy/">공통 개인정보처리방침 읽기</Link>
        </p>
        <section>
          <h2>별몽에서 처리하는 정보</h2>
          <p>
            사주·운세 계산은 기기 안에서 수행합니다. 계정을 사용하면 본인의 기본
            출생정보를 서버에 저장·동기화하며, 장소 검색과 지도 표시에는
            네트워크를 사용합니다.
          </p>
          <div
            className="legal-table-wrap"
            tabIndex={0}
            role="region"
            aria-label="별몽 개인정보 처리 항목 표"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">기능</th>
                  <th scope="col">정보 및 목적</th>
                  <th scope="col">처리 위치</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>회원가입·로그인</td>
                  <td>
                    이메일, 표시 이름, 사용자 식별자, 인증 정보, 이메일 인증
                    여부. 선택한 Google 또는 Apple 로그인에서 제공되는
                    이름·이메일·프로필 사진 URL을 계정 생성과 인증에 사용합니다.
                  </td>
                  <td>
                    Firebase Authentication 및 로그인 제공업체. 프로필 이름·사진
                    URL·생성 및 수정 시각은 Firestore에도 저장됩니다.
                  </td>
                </tr>
                <tr>
                  <td>사주·운세 및 기본 프로필</td>
                  <td>
                    입력한 이름, 생년월일·출생시각, 양력·음력·윤달 여부, 출생지
                    이름·주소·좌표·시간대, 계산 설정. 사주 계산과 저장·복원에
                    사용합니다.
                  </td>
                  <td>
                    계산은 기기에서 처리합니다. 로그인한 본인의 기본 프로필은
                    Firestore에 동기화됩니다.
                  </td>
                </tr>
                <tr>
                  <td>추가 인물·개인 설정</td>
                  <td>
                    추가로 저장한 인물의 이름·출생정보와 앱 설정. 프로필 저장 및
                    비교 기능에 사용합니다. 다른 사람의 정보는 입력할 권한이
                    있는 경우에만 입력해 주세요.
                  </td>
                  <td>기기 내 앱 저장소</td>
                </tr>
                <tr>
                  <td>사진 선택</td>
                  <td>
                    이용자가 선택한 사진을 프로필 이미지로 표시합니다. 소셜
                    로그인 제공자가 전달하는 사진 URL과는 별도입니다.
                  </td>
                  <td>선택한 이미지 자체는 기기 내 앱 저장소에 저장합니다.</td>
                </tr>
                <tr>
                  <td>출생지 검색·지도</td>
                  <td>
                    검색한 장소·주소, 선택한 좌표 또는 ‘현재 위치’ 기능으로 얻은
                    위치, 지도 표시 영역, 접속 IP 및 기술 요청 정보. 장소 검색,
                    주소 변환 및 지도 표시를 위해 사용합니다.
                  </td>
                  <td>
                    OpenStreetMap Foundation의 Nominatim 및 지도 타일 서비스
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            비밀번호는 Firebase Authentication이 인증 목적으로 처리하며 앱의
            프로필 문서에 저장하지 않습니다. 별몽의 운세 계산 입력이나 결과를
            외부 생성형 AI 서비스로 보내지 않습니다. 현재 별몽에는 광고 또는
            행태 분석 SDK가 적용되어 있지 않습니다.
          </p>
        </section>
        <section>
          <h2>선택 권한</h2>
          <ul>
            <li>
              <strong>위치:</strong> 이용자가 현재 위치로 장소를 찾는 기능을
              실행했을 때 사용합니다. 위치 권한을 허용하지 않고도 장소를 직접
              검색하거나 지도에서 선택할 수 있습니다. 백그라운드에서 계속 위치를
              추적하지 않습니다.
            </li>
            <li>
              <strong>사진:</strong> 프로필 사진 변경 시 운영체제의 사진 선택
              기능으로 고른 이미지에 접근합니다. 사진을 선택하지 않아도 나머지
              기능을 이용할 수 있습니다.
            </li>
          </ul>
        </section>
        <section>
          <h2>외부 서비스</h2>
          <ul>
            <li>
              <strong>Google / Firebase:</strong> 계정 인증과 기본 프로필
              저장·동기화를 제공합니다. 인증 요청 과정에서 IP 주소와 기기·요청
              관련 기술 정보도 처리합니다.{" "}
              <a href="https://firebase.google.com/support/privacy">
                Firebase 개인정보 및 보안 안내
              </a>
              ,{" "}
              <a href="https://policies.google.com/privacy?hl=ko">
                Google 개인정보처리방침
              </a>
            </li>
            <li>
              <strong>Google 또는 Apple:</strong> 이용자가 해당 로그인 방법을
              선택할 때 계정을 인증합니다.{" "}
              <a href="https://www.apple.com/legal/privacy/kr/">
                Apple 개인정보처리방침
              </a>
            </li>
            <li>
              <strong>OpenStreetMap Foundation:</strong> Nominatim에 검색어 또는
              선택한 좌표를 보내 주소를 찾고, 지도 타일 서비스에 표시할 지도
              영역을 요청합니다. 이 요청에 별몽 계정 이메일이나 생년월일은
              포함하지 않습니다.{" "}
              <a href="https://osmfoundation.org/wiki/Privacy_Policy">
                OpenStreetMap Foundation 개인정보처리방침
              </a>
            </li>
          </ul>
          <p>
            Firebase Authentication의 인증 정보는 미국의 인프라에서 처리됩니다.
            외부 로그인 및 지도 요청은 각 제공업체의 인프라로 전송되며,
            제공업체의 정책에 따라 국외에서 처리될 수 있습니다. 전송은 계정 또는
            관련 기능 이용 시 HTTPS를 통해 이루어지며, 목적과 항목은 위 안내와
            같습니다. 제공업체가 보관하는 인증·기술 기록의 기간은 각 업체의
            개인정보 안내를 따릅니다.
          </p>
          <p>
            외부 로그인을 사용하지 않거나 장소 검색·지도 기능을 이용하지 않는
            방식으로 해당 요청을 제한할 수 있습니다. 계정과 동기화된 정보는 아래
            삭제 요청 방법에 따라 삭제를 요청할 수 있습니다. 기능 변경이나
            추가적인 국외 이전에 필요한 고지·동의는 해당 기능 제공 시
            안내합니다.
          </p>
        </section>
        <section>
          <h2>국외 처리에 관한 추가 안내</h2>
          <p>
            <strong>Google LLC / Firebase Authentication (미국)</strong>:
            회원가입·로그인·계정 관리 시 이메일, 계정 식별자, 인증 및 프로필
            정보, IP 주소와 사용자 에이전트가 암호화된 통신으로 전송됩니다.
            목적은 인증, 계정 관리 및 부정 이용 방지입니다. 인증 정보는 계정
            삭제 요청 전까지 보관하며, Google의 안내에 따르면 삭제 시작 후
            운영·백업 시스템에서 제거하는 데 최대 180일이 소요됩니다. 인증 IP
            기록은 수 주간 보관합니다. 문의는{" "}
            <a href="https://firebase.google.com/support/privacy">
              Firebase 개인정보 안내의 연락 경로
            </a>
            를 이용할 수 있습니다. 계정 기능 이용을 중단하거나 계정 삭제를
            요청할 수 있으며, 이 경우 로그인과 서버 동기화는 이용할 수 없습니다.
          </p>
          <p>
            <strong>OpenStreetMap Foundation (영국·네덜란드, 백업은 EU)</strong>
            : 장소 검색 또는 주소 변환 시 검색어·좌표·IP 주소·요청 정보가
            HTTPS로 전송됩니다. 지도 타일 요청은 요청 시점에 선택된 전 세계 CDN
            서버에서 처리됩니다. 목적은 검색·주소 변환·지도 전달과 기술적
            운영이며, 기록은 제공업체의 운영·보안 목적에 따른 보관 정책을
            적용받습니다. 특정 요청에 적용되는 보관 기간과 삭제 문의는{" "}
            <a href="https://osmfoundation.org/wiki/Privacy_Policy">
              OpenStreetMap Foundation 개인정보 안내
            </a>
            의 연락처에서 확인할 수 있습니다. 해당 검색·지도 기능을 사용하지
            않는 방법으로 전송을 제한할 수 있습니다.
          </p>
        </section>
        <section>
          <h2>보관 및 삭제</h2>
          <p>
            계정에 연결된 정보는 계정 유지 기간 동안 보관합니다. 계정 삭제 요청
            시 인증 계정과 서버의 프로필 및 기본 출생정보를 함께 삭제 대상으로
            처리합니다. 기기에만 저장된 추가 인물·사진·설정과 운영체제 백업은
            기기에서도 별도로 삭제해야 합니다. 외부 제공업체의 인증 기록과
            백업은 위에 안내한 별도의 삭제 일정이 적용됩니다.
          </p>
          <p>
            앱을 삭제하거나 로그아웃해도 서버의 계정과 정보가 자동으로
            삭제되지는 않습니다. 자세한 보관·파기 원칙은{" "}
            <Link href="/privacy/#retention">공통 개인정보처리방침</Link>을
            확인해 주세요.
          </p>
          <p>
            <Link href="/account-deletion/">
              별몽 계정 및 데이터 삭제 요청하기
            </Link>
          </p>
        </section>
        <section>
          <h2>문의</h2>
          <p>
            처리 주체: GoldWorks (골드웍스)
            <br />
            개인정보 문의:{" "}
            <a href="mailto:support@goldworks.net">support@goldworks.net</a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
