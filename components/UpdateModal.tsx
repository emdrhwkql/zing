"use client";

import LoungeDelete from "@/app/(providers)/(root)/_components/lounge/LoungeDelete/LoungeDelete";
import LoungeModImg from "@/app/(providers)/(root)/_components/lounge/LoungeMod/LoungeModImg/LoungeModImg";
import LoungeModIntroduction from "@/app/(providers)/(root)/_components/lounge/LoungeMod/LoungeModIntroduction/LoungeModIntroduction";
import LoungeModName from "@/app/(providers)/(root)/_components/lounge/LoungeMod/LoungeModName/LoungeModName";
import { useModalStore } from "@/zustand/modal.store";

// 모달창을 열면 보여지는 화면
// 오픈 모달안에 들어가는 엘리먼트는 업데이트 모달이 들어가야 됨

function UpdateLoungeModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleClickOut = () => {
    closeModal();
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[650px] h-[800px] flex justify-center items-center bg-white"
    >
      <div className="w-[400px] h-[400px] bg-black text-white border-b-4">
        <div className="">
          <LoungeModImg />
        </div>
        <div className="">
          <LoungeModName />
        </div>
        <div className="">
          <LoungeModIntroduction />
        </div>
        <div>
          <LoungeDelete />
        </div>
        <button onClick={handleClickOut}>수정 완료</button>
      </div>
    </div>
  );
}

export default UpdateLoungeModal;
