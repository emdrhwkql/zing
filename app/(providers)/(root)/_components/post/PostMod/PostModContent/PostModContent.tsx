"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import supabase from "@/supabase/client";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdateContent {
  content: string;
  loungeId: number;
}

function PostModContent() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [content, setContent] = useState("");
  const params = useParams();

  const postId = Number(params.postId);
  const { mutate: updateContent } = useMutation({
    mutationFn: async ({ content, loungeId }: UpdateContent) =>
      api.posts.updatePostContent(currentUser!, content, loungeId),
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

  const handleClickModContent = () => {
    updateContent({
      content: content,
      loungeId: postId!,
    });
  };

  return (
    <>
      <Input
        type="text"
        name="content"
        inputClassName="text-black"
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
        onClick={handleClickModContent}
      >
        <p>내용 수정하기</p>
      </button>
    </>
  );
}

export default PostModContent;
