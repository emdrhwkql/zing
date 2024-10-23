import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function useLikeBtn(postId) {
	const queryClient = useQueryClient();
	console.log(postId);

	const { mutate: createLikeUser, isPending: isCreateOnProcess } =
		useMutation({
			mutationFn: () => api.likes.createLikeUser(postId),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["posts"] }),
		});

	const handleClickLikeBtn = () => {
		if (isCreateOnProcess) return;

		createLikeUser();
	};

	return {
		handleClickLikeBtn,
	};
}

export default useLikeBtn;
