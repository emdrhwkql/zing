import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";

function useNewLoungeForm() {
	const router = useRouter();

	const queryClient = useQueryClient();

	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputIntroductionRef = useRef<HTMLInputElement>(null);

	const params = useParams();
	const categoryId = +params.categoryId;
	// console.log(categoryId);

	const { mutate: createLounge, isPending: isCreateOnProcess } = useMutation({
		mutationFn: (args: { name: string; introduction: string }) =>
			api.lounges.createLounge(args.name, categoryId, args.introduction),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["lounges"] }),
	});

	const handleClickAddLounge = async () => {
		if (isCreateOnProcess) return;

		const name = inputNameRef.current!.value;
		console.log(name);

		if (!name) return alert("이름 넣어");

		const introduction = inputIntroductionRef.current!.value;
		console.log(introduction);

		if (!introduction) return alert("소개글 넣어");

		createLounge({ name, introduction });
		inputNameRef.current!.value = "";
		inputIntroductionRef.current!.value = "";

		router.push(`/categories/${categoryId}`);
	};

	return {
		inputNameRef,
		inputIntroductionRef,
		createLounge,
		handleClickAddLounge,
		isCreateOnProcess,
	};
}

export default useNewLoungeForm;
