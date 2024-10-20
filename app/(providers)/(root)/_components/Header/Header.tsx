"use client";

import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import Link from "next/link";
import { FaBell, FaSearch } from "react-icons/fa";

function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	const handleClickLogOut = () => supabase.auth.signOut();

	// const handleClickProfile = () => {
	// 	return (
	// 		<div>
	// 			<button onClick={handleClickLogOut}>로그아웃</button>
	// 		</div>
	// 	);
	// };

	return (
		<header className="px-[calc((100%-1500px)/2)] h-20 border-b flex flex-row items-center bg-[#433E49] text-white">
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
					<FaBell className="text-3xl" />
				</Link>

				{isLoggedIn ? (
					<button
						onClick={handleClickLogOut}
						className="w-10 h-10 bg-white rounded-full text-black"
					></button>
				) : (
					<div>
						<Link
							href={"/sign-up"}
							className="font-medium text-base rounded-[15px] border border-white py-1.5 px-2.5"
						>
							로그인/회원가입
						</Link>
					</div>
				)}

				{/* <TiThMenu className="text-4xl" /> */}
			</div>
		</header>
	);
}

export default Header;
