import { PostsIdPropsType } from "@/types/posts.types";
import PostDetailForm from "../../_components/post/PostDetailForm/PostDetailForm";

async function PostDetailPage(props: PostsIdPropsType) {
	const postId = +props.params.postId;

	return <PostDetailForm postId={postId} />;
}

export default PostDetailPage;
