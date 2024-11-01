"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import SideBox from "@/components/SideBox";
import UpdateLoungeModal from "@/components/UpdateLoungeModal";
import { Lounge } from "@/schema/lounges.schema";
import { LoungeIdPropsType } from "@/types/lounge.types";
import { useModalStore } from "@/zustand/modal.store";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import FollowLoungeBtn from "../../../../../../components/FollowLoungeBtn";
import PostsList from "../../post/PostsList/PostsList";

interface PostTypeProps {
	content: string;
	createdAt: string;
	id: number;
	imageUrl: string;
	loungeId: number;
	title: string;
	userId: string;
	likes: {
		id: number;
	}[];
}

function LoungeDetailForm({
	loungeId,
	type,
}: {
	loungeId: number;
	type: LoungeIdPropsType["searchParams"]["type"];
}) {
	const [posts, setPosts] = useState<PostTypeProps[]>([]);

	const [lounge, setLounge] = useState<Lounge>();

	const openModal = useModalStore((state) => state.openModal);

	const handleClickOpenModal = () => {
		openModal(<UpdateLoungeModal />);
	};

	useEffect(() => {
		(async () => {
			const posts = await api.posts.getPostsByLoungeId(Number(loungeId));
			const lounge = await api.lounges.getLounge(loungeId);

			setPosts(posts);
			setLounge(lounge);
		})();
	}, []);

	if (type === "popular") {
		posts.sort((postA, postB) => postB.likes.length - postA.likes.length);
	} else if (type === "newest") {
		posts.sort((postA, postB) =>
			dayjs(postB.createdAt).isAfter(postA.createdAt) ? 1 : -1
		);
	}

	return (
		<Page>
			<div className="pb-5 flex flex-row gap-x-4">
				<div className="hover:scale-110 hover:duration-300">
					<img
						src={lounge?.imageUrl}
						className="w-40 h-40 rounded-md object-cover"
					/>
				</div>

				<div className="mt-auto flex flex-col h-full">
					<h1 className="font-bold text-4xl">{lounge?.name}</h1>
					<p className="pt-10 pb-2 font-semibold text-xl">
						{lounge?.introduction}
					</p>
				</div>
			</div>

			<div className="w-full px-8 rounded-md bg-[#73020b9d] h-14 flex flex-row items-center text-white text-base font-bold text-center">
				<div className="flex flex-row">
					<Link href={`/lounges/${loungeId}?type=popular`}>
						<div className="px-3 py-2 hover:bg-[#73020b9d] active:scale-110 active:duration-150 hover:rounded-md hover:duration-300">
							<p>인기 게시물</p>
						</div>
					</Link>

					<Link href={`/lounges/${loungeId}?type=newest`}>
						<div className="px-3 py-2 hover:bg-[#73020b9d] active:scale-110 active:duration-150 hover:rounded-md hover:duration-300">
							<p>최신 게시물</p>
						</div>
					</Link>
					{/* 모달  */}
					<button onClick={handleClickOpenModal}>
						<div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#73020b9d] hover:duration-300 active:scale-110">
							수정하기
						</div>
					</button>
				</div>

				<div className="ml-auto flex flex-row gap-x-3">
					<FollowLoungeBtn loungeId={loungeId} />
					<Link href={`/lounges/${loungeId}/posts/new`}>
						<div className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#73020b9d] hover:duration-300 active:scale-110">
							<LuFilePlus />
							<p>글 쓰기</p>
						</div>
					</Link>
				</div>
			</div>

			<div className="mt-10 flex flex-row justify-around">
				<PostsList posts={posts} loungeId={loungeId} />

				<div className="grid grid-cols-1 gap-y-5">
					<SideBox />
					<SideBox />
					<SideBox />
					<SideBox />
				</div>
			</div>
		</Page>
	);
}

export default LoungeDetailForm;
