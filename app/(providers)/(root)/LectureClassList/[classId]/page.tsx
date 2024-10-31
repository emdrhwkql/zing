"use client";

import LectureClassListDetailPage from "../LectureClassListDetailPage";


export default function LecutreDetailPageWrapper({ params }: { params: { classId: string } }) {
    console.log("클래스아이디가 안불러와집니다.:", params.classId);
    return <LectureClassListDetailPage params={params} />
}