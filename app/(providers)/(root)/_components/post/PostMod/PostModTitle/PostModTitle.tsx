"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import supabase from "@/supabase/client";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdateTitle {
  title: string;
  loungeId: number;
}

function PostModTitle() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [title, setTitle] = useState("");
  const params = useParams();

  const postId = Number(params.postId);
  const { mutate: updateTitle } = useMutation({
    mutationFn: async ({ title, loungeId }: UpdateTitle) =>
      api.posts.updatePostTitle(currentUser!, title, loungeId),
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
      console.log("posts", posts);

      if (!posts) return;

      const post = posts[postId];
    })();
  }, [currentUser]);

  const handleClickModTitle = () => {
    updateTitle({
      title: title,
      loungeId: postId!,
    });
  };

  return (
    <>
      <Input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        inputClassName="text-black"
      />

      <button
        className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
        onClick={handleClickModTitle}
      >
        <p>제목 수정하기</p>
      </button>
    </>
  );
}

export default PostModTitle;
