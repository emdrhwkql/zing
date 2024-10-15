"use client";

import Page from "@/components/Page";
import CategoryList from "./category_list/page";

import supabase from "@/supabase/client";
import HobbyClassLists from "./HobbyClassList/_components/HobbyClassLists";
import LoungesList from "./LoungesList/page";
import PopularLoungeList from "./LoungesList/PopularLoungeList/page";
import MyLounge from "./MyLounge/page";
import PostsList from "./PostsList/page";

async function HomePage() {
  const randomNumbs = Math.floor(Math.random() * 1000);
  const response = await supabase.from("lectures").select().limit(randomNumbs);
  const lectures = response.data;
  if (!lectures) return null;

  const slicedLectures = lectures.slice(-4);
  return (
    <Page>
      <div className="flex flex-row gap-x-10 justify-center">
        <div className="bg-gray-600 flex flex-col items-center gap-y-14 p-4 rounded-md">
          <PostsList />

          <LoungesList />

          <CategoryList />

          <HobbyClassLists lectures={slicedLectures} isMoreShow={true} />
        </div>

        <div className="bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
          <MyLounge />

          <div className="rounded-xl w-96 h-56 bg-[#fdfbfc]" />

          <PopularLoungeList />

          <div className="rounded-xl w-96 h-[702px] bg-[#fdfbfc]" />
        </div>
      </div>
    </Page>
  );
}
export default HomePage;
