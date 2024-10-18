"use client";

import Input from "@/components/Input";
import useNewPostForm from "./NewPostForm.hooks";

function NewPostForm() {
	const {
		inputTitleRef,
		inputContentRef,
		handleClickAddPost,
		isCreateOnProcess,
	} = useNewPostForm();

	return (
		<div>
			<Input
				ref={inputTitleRef}
				type="text"
				name="title"
				placeholder="제목을 지어주세요."
			/>

			<Input
				ref={inputContentRef}
				type="text"
				name="content"
				placeholder="내용을 넣어주세요."
			/>

			<button
				onClick={handleClickAddPost}
				className="bg-black text-white p-2 font-bold"
				disabled={isCreateOnProcess}
			></button>
		</div>
	);
}

export default NewPostForm;
