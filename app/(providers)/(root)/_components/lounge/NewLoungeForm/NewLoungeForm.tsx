"use client";

import Input from "@/components/Input";
import useNewLoungeForm from "./NewLoungeForm.hooks";

function NewLoungeForm() {
	const {
		inputNameRef,
		inputIntroductionRef,
		handleClickAddLounge,
		isCreateOnProcess,
	} = useNewLoungeForm();

	return (
		<div>
			<Input
				ref={inputNameRef}
				type="text"
				name="name"
				placeholder="이름적어"
			/>

			<Input
				ref={inputIntroductionRef}
				type="text"
				name="introduction"
				placeholder="소개글 적어"
			/>

			<button
				onClick={handleClickAddLounge}
				className="bg-black text-white p-2 font-bold text-sm"
				disabled={isCreateOnProcess}
			>
				추가하기
			</button>
		</div>
	);
}

export default NewLoungeForm;
