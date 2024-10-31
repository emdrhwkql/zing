"use client";

import api from "@/api/api";
import SideBox from "@/components/SideBox";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function LoungesICreatedList() {
	const currentUser = useAuthStore((state) => state.currentUser);

	// console.log(currentUser);

	const { data: lounges } = useQuery({
		queryKey: ["i_created_lounges"],
		queryFn: async () => api.lounges.getLoungesICreated(currentUser!),
	});

	// console.log(lounges);

	return (
		<SideBox>
			<h1 className="mb-4 pb-4 border-b font-bold text-xl">
				내가 만든 라운지
			</h1>

			<ul className="grid grid-cols-1 gap-y-5">
				{lounges?.map((lounge) => (
					<li
						key={lounge.id}
						className="border-l-4 border-[#F4C6BC] rounded-md h-14 px-2 grid items-center hover:-translate-x-4 hover:duration-300"
					>
						<Link href={`/lounges/${lounge.id}`}>
							<div className="flex flex-row items-center">
								<img
									src={lounge.imageUrl}
									className="w-10 h-10 bg-black"
								/>
								<div className="ml-3 flex flex-col">
									<p>{lounge.name}</p>
									<p>{lounge.introduction}</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</SideBox>
	);
}

export default LoungesICreatedList;
