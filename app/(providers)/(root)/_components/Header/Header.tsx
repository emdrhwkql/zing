"use client";

import api from "@/api/api";
import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isPopularLoungeOpen, setIsPopularLoungeOpen] = useState(false);
	const currentUser = useAuthStore((state) => state.currentUser);
	const router = useRouter();

	const { data: profile } = useQuery({
		queryKey: ["users"],
		queryFn: async () => api.users.getUser(currentUser!),
	});

	const { data: lounges } = useQuery({
		queryKey: ["lounges"],
		queryFn: async () => api.lounges.getAllLounges(),
	});

	const noFreeLounge = lounges?.filter((lounge) => lounge.categoryId !== 0);

	const handleClickLogOut = async () => {
		await supabase.auth.signOut();
		router.push("/");
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
		}
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const togglePopularLounge = () => {
		setIsPopularLoungeOpen(!isPopularLoungeOpen);
	};

	return (
		<>
			<header className="px-[calc((100%-1500px)/2)] h-20 border-b flex flex-row items-center bg-[#E2803F] text-white">
				<div className="ml-5 font-bold text-5xl text-center leading-4">
					<Link href="/">ZING</Link>
				</div>

				<div className="ml-auto flex flex-row items-center gap-x-5 font-medium text-md">
					<div className="w-64 h-8 bg-[#e0dde4]/75 rounded-full flex flex-row items-center justify-around">
						<form
							onSubmit={handleSearch}
							className="flex items-center"
						>
							<input
								name="search"
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-48 bg-transparent outline-none text-black"
								placeholder="검색해주세요"
							/>
							<button
								type="submit"
								aria-label="검색"
								className="p-4"
							>
								<FaSearch className="text-2xl" />
							</button>
						</form>
					</div>

					<div className="flex flex-row gap-x-5 items-center">
						<Link
							href="/inbox"
							className="hover:text-white hover:scale-110 hover:duration-300"
							aria-label="알림"
						>
							<FaBell className="text-3xl " />
						</Link>

						{isLoggedIn ? (
							<Link
								href="/my-profile"
								className="hover:text-white hover:scale-110 hover:duration-300"
								aria-label="프로필"
							>
								<img
									src={profile?.profileImg || ""}
									alt="프로필 이미지"
									className="w-10 h-10 rounded-full bg-black"
								/>
							</Link>
						) : (
							<Link
								href="/sign-up"
								className="font-medium text-base rounded-[15px] border border-white py-1.5 px-2.5 hover:text-white hover:scale-110 hover:duration-300"
							>
								로그인/회원가입
							</Link>
						)}

						<button
							aria-label="메뉴 열기"
							onClick={toggleSidebar}
							className="hover:text-white hover:scale-110 hover:duration-300	"
						>
							<TiThMenu className="text-4xl" />
						</button>
					</div>
				</div>
			</header>

			<div
				className={`fixed top-0 right-0 h-full w-64 bg-[#433E49] text-white shadow-lg transform ${
					isSidebarOpen ? "translate-x-0" : "translate-x-full"
				} transition-transform duration-300 ease-in-out z-50`}
			>
				<button
					onClick={toggleSidebar}
					className="text-2xl absolute top-5 right-5 p-4 hover:text-white"
					aria-label="사이드바 X"
				>
					&times;
				</button>
				{/* 로그아웃 일 때 보기 보여주기 */}
				<nav className="flex flex-col p-4 gap-y-1 mt-6">
					<Link
						href="/"
						className="text-lg p-4 text-gray-400 hover:text-white relative"
						onClick={toggleSidebar}
					>
						<span className="hover:text-white">홈</span>
					</Link>

					<Link
						href="/inbox"
						className="text-lg p-4 text-gray-400 hover:text-white relative"
						onClick={toggleSidebar}
					>
						<span className="hover:text-white">알림</span>
					</Link>

					<Link
						href="/lounges/0"
						className="text-lg p-4 text-gray-400 hover:text-white relative"
						onClick={toggleSidebar}
					>
						<span className="hover:text-white">자유게시판</span>
					</Link>
					<button
						onClick={togglePopularLounge}
						className="text-lg p-4 text-gray-400 hover:text-white relative"
					>
						<span className="hover:text-white">
							인기 라운지 목록
						</span>
					</button>
					<div
						className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
							isPopularLoungeOpen ? "max-h-screen" : "max-h-0"
						}`}
					>
						{noFreeLounge?.map((lounge) => (
							<Link
								key={lounge.id}
								href={`/lounges/${lounge.id}`}
								className="text-lg p-2 text-gray-400 hover:text-white relative pl-8"
								onClick={toggleSidebar}
							>
								<span>{lounge.name}</span>
							</Link>
						))}
					</div>
					{isLoggedIn && (
						<>
							{/* 로그인 상태 일 때 보여주기 */}
							<Link
								href="/my-profile"
								className="text-lg p-4 text-gray-400 hover:text-white relative"
								onClick={toggleSidebar}
							>
								<span className="hover:text-white">
									내 프로필
								</span>
							</Link>
							<button
								onClick={() => {
									handleClickLogOut();
									toggleSidebar();
								}}
								className="text-lg text-left p-4 text-gray-400 hover:text-white relative"
								aria-label="로그아웃"
							>
								<span className="hover:text-white">
									로그아웃
								</span>
							</button>
						</>
					)}
				</nav>
			</div>

			{/* 오버레이에유 히히~ */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-40"
					onClick={toggleSidebar}
					aria-label="오버레이"
				/>
			)}
		</>
	);
}

export default Header;
