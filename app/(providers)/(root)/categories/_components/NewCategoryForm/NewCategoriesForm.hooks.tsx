import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

function useNewCategoryForm() {
	const queryClient = useQueryClient();

	const inputRef = useRef<HTMLInputElement>(null);
	const { mutate: createCategory, isPending: isCreateOnProcess } =
		useMutation({
			mutationFn: api.categories.createCategory,
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["categories"] }),
		});

	const handleClickAddCategory = async () => {
		if (isCreateOnProcess) return;

		const content = inputRef.current?.value;
		if (!content) return alert("내용을 입력해 주세요");

		createCategory(content);
		inputRef.current.value = "";
	};

	return {
		inputRef,
		handleClickAddCategory,
		isCreateOnProcess,
	};
}

export default useNewCategoryForm;
