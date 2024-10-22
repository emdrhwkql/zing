"use client";

import MainBox from "@/components/MainBox";
import Page from "@/components/Page";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useLecturesList from "./LecturesList.hooks";

function LecturesList({
	isShowSeeMore,
	isShowList,
}: {
	isShowSeeMore?: boolean;
	isShowList?: boolean;
}) {
	const { lectures } = useLecturesList();

	const [isShowMore, setIsShowMore] = useState(false);

	return (
		<div>
			{isShowList ? (
				<MainBox>
					{isShowSeeMore && (
						<div className="mb-4 pb-4 flex flex-row justify-between items-center font-bold text-2xl border-b text-black">
							<h1>함께 배우는 재미</h1>
							<p className="text-sm opacity-60">
								<Link href={"lectures"}>더보기</Link>
							</p>
						</div>
					)}

					{isShowMore ? (
						<div className="w-">
							<ul className="grid grid-cols-2 gap-4">
								{lectures
									?.map((lecture) => (
										<li
											key={lecture["lectureTitle"]}
											className="relative bg-black"
										>
											<Link
												href={`/HobbyClassList/${lecture.id}/HobbyClassListDetailPage`}
											>
												<img
													src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}`}
													className="w-full h-40 object-cover opacity-80"
												/>

												<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
													<h1 className="pb-1 font-bold text-lg">
														{lecture["lectureTitle"]
															.length < 25
															? lecture[
																	"lectureTitle"
															  ]
															: lecture[
																	"lectureTitle"
															  ].substring(
																	0,
																	25
															  )}
													</h1>

													<p>
														{lecture[
															"lectureCurriculum"
														].length < 8
															? null
															: lecture[
																	"lectureCurriculum"
															  ].substring(
																	0,
																	40
															  ) + "..."}
													</p>

													<div className="flex flex-row items-center">
														<div className="flex flex-row gap-x-4">
															<p>아무개</p>

															<p>
																{
																	lecture[
																		"cityAddress"
																	]
																}
															</p>
														</div>

														<span className="leading-3 ml-auto">
															{lecture.createdAt.slice(
																0,
																10
															)}
														</span>
													</div>
												</div>
											</Link>
										</li>
									))
									.slice(0, 8)}
							</ul>

							<div className="mt-3 flex justify-center relative">
								<button
									onClick={() => {
										setIsShowMore((e) => !e);
									}}
									className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
								>
									<FaMinus className="text-2xl" />
								</button>
							</div>
						</div>
					) : (
						<div className="w-">
							<ul className="grid grid-cols-2 gap-4">
								{lectures
									?.map((lecture) => (
										<li
											key={lecture["lectureTitle"]}
											className="relative bg-black"
										>
											<Link
												href={`/lectures/${lecture.id}`}
											>
												<img
													src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}`}
													className="w-full h-40 object-cover opacity-80"
												/>

												<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
													<h1 className="pb-1 font-bold text-lg">
														{lecture["lectureTitle"]
															.length < 25
															? lecture[
																	"lectureTitle"
															  ]
															: lecture[
																	"lectureTitle"
															  ].substring(
																	0,
																	25
															  )}
													</h1>

													<p>
														{lecture[
															"lectureCurriculum"
														].length < 8
															? null
															: lecture[
																	"lectureCurriculum"
															  ].substring(
																	0,
																	40
															  ) + "..."}
													</p>

													<div className="flex flex-row items-center">
														<div className="flex flex-row gap-x-4">
															<p>아무개</p>

															<p>
																{
																	lecture[
																		"cityAddress"
																	]
																}
															</p>
														</div>

														<span className="leading-3 ml-auto">
															{lecture.createdAt.slice(
																0,
																10
															)}
														</span>
													</div>
												</div>
											</Link>
										</li>
									))
									.slice(0, 4)}
							</ul>

							<div className="mt-3 flex justify-center relative">
								<button
									onClick={() => {
										setIsShowMore((e) => !e);
									}}
									className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
								>
									<FaPlus className="text-2xl" />
								</button>
							</div>
						</div>
					)}
				</MainBox>
			) : (
				<Page>
					<div className="px-[calc((100%-1300px)/2)]">
						<h1 className="font-bold text-3xl  pl-3 pb-6">
							함께 즐기는 취미 모음
						</h1>

						<div className="w-full px-8 rounded-md bg-[#4D4246] h-14 flex flex-row items-center text-white text-base font-bold text-center mb-5">
							<div className="flex flex-row gap-x-4">
								<div>첫번째</div>
								<div>두번째</div>
								<div>세번째</div>
								<div>네번째</div>
								<div>다섯번째</div>
							</div>
							<div className="ml-auto flex flex-row gap-x-3"></div>
						</div>

						<div className="flex flex-row gap-x-10 justify-between">
							<div className="w-[800px] p-3">
								<ul className="flex flex-col gap-y-5">
									{lectures?.map((lecture) => (
										<li
											key={lecture["lectureTitle"]}
											className="relative bg-black"
										>
											<Link
												href={`/lectures/${lecture.id}`}
											>
												<img
													src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}`}
													className="w-full h-40 object-cover opacity-80"
												/>

												<div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
													<h1 className="pb-1 font-bold text-lg">
														{lecture["lectureTitle"]
															.length < 25
															? lecture[
																	"lectureTitle"
															  ]
															: lecture[
																	"lectureTitle"
															  ].substring(
																	0,
																	25
															  )}
													</h1>

													<p>
														{lecture[
															"lectureCurriculum"
														].length < 8
															? null
															: lecture[
																	"lectureCurriculum"
															  ].substring(
																	0,
																	40
															  ) + "..."}
													</p>

													<div className="flex flex-row items-center">
														<div className="flex flex-row gap-x-4">
															<p>아무개</p>

															<p>
																{
																	lecture[
																		"cityAddress"
																	]
																}
															</p>
														</div>

														<span className="leading-3 ml-auto">
															{lecture.createdAt.slice(
																0,
																10
															)}
														</span>
													</div>
												</div>
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div className="h-[1000px] flex flex-col items-center gap-y-6 p-3 rounded-md">
								<div className="h-full rounded-xl w-96  bg-white" />
							</div>
						</div>
					</div>
				</Page>
			)}
		</div>
	);
}

export default LecturesList;
