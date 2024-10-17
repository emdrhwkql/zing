import PostBox from "@/components/PostBox";
import supabase from "@/supabase/client";
import dayjs from "dayjs";
import Link from "next/link";
// 더보기 페이지
async function LecturesListPage() {
	const time = dayjs().format("YYYY-MM-DD");
	const randomNumbs = Math.floor(Math.random() * 1000);
	const response = await supabase
		.from("lectures")
		.select()
		.limit(randomNumbs);
	const lectures = response.data;
	console.log(response.data);
	if (!lectures) return console.log("에러");
	return (
		<PostBox>
			<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b">
				<h1>함께 배우는 취미</h1>
			</div>

			<ul className="grid grid-cols-4 gap-4">
				{lectures.map((lecture) => (
					<li
						key={lecture["lectureTitle"]}
						className="relative bg-black"
					>
						<Link
							href={`/HobbyClassList/${lecture.id}/HobbyClassListDetailPage`}
						>
							<img
								src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}`}
								className="w-full h-40 object-cover opacity-80"
							/>

							<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
								<h1 className="pb-1 font-bold text-lg">
									{lecture["lectureTitle"].length < 25
										? lecture["lectureTitle"]
										: lecture["lectureTitle"].substring(
												0,
												25
										  )}
								</h1>

								<p>
									{lecture["lectureCurriculum"].length < 8
										? null
										: lecture[
												"lectureCurriculum"
										  ].substring(0, 40) + "..."}
								</p>

								<div className="flex flex-row items-center">
									<div className="flex flex-row gap-x-4">
										<p>아무개</p>

										<p>{lecture["cityAddress"]}</p>
									</div>

									<span className="leading-3 ml-auto">
										{time}
									</span>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</PostBox>
	);
}

export default LecturesListPage;
