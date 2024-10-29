import api from "@/api/api";
import Page from "@/components/Page";
import CategoriesHomeList from "../_components/category/CategoryList/CategoriesHomeList";
import LecturesList from "../_components/lectures/LecturesList/LecturesList";
import PopularLoungesList from "../_components/lounge/LoungesList/PopularLoungesList";
import FreeLoungePostsList from "../_components/post/PostsList/FreeLoungePostsList";
import PopularPostsList from "../_components/post/PostsList/PopularPostsList";

async function HomePage() {
	const lounges = await api.lounges.getAllLounges();

	const loungeId = 0;
	const freePosts = await api.posts.getPostsByLoungeId(loungeId);

	const posts = await api.posts.getPosts();
	const noFreePosts = posts.filter((post) => post.loungeId !== 0);

	freePosts.sort((postA, postB) => postB.likes.length - postA.likes.length);
	noFreePosts.sort((postA, postB) => postB.likes.length - postA.likes.length);

	return (
		<Page>
			<div className="flex flex-row justify-center">
				<div className=" flex flex-col items-center gap-y-10 p-4 rounded-md">
					<FreeLoungePostsList posts={freePosts} />

					<PopularPostsList posts={posts} />

					<CategoriesHomeList />

					<LecturesList isShowList={true} isShowSeeMore={true} />
				</div>

				<div className="h-full flex flex-col items-center gap-y-6 p-3 rounded-md">
					<div className="rounded-xl w-96 h-56  bg-white grid place-items-center">
						내가 팔로우한 라운지
					</div>

					<PopularLoungesList lounges={lounges} />

					<div className="rounded-xl w-96 h-56  bg-white grid place-items-center">
						내가 팔로우한 라운지
					</div>

					<div className="rounded-xl w-96 h-56  bg-white grid place-items-center">
						내가 팔로우한 라운지
					</div>
				</div>
			</div>
		</Page>
	);
}

export default HomePage;
