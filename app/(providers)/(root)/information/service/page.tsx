"use client"


import React, { useState } from 'react';

const CustomerService = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">고객센터</h1>

            {success && (
                <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
                    문의가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.
                </div>
            )}

            <h2 className="text-2xl font-semibold mt-6 mb-4">문의 양식</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">
                        이름
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                        이메일
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="message">
                        문의 내용
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                    보내기
                </button>
            </form>

            <h2 className="text-2xl font-semibold mt-6 mb-4">연락처 정보</h2>
            <ul className="list-disc list-inside mb-4">
                <li>이메일: support@gmail.com</li>
                <li>전화: 032-1234-5678</li>
                <li>주소: 서울특별시 마포구 DMC첨단산업센터 </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">자주 묻는 질문 (FAQ)</h2>
            <div className="mb-4">
                <h3 className="font-semibold">Q: 서비스 이용에 문제가 있습니다.</h3>
                <p>A: 고객센터에 문의해 주시면 빠르게 도와드리겠습니다.</p>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold">Q: 환불은 어떻게 진행되나요?</h3>
                <p>A: 환불 정책은 서비스 이용 약관을 참조해 주세요.</p>
            </div>
        </div>
    );
};

export default CustomerService;
