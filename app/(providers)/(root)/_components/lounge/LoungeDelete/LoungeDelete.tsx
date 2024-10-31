"use client";

import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

function LoungeDelete() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const closeModal = useModalStore((state) => state.closeModal);
  const params = useParams();
  const router = useRouter();

  const loungeId = Number(params.loungeId);

  const { mutate: deleteLounge } = useMutation({
    mutationFn: async (loungeId: number) =>
      await api.lounges.deleteLounge(loungeId, currentUser!),
  });

  const handleClickDeleteLounge = () => {
    deleteLounge(loungeId);
    closeModal();
    router.push("/");
  };

  return (
    <button onClick={handleClickDeleteLounge} className="bg-black border-black">
      라운지 삭제
    </button>
  );
}

export default LoungeDelete;
