"use client";

import HobbyClassListDetailPage from "../HobbyClassListDetailPage";

export default function HobbyDetailPageWrapper({ params }: { params: { classId: string } }) {
    console.log("Wrapper classId:", params.classId);
    return <HobbyClassListDetailPage params={params} />;
}