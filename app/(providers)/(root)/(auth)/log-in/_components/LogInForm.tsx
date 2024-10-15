"use client";

import Input from "@/components/Input";
import supabase from "@/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ImYelp } from "react-icons/im";

type HandleSubmitLogInFormEvent = React.FormEvent<HTMLFormElement> & {
	target: HTMLFormElement & {
		firstName: HTMLInputElement;
		lastName: HTMLInputElement;
		email: HTMLInputElement;
		password: HTMLInputElement;
		passwordConfirmInputRef: HTMLInputElement;
	};
};

function LogInForm() {
	const router = useRouter();

	const handleSubmitLoginForm: ComponentProps<"form">["onSubmit"] = async (
		e: HandleSubmitLogInFormEvent
	) => {
		e.preventDefault();

		const email = e.target.email.value;
		const password = e.target.password.value;

		// 예외 처리
		if (!email) return alert("이메일 주소를 입력해 주세요.");
		if (!password) return alert("비밀번호를 입력해 주세요.");
		if (!email.includes("@"))
			return alert("올바른 이메일 주소를 적어 주세요.");
		if (password.length < 8)
			return alert("비밀번호는 8글자 이상이어야 합니다.");

		const response = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (response.data.user) {
			alert("축하합니다. 로그인에 성공하였습니다.");

			router.push("/");
		} else {
			alert("로그인에 실패하였습니다.");
		}
	};

	return (
		<div className="mx-auto w-[1000px] grid grid-cols-2 gap-x-4  bg-slate-600 p-4 rounded-xl">
			<div className="bg-black relative rounded-lg">
				<img
					src="https://i.pinimg.com/enabled/564x/0a/61/64/0a6164ac2da2d20ee8b0768ca1d81dde.jpg"
					className="w-full h-[800px] opacity-80 object-cover rounded-lg"
				/>

				<div className="absolute top-4 left-4 text-white text-4xl">
					<ImYelp />
				</div>

				<div className="absolute top-4 right-4 w-36 h-7">
					<div className="bg-white/30 rounded-full text-sm text-white">
						<Link href={"/"}>
							<p className="text-center flex flex-row items-center justify-center gap-x-2">
								Back to website
								<FaArrowRight className="text-xs" />
							</p>
						</Link>
					</div>
				</div>

				<div className="w-full absolute bottom-10 left-2/4 translate-x-[-50%] text-white">
					<p className="text-center font-medium text-2xl">
						Enjoying your hobbies,
						<br />
						Let everyone know about your hobbies.
					</p>
				</div>
			</div>

			<div className="grid place-items-center">
				<div className="flex flex-col justify-center">
					<h1 className="font-bold text-4xl text-white">
						Create an account
					</h1>

					<div className="my-6 flex flex-row gap-x-3 text-sm font-semibold">
						<p className="text-white/70">
							Don't have an account yet?
						</p>

						<Link
							href={"/sign-up"}
							className="border-b text-violet-900 border-violet-900"
						>
							Sign up
						</Link>
					</div>

					<form
						onSubmit={handleSubmitLoginForm}
						className="w-96 grid grid-cols-1 gap-y-4"
					>
						{/* 이메일 */}
						<Input
							type="email"
							name="email"
							helpText="이메일을 입력해주세요."
							placeholder="Enter your email"
						/>

						{/* 비밀번호 */}
						<Input
							type="password"
							name="password"
							helpText="비밀번호를 입력해주세요."
							placeholder="Enter your password"
						/>

						<button
							type="submit"
							className="bg-slate-800 text-white font-normal text-lg p-4 rounded-md"
						>
							Let's be together
						</button>

						<div className="flex flex-row justify-center items-center">
							<div className="w-full h-0.5 bg-gray-400" />
							<p className="w-full mx-3 text-center leading-normal text-gray-400">
								Or register with
							</p>
							<div className="w-full h-0.5 bg-gray-400" />
						</div>

						<div className="flex flex-row gap-x-4 text-white">
							<button className="w-full inline-block border border-gray-300 rounded-md py-4 text-center">
								google
							</button>

							<button className="w-full inline-block border border-gray-300 rounded-md py-4 text-center">
								naver
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LogInForm;
