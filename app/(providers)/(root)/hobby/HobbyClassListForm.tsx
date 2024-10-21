'use client';

import PostBox from "@/components/PostBox";
import dayjs from "dayjs";
import Link from "next/link";
import { Lecture } from "../lecturer/lecturesone/types/class.types";

export type HobbyClassListProps = {
    lectures: Lecture[];
    isMoreShow: boolean;
};

export default function HobbyClassListForm({ lectures, isMoreShow }: HobbyClassListProps) {
    const time = dayjs().format("YYYY-MM-DD");
    if (!lectures || lectures.length === 0) return <p>강의가 없음</p>;

    return (
        <PostBox>
            <div className="mb-6 pb-2 flex flex-row justify-between items-center font-bold text-2xl border-b">
                <h1>함께 배우는 취미</h1>
                {isMoreShow && (
                    <p className="text-sm opacity-60">
                        <Link href={"lecturer/lecturestwo"}>더보기</Link>
                    </p>
                )}

            </div>
            <ul className="grid grid-cols-2 gap-5">
                {lectures.map((lecture) => {
                    const imageUrl = lecture.imageUrl
                        ? `https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}`
                        : '/default-image.png';

                    return (
                        <li key={lecture.id} className="relative bg-black">
                            <Link href={`hobby/${lecture.id}`}>
                                <img
                                    src={imageUrl}
                                    alt={lecture.lectureTitle}
                                    className="w-full h-40 object-cover opacity-70"
                                />
                                <div className="absolute top-0 left-0 p-4 text-white flex flex-col gap-y-3">
                                    <h2 className="pb-1 font-bold text-lg">
                                        {lecture.lectureTitle.length < 25
                                            ? lecture.lectureTitle
                                            : `${lecture.lectureTitle.substring(0, 25)}...`}
                                    </h2>
                                    {lecture.lectureCurriculum.length >= 8 && (
                                        <p className="text-sm">
                                            {`${lecture.lectureCurriculum.substring(0, 40)}...`}
                                        </p>
                                    )}
                                    <div className="flex flex-row items-center text-xs">
                                        <div className="flex flex-row gap-x-4">
                                            <p>아무개</p>
                                            <p>{lecture.cityAddress}</p>
                                        </div>
                                        <span className="leading-3 ml-auto">{time}</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                }
                )}
            </ul>
        </PostBox>
    );
}