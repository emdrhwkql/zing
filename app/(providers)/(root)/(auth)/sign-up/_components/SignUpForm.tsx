"use client";

import Input from "@/components/Input";
import Page from "@/components/Page";
import supabase from "@/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ImYelp } from "react-icons/im";

type HandleSubmitSignUpFormEvent = React.FormEvent<HTMLFormElement> & {
	target: HTMLFormElement & {
		firstName: HTMLInputElement;
		lastName: HTMLInputElement;
		email: HTMLInputElement;
		password: HTMLInputElement;
		passwordConfirmInputRef: HTMLInputElement;
	};
};

function SignUpForm() {
	const router = useRouter();

	const handleSubmitSignUpForm: ComponentProps<"form">["onSubmit"] = async (
		e: HandleSubmitSignUpFormEvent
	) => {
		e.preventDefault();

		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const passwordConfirm = e.target.password.value;

		// 예외 처리
		if (!firstName) return alert("이름를 입력해 주세요.");
		if (!lastName) return alert("성을 입력해 주세요.");
		if (!email) return alert("이메일 주소를 입력해 주세요.");
		if (!password) return alert("비밀번호를 입력해 주세요.");
		if (!passwordConfirm) return alert("비밀번호 확인을 입력해 주세요.");
		if (!email.includes("@"))
			return alert("올바른 이메일 주소를 적어 주세요.");
		if (password.length < 8)
			return alert("비밀번호는 8글자 이상이어야 합니다.");
		if (password !== passwordConfirm)
			return alert("비밀번호와 같지 않습니다.");

		const response = await supabase.auth.signUp({
			email,
			password,
			options: { data: { nickname: "신규유저" } },
		});

		if (response.data.user) {

			alert("축하합니다. 회원가입에 성공했습니다.");

			router.push("/");
		} else {
			alert("회원가입에 실패하였습니다.");
		}
	};

	const handleGoogleLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		})

		if (error) {
			alert("구글 로그인에 실패하였습니다.")
			console.error("Kakao login error:", error.message)
		}
	}



	const handleKakaoLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'kakao',
		});

		if (error) {
			alert("카카오 로그인에 실패하였습니다.");
			console.error("Kakao login error:", error.message);
		}
	};

	return (
		<Page>
			<div className="mx-auto w-[1000px] grid grid-cols-2 gap-x-4  bg-[#433E49] p-4 rounded-xl">
				<div className="bg-black relative rounded-lg">
					<img
						src="https://i.pinimg.com/enabled/564x/00/02/26/000226c3b462aa5675b4a60bc73055bf.jpg"
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
							The journey begins
						</h1>

						<div className="my-6 flex flex-row gap-x-3 text-sm font-semibold">
							<p className="text-white/70">
								Already have an account?
							</p>

							<Link
								href={"/log-in"}
								className="border-b text-cyan-700 border-cyan-800"
							>
								Log in
							</Link>
						</div>

						<form
							onSubmit={handleSubmitSignUpForm}
							className="w-96 grid grid-cols-1 gap-y-4"
						>
							<div className="grid grid-cols-2 gap-x-4">
								{/* 이름 */}
								<Input
									type="text"
									name="firstName"
									helpText="이름을 입력해주세요."
									placeholder="first name"
								/>
								{/* 성 */}
								<Input
									type="text"
									name="lastName"
									helpText="성을 입력해주세요."
									placeholder="last name"
								/>
							</div>

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
							{/* 비밀번호 확인 */}
							<Input
								type="password"
								name="passwordConfirm"
								helpText="비밀번호를 재입력해주세요."
								placeholder="Re-enter your password"
							/>

							<button
								type="submit"
								className="bg-[#928490] text-white font-normal text-lg p-4 rounded-md"
							>
								Create account
							</button>

							<div className="flex flex-row justify-center items-center">
								<div className="w-full h-0.5 bg-gray-400" />
								<p className="w-full mx-3 text-center leading-normal text-gray-400">
									Or register with
								</p>
								<div className="w-full h-0.5 bg-gray-400" />
							</div>

							<div className="flex flex-row gap-x-4 text-white">
								<button
									onClick={handleKakaoLogin}
									className="w-full inline-block border border-gray-300 rounded-md py-4 text-center">
									kakao
								</button>

								<button
									onClick={handleGoogleLogin}
									className="w-full inline-block border border-gray-300 rounded-md py-4 text-center">
									google
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Page>
	);
}

export default SignUpForm;
