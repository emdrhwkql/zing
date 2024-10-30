"use client";

import MainBox from "@/components/MainBox";
import PostFeed from "@/components/PostFeed";
import { Posts } from "@/types/posts.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

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

			{posts.length === 0 && (
				<div className="grid place-items-center pt-5">
					<p className="text-2xl">라운지 게시글이 없습니다.</p>
				</div>
			)}

			{isShowMore ? (
				// 메인 페이지에 8개짜리
				<ul className="grid grid-cols-4 gap-y-10 place-items-center">
					{posts
						.map((post) => (
							<li
								key={post.id}
								className="w-48 hover:scale-105 hover:duration-200"
							>
								<PostFeed post={post} />
							</li>
						))
						.slice(0, 8)}
				</ul>
			) : (
				// 메인 페이지에 4개짜리
				<ul className="grid grid-cols-4 gap-y-10 place-items-center">
					{posts
						.map((post) => (
							<li
								key={post.id}
								className="w-48 hover:scale-105 hover:duration-200"
							>
								<PostFeed post={post} />
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
					className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-2 shadow-[0_4px_4px_rgb(75,85,99)] active:scale-75 active:duration-100"
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
