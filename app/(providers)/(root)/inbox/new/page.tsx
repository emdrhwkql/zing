"use client";

import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function InboxPage() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const checkUser = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();

			if (error || !session?.user) {
				router.push("/log-in");
			}
		};

		checkUser();
	}, [router]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const {
				data: { user },
				error: authError,
			} = await supabase.auth.getUser();

			if (authError || !user) {
				throw new Error(
					"로그인 상태가 아닙니다. 다시 로그인 해주세요."
				);
			}

			// data 있었는데 사용안해서 일단 없앰 {data, error}
			const { error } = await supabase
				.from("inbox")
				.insert({
					title,
					content,
					createdAt: new Date().toISOString(),
					userId: user.id,
				})
				.select("*");

			if (error) {
				throw error;
			}
			router.push("/inbox");
			alert("포스트 생성에 성공하였습니다.");
		} catch (error) {
			console.error("Post creation failed:", error);
			alert("게시물 생성에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">새 포스터 작성</h1>
			<form className="space-y-4" onSubmit={handleSubmit}>
				{/* Title input */}
				<div>
					<label htmlFor="title" className="block text-xl font-bold">
						제목
					</label>
					<input
						id="title"
						type="text"
						placeholder="제목을 입력해주세요"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-2 border rounded"
					/>
				</div>

				{/* Content input */}
				<div>
					<label
						htmlFor="content"
						className="block text-xl font-bold"
					>
						내용
					</label>
					<input
						id="content"
						type="text"
						placeholder="내용을 입력해주세요"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="w-full p-2 border rounded"
					/>
				</div>

				{/* Submit button */}
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded-sm"
					disabled={isSubmitting}
				>
					{isSubmitting ? "추가 중..." : "추가"}
				</button>
			</form>
		</div>
	);
}

export default InboxPage;
