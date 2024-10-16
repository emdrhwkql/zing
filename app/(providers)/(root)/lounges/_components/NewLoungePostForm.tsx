"use client";

import Input from "@/components/Input";
import Page from "@/components/Page";
import SideBox from "@/components/SideBox";

function NewLoungePostForm() {
	return (
		<Page>
			<div className="flex flex-row gap-x-10 justify-center">
				<div className="h-full bg-gray-600 flex flex-col items-center gap-y-6 p-3 rounded-md">
					<SideBox />
				</div>

				<div className="bg-gray-600 flex flex-col items-center gap-y-14 p-4 rounded-md">
					<div className="grid place-items-center">
						<div className="flex flex-col justify-center">
							<h1 className="font-bold text-4xl text-white border-b pb-2 mb-2">
								The journey begins
							</h1>

							<form
								// onSubmit={}
								className="w-96 grid grid-cols-1 gap-y-4"
							>
								{/* 제목 */}
								<Input
									type="text"
									name="title"
									placeholder="제목을 입력해주세요."
								/>

								{/* 내용 */}
								<textarea></textarea>

								<button
									type="submit"
									className="bg-slate-800 text-white font-normal text-lg p-4 rounded-md"
								>
									Create account
								</button>
							</form>
						</div>
					</div>

					{/* <HobbyClassList /> */}
				</div>
			</div>
		</Page>
	);
}

export default NewLoungePostForm;
