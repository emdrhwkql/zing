import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";

function useNewLoungeForm() {
	const router = useRouter();

	const queryClient = useQueryClient();

	// 이름 input 값
	const inputNameRef = useRef<HTMLInputElement>(null);
	// 소개글 input 값
	const inputIntroductionRef = useRef<HTMLTextAreaElement>(null);

	const params = useParams();

	// 카테고리 id 받아서 number형태로 변환
	const categoryId = +params.categoryId;
	// console.log(categoryId);

	const { mutate: createLounge, isPending: isCreateOnProcess } = useMutation({
		mutationFn: (args: { name: string; introduction: string }) =>
			api.lounges.createLounge(args.name, args.introduction, categoryId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["lounges"] }),
	});

	const handleClickAddLounge = async () => {
		if (isCreateOnProcess) return;

		// 라운지 이름 input 값
		const name = inputNameRef.current!.value;

		// 라운지 이름 비교를 위한 테이블 불러오기
		const lounges = await api.lounges.getAllLounges();

		// 입력한 이름이 라운지 테이블에 있으면 값을 찾아주고 없으면 undefined 출력
		const loungeNames = lounges.find((lounge) => name === lounge.name);

		//  라운지 이름 중복 비허용 : undefined라면 테이블에 중복값이 없다는 뜻
		if (loungeNames !== undefined)
			return (
				alert("이미 사용중인 라운지 이름입니다."),
				(inputNameRef.current!.value = ""),
				(inputIntroductionRef.current!.value = "")
			);

		// 라운지 이름 미작성시 안내문
		if (!name) return alert("라운지 이름을 작성해주세요.");

		// 라운지 소개글 input 값
		const introduction = inputIntroductionRef.current!.value;

		// 라운지 소개글 미작성시 안내문
		if (!introduction) return alert("라운지 소개글을 작성해주세요.");

		console.log("name:", name, "introduction:", introduction);

		// 라운지 생성시 넣어줄 값
		createLounge({ name: name, introduction: introduction });

		// 라운지 생성후 해당 카테고리 디테일 페이지로 이동
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
