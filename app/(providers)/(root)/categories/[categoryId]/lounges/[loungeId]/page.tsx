import Page from "@/components/Page";
import PostBox from "@/components/PostBox";
import SideBox from "@/components/SideBox";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";

function LoungeDetailPage() {
	// 라운지 안의 회원들 목록
	// 라운지 내의 작성된 게시글
	// 라운지 내에 새 게시글을 작성할 버튼
	// 라운지를 만든 사람일 경우에는, 라운지 수정하기나 삭제하기 버튼이 보여야 함
	// 라운지를 만든 사람이 아니고, 동시에 라운지에 가입이 안된 사람이면 -> 라운지 가입하기 버튼이 보여야 함
	// 라운지를 만든 사람이 아니고, 동시에 라운지에 가입된 사람이면 -> 라운지 탈퇴하기 버튼이 보여야 함

	return (
		<Page>
			<div className="mb-10 px-[calc((100%-1429px)/2)] ">
				<div className="pb-5 flex flex-row gap-x-4">
					<img
						src="https://i.pinimg.com/enabled/564x/24/3c/d7/243cd7cea7825b80ed0b37ebd7c04da9.jpg"
						className="w-40 h-40 rounded-md object-cover"
					/>

					<p className="pt-4 h-full font-bold text-4xl">
						lounge title
					</p>
				</div>

				<div className="w-full px-8 rounded-md bg-gray-700 h-14 flex flex-row items-center text-white text-base font-bold text-center">
					<div className="flex flex-row gap-x-4">
						<div>첫번째</div>
						<div>두번째</div>
						<div>세번째</div>
						<div>네번째</div>
						<div>다섯번째</div>
					</div>

					<div className="ml-auto flex flex-row gap-x-3">
						<button className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border">
							<FaCheck />
							<p>가입하기</p>
						</button>

						<Link
							href={"/lounges/newPost"}
							className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
						>
							<LuFilePlus />
							<p>글 쓰기</p>
						</Link>
					</div>
				</div>
			</div>

			<div className="flex flex-row gap-x-10 justify-center">
				<div className="bg-gray-600 flex flex-col items-center gap-y-14 p-4 rounded-md">
					{/* <PopularLoungePostsPage /> */}

					<PostBox>
						<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b">
							<h1>인기 게시물</h1>
							<p className="text-sm opacity-60">
								<Link href={"/PostsList/PostListsPage"}>
									더보기
								</Link>
							</p>
						</div>
					</PostBox>
				</div>

				<div className="h-full bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
					<SideBox />
				</div>
			</div>
		</Page>
	);
}

export default LoungeDetailPage;
