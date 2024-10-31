"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import supabase from "@/supabase/client";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdateName {
  name: string;
  loungeId: number;
}

function LoungeModName() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const [name, setName] = useState("");
  const params = useParams();

  const loungeId = Number(params.loungeId);
  const { mutate: updateName } = useMutation({
    mutationFn: async ({ name, loungeId }: UpdateName) =>
      api.lounges.updateLoungeName(currentUser!, name, loungeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    if (!currentUser) return;

    (async () => {
      const { data: lounges } = await supabase
        .from("lounges")
        .select("*")
        .eq("userId", currentUser!.id);

      if (!lounges) return;

      const lounge = lounges[loungeId];
    })();
  }, [currentUser]);

  const handleClickModName = () => {
    updateName({
      name: name,
      loungeId: loungeId!,
    });
  };

  return (
    <>
      <Input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        inputClassName="text-black"
      />

      <button
        className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
        onClick={handleClickModName}
      >
        <p>이름 수정하기</p>
      </button>
    </>
  );
}

export default LoungeModName;
