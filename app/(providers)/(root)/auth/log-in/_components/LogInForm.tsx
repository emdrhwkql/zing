"use client";

import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginForm() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmitLoginForm = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const { email, password } = formData;

		if (!email) {
			return alert("이메일을 입력하세요");
		}

		if (!password) {
			return alert("비밀번호를 입력하세요");
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (data?.session) {
			alert("로그인 성공");
			router.push("/");
		} else {
			alert(`로그인 실패: ${error?.message}`);
		}
	};

	return (
		<form
			onSubmit={handleSubmitLoginForm}
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

			<button
				type="submit"
				className="border bg-black text-white p-4 font-bold"
			>
				로그인
			</button>
		</form>
	);
}

export default LoginForm;
