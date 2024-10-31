import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

async function addLikeUser(postId: number) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase.from("likes").insert({ userId: user.id, postId });
}

async function getLikes() {
	const response = await supabase
		.from("likes")
		.select("*", { count: "exact" });
	const likes = response.data;
	const count = response.count;

	if (!likes) return [];

	return { likes, count };
}

async function getLikesPostsILike(currentUser: User) {
	const response = await supabase
		.from("likes")
		.select("*, post:posts (*)", { count: "exact" })
		.eq("userId", currentUser!.id);

	const likes = response.data;
	const count = response.count;

	if (!likes) return [];

	return { likes, count };
}

async function getLikesByPostId(postId: number) {
	const response = await supabase
		.from("likes")
		.select("*", { count: "exact" })
		.eq("postId", postId);

	const likes = response.data;
	const count = response.count!;

	if (!likes) return {};

	return { likes, count };
}

async function deleteLikeUser(postId: number) {
	await supabase.from("likes").delete().eq("postId", postId);
}

const likesAPI = {
	addLikeUser,
	getLikes,
	getLikesPostsILike,
	getLikesByPostId,
	deleteLikeUser,
};

export default likesAPI;
