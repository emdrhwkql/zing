"use client";

import MainBox from "@/components/MainBox";
import Page from "@/components/Page";
import Link from "next/link";
import useCategoriesList from "./CategoriesList.hooks";

function CategoriesList({
	isShowSeeMore,
	isShowList,
}: {
	isShowSeeMore: boolean;
	isShowList?: boolean;
}) {
	const { categories } = useCategoriesList();

	// 카테고리 목록에서 자유 게시판 안보이게 처리
	const noFreeCategory = categories?.filter((category) => category.id !== 0);

	// console.log(noFreeCategory);

	return (
		<div>
			{isShowList ? (
				<MainBox>
					<div className="flex flex-col gap-y-3 border-b pb-4">
						{isShowSeeMore && (
							<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b text-white">
								<h1>카테고리</h1>
								<p className="text-sm opacity-60">
									<Link href={"/categories"}>더보기</Link>
								</p>
							</div>
						)}

						<ul className="flex flex-row justify-between items-center">
							{noFreeCategory
								?.map((category) => (
									<li key={category.id}>
										<Link
											href={`/categories/${category.id}`}
										>
											<img
												src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${category.categoryImg}`}
												className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90"
											/>
										</Link>
										<p className="font-bold text-2xl text-white text-center pt-2">
											{category.categoryName}
										</p>
									</li>
								))
								.slice(0, 6)}
						</ul>
					</div>
				</MainBox>
			) : (
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
												src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${category.categoryImg}`}
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
			)}
		</div>
	);
}

export default CategoriesList;
