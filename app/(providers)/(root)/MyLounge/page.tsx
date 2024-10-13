import SideBox from "@/components/SideBox";
import Link from "next/link";

function MyLounge() {
	const userId = 1;
	const loungeId = 1;

	return (
		<SideBox>
			<div className="flex flex-col">
				<div className="mb-4 pb-4 border-b flex flex-row justify-between items-center font-bold text-2xl">
					<h1>My Lounge</h1>

					<p className="text-sm opacity-60">
						<Link href={`/MyLounge/${userId}/MyLoungePage`}>
							더보기
						</Link>
					</p>
				</div>

				<ul className="flex flex-col gap-y-4 font-medium text-xl">
					<li>
						<Link
							href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
							className="flex flex-row items-center gap-x-4 leading-none"
						>
							<div className="rounded-lg w-14 h-14 bg-gray-300"></div>
							<p>Lorem, ipsum dolor.</p>
						</Link>
					</li>

					<li>
						<Link
							href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
							className="flex flex-row items-center gap-x-4 leading-none"
						>
							<div className="rounded-lg w-14 h-14 bg-gray-300"></div>
							<p>Lorem, ipsum dolor.</p>
						</Link>
					</li>

					<li>
						<Link
							href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
							className="flex flex-row items-center gap-x-4 leading-none"
						>
							<div className="rounded-lg w-14 h-14 bg-gray-300"></div>
							<p>Lorem, ipsum dolor.</p>
						</Link>
					</li>

					<li>
						<Link
							href={`/LoungesList/${loungeId}/LoungesListDetailPage`}
							className="flex flex-row items-center gap-x-4 leading-none"
						>
							<div className="rounded-lg w-14 h-14 bg-gray-300"></div>
							<p>Lorem, ipsum dolor.</p>
						</Link>
					</li>
				</ul>
			</div>
		</SideBox>
	);
}

export default MyLounge;
