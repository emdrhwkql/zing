"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useState } from "react";

function ProfileModImage() {
	const [imageFile, setImageFile] = useState<File | undefined>();
	const currentUser = useAuthStore((state) => state.currentUser);
	const queryClient = useQueryClient();

	// storage에 user_image 값 변경
	useQuery({
		queryKey: ["user"],
		queryFn: async () => api.users.getUser(currentUser!),
	});
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
			"https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/user_images/base.png";

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

	return (
		<main>
			<div className="text-white">
				<Input
					type="file"
					wrapperClassName=""
					inputClassName=""
					placeholder="당신의 프로필 이미지를 넣어주세요!"
					onChange={(e) => setImageFile(e.target.files?.[0])}
				/>

				<div className="Img">
					<button
						onClick={handleSubmitUpdateUserImg}
						className="bg-black"
					>
						프로필 이미지 변경하기
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

export default ProfileModImage;
