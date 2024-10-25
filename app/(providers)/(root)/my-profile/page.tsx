"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Profile from "../_components/Profile/Profile";
import ProfileModDesc from "../_components/Profile/ProfileModDesc/ProfileModDesc";
import ProfileModImage from "../_components/Profile/ProfileModImage/ProfileModImage";
import ProfileModUserName from "../_components/Profile/ProfileModUserName/ProfileModUserName";

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
  // 내 프로필 정보,  내가 가입한 라운지들을 간략하게 몇 개만 보여주는 페이지.
  //

  // getUser

  // baseurl =

  // 	return (
  // 		<Page>
  // 			<div className="grid grid-cols-1">
  // 				<div>
  // user.img === baseurl ? (

  //           <img src="base" alt="" />
  // ) ? (img src=`${super.img}`)

  //           userImgModal
  //         </div>
  // 				<div>
  //           user.name

  //         </div>
  // 				<div>소개글</div>
  // 			</div>

  // <div>
  //   <LoungesList />
  // </div>
  return (
    <Page>
      <Profile />
      <ProfileModUserName />
      <ProfileModDesc />
      <div>
        {response ? (
          <img
            src="https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/user_images/base.png"
            alt=""
          />
        ) : (
          <img
            src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/${user?.profileImg}`}
            alt=""
          />
        )}
      </div>
      <ProfileModImage />
    </Page>
  );
}

export default MyProfilePage;
