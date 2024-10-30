"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdatePostImg {
  imageUrl: string;
  loungeId: number;
}

function PostModImg() {
  const [imageFile, setImageFile] = useState<File | undefined>();
  const currentUser = useAuthStore((state) => state.currentUser);
  const queryClient = useQueryClient();
  const params = useParams();

  const postId = Number(params.postId);
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

  const { mutate: updateImg } = useMutation({
    mutationFn: async ({ imageUrl, loungeId }: UpdatePostImg) =>
      api.posts.updatePostImg(currentUser!, imageUrl, loungeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    if (!currentUser) return;

    (async () => {
      const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("userId", currentUser!.id);

      if (!posts) return;

      const post = posts[postId];
    })();
  }, [currentUser]);

  const handleClickUpdatePostImg = async () => {
    if (!imageFile) return;

    const extension = imageFile.name.split(".").slice(-1)[0];
    const filepath = `${nanoid()}.${extension}`;

    // storage에 이미지 업로드
    const result = await setPostImage({ filepath, imageFile });

    const baseURL =
      "https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/";

    const postImageUrl = baseURL + result?.fullPath;

    // user 테이블에
    updateImg({ imageUrl: postImageUrl, loungeId: postId! });
  };
  return (
    // 테이블에 기본 이미지 빼기
    <>
      <div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border">
        <Input
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0])}
          inputClassName="mb-4"
        />
      </div>
      <button onClick={handleClickUpdatePostImg}>이미지 수정하기</button>
    </>
  );
}

export default PostModImg;
