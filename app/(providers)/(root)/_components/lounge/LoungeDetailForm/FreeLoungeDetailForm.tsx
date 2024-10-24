import api from "@/api/api";
import Page from "@/components/Page";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
import { TfiAlarmClock } from "react-icons/tfi";
import PostsList from "../../post/PostsList/PostsList";

async function FreeLoungeDetailForm({ loungeId }: { loungeId: number }) {
	const posts = await api.posts.getPostsByLoungeId(Number(loungeId));

	const lounge = await api.lounges.getLounge(loungeId);

	return (
		<Page>
			<div className="TitleLine flex flex-row gap-x-4 align-text-bottom">
				<h1 className="Name ml-[146px] font-bold text-4xl">
					{lounge?.name}
				</h1>
				<p className="Introduction h-full text-xl font-semibold border-b border-red-600 mt-auto">
					{lounge?.introduction}
				</p>
			</div>
			<div className="mt-10 mb-10 flex flex-row gap-x-10 justify-center">
				<div className="SideBar w-14 h-auto rounded-md bg-[#4D4246] ">
					<div className="SideBarContentBox h-full pt-5 text-white text-4xl text-center flex flex-col gap-y-10">
						<div className="group relative grid place-items-center">
							<FaStar className="group-hover:scale-125 group-hover:duration-300 group-active:scale-125" />
							<div className="w-40 bg-orange-300/75 absolute top-1/2 left-14 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none rounded-md group-hover:duration-300">
								<p className="text-black text-2xl py-1">
									인기 게시물
								</p>
							</div>
						</div>

						<div className="group relative grid place-items-center">
							<TfiAlarmClock className="group-hover:scale-125 group-hover:duration-300" />
							<div className="w-40 bg-orange-300/75 absolute top-1/2 left-14 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none rounded-md group-hover:duration-300">
								<p className="text-black text-2xl py-1">
									최신 게시물
								</p>
							</div>
						</div>

						<div className="group relative grid place-items-center">
							<Link href={`/lounges/${loungeId}/posts/new`}>
								<LuFilePlus className="group-hover:scale-125 group-hover:duration-300" />
								<div className="w-40 bg-orange-300/75 absolute top-1/2 left-14 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none rounded-md group-hover:duration-300">
									<p className="text-black text-2xl py-1">
										글 쓰기
									</p>
								</div>
							</Link>
						</div>
					</div>
				</div>

				<PostsList posts={posts} />
			</div>
		</Page>
	);
}

export default FreeLoungeDetailForm;
