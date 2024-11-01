"use client"

import React, { useState } from 'react';

const SuspendPost = () => {
    const [postId, setPostId] = useState('');
    const [reason, setReason] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 여기에 API 요청을 추가하여 중단 요청할 수 있음
        //시간부족
        setSuccess(true);
        setPostId('');
        setReason('');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">게시글 중단 요청</h1>

            {success && (
                <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
                    중단 요청이 성공적으로 전송되었습니다! 검토 후 처리하겠습니다.
                </div>
            )}

            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="postId">
                        게시글 ID
                    </label>
                    <input
                        type="text"
                        id="postId"
                        value={postId}
                        onChange={(e) => setPostId(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="reason">
                        중단 요청 사유
                    </label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600"
                >
                    요청하기
                </button>
            </form>
        </div>
    );
};

export default SuspendPost;
