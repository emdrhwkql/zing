import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";

function useNewPostForm() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();

  const queryClient = useQueryClient();

  // 제목 input 값
  const inputTitleRef = useRef<HTMLInputElement>(null);
  // 내용 input 값
  const inputContentRef = useRef<HTMLTextAreaElement>(null);

  const params = useParams();

  // 라운지 id 받아서 number 형태로 변환
  const loungeId = +params.loungeId;

  const { mutate: createPost, isPending: isCreateOnProcess } = useMutation({
    mutationFn: (args: { title: string; content: string }) =>
      api.posts.createPost(args.title, args.content, loungeId, currentUser!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleClickAddPost = async () => {
    if (isCreateOnProcess) return;
    // console.log(postImageUrl);

    // 게시물 제목 input 값
    const title = inputTitleRef.current!.value;
    // 게시물 제목 미장성시 안내문
    if (!title) return alert("글 제목을 작성해주세요.");

    // 게시물 내용 input 값
    const content = inputContentRef.current!.value;
    // 게시물 내용 미작성시 안내문
    if (!content) return alert("글 내용을 작성해주세요.");

    // console.log("title:", title, "content:", content);

    // 게시물 생성시 넣어줄 값
    createPost({ title: title, content: content });

    // 게시물 생성 후 라운지 디테일 페이지로 이동
    router.push(`/lounges/${loungeId}`);
  };

  return {
    inputTitleRef,
    inputContentRef,
    createPost,
    handleClickAddPost,
    isCreateOnProcess,
  };
}

export default useNewPostForm;
