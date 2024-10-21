"use client";
import HobbyDetailPage from "../HobbyDetailPage";

export default function HobbyDetailPageWrapper({ params }: { params: { classId: string } }) {
    console.log("Wrapper classId:", params.classId); // 디버깅을 위한 로그
    return <HobbyDetailPage params={params} />; // searchParams 삭제
}
