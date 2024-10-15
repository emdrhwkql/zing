import Link from "next/link";

export default function Home() {
	return (
		<div className="flex p-5">
			{/* Sidebar */}
			<div className="w-1/5 bg-gray-100 p-5">

				<Link href="/PostWritingPage1">
					<button className="bg-black text-white w-full py-2 mb-4" >글쓰기</button>
				</Link>

				<nav>
					<ul>
						<li className="mb-2">모집</li>
						<li className="mb-2">TIP</li>
						<li className="mb-2">공지</li>
						<li className="mb-2">프리뷰 & 리뷰</li>
						<li className="mb-2">자유</li>
						<li className="mb-2">질문</li>
						<li className="mb-2">뉴스</li>
						<li className="mb-2">연예인</li>
						<li className="mb-2">시리즈</li>
						<li className="mb-2">이벤트</li>
					</ul>
				</nav>
			</div>

			{/* Main Content */}
			<div className="w-3/5 p-5">
				<div className="border-b pb-4 mb-4">

					{/* 이쪽에다 실시간 게시물 추가 */}
				</div>

				{/* 여기 포함  */}
				<div className="post-content">


				</div>
			</div>

			{/* Widgets */}
			<div className="w-1/5 p-5">
				{/* Popular Posts */}
				<div className="mb-8">
					<h2 className="font-bold text-lg mb-2">자유 인기글</h2>
					<ul className="text-sm">
						<li className="mb-2">등등</li>
						<li className="mb-2">등등</li>
						<li className="mb-2">다른 인기글</li>
					</ul>
				</div>

				{/* Latest Posts */}
				<div>
					<h2 className="font-bold text-lg mb-2">자유 최신글</h2>
					<ul className="text-sm">
						<li className="mb-2">등등</li>
						<li className="mb-2">등등</li>
						<li className="mb-2">더 보기</li>
					</ul>
				</div>
			</div>
		</div>
	);
}