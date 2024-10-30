import api from "@/api/api";
import Page from "@/components/Page";
import CategoriesHomeList from "../_components/category/CategoryList/CategoriesHomeList";
import MyCategoriesList from "../_components/category/MyCategoriesList/MyCategoriesList";
import LecturesList from "../_components/lectures/LecturesList/LecturesList";
import PopularLoungesList from "../_components/lounge/LoungesList/PopularLoungesList";
import MyLoungesList from "../_components/lounge/MyLoungesList/MyLoungesList";
import FreeLoungePostsList from "../_components/post/PostsList/FreeLoungePostsList";
import PopularPostsList from "../_components/post/PostsList/PopularPostsList";

async function HomePage() {
	const lounges = await api.lounges.getAllLounges();
	lounges.sort(
		(postA, postB) =>
			postB.follow_lounges.length - postA.follow_lounges.length
	);

	// console.log(lounges);


  const loungeId = 0;
  const freePosts = await api.posts.getPostsByLoungeId(loungeId);
  console.log(freePosts);

  const posts = await api.posts.getPosts();
  const noFreePosts = posts.filter((post) => post.loungeId !== 0);

  freePosts.sort((postA, postB) => postB.likes.length - postA.likes.length);
  noFreePosts.sort((postA, postB) => postB.likes.length - postA.likes.length);

  return (
    <Page>
      <div className="flex flex-row justify-center">
        <div className=" flex flex-col items-center gap-y-10 p-4 rounded-md">
          <FreeLoungePostsList posts={freePosts} />

					<PopularPostsList posts={noFreePosts} />


          <CategoriesHomeList />

          <LecturesList isShowList={true} isShowSeeMore={true} />
        </div>

				<div className="h-full flex flex-col items-center gap-y-6 p-3 rounded-md">
					<MyLoungesList />

          <MyCategoriesList />

					<PopularLoungesList lounges={lounges} />
				</div>
			</div>
		</Page>
	);

}

export default HomePage;
