"use client";

import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUpForm() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmitSignUpForm = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const { email, password, passwordConfirm } = formData;

		if (!email) {
			return alert("이메일을 입력하세요");
		}

		if (!password) {
			return alert("비밀번호를 입력하세요");
		}

		if (password !== passwordConfirm)
			return alert("비밀번호와 비밀번호 확인이 일치하지 않아요");

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					user_name: name,
					avatar_url: null,
				},
			},
		});

		if (data.user) {
			alert("회원가입 성공");
			router.push("/");
		} else {
			alert(`회원가입 실패: ${error?.message}`);
		}
	};

	return (
		<form
			onSubmit={handleSubmitSignUpForm}
			className="mx-auto w-80 grid grid-cols-1 gap-y-4"
		>
			<input
				className="border p-4"
				name="email"
				type="text"
				placeholder="이메일"
				value={formData.email}
				onChange={handleChange}
			/>
			<input
				className="border p-4"
				name="password"
				type="password"
				placeholder="비밀번호"
				value={formData.password}
				onChange={handleChange}
			/>

			<input
				className="border p-4"
				name="passwordConfirm"
				type="password"
				placeholder="비밀번호 확인"
				value={formData.passwordConfirm}
				onChange={handleChange}
			/>

			<button
				type="submit"
				className="border bg-black text-white p-4 font-bold"
			>
				회원가입
			</button>
		</form>
	);
}

export default SignUpForm;
