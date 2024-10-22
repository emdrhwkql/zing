"use client";

import Page from "@/components/Page";
import Link from "next/link";
import useCategoriesList from "./CategoriesList.hooks";

function CategoriesList() {
	const { categories } = useCategoriesList();

	// 카테고리 목록에서 자유 게시판 안보이게 처리
	const noFreeCategory = categories?.filter((category) => category.id !== 0);

	// console.log(noFreeCategory);

	return (
		<Page>
			<div className="mx-[calc((100%-1429px)/2)] grid grid-cols-1">
				<h1 className="text-center pb-5 font-bold text-4xl text-black">
					카테고리 목록
				</h1>

				<div className="min-h-screen border-t-8 border-b-8 border-l-2 border-r-2 border-[#928490] rounded-md">
					<ul className="grid grid-cols-5 place-items-center py-10 gap-y-10">
						{noFreeCategory?.map((category) => (
							<li
								key={category.id}
								className="relative w-40 p-4 pb-8 rounded-2xl bg-black overflow-hidden"
							>
								<img
									src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${category.categoryImg}`}
									className="absolute top-0 left-0 w-full h-full opacity-45 scale-150"
								/>

								<Link
									href={`/categories/${category.id}`}
									className="grid grid-cols-1 place-items-center z-10"
								>
									<img
										src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${category.categoryImg}`}
										className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90 z-10"
									/>

									<p className="font-bold text-2xl text-white text-center pt-2 z-10">
										{category.categoryName}
									</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Page>
	);
}

export default CategoriesList;
