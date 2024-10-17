import { Lounge } from "@/schema/lounges.schema";
import supabase from "@/supabase/client";

async function createLounge(name: string, categoryId: number) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase
		.from("lounges")
		.insert({ name, userId: user.id, categoryId });
}

async function getLounges() {
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

async function toggleIsCompleted(lounge: Lounge) {
	await supabase
		.from("lounges")
		.update({ isCompleted: !lounge.isCompleted })
		.eq("id", lounge.id);
}

async function deleteLounge(lounge: Lounge) {
	await supabase.from("lounges").delete().eq("id", lounge.id);
}

const loungesAPI = {
	createLounge,
	getLounges,
	toggleIsCompleted,
	deleteLounge,
};

export default loungesAPI;
