import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

async function addFollowLoungeUser(loungeId: number) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase.from("follow_lounges").insert({ userId: user.id, loungeId });
}

async function getFollowLoungesIFollow(currentUser: User) {
	const response = await supabase
		.from("follow_lounges")
		.select("*, lounge:lounges (*)", { count: "exact" })
		.eq("userId", currentUser!.id);

	const follows = response.data;
	// console.log(follow);
	const count = response.count;

	if (!follows) return {};

	return { follows, count };
}

async function getFollowLoungesByLoungesId(loungeId: number) {
	const response = await supabase
		.from("follow_lounges")
		.select("*", { count: "exact" })
		.eq("loungeId", loungeId);

	const follows = response.data;
	const count = response.count;

	if (!follows) return {};

	return { follows, count };
}

async function deleteFollowLoungeUser(loungeId: number) {
	await supabase.from("follow_lounges").delete().eq("loungeId", loungeId);
}

const followLoungesAPI = {
	addFollowLoungeUser,
	getFollowLoungesIFollow,
	getFollowLoungesByLoungesId,
	deleteFollowLoungeUser,
};

export default followLoungesAPI;
