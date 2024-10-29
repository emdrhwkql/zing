"use client";

import api from "@/api/api";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

function LoungeAccessForm({ loungeId }: { loungeId: number }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  console.log("loungeId", loungeId);

  // 가입하기를 누르면 user_lounges테이블을 확인해서 뭐 뭐 끼리 비교해서 그
  const { data: checkMyLounges } = useQuery({
    queryKey: ["user_lounges"],
    queryFn: async () =>
      api.lounges.checkIfUserJoinedToLounge(loungeId, currentUser!),
  });

  const { mutate: insertMyLounges } = useMutation({
    mutationFn: async () => await api.followLounges.insertUserLounges(loungeId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user_lounges"] }),
  });

  const { mutate: deleteMyLounges } = useMutation({
    mutationFn: async () => await api.followLounges.deleteUserLounges(loungeId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user_lounges"] }),
  });

  const handleClickAccess = async () => {
    insertMyLounges();
  };
  const handleClickAccessCancle = async () => {
    deleteMyLounges();
  };

  return (
    <div>
      {checkMyLounges ? (
        <button
          onClick={handleClickAccessCancle}
          className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#73020b9d] hover:duration-300 active:scale-110"
        >
          <GrClose />
          <p>가입 취소하기</p>
        </button>
      ) : (
        <button onClick={handleClickAccess}>
          <div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#73020b9d] hover:duration-300 active:scale-110">
            <FaCheck />
            <p>가입하기</p>
          </div>
        </button>
      )}
    </div>
  );
}

export default LoungeAccessForm;
