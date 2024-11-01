"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";

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

  const { data: lounge } = useQuery({
    queryKey: ["lounge"],
    queryFn: async () => api.lounges.getLounge(loungeId),
  });

  useQuery({
    queryKey: ["lounges"],
    queryFn: async () => api.lounges.getLoungesICreated(currentUser!),
  });

  const { mutateAsync: setLoungeImage } = useMutation({
    mutationFn: async ({
      filepath,
      imageFile,
    }: {
      filepath: string;
      imageFile: File;
    }) => api.lounges.setLoungeImage(filepath, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lounges"] });
    },
  });

  const { mutate: updateImg } = useMutation({
    mutationFn: async ({ imageUrl, loungeId }: UpdateLoungeImg) =>
      api.lounges.updateLoungeImg(currentUser!, imageUrl, loungeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lounges"] });
    },
  });

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
    <div className="flex flex-col gap-y-4 justify-center">
      <div className="w-60 h-60 border rounded-md">
        <img
          src={`${lounge?.imageUrl}`}
          alt="loungeImg"
          className="w-full h-full rounded-md object-cover"
        />
      </div>

      <div className="flex flex-row gap-x-4 w-full">
        <Input
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0])}
          wrapperClassName="p-1"
        />

        <button onClick={handleClickUpdateLoungeImg}>
          <FaCheckSquare className="w-full h-full text-white active:scale-90 hover:text-gray-400 hover:duration-300" />
        </button>
      </div>
    </div>
  );
}

export default LoungeModImg;
