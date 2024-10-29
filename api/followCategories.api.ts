import supabase from "@/supabase/client";

async function addFollowCategoryUser(categoryId: number) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase
		.from("follow_categories")
		.insert({ userId: user.id, categoryId });
}

async function getFollowCategories() {
	const response = await supabase
		.from("follow_categories")
		.select("*", { count: "exact" });

	const follow = response.data;
	const count = response.count;

	if (!follow) return [];

	return { follow, count };
}

async function getFollowCategoriesByCategoryId(categoryId: number) {
	const response = await supabase
		.from("follow_categories")
		.select("*", { count: "exact" })
		.eq("categoryId", categoryId);

	const follow = response.data;
	const count = response.count;

	if (!follow) return {};

	return { follow, count };
}

async function deleteFollowCategoryUser(categoryId: number) {
	await supabase
		.from("follow_categories")
		.delete()
		.eq("categoryId", categoryId);
}

const followCategoriesAPI = {
	addFollowCategoryUser,
	getFollowCategories,
	getFollowCategoriesByCategoryId,
	deleteFollowCategoryUser,
};

export default followCategoriesAPI;
