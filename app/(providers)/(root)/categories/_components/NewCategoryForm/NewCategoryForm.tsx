"use client";

import useNewCategoryForm from "./NewCategoriesForm.hooks";

function NewCategoryForm() {
	const { inputRef, handleClickAddCategory, isCreateOnProcess } =
		useNewCategoryForm();

	return (
		<div className="border-b px-80 px-5 flex">
			<input
				ref={inputRef}
				type="text"
				placeholder="새로운 할 일을 적어주세요"
				className="grow border p-2"
				autoFocus
			/>
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

export default NewCategoryForm;
