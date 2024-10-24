import api from "@/api/api";
import Page from "@/components/Page";
import CategoriesHomeList from "../_components/category/CategoryList/CategoriesHomeList";
import LecturesList from "../_components/lectures/LecturesList/LecturesList";
import PopularLoungeList from "../_components/lounge/PopularLoungeList/PopularLoungeList";
import FreeLoungePostsList from "../_components/post/FreeLoungePostsList/FreeLoungePostsList";

async function HomePage() {
  const lounges = await api.lounges.getAllLounges();

  const loungeId = 0;
  const freePosts = await api.posts.getPostsByLoungeId(loungeId);

  return (
    <Page>
      <div className="flex flex-row justify-center">
        <div className=" flex flex-col items-center gap-y-10 p-4 rounded-md">
          <FreeLoungePostsList posts={freePosts} />

          <PopularLoungeList lounges={lounges} />

          <CategoriesHomeList />

          <LecturesList isShowList={true} isShowSeeMore={true} />
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

export default HomePage;
