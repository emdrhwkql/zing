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
      className="w-[650px] h-[800px] flex justify-center items-center bg-white"
    >
      <div className="w-[400px] h-[400px] bg-black text-white border-b-4">
        <div>
          <PostModImg />
        </div>
        <div>
          <PostModTitle />
        </div>
        <div>
          <PostModContent />
        </div>
        <button onClick={handleClickOut}>수정 완료</button>
      </div>
    </div>
  );
}

export default UpdatePostModal;
