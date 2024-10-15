import PostBox from "@/components/PostBox";
import dayjs from "dayjs";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

function PopularLoungePostsForm() {
	const time = dayjs().format("YYYY-MM-DD");

	const loungeId = 1;

	return (
		<PostBox>
			<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b">
				<h1>라운지 인기 게시글</h1>
				<p className="flex flex-row text-sm opacity-60">
					<p>전체</p>
					<p className="ml-2 pl-2 border-l border-black">
						가입한 라운지
					</p>
				</p>
			</div>

			<ul className="flex flex-col">
				<li>
					<Link
						href={`/lounges/${loungeId}`}
						className="mb-4 pb-4 border-b flex flex-row"
					>
						<div className="w-12 h-12 bg-gray-300"></div>

						<div className="ml-4 flex flex-col">
							<p className="w-full font-bold text-xl">
								라운지 이름
							</p>

							<div className="flex flex-row gap-x-4 items-center">
								<p className="font-normal text-sm">카테고리</p>

								<p>유저 Id</p>

								<span className="leading-3">{time}</span>
							</div>
						</div>
					</Link>
				</li>
			</ul>

			<div className="relative">
				<button className="absolute top-0 left-1/2 -translate-x-1/2 bg-transparent bg-">
					<FaPlus className="p-3 w-14 h-14 bg-[#fdfbfc] drop-shadow-2xl rounded-full" />
				</button>
			</div>
		</PostBox>
	);
}

export default PopularLoungePostsForm;
