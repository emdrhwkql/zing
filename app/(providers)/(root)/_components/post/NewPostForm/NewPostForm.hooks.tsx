import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface UpdatePostImg {
  imageUrl: string;
  loungeId: number;
}

function useNewPostForm() {
  const [imageFile, setImageFile] = useState<File | undefined>([]);
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();
  const queryClient = useQueryClient();

  // 이름 input 값
  const inputTitleRef = useRef<HTMLInputElement>(null);
  // 소개글 input 값
  const inputContentRef = useRef<HTMLTextAreaElement>(null);

  const params = useParams();

  // 카테고리 id 받아서 number형태로 변환
  const categoryId = +params.categoryId;
  // console.log(categoryId);

  const { mutate: updateImg } = useMutation({
    mutationFn: async ({ imageUrl, loungeId }: UpdatePostImg) =>
      api.posts.updatePostImg(currentUser!, imageUrl, loungeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutateAsync: createPost, isPending: isCreateOnProcess } = useMutation(
    {
      mutationFn: (args: { title: string; content: string }) =>
        api.posts.createPost(
          args.title,
          args.content,
          categoryId,
          currentUser!
        ),
      onSuccess: (response) => {
        const loungeId = response!.id; // 확인해볼것
        console.log(loungeId);

        // setLoungeImage({ filepath, imageFile }); // mutation 함수

        // updateImg({ imageUrl, loungeId });
      },
    }
  );

  const { mutateAsync: setPostImage } = useMutation({
    mutationFn: async ({
      filepath,
      imageFile,
    }: {
      filepath: string;
      imageFile: File;
    }) => api.posts.setPostImage(filepath, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const uploadImage = async () => {
    if (!imageFile) return;

    const extension = imageFile.name.split(".").slice(-1)[0];
    const filepath = `${nanoid()}.${extension}`;

    // storage에 이미지 업로드
    const result = await setPostImage({ filepath, imageFile });

    const baseURL =
      "https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/";

    const postImageUrl = baseURL + result?.fullPath;

    return postImageUrl;
  };

  const handleClickAddPost = async () => {
    if (isCreateOnProcess) return;

    // 라운지 이름 input 값
    const title = inputTitleRef.current!.value;

    // 라운지 이름 비교를 위한 테이블 불러오기
    const existingLounge = await api.lounges.getLoungeByName(title);
    if (!!existingLounge) {
      alert("이미 사용중인 라운지 이름입니다.");
      inputTitleRef.current!.value = "";
      inputContentRef.current!.value = "";

      return;
    }
    // 라운지 이름 미작성시 안내문
    if (!title) return alert("라운지 이름을 작성해주세요.");

    // 라운지 소개글 input 값
    const introduction = inputContentRef.current!.value;

    // 라운지 소개글 미작성시 안내문
    if (!introduction) return alert("라운지 소개글을 작성해주세요.");

    console.log("name:", title, "introduction:", introduction);

    // 라운지 생성시 넣어줄 값
    const post = await createPost({
      title: title,
      content: introduction,
    });

    const loungeImageUrl = await uploadImage();

    updateImg({ imageUrl: loungeImageUrl!, loungeId: post!.id });

    // 라운지 생성후 해당 카테고리 디테일 페이지로 이동
    router.push(`/categories/${categoryId}`);
  };

  return {
    inputTitleRef,
    inputContentRef,
    createPost,
    handleClickAddPost,
    isCreateOnProcess,
    setImageFile,
  };
}

export default useNewPostForm;
