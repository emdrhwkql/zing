"use client";

import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CgAlbum } from "react-icons/cg";

interface FollowCategoryBtnProps {
	categoryId: number;
}

function FollowCategoryBtn({ categoryId }: FollowCategoryBtnProps) {
	const queryClient = useQueryClient();

	const { data: { follows } = {} } = useQuery({
		queryKey: ["follow_categories", { categoryId }],
		queryFn: () =>
			api.followCategories.getFollowCategoriesByCategoryId(categoryId),
	});

	const { mutate: addFollowCategoryUser } = useMutation({
		mutationFn: api.followCategories.addFollowCategoryUser,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["follow_categories"] }),
	});

	const { mutate: deleteFollowCategoryUser } = useMutation({
		mutationFn: api.followCategories.deleteFollowCategoryUser,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["follow_categories"] }),
	});

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const currentUser = useAuthStore((state) => state.currentUser);

	const isFollow = currentUser
		? !!follows?.find((follow) => follow.userId === currentUser.id)
		: false;

	const handleClickFollowBtn = async () => {
		if (!isLoggedIn) return;

		if (isFollow) {
			deleteFollowCategoryUser(categoryId);
		} else {
			addFollowCategoryUser(categoryId);
		}
	};

	return isFollow ? (
		<button
			onClick={handleClickFollowBtn}
			className="rounded-full h-10 py-2 px-4 border active:scale-90 active:duration-100 bg-black/40"
		>
			{isFollow ? (
				<div className="w-32 flex flex-row gap-x-2 justify-center items-center text-center">
					<CgAlbum className="text-lg" />
					<p>관심 취소하기</p>
				</div>
			) : (
				<div className="w-32 flex flex-row gap-x-2 justify-center items-center">
					<CgAlbum className="text-lg" />
					<p>관심 추가하기</p>
				</div>
			)}
		</button>
	) : (
		<button
			onClick={handleClickFollowBtn}
			className="relative rounded-full h-10 py-2 px-4 border active:scale-90 active:duration-100"
		>
			{isFollow ? (
				<div className="w-32 flex flex-row gap-x-2 justify-center items-center text-center">
					<CgAlbum className="text-lg" />
					<p>관심 취소하기</p>
				</div>
			) : (
				<div className="w-32 flex flex-row gap-x-2 justify-center items-center">
					<CgAlbum className="text-lg" />
					<p>관심 추가하기</p>
				</div>
			)}
		</button>
	);
}

export default FollowCategoryBtn;
