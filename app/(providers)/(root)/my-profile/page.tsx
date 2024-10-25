import Page from "@/components/Page";
import Profile from "../_components/Profile/Profile";
import ProfileModify from "../_components/Profile/ProfileModify/ProfileModify";

function MyProfilePage() {
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
			<ProfileModify />
		</Page>
	);
}

export default MyProfilePage;
