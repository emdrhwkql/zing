import api from "@/api/api";
import Page from "@/components/Page";
import Link from "next/link";
import { LuFilePlus } from "react-icons/lu";
import PostsList from "../../post/PostsList/PostsList";
import LoungeAccessForm from "../LoungeAccess/LoungeAccessForm";
import LoungeModImg from "../LoungeMod/LoungeModImg/LoungeModImg";
import LoungeModIntroduction from "../LoungeMod/LoungeModIntroduction/LoungeModIntroduction";
import LoungeModName from "../LoungeMod/LoungeModName/LoungeModName";

async function LoungeDetailForm({ loungeId }: { loungeId: number }) {
  const posts = await api.posts.getPostsByLoungeId(Number(loungeId));

  const lounge = await api.lounges.getLounge(loungeId);

  return (
    <Page>
      <div className="pb-5 flex flex-row gap-x-4">
        <img
          src={lounge?.imageUrl}
          className="w-40 h-40 rounded-md object-cover"
        />

        <div className="mt-auto flex flex-col h-full">
          <h1 className="font-bold text-4xl">{lounge?.name}</h1>
          <p className="pt-10 pb-2 font-semibold text-xl">
            {lounge?.introduction}
          </p>
        </div>
        <div className="bg-black text-white">
          <LoungeModImg />
          <LoungeModName />
          <LoungeModIntroduction />
        </div>
      </div>

      <div className="w-full px-8 rounded-md bg-[#4D4246] h-14 flex flex-row items-center text-white text-base font-bold text-center">
        <div className="flex flex-row gap-x-4">
          <div>첫번째</div>
          <div>두번째</div>
          <div>세번째</div>
          <div>네번째</div>
          <div>다섯번째</div>
        </div>
        <div className="ml-auto flex flex-row gap-x-3">
          {/* 모달로 띄우기 */}

          <LoungeAccessForm loungeId={loungeId} />
          <Link
            href={`/lounges/${loungeId}/posts/new`}
            className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
          >
            <LuFilePlus />
            <p>글 쓰기</p>
          </Link>
        </div>
      </div>

      <PostsList posts={posts} />
    </Page>
  );
}

export default LoungeDetailForm;
