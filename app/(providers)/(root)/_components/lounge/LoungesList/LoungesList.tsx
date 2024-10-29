"use client";

import MainBox from "@/components/MainBox";
import { Lounges } from "@/types/lounge.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function LoungesList({ lounges }: { lounges: Lounges }) {
	const [isShowMore, setIsShowMore] = useState(false);

	const noFreeLounge = lounges?.filter((lounge) => lounge.categoryId !== 0);

	return (
		<MainBox>
			<h1 className="font-bold text-2xl border-b">라운지 목록</h1>

			{isShowMore ? (
				<ul className="grid grid-cols-1 gap-y-5">
					{noFreeLounge.map((lounge) => (
						<li
							key={lounge.id}
							className="border-l-4 border-[#DBC1AD] rounded-md h-14 px-2 grid items-center"
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
			) : (
				<ul className="grid grid-cols-1 gap-y-5">
					{noFreeLounge
						.map((lounge) => (
							<li
								key={lounge.id}
								className="border-l-4 border-[#DBC1AD] rounded-md h-14 px-2 grid items-center"
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
						))
						.slice(0, 10)}
				</ul>
			)}

			<div className="mt-3 flex justify-center relative">
				<button
					onClick={() => {
						setIsShowMore((e) => !e);
					}}
					className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-2 shadow-[0_4px_4px_rgb(75,85,99)] active:scale-125 active:duration-75"
				>
					{isShowMore ? (
						<FaMinus className="text-lg" />
					) : (
						<FaPlus className="text-lg" />
					)}
				</button>
			</div>
		</MainBox>
	);
}

export default LoungesList;
