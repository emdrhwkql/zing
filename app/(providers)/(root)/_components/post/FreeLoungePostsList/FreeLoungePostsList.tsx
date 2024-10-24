"use client";

import LikeButton from "@/components/LikeButton";
import MainBox from "@/components/MainBox";
import { Posts } from "@/types/posts.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus, FaShareAlt } from "react-icons/fa";

function FreeLoungePostsList({ posts }: { posts: Posts }) {
	const [isShowMore, setIsShowMore] = useState(false);

	const isUserNameSlice = true;

	return (
		<MainBox>
			<h1 className="mb-4 pb-4  border-b font-bold text-2xl">
				<Link href={"/lounges/0"}>자유 게시판</Link>
			</h1>

			{isShowMore ? (
				// 메인 페이지에 8개짜리
				<ul className="grid grid-cols-4 gap-5 place-items-center">
					{posts
						.map((post) => (
							<li key={post.id} className="w-48">
								<div className="flex flex-row gap-x-2 items-center pb-2">
									<div className="w-4 h-4 bg-gray-500 rounded-md" />

									{isUserNameSlice ? (
										<p>{post.userId.slice(0, 10)} • • •</p>
									) : null}
								</div>

								<Link href={`/posts/${post.id}`}>
									<div className="w-48 h-48 bg-gray-300" />
									<h1 className="font-semibold text-lg">
										{post.title}
									</h1>

									<p>{post.content}</p>
								</Link>

								<div className="flex flex-row items-center mt-2 pt-2 border-t">
									<span className="leading-3">
										{post.createdAt.slice(0, 10)}
									</span>

									<div className="ml-auto flex flex-row gap-x-3">
										<LikeButton postId={post.id} />

										<FaShareAlt />
									</div>
								</div>
							</li>
						))
						.slice(0, 8)}
				</ul>
			) : (
				// 메인 페이지에 4개짜리
				<ul className="grid grid-cols-4 gap-5 place-items-center">
					{posts
						.map((post) => (
							<li key={post.id} className="w-48">
								<div className="flex flex-row gap-x-2 items-center pb-2">
									<div className="w-4 h-4 bg-gray-500 rounded-md" />

									{isUserNameSlice ? (
										<p>{post.userId.slice(0, 10)} • • •</p>
									) : null}
								</div>

								<Link href={`/posts/${post.id}`}>
									<div className="w-48 h-48 bg-gray-300" />
									<h1 className="font-semibold text-lg">
										{post.title}
									</h1>

									<p>{post.content}</p>
								</Link>

								<div className="flex flex-row items-center mt-2 pt-2 border-t">
									<span className="leading-3">
										{post.createdAt.slice(0, 10)}
									</span>

									<div className="ml-auto flex flex-row gap-x-2 items-center">
										<LikeButton postId={post.id} />

										<FaShareAlt />
									</div>
								</div>
							</li>
						))
						.slice(0, 4)}
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
		</MainBox>
	);
}

export default FreeLoungePostsList;
