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
				<h1 className="mb-4 pb-4 font-bold text-4xl text-black border-b-4 border-[#928490]">
					카테고리 목록
				</h1>

				<div className="min-h-screen bg-[#928490] rounded-md">
					<ul className="grid grid-cols-8 place-items-center py-6 gap-y-6">
						{noFreeCategory?.map((category) => (
							<li key={category.id} className="w-40">
								<Link
									href={`/categories/${category.id}`}
									className="grid grid-cols-1 place-items-center"
								>
									<img
										src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${category.categoryImg}`}
										className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90"
									/>

									<p className="font-bold text-2xl text-white text-center pt-2">
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
