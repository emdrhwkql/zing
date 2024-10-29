"use client";

import LikeButton from "@/components/LikeButton";
import MainBox from "@/components/MainBox";
import { Posts } from "@/types/posts.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus, FaShareAlt } from "react-icons/fa";

function FreeLoungePostsList({ posts }: { posts: Posts }) {
	const [isShowMore, setIsShowMore] = useState(false);

	return (
		<MainBox>
			<div className="mb-4 pb-4 border-b flex flex-row">
				<Link href={"/lounges/0"}>
					<h1 className="font-bold text-2xl hover:text-[27px] hover:duration-150">
						자유 게시판
					</h1>
				</Link>

				<p className="h-full mt-auto ml-3 font-semibold text-xl">
					TOP 8
				</p>
			</div>

			{isShowMore ? (
				// 메인 페이지에 8개짜리
				<ul className="grid grid-cols-4 gap-5 place-items-center">
					{posts
						.map((post) => (
							<li key={post.id} className="w-48">
								<div className="flex flex-row gap-x-2 items-center pb-2">
									<div className="w-4 h-4 bg-gray-500 rounded-md" />

									<p>{post.userId.slice(0, 10)} • • •</p>
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
						.slice(0, 8)}
				</ul>
			) : (
				// 메인 페이지에 4개짜리
				<ul className="grid grid-cols-4 gap-5 place-items-center">
					{posts
						.map((post) => (
							<li
								key={post.id}
								className="w-48 hover:scale-105 hover:duration-200"
							>
								<div className="flex flex-row gap-x-2 items-center pb-2">
									<div className="w-4 h-4 bg-gray-500 rounded-md" />

									<p>{post.userId.slice(0, 10)} • • •</p>
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

			<div className="mt-3 flex justify-center relative ">
				<button
					onClick={() => {
						setIsShowMore((e) => !e);
					}}
					className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-2 shadow-[0_4px_4px_rgb(75,85,99)] active:scale-125 active:duration-75"
				>
					{isShowMore ? (
						<FaMinus className="text-lg " />
					) : (
						<FaPlus className="text-lg" />
					)}
				</button>
			</div>
		</MainBox>
	);
}

export default FreeLoungePostsList;
