"use client";

import Input from "@/components/Input";
import Page from "@/components/Page";
import { LuFilePlus } from "react-icons/lu";
import { MdOutlineCreate } from "react-icons/md";
import useNewLoungeForm from "./NewLoungeForm.hooks";

function NewLoungeForm() {
	const {
		inputNameRef,
		inputIntroductionRef,
		handleClickAddLounge,
		isCreateOnProcess,
	} = useNewLoungeForm();

	return (
		<Page>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className="w-[1000px] bg-[#928490] rounded-md p-4">
					<div className="pb-4 mb-4 border-b flex flex-row items-center">
						<div className="flex flex-row gap-x-2 items-center font-bold text-4xl text-white">
							<MdOutlineCreate />
							<h1>Create a new lounge</h1>
						</div>

						<button
							onClick={handleClickAddLounge}
							className="ml-auto text-white p-2 font-bold rounded-md w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
							disabled={isCreateOnProcess}
						>
							<LuFilePlus />
							<p>글 작성 완료</p>
						</button>
					</div>

					<form className="w-full grid grid-cols-1 gap-y-2">
						<div className="flex flex-row items-center">
							<Input
								ref={inputNameRef}
								type="text"
								name="name"
								placeholder="라운지 이름"
							/>
							<div className="ml-5 text-white  border py-2 px-4">
								이미지 추가
							</div>
						</div>

						<Input
							inputClassName="h-[500px]"
							ref={inputIntroductionRef}
							type="text"
							name="introduction"
							placeholder="소개글 적어"
						/>
					</form>
				</div>

				<div className="bg-[#F3E8EB] rounded-md">
					<div className="bg-black relative rounded-lg">
						<img
							src="https://i.pinimg.com/564x/20/01/6e/20016e676541e5c1fb7f63171033b559.jpg"
							className="w-full h-[700px] opacity-60 object-cover rounded-lg"
						/>

						<div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 text-white text-center font-bold text-3xl flex flex-col gap-y-5">
							<p>
								Are you ready to enjoy
								<br />
								life with everyone?
							</p>

							<p>
								Then share your life
								<br />
								on Zing right now!
							</p>

							<p>
								Everyone is
								<br />
								waiting for you!
							</p>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}

export default NewLoungeForm;
