"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

function ProfileModUserName() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const inputNameRef = useRef<HTMLInputElement>(null);

  const { mutate: updateUserName } = useMutation({
    mutationFn: async (userName: string) =>
      api.users.updateUserName(currentUser!, userName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSubmitUpdateUserName = async () => {
    const name = inputNameRef.current!.value;

    if (!name) return;

    // user 테이블에
    updateUserName(name);

    inputNameRef.current!.value = "";
  };

  return (
    <div className="Name">
      <Input
        ref={inputNameRef}
        type="text"
        name="userName"
        placeholder="이름을 입력해주세요."
      />

      <button onClick={handleSubmitUpdateUserName}>이름 변경하기</button>
    </div>
  );
}

export default ProfileModUserName;
