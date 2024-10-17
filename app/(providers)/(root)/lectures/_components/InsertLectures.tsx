"use client";

import { classApi } from "@/api/class.api";
import supabase from "@/supabase/client";

function InsertLectures() {
	const handleClickLectures = async () => {
		const response = await classApi();
		const lectures = response.data;
		const lectureAdd = lectures.forEach(
			async (lecture) =>
				await supabase.from("lectures").insert({
					locationName: lecture["법정읍면동명칭"],
					cityName: lecture["시군구 명칭"],
					cityAddress: lecture["시군구 주소"],
					provinceName: lecture["시도 명칭"],
					finalSaved: lecture["최종작성일"],
					categoryOne: lecture["카테고리1"],
					categoryTwo: lecture["카테고리2"],
					categoryThree: lecture["카테고리3"],
					lectureTime: lecture["클래스 시간"],
					lectureCost: lecture["클래스 시간당 비용"],
					lecturCharge: lecture["클래스 요금"],
					lecturePersonnel: lecture["클래스 인원"],
					lectureCurriculum: lecture["클래스 커리큘럼"],
					lectureTitle: lecture["클래스 타이틀"],
					imageUrl: [],
				})
		);
		console.log(lectureAdd);
	};

	return (
		<div>
			<button onClick={handleClickLectures}>123</button>
		</div>
	);
}

export default InsertLectures;
