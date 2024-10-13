import PostBox from "@/components/PostBox";
import dayjs from "dayjs";
import Link from "next/link";

function HobbyClassList() {
	const time = dayjs().format("YYYY-MM-DD");

	const classId = 1;

	return (
		<PostBox>
			<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b">
				<h1>함께 배우는 취미</h1>
				<p className="text-sm opacity-60">
					<Link href={"/HobbyClassList/HobbyClassListPage"}>
						더보기
					</Link>
				</p>
			</div>

			<ul className="grid grid-cols-2 gap-4">
				<li className="relative bg-black">
					<Link
						href={`/HobbyClassList/${classId}/HobbyClassListDetailPage`}
					>
						<img
							src="https://i.pinimg.com/564x/3d/f6/71/3df6716aa17f451d99f402cfc16a1cbf.jpg"
							className="w-full h-40 object-cover opacity-80"
						/>

						<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
							<h1 className="pb-1 font-bold text-3xl">제목</h1>

							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Dicta, deleniti.
							</p>

							<div className="flex flex-row items-center">
								<div className="flex flex-row gap-x-4">
									<p>작성자</p>

									<p>장소</p>
								</div>

								<span className="leading-3 ml-auto">
									{time}
								</span>
							</div>
						</div>
					</Link>
				</li>

				<li className="relative bg-black">
					<Link
						href={`/HobbyClassList/${classId}/HobbyClassListDetailPage`}
					>
						<img
							src="https://i.pinimg.com/564x/79/04/32/790432d052b8556e0da8103241ee7cbb.jpg"
							className="w-full h-40 object-cover opacity-80"
						/>

						<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
							<h1 className="pb-1 font-bold text-3xl">제목</h1>

							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Dicta, deleniti.
							</p>

							<div className="flex flex-row items-center">
								<div className="flex flex-row gap-x-4">
									<p>작성자</p>

									<p>장소</p>
								</div>

								<span className="leading-3 ml-auto">
									{time}
								</span>
							</div>
						</div>
					</Link>
				</li>

				<li className="relative bg-black">
					<Link
						href={`/HobbyClassList/${classId}/HobbyClassListDetailPage`}
					>
						<img
							src="https://i.pinimg.com/564x/f5/b7/1f/f5b71febcdb2e8e9608dbfac1c8e122d.jpg"
							className="w-full h-40 object-cover opacity-80"
						/>

						<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
							<h1 className="pb-1 font-bold text-3xl">제목</h1>

							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Dicta, deleniti.
							</p>

							<div className="flex flex-row items-center">
								<div className="flex flex-row gap-x-4">
									<p>작성자</p>

									<p>장소</p>
								</div>

								<span className="leading-3 ml-auto">
									{time}
								</span>
							</div>
						</div>
					</Link>
				</li>

				<li className="relative bg-black">
					<Link
						href={`/HobbyClassList/${classId}/HobbyClassListDetailPage`}
					>
						<img
							src="https://i.pinimg.com/564x/2a/91/36/2a9136b3bb71ceb2cff3e1bc0a4c38db.jpg"
							className="w-full h-40 object-cover opacity-80"
						/>

						<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
							<h1 className="pb-1 font-bold text-3xl">제목</h1>

							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Dicta, deleniti.
							</p>

							<div className="flex flex-row items-center">
								<div className="flex flex-row gap-x-4">
									<p>작성자</p>

									<p>장소</p>
								</div>

								<span className="leading-3 ml-auto">
									{time}
								</span>
							</div>
						</div>
					</Link>
				</li>
			</ul>
		</PostBox>
	);
}

export default HobbyClassList;
