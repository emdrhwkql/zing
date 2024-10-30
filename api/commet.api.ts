import supabase from "@/supabase/client";

async function getPost(postId: number) {
	const response = await supabase
		.from("posts")
		.select("*")
		.eq("id", postId)
		.single();

	const posts = response.data;

	if (!posts) return null;

	return posts;
}

async function getComments(postId: number) {
	const response = await supabase
		.from("comments")
		.select("*")
		.eq("postId", postId)
		.order("createdAt", { ascending: false });

	const getcomets = response.data

	if (!getcomets) return null

	return getcomets;
}

async function addComment(postId: number, content: string, userId: string) {
	const response = await supabase
		.from("comments")
		.insert([{ postId, content, userId }])
		.select("*")
		.single()

	const comment = response.data;

	if (!comment) return null;

	return comment
}

const commentAPI = {
	addComment,
	getComments,
	getPost,
}

export default commentAPI