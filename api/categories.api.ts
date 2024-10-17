import supabase from "@/supabase/client";

async function createCategory(categoryName: string) {
	await supabase.from("categories").insert({ categoryName });
}

async function getCategory() {
	const randomNumbs = Math.floor(Math.random() * 1000);

	const response = await supabase
		.from("categories")
		.select("*")
		.limit(randomNumbs);

	const categories = response.data;

	if (!categories) return null;

	return categories;
}

const categoriesAPI = {
	createCategory,
	getCategory,
};

export default categoriesAPI;
