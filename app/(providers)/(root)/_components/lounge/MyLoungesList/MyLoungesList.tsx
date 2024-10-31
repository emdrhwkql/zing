"use client";

import api from "@/api/api";
import SideBox from "@/components/SideBox";
import { useAuthStore } from "@/zustand/auth.store";
import arrayShuffle from "array-shuffle";
import Link from "next/link";
import { useEffect, useState } from "react";

type MyLoungesProps =
	| ({
			categoryId: number;
			createdAt: string;
			id: number;
			imageUrl: string;
			introduction: string;
			isCompleted: boolean;
			name: string;
			userId: string | null;
	  } | null)[]
	| undefined;

function MyLoungesList() {
	const currentUser = useAuthStore((state) => state.currentUser);

	const [MyLounges, setMyLounges] = useState<MyLoungesProps>([]);

	const loungeName = MyLounges?.map((lounge) => lounge?.name);

	useEffect(() => {
		if (!currentUser) return;

		(async () => {
			const response = await api.followLounges.getFollowLoungesIFollow(
				currentUser
			);

			const lounges = response.follows?.map((follow) => follow.lounge);

			const shuffledMyLounge = arrayShuffle(lounges!);

			setMyLounges(shuffledMyLounge);
		})();
	}, [currentUser]);

	// console.log(MyLounges);

	return (
		<SideBox>
			<Link href={"/my-profile"}>
				<h1 className="mb-4 pb-4 border-b font-bold text-xl  hover:text-[22px] hover:duration-150">
					내 라운지
				</h1>
			</Link>

			{MyLounges?.length === 0 && (
				<div className="grid place-items-center pt-5">
					<p className="text-2xl">팔로우한 라운지가 없습니다.</p>
				</div>
			)}

			<ul className="flex flex-row justify-around">
				{MyLounges?.map((lounge) => (
					<li
						key={lounge?.id}
						className="grid items-center hover:scale-110 hover:duration-300 border-t-4 rounded-md border-[#F4C6BC] pt-2"
					>
						<Link href={`/lounges/${lounge?.id}`}>
							<div className="flex flex-col items-center">
								<img
									src={`${lounge?.imageUrl}`}
									className="w-24 h-24 rounded-md"
								/>

								{loungeName!.length >= 7 ? (
									<p className="mt-2 text-base text-center">
										{lounge?.name.slice(0, 4)}• • •
									</p>
								) : (
									<p className="mt-2 text-base text-center">
										{lounge?.name}
									</p>
								)}
							</div>
						</Link>
					</li>
				)).slice(0, 3)}
			</ul>
		</SideBox>
	);
}

export default MyLoungesList;
