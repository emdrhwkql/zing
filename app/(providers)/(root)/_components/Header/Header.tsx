import Link from "next/link";

function Header() {
	return (
		<header className="mx-10 h-16 flex flex-row items-center border-b">
			<Link href={"/"} className="font-bold text-3xl">
				ZING
			</Link>

			<div className="ml-auto flex flex-row gap-x-5 font-medium text-md">
				<Link href={"/log-in"}>로그인</Link>
				<Link href={"/sign-up"}>회원가입</Link>
			</div>
		</header>
	);
}

export default Header;
