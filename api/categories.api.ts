import supabase from "@/supabase/client";

async function getCategory(categoryId: number) {
	const response = await supabase
		.from("categories")
		.select("*")
		.eq("id", categoryId)
		.single();

	const category = response.data;

	if (!category) return null;

	return category;
}

async function getCategories() {
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
	getCategory,
	getCategories,
};

export default categoriesAPI;
