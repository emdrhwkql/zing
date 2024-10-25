"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";

function ProfileModify() {
	const [imageFile, setImageFile] = useState<File | undefined>();
	const currentUser = useAuthStore((state) => state.currentUser);
	const queryClient = useQueryClient();

	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputDescRef = useRef<HTMLInputElement>(null);

	// storage에 user_image 값 변경
	const { mutateAsync: setProfileImage } = useMutation({
		mutationFn: async ({
			filepath,
			imageFile,
		}: {
			filepath: string;
			imageFile: File;
		}) => api.users.setProfileImage(filepath, imageFile),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	const { mutate: updateImg } = useMutation({
		mutationFn: async (imageUrl: string) =>
			api.users.updateUserImg(currentUser!, imageUrl),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	// 기본 이미지로 변경
	const handleClickBaseImage = () => {
		const baseImageURL =
			"https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/profile_image/base.png";

		updateImg(baseImageURL);
	};

	// 수정한 이미지로 변경
	const handleSubmitUpdateUserImg = async () => {
		if (!imageFile) return;

		const extension = imageFile.name.split(".").slice(-1)[0];
		const filepath = `${nanoid()}.${extension}`;

		// storage에 이미지 업로드
		const result = await setProfileImage({ filepath, imageFile });

		const baseURL =
			"https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/";

		const profileImageUrl = baseURL + result?.fullPath;

		// user 테이블에
		updateImg(profileImageUrl);
	};

	// 닉네임 수정
	const handleSubmitUpdateUserName = async () => {
		const name = inputNameRef.current?.value;

		if (!name) return;

		// user 테이블에
		updateImg(name);
	};

	// 소개글 수정
	const handleSubmitUpdateUserDesc = async () => {
		const desc = inputDescRef.current?.value;

		if (!desc) return;

		// user 테이블에
		updateImg(desc);
	};

	return (
		<main>
			<div className="p-5"></div>
			<div className="text-white">
				<div className="Desc">
					<Input
						ref={inputDescRef}
						type="text"
						name="userDesc"
						placeholder="소개글을 적어주세요."
					/>

					<button onSubmit={handleSubmitUpdateUserDesc}>
						소개글 수정
					</button>
				</div>

				<div className="Name">
					<Input
						ref={inputNameRef}
						type="text"
						name="userName"
						placeholder="이름을 입력해주세요."
					/>

					<button onSubmit={handleSubmitUpdateUserName}>
						이름 변경
					</button>
				</div>

				<input
					type="file"
					className="border-black border-2 text-black"
					placeholder="당신의 프로필 이미지를 넣어주세요!"
					onChange={(e) => setImageFile(e.target.files?.[0])}
				/>

				<div className="Img">
					<button
						onClick={handleSubmitUpdateUserImg}
						className="bg-black"
					>
						수정하기
					</button>

					<button
						onClick={handleClickBaseImage}
						className="bg-black ml-8"
					>
						기본 이미지로 설정하기
					</button>
				</div>
			</div>
		</main>
	);
}

export default ProfileModify;
