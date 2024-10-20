"use client";

import PostBox from "@/components/PostBox";
import { Posts } from "@/types/posts.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { LuFilePlus2 } from "react-icons/lu";

export const revalidate = 0;

function PostsList({
	posts,
	freeLounge,
	loungeDetailPost,
}: {
	posts: Posts;
	freeLounge?: boolean;
	loungeDetailPost?: boolean;
}) {
	const freeLoungePosts = posts?.filter((post) => post.loungeId === 0);

	const [isShowMore, setIsShowMore] = useState(false);

	const time = posts.map((post) => post.createdAt);

	// console.log(time);

	const isUserNameSlice = true;

	// const year;

	return (
		<PostBox>
			{freeLounge ? (
				loungeDetailPost ? null : (
					<div className="mb-4 pb-4 flex flex-row border-b">
						<Link href={"/lounges/0"}>
							<h1 className="font-bold text-2xl">자유 게시판</h1>
						</Link>

						<Link
							href={`/lounges/0/posts/new`}
							className="ml-auto rounded-md w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
						>
							<LuFilePlus2 />
							<p>글 쓰기</p>
						</Link>
					</div>
				)
			) : (
				<h1 className="mb-4 pb-4 font-bold text-2xl border-b">
					인기 라운지 목록
				</h1>
			)}

			{freeLounge ? (
				loungeDetailPost ? (
					isShowMore ? (
						<div>
							<ul className="grid grid-cols-4 gap-5 place-items-center">
								{freeLoungePosts.map((post) => (
									<li key={post.id} className="w-48">
										<div className="flex flex-row gap-x-2 items-center pb-2">
											<div className="w-4 h-4 bg-gray-500 rounded-md" />

											{isUserNameSlice ? (
												<p>
													{post.userId.slice(0, 10)} •
													• •
												</p>
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
												<FaRegHeart />
												<FaShareAlt />
											</div>
										</div>
									</li>
								))}
							</ul>

							<div className="mt-3 flex justify-center relative">
								<button
									onClick={() => {
										setIsShowMore((e) => !e);
									}}
									className="absolute top-0 left-50 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
								>
									<FaMinus className="text-2xl" />
								</button>
							</div>
						</div>
					) : (
						<div>
							<ul className="grid grid-cols-4 gap-5 place-items-center">
								{freeLoungePosts
									.map((post) => (
										<li key={post.id} className="w-48">
											<div className="flex flex-row gap-x-2 items-center pb-2">
												<div className="w-4 h-4 bg-gray-500 rounded-md" />

												{isUserNameSlice ? (
													<p>
														{post.userId.slice(
															0,
															10
														)}{" "}
														• • •
													</p>
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
													{post.createdAt.slice(
														0,
														10
													)}
												</span>

												<div className="ml-auto flex flex-row gap-x-3">
													<FaRegHeart />
													<FaShareAlt />
												</div>
											</div>
										</li>
									))
									.slice(0, 16)}
							</ul>

							<div className="mt-3 flex justify-center relative">
								<button
									onClick={() => {
										setIsShowMore((e) => !e);
									}}
									className="absolute top-0 left-50 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
								>
									<FaPlus className="text-2xl" />
								</button>
							</div>
						</div>
					)
				) : isShowMore ? (
					<div>
						<ul className="grid grid-cols-4 gap-5 place-items-center">
							{freeLoungePosts
								.map((post) => (
									<li key={post.id} className="w-48">
										<div className="flex flex-row gap-x-2 items-center pb-2">
											<div className="w-4 h-4 bg-gray-500 rounded-md" />

											{isUserNameSlice ? (
												<p>
													{post.userId.slice(0, 10)} •
													• •
												</p>
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
												<FaRegHeart />
												<FaShareAlt />
											</div>
										</div>
									</li>
								))
								.slice(0, 8)}
						</ul>

						<div className="mt-3 flex justify-center relative">
							<button
								onClick={() => {
									setIsShowMore((e) => !e);
								}}
								className="absolute top-0 left-50 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
							>
								<FaMinus className="text-2xl" />
							</button>
						</div>
					</div>
				) : (
					<div>
						<ul className="grid grid-cols-4 gap-5 place-items-center">
							{freeLoungePosts
								.map((post) => (
									<li key={post.id} className="w-48">
										<div className="flex flex-row gap-x-2 items-center pb-2">
											<div className="w-4 h-4 bg-gray-500 rounded-md" />

											{isUserNameSlice ? (
												<p>
													{post.userId.slice(0, 10)} •
													• •
												</p>
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
												<FaRegHeart />
												<FaShareAlt />
											</div>
										</div>
									</li>
								))
								.slice(0, 4)}
						</ul>

						<div className="mt-3 flex justify-center relative">
							<button
								onClick={() => {
									setIsShowMore((e) => !e);
								}}
								className="absolute top-0 left-50 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
							>
								<FaPlus className="text-2xl" />
							</button>
						</div>
					</div>
				)
			) : (
				<ul className="grid grid-cols-1 gap-y-5">
					{posts.map((post) => (
						<li
							key={post.id}
							className="bg-slate-100 rounded-md h-14 px-2 grid items-center"
						>
							<Link href={`/posts/${post.id}`}>
								<div className="flex flex-row items-center">
									<div className="w-10 h-10 bg-gray-300" />

									<div className="ml-3 flex flex-col">
										<p>{post.title}</p>
										<p>{post.content}</p>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</PostBox>
	);
}

export default PostsList;
