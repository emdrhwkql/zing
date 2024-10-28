"use client";

import LikeButton from "@/components/LikeButton";
import { Posts } from "@/types/posts.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus, FaShareAlt } from "react-icons/fa";

function PostsList({ posts, loungeId }: { posts: Posts; loungeId: number }) {
	const [isShowMore, setIsShowMore] = useState(false);

	return loungeId === 0 ? (
		// 자유 게시판 게시물
		<div>
			{isShowMore ? (
				// 다 보여주기
				<ul className="grid grid-cols-3 gap-10 place-items-center">
					{posts.map((post) => (
						<li
							key={post.id}
							className="w-96 p-4 bg-white rounded-md grid hover:scale-105 hover:duration-300"
						>
							<div className="flex flex-row gap-x-2 items-center pb-2">
								<div className="w-10 h-10 bg-gray-500 rounded-md" />

								<p>{post.userName}</p>
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
				// 라운지 접힘 상태
				<ul className="grid grid-cols-3 gap-10 place-items-center">
					{posts
						.map((post) => (
							<li
								key={post.id}
								className="w-96 p-4 bg-white rounded-md grid hover:scale-105 hover:duration-300"
							>
								<div className="flex flex-row gap-x-2 items-center pb-2">
									<div className="w-10 h-10 bg-gray-500 rounded-md" />

									<p>{post.userName}</p>
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
										<p className="text-lg">
											{post.content}
										</p>
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
						))
						.slice(0, 6)}
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
	) : (
		// 나머지 라운지 게시물
		<div>
			{isShowMore ? (
				// 다 보여주기
				<ul className="grid grid-cols-3 gap-10 place-items-center">
					{posts.map((post) => (
						<li
							key={post.id}
							className="w-72 p-4 bg-white rounded-md grid hover:scale-110 hover:duration-300"
						>
							<div className="flex flex-row gap-x-2 items-center pb-2">
								<div className="w-8 h-8 bg-gray-500 rounded-md" />

								<p>{post.userName}</p>
							</div>

							<Link href={`/posts/${post.id}`}>
								<div className="w-full h-72 bg-gray-300" />
								<h1 className="font-semibold text-lg py-2">
									{post.title}
								</h1>

								{post.content.length > 15 ? (
									<p className="text-sm">
										{post.content.slice(0, 15)} • • •
									</p>
								) : (
									<p className="text-sm">{post.content}</p>
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
				// 라운지 접힘 상태
				<ul className="grid grid-cols-3 gap-10 place-items-center">
					{posts
						.map((post) => (
							<li
								key={post.id}
								className="w-72 p-4 bg-white rounded-md grid hover:scale-110 hover:duration-300"
							>
								<div className="flex flex-row gap-x-2 items-center pb-2">
									<div className="w-8 h-8 bg-gray-500 rounded-md" />

									<p>{post.userName}</p>
								</div>

								<Link href={`/posts/${post.id}`}>
									<div className="w-full h-72 bg-gray-300" />
									<h1 className="font-semibold text-lg py-2">
										{post.title}
									</h1>

									{post.content.length > 15 ? (
										<p className="text-sm">
											{post.content.slice(0, 15)} • • •
										</p>
									) : (
										<p className="text-sm">
											{post.content}
										</p>
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
						))
						.slice(0, 6)}
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

export default PostsList;
