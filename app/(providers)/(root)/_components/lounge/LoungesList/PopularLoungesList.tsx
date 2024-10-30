import SideBox from "@/components/SideBox";
import { Lounges } from "@/types/lounge.types";
import Link from "next/link";

function PopularLoungesList({ lounges }: { lounges: Lounges }) {
	const noFreeLounge = lounges?.filter((lounge) => lounge.categoryId !== 0);

	return (
		<SideBox>
			<div className="mb-4 pb-4 border-b flex flex-row">
				<h1 className="font-bold text-xl">인기 라운지</h1>
				<p className="h-full ml-3 mt-auto font-medium text-md">TOP 5</p>
			</div>

			{noFreeLounge?.length === 0 && (
				<div className="grid place-items-center pt-5">
					<p className="text-2xl">인기 라운지가 없습니다.</p>
				</div>
			)}

			<ul className="grid grid-cols-1 gap-y-5">
				{noFreeLounge
					.map((lounge) => (
						<li
							key={lounge.id}
							className="border-l-4 border-[#DBC1AD] rounded-md h-14 px-2 grid items-center hover:-translate-x-4 hover:duration-300"
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
					))
					.slice(0, 5)}
			</ul>
		</SideBox>
	);
}

export default PopularLoungesList;
