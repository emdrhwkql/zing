import api from "@/api/api";
import Page from "@/components/Page";
import CategoriesHomeList from "../_components/category/CategoryList/CategoriesHomeList";
import LecturesList from "../_components/lectures/LecturesList/LecturesList";
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

          <CategoriesHomeList />

          <LecturesList isShowList={true} isShowSeeMore={true} />
        </div>

        <div className="h-full flex flex-col items-center gap-y-6 p-3 rounded-md">
          <div className="rounded-xl w-96 h-56  bg-white grid place-items-center">
            내가 팔로우한 라운지
          </div>

          <div className="rounded-xl w-96 h-56  bg-white grid place-items-center">
            인기 라운지 글
          </div>

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
