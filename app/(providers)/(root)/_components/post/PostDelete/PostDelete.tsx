"use client";
import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
function PostDeleteButton() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const closeModal = useModalStore((state) => state.closeModal);
  const params = useParams();
  const router = useRouter();

  const postId = Number(params.postId);

  const { mutate: deletePost } = useMutation({
    mutationFn: async (postId: number) =>
      await api.posts.deletePost(postId, currentUser!),
  });

  const handleClickDeletePost = () => {
    deletePost(postId);
    closeModal();
    router.push("/");
  };
  return (
    <button onClick={handleClickDeletePost} className="bg-white border-black">
      게시글 삭제
    </button>
  );
}
export default PostDeleteButton;
