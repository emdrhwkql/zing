"use client";

import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

interface FollowLoungeBtnProps {
	loungeId: number;
}

function FollowLoungeBtn({ loungeId }: FollowLoungeBtnProps) {
	const queryClient = useQueryClient();

	// count 사용 안해서 일단 지움
	//const { data: { follows, count } = {} } = useQuery({
	const { data: { follows } = {} } = useQuery({
		queryKey: ["follow_lounges", { loungeId }],
		queryFn: () => api.followLounges.getFollowLoungesByLoungesId(loungeId),
	});

	const { mutate: addFollowLoungeUser } = useMutation({
		mutationFn: api.followLounges.addFollowLoungeUser,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["follow_lounges"] }),
	});

	const { mutate: deleteFollowLoungeUser } = useMutation({
		mutationFn: api.followLounges.deleteFollowLoungeUser,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["follow_lounges"] }),
	});

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const currentUser = useAuthStore((state) => state.currentUser);

	const isFollow = currentUser
		? !!follows?.find((follow) => follow.userId === currentUser.id)
		: false;

	const handleClickFollowBtn = () => {
		if (!isLoggedIn) return;

		if (isFollow) {
			deleteFollowLoungeUser(loungeId);
		} else {
			addFollowLoungeUser(loungeId);
		}
	};

	return (
		<button
			onClick={handleClickFollowBtn}
			className="border rounded-full w-full h-10 py-2 px-4"
		>
			<div>
				{isFollow ? (
					<div className="flex flex-row gap-x-w justify-center items-center">
						<GrClose />
						<p>관심</p>
					</div>
				) : (
					<div className="flex flex-row gap-x-w justify-center items-center">
						<FaCheck />
						<p>관심</p>
					</div>
				)}
			</div>
		</button>
	);
}

export default FollowLoungeBtn;
