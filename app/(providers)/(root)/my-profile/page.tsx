"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import { useQuery } from "@tanstack/react-query";
import MyCategoriesList from "../_components/category/MyCategoriesList/MyCategoriesList";
import LoungesICreatedList from "../_components/lounge/LoungesList/LoungesICreatedList";
import MyLoungesList from "../_components/lounge/LoungesList/MyLoungesList";
import PostsICreatedList from "../_components/post/PostsList/PostsICreatedList";

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
			<div className="mx-40">
				<div className="p-7 rounded-md grid grid-cols-1 place-items-center gap-y-5">
					{/* 프로필 이미지 */}
					<div className="flex flex-col gap-y-">
						{response ? (
							<img
								src="https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/user_images/base.png"
								alt=""
								className="w-80 h-80 rounded-full"
							/>
						) : (
							<img
								src={user?.profileImg}
								alt=""
								className="w-80 h-80 rounded-full"
							/>
						)}
					</div>

					{/* 사용자 이름 */}
					<div>
						<h2 className="text-2xl font-bold">{user?.userName}</h2>
					</div>

					{/* 소개글 */}
					<div>
						{user?.profileDesc ? (
							<h3>{user?.profileDesc}</h3>
						) : (
							<h3 className="text-lg">소개글이 없습니다.</h3>
						)}
					</div>

					{/* 수정 버튼 */}
					<button onClick={handleClickOpenModal}>
						<div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#73020b9d] hover:duration-300 active:scale-110">
							수정하기
						</div>
					</button>
				</div>

				<div className="mt-5 flex flex-row justify-between">
					<div className="w-full flex flex-col items-center gap-y-10 p-4">
						<PostsICreatedList />
					</div>

					<div className="h-full flex flex-col items-center gap-y-6 p-3 rounded-md">
						<MyLoungesList isProfile={true} />

						<MyCategoriesList isProfile={true} />

						<LoungesICreatedList />
					</div>
				</div>
			</div>
		</Page>
	);
}

export default MyProfilePage;
