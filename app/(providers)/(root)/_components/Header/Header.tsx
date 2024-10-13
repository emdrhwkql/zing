import Link from "next/link";
import { FaBell, FaSearch } from "react-icons/fa";

function Header() {
	return (
		<header className="px-[calc((100%-1500px)/2)] h-20 border-b flex flex-row items-center bg-gray-700 text-white">
			<div className="ml-5 font-bold text-5xl text-center leading-4">
				<Link href="/">ZING</Link>
			</div>

			<div className="ml-auto flex flex-row items-center gap-x-5 font-medium text-md ">
				<div className="w-64 h-8 bg-[#e0dde4]/75 rounded-full flex flex-row items-center justify-around">
					<input
						name="search"
						type="text"
						className="w-48 bg-transparent outline-none text-black"
					/>

					<FaSearch />
				</div>

				<Link href={"/MessageList"}>
					<FaBell className="text-2xl" />
				</Link>

				<Link
					href={"/auth"}
					className="font-medium text-base rounded-[15px] border border-white py-1.5 px-2.5"
				>
					로그인/회원가입
				</Link>

				{/* <Link href="/log-in">로그인</Link>

				<Link href="/sign-up">회원가입</Link> */}
			</div>
		</header>
	);
}

export default Header;
