import LikeButton from "@/components/LikeButton";
import { Posts } from "@/types/posts.types";
import Link from "next/link";
import { FaShareAlt } from "react-icons/fa";

function PostsList({ posts, loungeId }: { posts: Posts; loungeId: number }) {
	return loungeId === 0 ? (
		// 자유 게시판 게시물
		<div>
			<ul className="grid grid-cols-4 gap-10 place-items-center">
				{posts.map((post) => (
					<li
						key={post.id}
						className="w-80 p-4 bg-white rounded-md grid hover:scale-105 hover:duration-300"
					>
						<div className="flex flex-row gap-x-2 items-center pb-2">
							<div className="w-8 h-8 bg-gray-500 rounded-md" />

							<p>유저 네임</p>
						</div>

						<Link href={`/posts/${post.id}`}>
							<div className="w-full h-80 bg-gray-300" />
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
		</div>
	) : (
		// 나머지 라운지 게시물
		<div>
			<ul className="grid grid-cols-3 gap-10 place-items-center">
				{posts.map((post) => (
					<li
						key={post.id}
						className="w-72 p-4 bg-white rounded-md grid hover:scale-110 hover:duration-300"
					>
						<div className="flex flex-row gap-x-2 items-center pb-2">
							<div className="w-8 h-8 bg-gray-500 rounded-md" />

							<p>유저 네임</p>
						</div>

						<Link href={`/posts/${post.id}`}>
							<img
								src=""
								alt=""
								className="w-full h-72 bg-black"
							/>
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
		</div>
	);
}

export default PostsList;
