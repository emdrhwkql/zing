"use client"

import React, { useState } from 'react';

const Report = () => {
    const [reportType, setReportType] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);
    //신고 폼
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuccess(true);
        setReportType('');
        setDescription('');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">신고하기</h1>

            {success && (
                <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
                    신고가 성공적으로 전송되었습니다! 검토 후 처리하겠습니다.
                </div>
            )}

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="reportType">
                        신고 유형
                    </label>
                    <select
                        id="reportType"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    >
                        <option value="">신고 유형 선택</option>
                        <option value="spam">스팸</option>
                        <option value="abuse">학대 또는 괴롭힘</option>
                        <option value="inappropriate_content">부적절한 콘텐츠</option>
                        <option value="other">기타</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="description">
                        설명
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                >
                    신고하기
                </button>
            </form>
        </div>
    );
};

export default Report;
