"use client";

import LikeButton from "@/components/LikeButton";
import { Posts } from "@/types/posts.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus, FaShareAlt } from "react-icons/fa";

function RecentPostForm({ posts = [] }: { posts?: Posts }) { // 기본값 설정
    const [isShowMore, setIsShowMore] = useState(false);

    // createdAt을 기준으로 최신순 정렬
    const sortedPosts = [...posts].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div>
            {isShowMore ? (
                <ul className="grid grid-cols-2 gap-10">
                    {sortedPosts.map((post) => (
                        <li
                            key={post.id}
                            className="w-96 p-4 bg-white rounded-md grid"
                        >
                            <div className="flex flex-row gap-x-2 items-center pb-2">
                                <div className="w-10 h-10 bg-gray-500 rounded-md" />
                                <p>{post.userId}</p>
                            </div>

                            <Link href={`/posts/${post.id}`}>
                                <div className="w-full h-96 bg-gray-300" />
                                <h1 className="font-semibold text-xl py-2">
                                    {post.title}
                                </h1>
                                {post.content.length > 15 ? (
                                    <p className="text-lg">
                                        {post.content.slice(0, 15)} • • •
                                    </p>
                                ) : (
                                    <p className="text-lg">{post.content}</p>
                                )}
                            </Link>

                            <div className="flex flex-row items-center mt-2 pt-2 border-t text-md">
                                <span className="leading-3">
                                    {post.createdAt.slice(0, 10)}
                                </span>
                                <div className="ml-auto flex flex-row gap-x-3 text-2xl">
                                    <LikeButton postId={post.id} />
                                    <FaShareAlt />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="grid grid-cols-3 gap-10 place-items-center">
                    {sortedPosts
                        .slice(0, 6)
                        .map((post) => (
                            <li
                                key={post.id}
                                className="w-96 p-4 bg-white rounded-md grid"
                            >
                                <div className="flex flex-row gap-x-2 items-center pb-2">
                                    <div className="w-10 h-10 bg-gray-500 rounded-md" />
                                    <p>{post.userId}</p>
                                </div>

                                <Link href={`/posts/${post.id}`}>
                                    <div className="w-full h-96 bg-gray-300" />
                                    <h1 className="font-semibold text-xl py-2">
                                        {post.title}
                                    </h1>
                                    {post.content.length > 15 ? (
                                        <p className="text-lg">
                                            {post.content.slice(0, 15)} • • •
                                        </p>
                                    ) : (
                                        <p className="text-lg">{post.content}</p>
                                    )}
                                </Link>

                                <div className="flex flex-row items-center mt-2 pt-2 border-t text-md">
                                    <span className="leading-3">
                                        {post.createdAt.slice(0, 10)}
                                    </span>
                                    <div className="ml-auto flex flex-row gap-x-3 text-2xl">
                                        <LikeButton postId={post.id} />
                                        <FaShareAlt />
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            )}

            <div className="mt-3 flex justify-center relative">
                <button
                    onClick={() => {
                        setIsShowMore((e) => !e);
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
                >
                    {isShowMore ? (
                        <FaMinus className="text-2xl" />
                    ) : (
                        <FaPlus className="text-2xl" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default RecentPostForm;
