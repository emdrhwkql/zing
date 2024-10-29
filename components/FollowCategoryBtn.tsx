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

	const { data: { follow, count } = {} } = useQuery({
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
		? !!follow?.find((follow) => follow.userId === currentUser.id)
		: false;

	const handleClickFollowBtn = async () => {
		if (!isLoggedIn) return;

		if (isFollow) {
			deleteFollowCategoryUser(categoryId);
		} else {
			addFollowCategoryUser(categoryId);
		}
	};

	return (
		<button
			onClick={handleClickFollowBtn}
			className="rounded-full w-full h-10 py-2 px-4  border"
		>
			<div>
				{isFollow ? (
					<div className="flex flex-row gap-x-2 justify-center items-center">
						<CgAlbum className="text-lg" />
						<p>관심</p>
					</div>
				) : (
					<div className="flex flex-row gap-x-2 justify-center items-center">
						<CgAlbum className="text-lg" />
						<p>관심</p>
					</div>
				)}
			</div>
			{count}
		</button>
	);
}

export default FollowCategoryBtn;
