import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef } from "react";

function useNewLoungeForm() {
	const queryClient = useQueryClient();

	const inputRef = useRef<HTMLInputElement>(null);

	const params = useParams();

	const categoryId = +params.categoryId;
	// console.log(categoryId);

	const { mutate: createLounge, isPending: isCreateOnProcess } = useMutation({
		mutationFn: (content: string) =>
			api.lounges.createLounge(content, categoryId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["lounges"] }),
	});

	const handleClickAddCategory = async () => {
		if (isCreateOnProcess) return;

		const content = inputRef.current!.value;

		if (!content) return alert("내용을 넣어");

		createLounge(content);
		inputRef.current!.value = "";
	};

	return {
		inputRef,
		handleClickAddCategory,
		isCreateOnProcess,
	};
}

export default useNewLoungeForm;
