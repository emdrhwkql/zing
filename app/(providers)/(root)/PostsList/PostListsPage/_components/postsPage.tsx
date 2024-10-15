import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [posts, setPosts] = useState([
        { id: 1, title: '첫 번째 글', content: '이것은 첫 번째 게시글입니다.' }
    ]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">게시글 목록</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="p-4 border rounded shadow-sm">
                        <h2 className="text-2xl font-semibold">{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
            <Link href="/new-post">
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    글쓰기
                </button>
            </Link>
        </div>
    );
}