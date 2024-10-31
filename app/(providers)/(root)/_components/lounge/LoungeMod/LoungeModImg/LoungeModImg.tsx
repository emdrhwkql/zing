"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdateLoungeImg {
  imageUrl: string;
  loungeId: number;
}

function LoungeModImg() {
  const [imageFile, setImageFile] = useState<File | undefined>();

  const currentUser = useAuthStore((state) => state.currentUser);
  const queryClient = useQueryClient();
  const params = useParams();

  const loungeId = Number(params.loungeId);
  const { mutateAsync: setLoungeImage } = useMutation({
    mutationFn: async ({
      filepath,
      imageFile,
    }: {
      filepath: string;
      imageFile: File;
    }) => api.lounges.setLoungeImage(filepath, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { mutate: updateImg } = useMutation({
    mutationFn: async ({ imageUrl, loungeId }: UpdateLoungeImg) =>
      api.lounges.updateLoungeImg(currentUser!, imageUrl, loungeId),
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

  const handleClickUpdateLoungeImg = async () => {
    if (!imageFile) return;

    const extension = imageFile.name.split(".").slice(-1)[0];
    const filepath = `${nanoid()}.${extension}`;

    // storage에 이미지 업로드
    const result = await setLoungeImage({ filepath, imageFile });

    const baseURL =
      "https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/";

    const loungeImageUrl = baseURL + result?.fullPath;
    // user 테이블에

    updateImg({ imageUrl: loungeImageUrl, loungeId: loungeId! });
  };
  return (
    // 테이블에 기본 이미지 빼기
    <>
      <div className="flex-none gap-y-4 mt-4 ml-4 mr-4 justify-between">
        <div className="flex ">
          <Input
            type="file"
            onChange={(e) => setImageFile(e.target.files?.[0])}
            inputClassName="text-black pl-4 "
          />
        </div>
      </div>
      <button
        onClick={handleClickUpdateLoungeImg}
        className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border mt-8"
      >
        이미지 수정하기
      </button>
    </>
  );
}

export default LoungeModImg;
