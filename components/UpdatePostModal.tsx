import PostDeleteButton from "@/app/(providers)/(root)/_components/post/PostDelete/PostDelete";
import PostModContent from "@/app/(providers)/(root)/_components/post/PostMod/PostModContent/PostModContent";
import PostModImg from "@/app/(providers)/(root)/_components/post/PostMod/PostModImg/PostModImg";
import PostModTitle from "@/app/(providers)/(root)/_components/post/PostMod/PostModTitle/PostModTitle";
import { useModalStore } from "@/zustand/modal.store";

function UpdatePostModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleClickOut = () => {
    closeModal();
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[500px] h-[600px] flex justify-center items-center bg-black"
    >
      <div className="w-[600px] h-[700px] p-10 bg-black/80 rounded-xl flex flex-col gap-y-10 justify-center">
        <div>
          <PostModImg />
        </div>
        <div>
          <PostModTitle />
        </div>
        <div>
          <PostModContent />
        </div>
        <button onClick={handleClickOut} className="bg-white w-full rounded-md p-2 hover:duration-300 hover:bg-gray-400 active:scale-95">수정 완료</button>
        <PostDeleteButton />
      </div>
    </div>
  );
}

export default UpdatePostModal;
