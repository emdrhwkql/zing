"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import SideBox from "@/components/SideBox";
import { LoungeIdPropsType } from "@/types/lounge.types";
import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
import PostsList from "../../post/PostsList/PostsList";

async function LoungeDetailForm(props: LoungeIdPropsType) {
	const loungeId = props.params.loungeId;

	const posts = await api.posts.getPostsByLoungeId(Number(loungeId));

	const lounges = await api.lounges.getAllLounges();

	const loungeName = lounges.map(
		(lounge) => lounge.id === Number(loungeId) && lounge.name
	);

	const loungeIntroduction = lounges.map(
		(lounge) => lounge.id === Number(loungeId) && lounge.introduction
	);

	const [isFollowLounge, setIsFollowLounge] = useState(false);

	return (
		<Page>
			<div className="mb-10 px-[calc((100%-1429px)/2)] ">
				<div className="pb-5 flex flex-row gap-x-4">
					<img
						src="https://i.pinimg.com/enabled/736x/a9/fd/8b/a9fd8bb681530997947d2740daa11425.jpg"
						className="w-40 h-40 rounded-md object-cover"
					/>

					<div className="mt-auto flex flex-col h-full">
						<h1 className="font-bold text-4xl">{loungeName}</h1>
						<p className="pt-10 pb-2 font-semibold text-xl">
							{loungeIntroduction}
						</p>
					</div>
				</div>
				<div className="w-full px-8 rounded-md bg-[#4D4246] h-14 flex flex-row items-center text-white text-base font-bold text-center">
					<div className="flex flex-row gap-x-4">
						<div>첫번째</div>
						<div>두번째</div>
						<div>세번째</div>
						<div>네번째</div>
						<div>다섯번째</div>
					</div>
					<div className="ml-auto flex flex-row gap-x-3">
						{isFollowLounge ? (
							<button
								onClick={() => {
									setIsFollowLounge((e) => !e);
								}}
								className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
							>
								<FaCheck />
								<p>가입하기</p>
							</button>
						) : (
							<button
								onClick={() => {
									setIsFollowLounge((e) => !e);
								}}
								className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
							>
								<FaCheck />
								<p>가입하기</p>
							</button>
						)}

						<Link
							href={`/lounges/${loungeId}/posts/new`}
							className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
						>
							<LuFilePlus />
							<p>글 쓰기</p>
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className="bg-gray-600 flex flex-col items-center gap-y-14 p-4 rounded-md">
					{/* <PopularLoungePostsPage /> */}
					<PostsList posts={posts} />
				</div>
				<div className="h-full bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
					<SideBox />
				</div>
			</div>
		</Page>
	);
}

export default LoungeDetailForm;
