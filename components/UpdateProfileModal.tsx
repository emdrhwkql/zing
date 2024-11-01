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
      className="w-[500px] h-[600px] flex justify-center items-center bg-black"
    >
      <div className="w-[600px] h-[700px] p-10 bg-black/80 rounded-xl flex flex-col gap-y-10 justify-center">
        <div>
          <ProfileModImage />
        </div>
        <div className="bg-black text-white">
          <ProfileModUserName />
        </div>
        <div className="bg-black text-white">
          <ProfileModDesc />
        </div>
        <button onClick={handleClickOut} className="bg-white text-black w-full rounded-md p-2 hover:duration-300 hover:bg-gray-400 active:scale-95" >수정 완료</button>
      </div>
    </div>
  );
}

export default UpdateProfileModal;
