import React from 'react';

const PrivacyPolicy = () => {
    return ( // 개인정보처리방침
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">개인정보 처리 방침</h1>

            <p className="mb-4">
                본 개인정보 처리 방침은 귀하의 개인정보가 어떻게 수집되고, 사용되며, 공유되는지를 설명합니다. 본 방침에 동의하지 않으실 경우, 본 웹사이트를 이용하지 마시기 바랍니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. 정보 수집</h2>
            <p className="mb-2">
                당사는 다음과 같은 방법으로 귀하의 개인정보를 수집합니다:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>회원 가입 시 제공되는 정보(이름, 이메일 주소, 비밀번호 등)</li>
                <li>서비스 이용 시 자동으로 수집되는 정보(로그 기록, IP 주소, 기기 정보 등)</li>
                <li>쿠키 및 유사한 기술을 통한 웹사이트 방문 정보</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. 정보 사용</h2>
            <p className="mb-2">
                귀하의 개인정보는 다음과 같은 목적을 위해 사용됩니다:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>서비스 제공 및 고객 지원</li>
                <li>서비스 개선 및 신규 기능 개발</li>
                <li>맞춤형 마케팅 자료 및 프로모션 제공</li>
                <li>서비스의 보안 및 안전성 강화</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. 정보 공유</h2>
            <p className="mb-2">
                당사는 귀하의 개인정보를 다음과 같은 경우에 공유할 수 있습니다:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>법률 또는 법원 명령에 따라 요구될 경우</li>
                <li>서비스 제공업체와의 계약에 따라 필요한 범위 내에서 공유</li>
                <li>회사의 매각이나 합병 등 비즈니스 거래 시 공유</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. 보안</h2>
            <p className="mb-2">
                당사는 귀하의 개인정보를 보호하기 위해 합리적인 기술적 및 관리적 조치를 취합니다. 그러나 인터넷을 통한 데이터 전송은 완벽히 안전하다고 보장할 수 없으므로, 귀하의 정보를 보호하기 위한 조치를 지속적으로 강화하고 있습니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. 개인정보 보유 기간</h2>
            <p className="mb-2">
                귀하의 개인정보는 수집 목적이 달성될 때까지 보유되며, 법적으로 요구되는 기간 동안 보유할 수 있습니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. 귀하의 권리</h2>
            <p className="mb-2">
                귀하는 다음과 같은 권리를 가집니다:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>당사가 보유하고 있는 귀하의 개인정보에 대한 접근 요청</li>
                <li>귀하의 개인정보가 부정확하거나 불완전한 경우 이를 정정할 권리</li>
                <li>특정 조건 하에 귀하의 개인정보 삭제를 요구할 권리</li>
                <li>특정 상황에서 개인정보 처리의 제한을 요구할 권리</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">7. 변경 사항</h2>
            <p className="mb-2">
                본 개인정보 처리 방침은 수시로 변경될 수 있습니다. 변경 사항이 있을 경우, 이 페이지에 공지하고, 중요한 변경 사항에 대해서는 이메일을 통해 귀하에게 알리겠습니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">8. 연락처</h2>
            <p className="mb-2">
                본 개인정보 처리 방침에 대한 질문이나 요청이 있는 경우, 다음 연락처로 문의해 주세요:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>이메일: support@gmail.com</li>
                <li>전화: 010-1234-5678</li>
                <li>주소: 서울특별시 마포구 DMC첨단산업센터 </li>
            </ul>
        </div>
    );
};

export default PrivacyPolicy;
