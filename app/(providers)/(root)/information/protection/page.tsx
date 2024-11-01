// pages/youth-protection-policy.js
import React from 'react';

const YouthProtectionPolicy = () => {
    return ( //청소년 보호정책
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">청소년 보호 정책</h1>

            <p className="mb-4">
                본 청소년 보호 정책은 청소년 이용자의 안전한 인터넷 환경을 조성하기 위해 제정되었습니다.
                본 정책은 청소년의 권리 보호 및 안전한 서비스 이용을 위해 필요한 사항을 포함하고 있습니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. 청소년의 정의</h2>
            <p className="mb-2">
                본 정책에서 "청소년"은 만 18세 미만의 개인을 의미합니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. 청소년 정보 보호</h2>
            <p className="mb-2">
                청소년의 개인정보는 법적으로 보호받으며, 당사는 이를 보호하기 위해 최선을 다하고 있습니다.
            </p>
            <p className="mb-2">
                청소년의 개인정보를 수집할 경우, 법정대리인의 동의를 받으며, 정보의 수집 목적 및 사용 방법을 명확히 고지합니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. 청소년의 안전한 이용 환경 조성</h2>
            <p className="mb-2">
                당사는 청소년이 안전하게 서비스에 접근할 수 있도록 다양한 예방 조치를 시행합니다.
                이를 위해 다음과 같은 조치를 취합니다:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>부적절한 콘텐츠에 대한 필터링 및 모니터링 시스템 운영</li>
                <li>청소년의 안전한 커뮤니케이션을 위한 가이드라인 제공</li>
                <li>청소년 관련 콘텐츠에 대한 사전 검토 및 승인 절차 운영</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. 법정대리인의 권리</h2>
            <p className="mb-2">
                청소년의 법정대리인은 언제든지 청소년의 개인정보에 대한 접근, 정정, 삭제를 요구할 수 있습니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. 청소년 보호를 위한 신고 체계</h2>
            <p className="mb-2">
                당사는 청소년이 불법 및 부적절한 콘텐츠를 발견했을 경우 이를 신고할 수 있는 시스템을 운영합니다.
                신고는 다음의 방법으로 가능합니다:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>웹사이트 내 신고 버튼을 통한 직접 신고</li>
                <li>고객센터 이메일을 통한 신고</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. 정책 변경</h2>
            <p className="mb-2">
                본 청소년 보호 정책은 수시로 변경될 수 있으며, 변경 사항은 본 페이지에 공지합니다.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">7. 연락처</h2>
            <p className="mb-2">
                본 청소년 보호 정책에 대한 질문이나 요청이 있는 경우, 다음 연락처로 문의해 주세요:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>이메일: support@gmail.com</li>
                <li>전화: 010-1234-5678</li>
                <li>주소: 서울특별시 마포구 DMC첨단산업센터 </li>
            </ul>
        </div>
    );
};

export default YouthProtectionPolicy;
