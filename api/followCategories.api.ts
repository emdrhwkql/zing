import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

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

	const follows = response.data;
	const count = response.count;

	if (!follows) return [];

	return { follows, count };
}

async function getFollowCategoriesIFollow(currentUser: User) {
	const response = await supabase
		.from("follow_categories")
		.select("*, category:categories (*)", { count: "exact" })
		.eq("userId", currentUser!.id);

	const follows = response.data;
	// console.log(follow);
	const count = response.count;

	if (!follows) return {};

	return { follows, count };
}

async function getFollowCategoriesByCategoryId(categoryId: number) {
	const response = await supabase
		.from("follow_categories")
		.select("*", { count: "exact" })
		.eq("categoryId", categoryId);

	const follows = response.data;
	const count = response.count;

	if (!follows) return {};

	return { follows, count };
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
	getFollowCategoriesIFollow,
	getFollowCategoriesByCategoryId,
	deleteFollowCategoryUser,
};

export default followCategoriesAPI;
