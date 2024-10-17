"use client";

import PostBox from "@/components/PostBox";
import { cx } from "class-variance-authority";
import Link from "next/link";
import useLoungesList from "./LoungesList.hooks";

function LoungesList() {
	const { lounges, handleClickLounge, handleClickDeleteLounge } =
		useLoungesList();

	return (
		<PostBox>
			<div className="flex flex-row justify-between">
				<Link href={"/categories/1/lounges/lounge-new"}>
					새 라운지 만들기
				</Link>

				<Link href={"/categories/1/lounges/lounges-list"}>더보기</Link>
			</div>

			<ul className="grid grid-cols-1 gap-y-1 bg-gray-100">
				{lounges.map((lounge) => (
					<li key={lounge.id}>
						<div
							onClick={() => handleClickLounge(lounge)}
							className={cx(
								lounge.isCompleted &&
									"text-gray-400 line-through",
								"cursor-pointer px-5 py-2 bg-white w-full hover:brightness-90 active:brightness-75 flex justify-between"
							)}
						>
							<span>{lounge.name}</span>
							<button
								onClick={(e) =>
									handleClickDeleteLounge(e, lounge)
								}
							>
								삭제
							</button>
						</div>
					</li>
				))}
			</ul>
		</PostBox>
	);
}

export default LoungesList;
