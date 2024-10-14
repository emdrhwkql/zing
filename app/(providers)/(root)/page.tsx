import Page from "@/components/Page";
import CategoryList from "./CategoryList/page";
import HobbyClassList from "./HobbyClassList/page";
import LoungesList from "./LoungesList/page";
import PopularLoungeList from "./LoungesList/PopularLoungeList/page";
import MyLounge from "./MyLounge/page";
import PostsList from "./PostsList/page";

export default function HomePage() {
	return (
		<Page>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className="bg-gray-600 flex flex-col items-center gap-y-14 p-4 rounded-md">
					<PostsList />

					<LoungesList />

					<CategoryList />

					<HobbyClassList />
				</div>

				<div className="bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
					<MyLounge />

					<div className="rounded-xl w-96 h-56  bg-[#fdfbfc]" />

					<PopularLoungeList />

					<div className="rounded-xl w-96 h-[702px] bg-[#fdfbfc]" />
				</div>
			</div>
		</Page>
	);
}