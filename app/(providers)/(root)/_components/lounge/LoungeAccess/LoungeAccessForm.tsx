"use client";

import supabase from "@/supabase/client";
import { FaCheck } from "react-icons/fa";

function LoungeAccessForm({ loungeId }: { loungeId: number }) {
  // console.log(loungeId);
  const handleClickAccess = async () => {
    await supabase.from("user_lounges").insert({ loungeId: Number(loungeId) });
  };
  return (
    <button
      className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
      onClick={handleClickAccess}
    >
      <FaCheck />
      <p>가입하기</p>
    </button>
  );
}

export default LoungeAccessForm;
