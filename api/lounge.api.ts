"use client";

import { Lounge } from "@/schema/lounges.schema";
import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

async function createLounge(
	name: string,
	introduction: string,
	categoryId: number
) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase
		.from("lounges")
		.insert({ name, introduction, categoryId, userId: user.id });
}

async function getLounge(loungeId: number) {
	const response = await supabase
		.from("lounges")
		.select("*")
		.eq("id", loungeId)
		.single();

	const lounges = response.data;

	if (!lounges) return null;

	return lounges;
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

async function getMyLounges(currentUser: User) {
	const { data: myLounges } = await supabase
		.from("lounges")
		.select(
			"*, user_lounges!inner (), category:categories(id, categoryImg)"
		)
		.eq("user_lounges.userId", currentUser!.id);

	return myLounges;
}

const loungesAPI = {
	createLounge,
	getLounge,
	getAllLounges,
	getLoungesICreated,
	getLoungesByCategoryId,
	deleteLounge,
	getMyLounges,
};

export default loungesAPI;
