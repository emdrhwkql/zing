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

interface UpdateName {
	name: string;
	loungeId: number;
}

function LoungeModName() {
	const currentUser = useAuthStore((state) => state.currentUser);

	const [name, setName] = useState("");
	const params = useParams();

	const loungeId = Number(params.loungeId);
	const { mutate: updateName } = useMutation({
		mutationFn: async ({ name, loungeId }: UpdateName) =>
			api.lounges.updateLoungeName(currentUser!, name, loungeId),
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

	const handleClickModName = () => {
		updateName({
			name: name,
			loungeId: loungeId!,
		});
	};

	return (
		<div className="flex flex-row gap-x-4 w-full items-center">
			<div className="w-full">
				<Input
					type="text"
					name="name"
					onChange={(e) => setName(e.target.value)}
					wrapperClassName="p-2"
					placeholder="변경할 제목을 입력해주세요."
				/>
			</div>

			<button onClick={handleClickModName} className="h-full">
				<FaCheckSquare className="w-full h-full text-white active:scale-90 hover:text-gray-400 hover:duration-300" />
			</button>
		</div>
	);
}

export default LoungeModName;
