import ProfileModDesc from "@/app/(providers)/(root)/_components/Profile/ProfileModDesc/ProfileModDesc";
import ProfileModImage from "@/app/(providers)/(root)/_components/Profile/ProfileModImage/ProfileModImage";
import ProfileModUserName from "@/app/(providers)/(root)/_components/Profile/ProfileModUserName/ProfileModUserName";
import { useModalStore } from "@/zustand/modal.store";

function UpdateProfileModal() {
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
          <ProfileModImage />
        </div>
        <div>
          <ProfileModUserName />
        </div>
        <div>
          <ProfileModDesc />
        </div>
        <button onClick={handleClickOut}>수정 완료</button>
      </div>
    </div>
  );
}

export default UpdateProfileModal;
