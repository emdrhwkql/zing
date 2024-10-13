import PostBox from "@/components/PostBox";
import dayjs from "dayjs";
import Link from "next/link";
import { FaRegHeart, FaShareAlt } from "react-icons/fa";

function PostsList() {
	const time = dayjs().format("YYYY-MM-DD");

	const postId = 1;

	return (
		<PostBox>
			<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b">
				<h1>인기 게시물</h1>
				<p className="text-sm opacity-60">
					<Link href={"/PostsList/PostListsPage"}>더보기</Link>
				</p>
			</div>

			<ul className="flex flex-row justify-between">
				<li className="w-48">
					<div className="flex flex-row gap-x-2 items-center pb-2">
						<div className="w-4 h-4 bg-gray-500 rounded-md"></div>

						<p>사용자 ID</p>
					</div>

					<Link href={`/PostsList/${postId}/PostsListDetailPage`}>
						<div className="w-48 h-48 bg-gray-300"></div>

						<h1 className="font-semibold text-lg">
							Lorem, ipsum dolor.
						</h1>

						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Fuga, et.
						</p>
					</Link>

					<div className="flex flex-row items-center mt-2 pt-2 border-t">
						<span className="leading-3">{time}</span>

						<div className="ml-auto flex flex-row gap-x-3">
							<FaRegHeart />
							<FaShareAlt />
						</div>
					</div>
				</li>

				<li className="w-48">
					<div className="flex flex-row gap-x-2 items-center pb-2">
						<div className="w-4 h-4 bg-gray-500 rounded-md"></div>

						<p>사용자 ID</p>
					</div>

					<Link href={`/PostsList/${postId}/PostsListDetailPage`}>
						<div className="w-48 h-48 bg-gray-300"></div>

						<h1 className="font-semibold text-lg">
							Lorem, ipsum dolor.
						</h1>

						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Fuga, et.
						</p>
					</Link>

					<div className="flex flex-row items-center mt-2 pt-2 border-t">
						<span className="leading-3">{time}</span>

						<div className="ml-auto flex flex-row gap-x-3">
							<FaRegHeart />
							<FaShareAlt />
						</div>
					</div>
				</li>

				<li className="w-48">
					<div className="flex flex-row gap-x-2 items-center pb-2">
						<div className="w-4 h-4 bg-gray-500 rounded-md"></div>

						<p>사용자 ID</p>
					</div>

					<Link href={`/PostsList/${postId}/PostsListDetailPage`}>
						<div className="w-48 h-48 bg-gray-300"></div>

						<h1 className="font-semibold text-lg">
							Lorem, ipsum dolor.
						</h1>

						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Fuga, et.
						</p>
					</Link>

					<div className="flex flex-row items-center mt-2 pt-2 border-t">
						<span className="leading-3">{time}</span>

						<div className="ml-auto flex flex-row gap-x-3">
							<FaRegHeart />
							<FaShareAlt />
						</div>
					</div>
				</li>

				<li className="w-48">
					<div className="flex flex-row gap-x-2 items-center pb-2">
						<div className="w-4 h-4 bg-gray-500 rounded-md"></div>

						<p>사용자 ID</p>
					</div>

					<Link href={`/PostsList/${postId}/PostsListDetailPage`}>
						<div className="w-48 h-48 bg-gray-300"></div>

						<h1 className="font-semibold text-lg">
							Lorem, ipsum dolor.
						</h1>

						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Fuga, et.
						</p>
					</Link>

					<div className="flex flex-row items-center mt-2 pt-2 border-t">
						<span className="leading-3">{time}</span>

						<div className="ml-auto flex flex-row gap-x-3">
							<FaRegHeart />
							<FaShareAlt />
						</div>
					</div>
				</li>
			</ul>
		</PostBox>
	);
}

export default PostsList;
