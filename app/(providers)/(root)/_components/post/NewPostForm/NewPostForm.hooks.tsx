import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef } from "react";

function useNewPostForm() {
	const queryClient = useQueryClient();

	const inputTitleRef = useRef<HTMLInputElement>(null);
	const inputContentRef = useRef<HTMLInputElement>(null);

	const params = useParams();
	const loungeId = +params.loungeId;
	// console.log(loungeId);

	const { mutate: createPost, isPending: isCreateOnProcess } = useMutation({
		mutationFn: (args: { title: string; content: string }) =>
			api.posts.createPost(args.title, args.content, loungeId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["lounges"] }),
	});

	const handleClickAddPost = async () => {
		if (isCreateOnProcess) return;

		const title = inputTitleRef.current!.value;
		console.log(title);

		if (!title) return alert("이름 넣어");

		const content = inputContentRef.current!.value;
		console.log(content);

		if (!content) return alert("소개글 넣어");

		createPost({ title, content });
		inputTitleRef.current!.value = "";
		inputContentRef.current!.value = "";
	};

	return {
		inputTitleRef,
		inputContentRef,
		createPost,
		handleClickAddPost,
		isCreateOnProcess,
	};
}

export default useNewPostForm;
