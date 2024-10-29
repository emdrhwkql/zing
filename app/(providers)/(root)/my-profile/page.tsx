"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import SideBox from "@/components/SideBox";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import ProfileModDesc from "../_components/Profile/ProfileModDesc/ProfileModDesc";
import ProfileModImage from "../_components/Profile/ProfileModImage/ProfileModImage";
import ProfileModUserName from "../_components/Profile/ProfileModUserName/ProfileModUserName";
import MyLoungesList from "../_components/lounge/MyLoungesList/MyLoungesList";

function MyProfilePage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: async () => api.users.getUser(currentUser!),
  });
  const baseURL =
    "https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/";

  const baseImagePath = "user_images/base.png";

  const response = user?.profileImg === baseURL + baseImagePath;

  console.log("user", user);
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
          <ProfileModImage />
        </div>

        <div className="flex flex-row gap-x-5">
          <p>{user?.userName}</p>
          <ProfileModUserName />
        </div>

        <div className="flex flex-col gap-y-5">
          <p>{user?.profileDesc}</p>
          <ProfileModDesc />
        </div>
      </div>

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
