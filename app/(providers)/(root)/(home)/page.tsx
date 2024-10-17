import Page from "@/components/Page";
import PostsList from "../PostsList/page";
import LoungesList from "../categories/[categoryId]/lounges/_components/LoungeList/LoungeList";
import CategoriesList from "../categories/_components/CategoryList/CategoriesList";

export default function HomePage() {
	return (
		<Page>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className="bg-gray-600 flex flex-col items-center gap-y-10 p-4 rounded-md">
					<PostsList />

					<LoungesList />

					<CategoriesList isShowList={true} isShowSeeMore={true} />
				</div>

				<div className="h-full bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
					<div className="rounded-xl w-96 h-56  bg-[#fdfbfc]" />
				</div>
			</div>
		</Page>
	);
}
