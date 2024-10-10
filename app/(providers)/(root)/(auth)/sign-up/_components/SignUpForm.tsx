function SignUpForm() {
	return (
		<form className="mx-auto w-80 grid grid-cols-1 gap-y-4">
			<input
				name="email"
				placeholder="이메일"
				className="border p-4"
				type="email"
			/>
			<input
				name="password"
				placeholder="비밀번호"
				className="border p-4"
				type="password"
			/>
			<input
				name="password"
				placeholder="비밀번호 확인"
				className="border p-4"
				type="password"
			/>

			<button className="border bg-black text-white p-4 font-bold">
				가입하기
			</button>
		</form>
	);
}

export default SignUpForm;
