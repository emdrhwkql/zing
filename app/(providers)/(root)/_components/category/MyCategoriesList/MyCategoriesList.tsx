"use client";

import api from "@/api/api";
import SideBox from "@/components/SideBox";
import { useAuthStore } from "@/zustand/auth.store";
import arrayShuffle from "array-shuffle";
import Link from "next/link";
import { useEffect, useState } from "react";

type MyCategoriesProps =
	| ({
			categoryImg: string | null;
			categoryName: string;
			id: number;
			introduction: string;
			isCompleted: boolean;
	  } | null)[]
	| undefined;

function MyCategoriesList() {
	const currentUser = useAuthStore((state) => state.currentUser!);

	const [MyCategories, setMyCategories] = useState<MyCategoriesProps>([]);

	useEffect(() => {
		if (!currentUser) return;

		(async () => {
			const response =
				await api.followCategories.getFollowCategoriesIFollow(
					currentUser
				);

			const categories = response.follows?.map(
				(follow) => follow.category
			);

			// console.log(categories);

			const shuffledCategories = arrayShuffle(categories!);

			setMyCategories(shuffledCategories);
		})();
	}, [currentUser]);

	return (
		<SideBox>
			<Link href={"/my-profile"}>
				<h1 className="mb-4 pb-4 border-b font-bold text-xl  hover:text-[22px] hover:duration-150">
					내 카테고리
				</h1>
			</Link>

			{MyCategories?.length === 0 && (
				<div className="grid place-items-center pt-5">
					<p className="text-2xl">팔로우한 카테고리가 없습니다.</p>
				</div>
			)}

			<ul className="grid grid-cols-1 gap-y-5">
				{MyCategories?.map((category) => (
					<li
						key={category?.id}
						className="border-l-4 border-[#DBC1AD] rounded-md h-14 px-2 grid items-center hover:-translate-x-4 hover:duration-300"
					>
						<Link href={`/categories/${category?.id}`}>
							<div className="flex flex-row items-center">
								<img
									src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${category?.categoryImg}`}
									className="w-10 h-10 "
								/>
								<div className="ml-3 flex flex-col">
									<p className="">{category?.categoryName}</p>

									<p className="text-sm">
										{category?.introduction.slice(0, 20)}
									</p>
								</div>
							</div>
						</Link>
					</li>
				)).slice(0, 5)}
			</ul>
		</SideBox>
	);
}

export default MyCategoriesList;
