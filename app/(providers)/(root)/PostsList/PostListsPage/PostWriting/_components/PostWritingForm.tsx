"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostWritingForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();

        const newPost = {
            id: Math.random(), // 간단한 id 생성
            title,
            content,
        };

        // 새 게시글을 로컬 상태나 서버로 전송하는 로직 필요
        // 예를 들어, localStorage를 사용하거나 API 호출
        if (typeof window !== "undefined") {
            const existingPosts = JSON.parse(localStorage.getItem('posts')!) || [];
            localStorage.setItem('posts', JSON.stringify([...existingPosts, newPost]));
        }

        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">새 글 작성</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xl font-semibold">제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xl font-semibold">내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                    등록하기
                </button>
            </form>
        </div>
    );
}