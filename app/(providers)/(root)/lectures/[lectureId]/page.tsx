import { Suspense } from 'react';
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
export default async function LeturesList() {
    const lectures = await getLectures();
    const time = dayjs().format("YYYY-MM-DD");
    if (!lectures || lectures.length === 0) return <p>강의가 없습니다. 나중에 다시 찾아와주세요</p>;
    const slicedLectures = lectures.slice(-4);
    return (
        <Suspense fallback={<div>Loading lectures...</div>}>
            <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {lectures.map((lecture) => (
                    <li
                        key={lecture.id}
                        className="relative bg-black rounded-lg overflow-hidden"
                    >
                        <Link href={`/HobbyClassList/${lecture.id}`}>
                        </Link>
                    </li>
                ))}
            </ul>
        </Suspense>
    );
}