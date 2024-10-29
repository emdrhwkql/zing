import api from "@/api/api";
import Page from "@/components/Page";
import { LoungeIdPropsType } from "@/types/lounge.types";
import dayjs from "dayjs";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
import { TfiAlarmClock } from "react-icons/tfi";
import PostsList from "../../post/PostsList/PostsList";

async function FreeLoungeDetailForm({
  loungeId,
  type,
}: {
  loungeId: number;
  type: LoungeIdPropsType["searchParams"]["type"];
}) {
  const posts = await api.posts.getPostsByLoungeId(Number(loungeId));
  const lounge = await api.posts.getLounge(loungeId);

  if (type === "popular") {
    posts.sort((postA, postB) => postB.likes.length - postA.likes.length);
    // console.log(posts);
  } else if (type === "newest") {
    posts.sort((postA, postB) =>
      dayjs(postB.createdAt).isAfter(postA.createdAt) ? 1 : -1
    );
  }

  return (
    <Page>
      <div className="TitleLine flex flex-row gap-x-4 align-text-bottom">
        <h1 className="Name ml-[160px] font-bold text-4xl">{lounge?.name}</h1>
        <p className="Introduction h-full text-xl font-semibold mt-auto">
          {lounge?.introduction}
        </p>
      </div>

      <div className="mt-10 mb-10 flex flex-row gap-x-10 justify-center">
        <div className="SideBar w-14 h-[1000px] rounded-md bg-[#6394bfa6]">
          <div className="SideBarContentBox h-full pt-5 text-white text-4xl text-center flex flex-col gap-y-10">
            <div className="w-full group relative grid place-items-center">
              <Link href={`/lounges/${loungeId}?type=popular`}>
                <FaStar className="group-hover:scale-125 group-hover:duration-300 group-active:scale-125" />
              </Link>
              <div className="w-48 bg-[#477dacaf] absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none rounded-md group-hover:duration-300 group-hover:left-16">
                <p className="text-white font-bold text-3xl py-3">
                  인기 게시물
                </p>
              </div>
            </div>

            <div className="w-full group relative grid place-items-center">
              <Link href={`/lounges/${loungeId}?type=newest`}>
                <TfiAlarmClock className="group-hover:scale-125 group-hover:duration-300" />
              </Link>
              <div className="w-48 bg-[#477dacaf] absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none rounded-md group-hover:duration-300 group-hover:left-16">
                <p className="text-white font-bold text-3xl py-3">
                  최신 게시물
                </p>
              </div>
            </div>

            <div className="group relative grid place-items-center">
              <Link href={`/lounges/${loungeId}/posts/new`}>
                <LuFilePlus className="group-hover:scale-125 group-hover:duration-300" />
              </Link>
              <div className="w-48 bg-[#477dacaf] absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none rounded-md group-hover:duration-300 group-hover:left-16">
                <p className="text-white font-bold text-3xl py-3">
                  글 작성하기
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[1200px]">
          <PostsList posts={posts} loungeId={loungeId} />
        </div>
      </div>
    </Page>
  );
}

export default FreeLoungeDetailForm;
