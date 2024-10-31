"use client";

import LectureClassListDetailPage from "../LectureClassListDetailPage";


export default function LecutreDetailPageWrapper({ params }: { params: { classId: string } }) {
    console.log("Wrapper classId:", params.classId);
    return <LectureClassListDetailPage params={params} />;
}