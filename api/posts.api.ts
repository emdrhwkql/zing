import { Posts } from "@/schema/posts.schema";
import supabase from "@/supabase/client";

async function createPost(title: string, content: string, loungeId: number) {
	const { data } = await supabase.auth.getUser();

	const user = data.user!;

	await supabase
		.from("posts")
		.insert({ title, content, loungeId, userId: user.id });
}

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

async function getPosts() {
	const response = await supabase.from("posts").select("*");
	const posts = response.data;

	if (!posts) return [];

	return posts;
}

async function getPostsICreated() {
	const { data } = await supabase.auth.getUser();
	const user = data.user!;

	const response = await supabase
		.from("posts")
		.select("*")
		.eq("userId", user.id);

	const posts = response.data;

	if (!posts) return [];

	return posts;
}

async function getPostsByLoungeId(loungeId: number) {
	const response = await supabase
		.from("posts")
		.select("*")
		.eq("loungeId", loungeId);

	const posts = response.data;

	if (!posts) return [];

	return posts;
}

async function deletePost(post: Posts) {
	await supabase.from("posts").delete().eq("id", post.id);
}

const postsAPI = {
	createPost,
	getPost,
	getPosts,
	getPostsByLoungeId,
	getPostsICreated,
	deletePost,
};

export default postsAPI;
