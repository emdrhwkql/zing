import api from "@/api/api";
import Page from "@/components/Page";
import CategoriesList from "../_components/category/CategoryList/CategoriesList";
import LoungesList from "../_components/lounge/LoungesList/LoungesList";
import PostsList from "../_components/post/PostsList/PostsList";
import LeturesList from "../lecturer/lecturesone/_components/LecturesList";

export const revalidate = 0;

export default async function HomePage() {
	const lounges = await api.lounges.getAllLounges();

	const posts = await api.posts.getAllPosts();

	return (
		<Page>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className=" flex flex-col items-center gap-y-10 p-4 rounded-md">
					<PostsList
						posts={posts}
						freeLounge={true}
						loungeDetailPost={false}
					/>

					< LeturesList />

					<LoungesList lounges={lounges} pageTitle={true} />

					<CategoriesList isShowList={true} isShowSeeMore={true} />
				</div>

				<div className="h-full flex flex-col items-center gap-y-6 p-3 rounded-md">
					<div className="rounded-xl w-96 h-56  bg-white" />
					<div className="rounded-xl w-96 h-56  bg-white" />
					<div className="rounded-xl w-96 h-56  bg-white" />
					<div className="rounded-xl w-96 h-56  bg-white" />
				</div>
			</div>
		</Page>
	);
}
