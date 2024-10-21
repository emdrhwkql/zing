import { Suspense } from 'react';
import PostBox from "@/components/PostBox";
import supabase from "@/supabase/client";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from 'next/navigation';

interface Lecture {
    id: number;
    lectureTitle: string;
    lectureCurriculum: string;
    imageUrl: string | null;
    cityAddress: string;
    categoryOne: string;
    categoryTwo: string;
    categoryThree: string;
    cityName: string;
    createdAt: string;
    finalSaved: string;
    lectureCharge: number;
    provinceName: string;
}

async function getLectures(): Promise<Lecture[]> {
    const randomNumbs = Math.floor(Math.random() * 1000);
    const response = await supabase
        .from("lectures")
        .select()
        .limit(randomNumbs);

    if (response.error) {
        console.error("Error fetching lectures:", response.error);
        notFound();
    }

    return response.data as Lecture[];
}

export default async function LeturesLists() {
    const lectures = await getLectures();
    const time = dayjs().format("YYYY-MM-DD");
    if (!lectures || lectures.length === 0) return <p>No lectures available.</p>;
    const slicedLectures = lectures.slice(-4);

    return (
        <Suspense fallback={<div>Loading lectures...</div>} >
            <PostBox >
                <div className="mb-4 pb-6 flex flex-row justify-between items-center font-bold text-2xl border-b w-[1680px]" >
                    <h1>함께 배우는 취미</h1>
                    <p className="text-sm opacity-60" >
                    </p>
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[1680px]">
                    {lectures.map((lecture) => (
                        <li
                            key={lecture.id}
                            className="relative bg-black rounded-lg overflow-hidden"
                        >
                            <Link href={`/lectures/${lecture.id}`}>
                                <img
                                    src={lecture.imageUrl ? `https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}` : '/default-image.png'}
                                    alt={lecture.lectureTitle}
                                    className="w-full h-40 object-cover opacity-80"
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
                                            <p>{lecture.cityAddress}</p>
                                        </div>
                                        <span className="leading-3 ml-auto">{time}</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </PostBox>
        </Suspense>
    );
}