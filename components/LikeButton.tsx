"use client";

import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
	postId: number;
}

function LikeButton({ postId }: LikeButtonProps) {
	const queryClient = useQueryClient();

	const { data: { likes, count } = {} } = useQuery({
		queryKey: ["likes", { postId }],
		queryFn: () => api.likes.getLikesByPostId(postId),
	});

	const { mutate: addLikeUser } = useMutation({
		mutationFn: api.likes.addLikeUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likes"] }),
	});

	const { mutate: deleteLikeUser } = useMutation({
		mutationFn: api.likes.deleteLikeUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likes"] }),
	});

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const currentUser = useAuthStore((state) => state.currentUser);

	const isLike = currentUser
		? !!likes?.find((like) => like.userId === currentUser.id)
		: false;

	const handleClickLikeBtn = async () => {
		if (!isLoggedIn) return;

		if (isLike) {
			deleteLikeUser(postId);
		} else {
			addLikeUser(postId);
		}
	};

	return (
		<button
			onClick={handleClickLikeBtn}
			className="items-center group relative active:scale-90 active:duration-100"
		>
			<div>
				{isLike ? (
					<AiFillHeart color="red" />
				) : (
					<FaRegHeart color="red" />
				)}
			</div>

			<div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:delay-150 group-hover:ease-in-out group-hover:duration-300">
				<div className="w-5 h-6 border rounded-md text-base text-center leading-tight">
					<p className="pointer-events-none">{count}</p>
				</div>
			</div>
		</button>
	);
}

export default LikeButton;
