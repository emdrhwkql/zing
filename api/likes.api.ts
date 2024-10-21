import { Like } from "@/schema/likes.schema";
import supabase from "@/supabase/client";

async function addLike(postId: number) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase.from("likes").insert({ userId: user.id, postId });
}

async function getLikes() {
	const response = await supabase.from("likes").select("*");
	const likes = response.data;

	if (!likes) return null;

	return likes;
}

async function deleteLike(like: Like) {
	await supabase.from("likes").delete().eq("id", like.id);
}

const likesAPI = {
	addLike,
	getLikes,
	deleteLike,
};

export default likesAPI;
