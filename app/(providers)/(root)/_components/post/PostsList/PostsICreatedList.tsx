"use client";

import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

function PostsICreatedList() {
	const currentUser = useAuthStore((state) => state.currentUser);

	const { data: posts } = useQuery({
		queryKey: ["i_created_posts"],
		queryFn: async () => api.posts.getPostsICreated(currentUser!),
	});

	if (!posts) return;

	return (
		<div className="py-6 px-8 w-full bg-white rounded-md">
			<h1 className="mb-4 pb-4 border-b font-bold text-xl">
				내가 만든 게시물
			</h1>

			<ul className="grid grid-cols-4 gap-y-10 place-items-center">
				{posts
					.map((post) => (
						<li
							key={post.id}
							className="w-48 hover:scale-105 hover:duration-200"
						></li>
					))
					.slice(0, 8)}
			</ul>
		</div>
	);
}

export default PostsICreatedList;
