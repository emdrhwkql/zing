"use client";

import supabase from '@/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
}

function LikedPostPage() {
    const [likedPosts, setLikedPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            // 현재 로그인된 유저 정보 가져오는 거 로직임
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError) {
                console.error('유저가 없음', userError);
                return;
            }

            if (!user) {
                console.log('로그인된 유저가 없습니다');
                return;
            }

            // 유저 아이디가 좋아요누르면 좋아요 누른 포스트아이디를 모아서 페이지를 형성하는 방식임
            const { data: likedData, error: likedError } = await supabase
                .from('likes')
                .select('postId')
                .eq('userId', user.id);

            if (likedError) {
                console.error('Error fetching liked post IDs:', likedError);
                return;
            }

            const postIds = likedData?.map((like) => like.postId) || [];

            // 포스트id를 이용해서 포스트를 가져오는 것
            const { data: postsData, error: postsError } = await supabase
                .from('posts')
                .select('id, title, content')
                .in('id', postIds);

            if (postsError) {
                console.error('Error fetching posts:', postsError);
            } else if (postsData) {
                setLikedPosts(postsData);
            }
        };
        fetchLikedPosts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">내가 좋아요한 게시물</h1>
            {likedPosts.length === 0 ? (
                <p className="text-gray-600">좋아요한 게시물이 없습니다.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {likedPosts.map((post) => (

                        <div key={post.id} className="bg-white shadow rounded-lg p-6">
                            <Link href={`/posts/${post.id}`}>
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-600">{post.content}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LikedPostPage;
