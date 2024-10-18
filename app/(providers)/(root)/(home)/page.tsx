import api from "@/api/api";
import Page from "@/components/Page";
import PostBox from "@/components/PostBox";
import CategoriesList from "../_components/category/CategoryList/CategoriesList";
import LoungesList from "../_components/lounge/LoungesList/LoungesList";
import PostsList from "../_components/post/PostsList/PostsList";

export const revalidate = 0;

export default async function HomePage() {
	const lounges = await api.lounges.getAllLounges();

	const posts = await api.posts.getAllPosts();

	// console.log(posts);

	// const freePost = 0

	// console.log(lounges);

	return (
		<Page>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className="bg-gray-600 flex flex-col items-center gap-y-10 p-4 rounded-md">
					<PostsList posts={posts} freeLounge={true} />

					<LoungesList lounges={lounges} pageTitle={true} />

					<CategoriesList isShowList={true} isShowSeeMore={true} />

					<PostBox />
					{/* <LecturesListPage /> */}
				</div>

				<div className="h-full bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
					<div className="rounded-xl w-96 h-56  bg-[#fdfbfc]" />
				</div>
			</div>
		</Page>
	);
}
