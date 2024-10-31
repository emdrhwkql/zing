"use client";

import LecutreClassListDetailPage from "../LectureClassListDetailPage";

export default function LecutreDetailPageWrapper({ params }: { params: { classId: string } }) {
    console.log("Wrapper classId:", params.classId);
    return <LecutreClassListDetailPage params={params} />;
}