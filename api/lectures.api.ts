		import supabase from "@/supabase/client";

async function getAllLectures() {
	const randomNumbs = Math.floor(Math.random() * 1000);

	const response = await supabase
		.from("lectures")
		.select("*")
		.limit(randomNumbs);

	const lectures = response.data;

	if (!lectures) return null;

	return lectures;
}

const lecturesAPI = {
	getAllLectures,
};

export default lecturesAPI;
