import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface UpdateLoungeImg {
	imageUrl: string;
	loungeId: number;
}

function useNewLoungeForm() {
	const [imageFile, setImageFile] = useState<File | undefined>();

	const currentUser = useAuthStore((state) => state.currentUser);

	const router = useRouter();

	const queryClient = useQueryClient();

	// 이름 input 값
	const inputNameRef = useRef<HTMLInputElement>(null);
	// 소개글 input 값
	const inputIntroductionRef = useRef<HTMLTextAreaElement>(null);

	const params = useParams();

	// 카테고리 id 받아서 number형태로 변환
	const categoryId = +params.categoryId;

	const { mutate: updateImg } = useMutation({
		mutationFn: async ({ imageUrl, loungeId }: UpdateLoungeImg) =>
			api.lounges.updateLoungeImg(currentUser!, imageUrl, loungeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	const { mutateAsync: createLounge, isPending: isCreateOnProcess } =
		useMutation({
			mutationFn: (args: { name: string; introduction: string }) =>
				api.lounges.createLounge(
					args.name,
					args.introduction,
					categoryId,
					currentUser!
				),
			// onSuccess: (response) => {
			//   const loungeId = response!.id;

			//   // setLoungeImage({ filepath, imageFile }); // mutation 함수

			//   // updateImg({ imageUrl, loungeId });
			// },
		});

	const { mutateAsync: setLoungeImage } = useMutation({
		mutationFn: async ({
			filepath,
			imageFile,
		}: {
			filepath: string;
			imageFile: File;
		}) => api.posts.setPostImage(filepath, imageFile),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	const uploadImage = async () => {
		if (!imageFile) return;

		const extension = imageFile.name?.split(".").slice(-1)[0];
		const filepath = `${nanoid()}.${extension}`;

		// storage에 이미지 업로드
		const result = await setLoungeImage({ filepath, imageFile });

		const baseURL =
			"https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/";

		const loungeImageUrl = baseURL + result?.fullPath;

		return loungeImageUrl;
	};

	const handleClickAddLounge = async () => {
		if (isCreateOnProcess) return;

		// 라운지 이름 input 값
		const name = inputNameRef.current!.value;

		// 라운지 이름 비교를 위한 테이블 불러오기
		const existingLounge = await api.lounges.getLoungeByName(name);
		if (!!existingLounge) {
			alert("이미 사용중인 라운지 이름입니다.");
			inputNameRef.current!.value = "";
			inputIntroductionRef.current!.value = "";

			return;
		}
		// 라운지 이름 미작성시 안내문
		if (!name) return alert("라운지 이름을 작성해주세요.");

		// 라운지 소개글 input 값
		const introduction = inputIntroductionRef.current!.value;

		// 라운지 소개글 미작성시 안내문
		if (!introduction) return alert("라운지 소개글을 작성해주세요.");

		// 라운지 생성시 넣어줄 값
		const lounge = await createLounge({
			name: name,
			introduction: introduction,
		});

		const loungeImageUrl = await uploadImage();

		updateImg({ imageUrl: loungeImageUrl!, loungeId: lounge!.id });

		// 라운지 생성후 해당 카테고리 디테일 페이지로 이동
		router.push(`/categories/${categoryId}`);
	};

	return {
		inputNameRef,
		inputIntroductionRef,
		createLounge,
		handleClickAddLounge,
		isCreateOnProcess,
		setImageFile,
	};
}

export default useNewLoungeForm;
