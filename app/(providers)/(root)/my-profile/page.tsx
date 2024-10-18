import Profile from "../_components/Profile/Profile";
import ProfileModify from "../_components/Profile/ProfileModify";

function MyProfilePage() {
  // 내 프로필 정보,  내가 가입한 라운지들을 간략하게 몇 개만 보여주는 페이지.
  //
  return (
    <>
      <Profile />
      <ProfileModify />
    </>
  );
}

export default MyProfilePage;
