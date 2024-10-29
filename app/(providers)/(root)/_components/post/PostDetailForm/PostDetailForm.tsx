import commetAPI from "@/api/commet.api";
import LikeButton from "@/components/LikeButton";
import MainBox from "@/components/MainBox";
import Page from "@/components/Page";
import { FaShareAlt } from "react-icons/fa";
import CommentSection from "../CommentSection/CommentSection";

async function PostDetailForm({ postId }: { postId: number }) {
	const post = await commetAPI.posts.getPost(postId);
	const comments = await commetAPI.posts.getComments(postId);

	if (!post) {
		return <div>게시물을 찾을 수 없습니다.</div>;
	}

	// 여기에서 사용자 ID를 가져옵니다.
	const userId = post.userId; // 예: 포스트의 사용자 ID를 사용하는 경우

	return (
		<Page>
			<MainBox>
				<div className="grid grid-cols-1 gap-y-2 items-center pb-2">
					<div className="w-4 h-4 bg-gray-500 rounded-md" />
					<p>{post.userId}</p>

					<div className="w-48 h-48 bg-gray-300" />
					<h1 className="font-semibold text-lg">{post.title}</h1>

					<p>{post.content}</p>

					<div className="flex flex-row items-center mt-2 pt-2 border-t">
						<span className="leading-3">{post.createdAt.slice(0, 10)}</span>

						<div className="ml-auto flex flex-row gap-x-3">
							<LikeButton postId={postId} />
							<FaShareAlt />
						</div>
					</div>
				</div>
				<CommentSection postId={postId} initialComments={comments} userId={userId} /> {/* 댓글에 사용자 ID 추가 */}
			</MainBox>
		</Page>
	);
}

export default PostDetailForm;
