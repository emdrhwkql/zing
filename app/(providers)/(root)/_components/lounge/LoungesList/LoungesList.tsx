import MainBox from "@/components/MainBox";
import { Lounges } from "@/types/lounge.types";
import Link from "next/link";

function LoungesList({ lounges }: { lounges: Lounges }) {
	const noFreeLounge = lounges?.filter((lounge) => lounge.categoryId !== 0);

	return (
		<MainBox>
			<h1 className="pb-2 mb-4 font-bold text-2xl border-b">
				라운지 목록
			</h1>

			{noFreeLounge?.length === 0 && (
				<div className="grid place-items-center">
					<p className="text-2xl">라운지가 없습니다.</p>
				</div>
			)}

			<ul className="grid grid-cols-1 gap-y-5">
				{noFreeLounge.map((lounge) => (
					<li
						key={lounge.id}
						className="border-l-4 border-[#DBC1AD] rounded-md h-14 px-2 grid items-center"
					>
						<Link href={`/lounges/${lounge.id}`}>
							<div className="flex flex-row items-center">
								<img
									src={lounge.imageUrl}
									className="w-10 h-10 bg-black"
								/>
								<div className="ml-3 flex flex-col">
									<p>{lounge.name}</p>
									<p>{lounge.introduction}</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</MainBox>
	);
}

export default LoungesList;
