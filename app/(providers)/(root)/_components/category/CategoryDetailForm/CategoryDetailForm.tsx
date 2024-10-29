import api from "@/api/api";
import FollowCategoryBtn from "@/components/FollowCategoryBtn";
import Page from "@/components/Page";
import SideBox from "@/components/SideBox";
import Link from "next/link";
import { LuFilePlus } from "react-icons/lu";
import LoungesList from "../../lounge/LoungesList/LoungesList";

async function CategoryDetailForm({ categoryId }: { categoryId: number }) {
	const category = await api.categories.getCategory(categoryId);

	const lounges = await api.lounges.getLoungesByCategoryId(
		Number(categoryId)
	);

	return (
		<Page>
			<div className="mb-10 px-[calc((100%-1429px)/2)] ">
				<div className="relative bg-black overflow-hidden z-auto rounded-md">
					<div className="w-full h-full flex flex-row gap-x-4 text-white p-4">
						<img
							src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${category?.categoryImg}`}
							className="absolute -top-96 left-0 w-full opacity-50 object-cover rounded-md z-auto"
						/>

						<img
							src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${category?.categoryImg}`}
							className="w-40 h-40 rounded-md object-cover z-10"
						/>

						<div className="w-[400px] mt-auto flex flex-col h-full z-10 border-l-2 border-b-2 pl-4 rounded-md">
							<h1 className="font-bold text-4xl">
								{category?.categoryName}
							</h1>
							<p className="pt-10 pb-2 font-semibold text-xl">
								설명
							</p>
						</div>

						<div className="ml-auto flex flex-row gap-x-3 z-10 font-sm text-md">
							<FollowCategoryBtn categoryId={categoryId} />

							<Link
								href={`/categories/${categoryId}/lounges/new`}
								className="rounded-full w-72 h-10 py-2 px-4 flex flex-row gap-x-2 justify-center items-center border"
							>
								<LuFilePlus className="text-lg" />
								<p>라운지 만들기</p>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-row gap-x-10 justify-center">
				<div className="bg-[#DBC1AD] flex flex-col items-center gap-y-14 p-4 rounded-md">
					<LoungesList lounges={lounges} />
				</div>

				<div className="h-full bg-[#DBC1AD] flex flex-col items-center gap-y-6 p-3 rounded-md">
					<SideBox />
				</div>
			</div>
		</Page>
	);
}

export default CategoryDetailForm;
