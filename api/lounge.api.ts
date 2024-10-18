import { Lounge } from "@/schema/lounges.schema";
import supabase from "@/supabase/client";

async function createLounge(
	name: string,
	categoryId: number,
	introduction: string
) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase
		.from("lounges")
		.insert({ name, userId: user.id, categoryId, introduction });
}

async function getAllLounges() {
	const response = await supabase.from("lounges").select("*");

	const lounges = response.data;

	if (!lounges) return [];

	return lounges;
}

async function getLoungesICreated() {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	const response = await supabase
		.from("lounges")
		.select("*")
		.eq("userId", user.id);

	const lounges = response.data;

	if (!lounges) return [];

	return lounges;
}

async function getLoungesByCategoryId(categoryId: number) {
	const response = await supabase
		.from("lounges")
		.select("*")
		.eq("categoryId", categoryId);

	const lounges = response.data;

	if (!lounges) return [];

	return lounges;
}

async function deleteLounge(lounge: Lounge) {
	await supabase.from("lounges").delete().eq("id", lounge.id);
}

const loungesAPI = {
	createLounge,
	getAllLounges,
	getLoungesICreated,
	getLoungesByCategoryId,
	deleteLounge,
};

export default loungesAPI;
