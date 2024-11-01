"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

function ProfileModDesc() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const inputDescRef = useRef<HTMLInputElement>(null);

  // 소개글 수정
  const { mutate: updateDesc } = useMutation({
    mutationFn: async (imageUrl: string) =>
      api.users.updateUserDesc(currentUser!, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const handleSubmitUpdateUserDesc = async () => {
    const desc = inputDescRef.current!.value;

    if (!desc) {
      updateDesc("소개글이 없습니다.");
    } else {
      // user 테이블에
      updateDesc(desc);
    }

    inputDescRef.current!.value = "";
  };

  return (
    <div className="Desc text-black">
      <Input
        ref={inputDescRef}
        type="text"
        name="userDesc"
        placeholder="소개글을 적어주세요."
      />
      <button onClick={handleSubmitUpdateUserDesc} className="text-white rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border">소개글 변경하기</button>
    </div>
  );
}
export default ProfileModDesc;
