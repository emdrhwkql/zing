import Page from "@/components/Page";
import supabase from "@/supabase/client";
import Link from "next/link";

async function CategoriesList({
	isShowSeeMore,
	isShowList,
}: {
	isShowSeeMore: boolean;
	isShowList: boolean;
}) {
	// 10-16에는 category.id에 맞는 값들만 뿌려주기
	//   if ((category.categoryId - category.id) % 9 === 0)
	const randomNumbs = Math.floor(Math.random() * 1000);
	const response = await supabase
		.from("categories")
		.select("*")
		.limit(randomNumbs);
	const categoryList = response.data;
	if (!categoryList) return null;
	// console.log(categoryList);
	return (
		<div>
			{isShowList ? (
				<div className="w-[950px] flex flex-col gap-y-3">
					{isShowSeeMore && (
						<Link href={"categories/categories-list"}>더보기</Link>
					)}

					<ul className="flex flex-row justify-between items-center-">
						{categoryList
							.map((category) => (
								<li key={category.id}>
									<Link href={`/categories/${category.id}`}>
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
			) : (
				<Page>
					<div className="mx-[calc((100%-1429px)/2)]">
						<h1 className="font-bold text-4xl">
							카테고리 리스트 페이지
						</h1>

						<div className="min-h-screen sm:mt-8 bg-gray-600 rounded-md">
							<ul className="w-full py-10 grid grid-cols-8 place-items-center">
								{categoryList.map((category) => (
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
