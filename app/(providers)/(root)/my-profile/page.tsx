"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import SideBox from "@/components/SideBox";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { useQuery } from "@tanstack/react-query";
import MyLoungesList from "../_components/lounge/MyLoungesList/MyLoungesList";

function MyProfilePage() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const openModal = useModalStore((state) => state.openModal);

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: async () => api.users.getUser(currentUser!),
  });
  const baseURL =
    "https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/";

  const baseImagePath = "user_images/base.png";

  const response = user?.profileImg === baseURL + baseImagePath;

  const handleClickOpenModal = () => {
    openModal(<UpdateProfileModal />);
  };

  return (
    <Page>
      <div className="grid grid-cols-1 place-items-center gap-y-20">
        <div className="flex flex-col gap-y-">
          {response ? (
            <img
              src="https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/user_images/base.png"
              alt=""
              className="w-80 h-80 bg-black rounded-full"
            />
          ) : (
            <img
              src={user?.profileImg}
              alt=""
              className="w-80 h-80 bg-black rounded-full"
            />
          )}
        </div>

        <div className="flex flex-row gap-x-5">
          <p>사용자 이름: {user?.userName}</p>
        </div>

        <div className="flex flex-col gap-y-5">
          <p>사용자 소개: {user?.profileDesc}</p>
        </div>
      </div>
      <button onClick={handleClickOpenModal}>
        <div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#73020b9d] hover:duration-300 active:scale-110">
          수정하기
        </div>
      </button>

      <div className="mt-10 flex flex-row gap-x-10 bg-slate-600 p-4">
        <div className="flex flex-col gap-y-4">
          <MyLoungesList />
        </div>
        <div className="flex flex-col gap-y-4">
          <SideBox />
          <SideBox />
          <SideBox />
          <SideBox />
          <SideBox />
        </div>
      </div>
    </Page>
  );
}

export default MyProfilePage;
