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
			className="w-[600px] h-[700px] p-10 bg-black/80 rounded-xl flex flex-col gap-y-10 justify-center"
		>
			<LoungeModImg />

			<LoungeModName />

			<LoungeModIntroduction />

			<div className="flex flex-row justify-between gap-x-4">
				<LoungeDelete />
				<button
					onClick={handleClickOut}
					className="bg-white w-full rounded-md p-2 hover:duration-300 hover:bg-gray-400 active:scale-95"
				>
					수정 완료
				</button>
			</div>
		</div>
	);
}

export default UpdateLoungeModal;
