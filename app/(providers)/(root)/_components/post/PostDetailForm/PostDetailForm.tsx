import api from "@/api/api";
import LikeButton from "@/components/LikeButton";
import MainBox from "@/components/MainBox";
import Page from "@/components/Page";
import { FaShareAlt } from "react-icons/fa";

async function PostDetailForm({ postId }: { postId: number }) {
	const post = await api.posts.getPost(postId);

	return (
		<Page>
			<MainBox>
				<div className="grid grid-cols-1 gap-y-2 items-center pb-2">
					<div className="w-4 h-4 bg-gray-500 rounded-md" />
					<p>{post?.userId}</p>

					<div className="w-48 h-48 bg-gray-300" />
					<h1 className="font-semibold text-lg">{post?.title}</h1>

					<p>{post?.content}</p>

					<div className="flex flex-row items-center mt-2 pt-2 border-t">
						<span className="leading-3">
							{post?.createdAt.slice(0, 10)}
						</span>

						<div className="ml-auto flex flex-row gap-x-3">
							<LikeButton postId={postId!} />
							<FaShareAlt />
						</div>
					</div>
				</div>
			</MainBox>
		</Page>
	);
}

export default PostDetailForm;
