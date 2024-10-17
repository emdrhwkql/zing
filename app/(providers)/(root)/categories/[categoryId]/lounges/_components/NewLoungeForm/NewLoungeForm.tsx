"use client";

import Input from "@/components/Input";
import useNewLoungeForm from "./NewLoungeForm.hooks";

function NewLoungeForm() {
	const { inputRef, handleClickAddCategory, isCreateOnProcess } =
		useNewLoungeForm();

	return (
		<div>
			<Input ref={inputRef} type="text" name="name" helpText="이름적어" />

			<button
				onClick={handleClickAddCategory}
				className="bg-black text-white p-2 font-bold text-sm"
				disabled={isCreateOnProcess}
			>
				추가하기
			</button>
		</div>
	);
}

export default NewLoungeForm;
