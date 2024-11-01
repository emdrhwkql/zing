"use client";

import api from "@/api/api";
import Input from "@/components/Input";
import supabase from "@/supabase/client";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";

interface UpdateIntroduction {
	introduction: string;
	loungeId: number;
}

function LoungeModIntroduction() {
	const currentUser = useAuthStore((state) => state.currentUser);
	const [introduction, setIntroduction] = useState("");
	const params = useParams();

	const loungeId = Number(params.loungeId);
	const { mutate: updateIntroduction } = useMutation({
		mutationFn: async ({ introduction, loungeId }: UpdateIntroduction) =>
			api.lounges.updateLoungeIntroduction(
				currentUser!,
				introduction,
				loungeId
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	useEffect(() => {
		if (!currentUser) return;

		(async () => {
			const { data: lounges } = await supabase
				.from("lounges")
				.select("*")
				.eq("userId", currentUser!.id);

			if (!lounges) return;

			// const lounge = lounges[loungeId];
		})();
	}, [currentUser]);

	const handleClickModIntroduction = () => {
		updateIntroduction({
			introduction: introduction,
			loungeId: loungeId!,
		});
	};

	return (
		<div className="flex flex-row gap-x-4 w-full items-center">
			<div className="w-full">
				<Input
					type="text"
					name="introduction"
					onChange={(e) => setIntroduction(e.target.value)}
					wrapperClassName="p-2"
					placeholder="변경할 내용을 입력해주세요."
				/>
			</div>

			<button onClick={handleClickModIntroduction} className="h-full">
				<FaCheckSquare className="w-full h-full text-white active:scale-90 hover:text-gray-400 hover:duration-300" />
			</button>
		</div>
	);
}

export default LoungeModIntroduction;
