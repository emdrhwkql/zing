import PostBox from "@/components/PostBox";
import { Posts } from "@/types/posts.types";
import Link from "next/link";

function FreeLoungeList({ posts }: { posts: Posts }) {
	return (
		<PostBox>
			<h1 className="mb-4 pb-4 font-bold text-2xl border-b">
				인기 라운지 목록
			</h1>

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
		</PostBox>
	);
}

export default FreeLoungeList;
