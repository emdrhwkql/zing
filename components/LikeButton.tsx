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

	const { data: likes } = useQuery({
		queryKey: ["likes", { postId }],
		queryFn: () => api.likes.getLikes(postId),
	});

	const { mutate: addLikeUser } = useMutation({
		mutationFn: api.likes.addLikeUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likes"] }),
	});

	// const { mutate: createLikeUser, isPending: isCreateOnProcess } =
	// 	useMutation({
	// 		mutationFn: () => api.likes.addLikeUser(postId),
	// 		onSuccess: () =>
	// 			queryClient.invalidateQueries({ queryKey: ["posts"] }),
	// 	});

	const { mutate: deleteLikeUser } = useMutation({
		mutationFn: api.likes.deleteLikeUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likes"] }),
	});

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const currentUser = useAuthStore((state) => state.currentUser);

	// const [isLike, setIsLike] = useState(false);

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

		// setIsLike(!isLike);
	};

	return (
		<button onClick={handleClickLikeBtn}>
			{isLike ? <AiFillHeart color="red" /> : <FaRegHeart color="red" />}
		</button>
	);
}

export default LikeButton;
