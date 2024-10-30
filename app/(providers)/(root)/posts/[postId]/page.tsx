import PostDetailForm from "../../_components/post/PostDetailForm/PostDetailForm";

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

async function PostDetailPage({ params }: PostDetailPageProps) {
  const postId = Number(params.postId);

  return <PostDetailForm postId={postId} />;
}

export default PostDetailPage;
