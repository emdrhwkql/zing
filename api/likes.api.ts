import supabase from "@/supabase/client";

async function addLikeUser(postId: number) {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	await supabase.from("likes").insert({ userId: user.id, postId });
}

async function getLikes(postId: number) {
	const response = await supabase
		.from("likes")
		.select("*")
		.eq("postId", postId);
	const likes = response.data;

	if (!likes) return null;

	return likes;
}

async function deleteLikeUser(postId: number) {
	await supabase.from("likes").delete().eq("postId", postId);
}

const likesAPI = {
	addLikeUser,
	getLikes,
	deleteLikeUser,
};

export default likesAPI;
