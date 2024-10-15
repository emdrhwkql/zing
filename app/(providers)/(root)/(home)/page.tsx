import Page from "@/components/Page";
import CategoryList from "../CategoryList/page";
import MyLounge from "../MyLounge/page";
import PostsList from "../PostsList/page";
import PopularLoungePostsPage from "../lounges/popularLoungePosts/page";
import PopularLoungesPage from "../lounges/popularLounges/page";

export default function HomePage() {
	return (
		<Page>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className="bg-gray-600 flex flex-col items-center gap-y-14 p-4 rounded-md">
					<PostsList />

					<PopularLoungePostsPage />

					<CategoryList />

					{/* <HobbyClassList /> */}
				</div>

				<div className="h-full bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
					<MyLounge />

					<div className="rounded-xl w-96 h-56  bg-[#fdfbfc]" />

					<PopularLoungesPage />
				</div>
			</div>
		</Page>
	);
}
