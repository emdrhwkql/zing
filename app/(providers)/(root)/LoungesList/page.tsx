import PostBox from "@/components/PostBox";
import dayjs from "dayjs";
import Link from "next/link";

function LoungesList() {
	const time = dayjs().format("YYYY-MM-DD");

	const loungeId = 1;

	return (
		<PostBox>
			<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b">
				<h1>라운지 인기 게시글</h1>
				<p className="text-sm opacity-60">
					<Link href={"/LoungesList/LoungesListPage"}>더보기</Link>
				</p>
			</div>

			<ul className="flex flex-col">
				<li>
					<Link
						href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
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
				<li>
					<Link
						href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
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
				<li>
					<Link
						href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
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
				<li>
					<Link
						href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
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
				<li>
					<Link
						href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
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
		</PostBox>
	);
}

export default LoungesList;
