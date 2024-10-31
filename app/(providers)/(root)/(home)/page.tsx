"use client";

import api from "@/api/api";
import Page from "@/components/Page";
import { useQuery } from "@tanstack/react-query";
import CategoriesHomeList from "../_components/category/CategoryList/CategoriesHomeList";
import MyCategoriesList from "../_components/category/MyCategoriesList/MyCategoriesList";
import LecturesList from "../_components/lectures/LecturesList/LecturesList";
import MyLoungesList from "../_components/lounge/LoungesList/MyLoungesList";
import PopularLoungesList from "../_components/lounge/LoungesList/PopularLoungesList";
import FreeLoungePostsList from "../_components/post/PostsList/FreeLoungePostsList";
import PopularPostsList from "../_components/post/PostsList/PopularPostsList";

function HomePage() {
  const { data: lounges = [] } = useQuery({
    queryKey: ["lounges"],
    queryFn: async () => api.lounges.getAllLounges(),
  });

  const { data: freePosts = [] } = useQuery({
    queryKey: ["freePosts"],
    queryFn: async () => api.posts.getPostsByLoungeId(loungeId),
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => api.posts.getPosts(),
  });

  lounges!.sort(
    (loungeA, loungeB) =>
      loungeB.follow_lounges.length - loungeA.follow_lounges.length
  );
  // console.log(lounges);

  const loungeId = 0;
  // console.log(freePosts);

  const noFreePosts = posts!.filter((post) => post.loungeId !== 0);

  freePosts!.sort((postA, postB) => postB.likes.length - postA.likes.length);
  noFreePosts.sort((postA, postB) => postB.likes.length - postA.likes.length);

	return (
		<Page>
			<div className="flex flex-row justify-center">
				<div className=" flex flex-col items-center gap-y-10 p-4">
					<FreeLoungePostsList posts={freePosts} />


          <PopularPostsList posts={noFreePosts} />

          <CategoriesHomeList />

          <LecturesList isShowList={true} isShowSeeMore={true} />
        </div>


				<div className="h-full flex flex-col items-center gap-y-6 p-3">
					<MyLoungesList />


          <MyCategoriesList />

          <PopularLoungesList lounges={lounges} />
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
