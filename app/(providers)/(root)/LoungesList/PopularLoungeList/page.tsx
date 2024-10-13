import SideBox from "@/components/SideBox";
import Link from "next/link";

function PopularLoungeList() {
	const loungeId = 1;

	return (
		<SideBox>
			<div className="mb-4 pb-4 border-b flex flex-row justify-between items-center font-bold text-2xl">
				<h1>인기 라운지 TOP5</h1>

				<p className="text-sm opacity-60">
					<Link href={"/LoungesList/LoungesListPage"}>더보기</Link>
				</p>
			</div>

			<ul>
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

							<p className="font-normal text-sm">카테고리</p>
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

							<p className="font-normal text-sm">카테고리</p>
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

							<p className="font-normal text-sm">카테고리</p>
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

							<p className="font-normal text-sm">카테고리</p>
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

							<p className="font-normal text-sm">카테고리</p>
						</div>
					</Link>
				</li>
			</ul>
		</SideBox>
	);
}

export default PopularLoungeList;
