import { Posts } from "@/schema/posts.schema";
import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

async function createPost(
  title: string,
  content: string,
  loungeId: number,
  currentUser: User
) {
  const response = await supabase
    .from("posts")
    .insert({ title, content, loungeId, userId: currentUser!.id })
    .select("*")
    .single();

  const post = response.data;

  return post;
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

async function setPostImage(filepath: string, imageFile: File) {
  const { data: postImg } = await supabase.storage
    .from("post_images")
    .upload(filepath, imageFile, { upsert: true });

  return postImg;
}

async function updatePostImg(
  currentUser: User,
  imageUrl: string,
  loungeId: number
) {
  await supabase
    .from("posts")
    .update({
      imageUrl,
    })
    .eq("userId", currentUser!.id)
    .eq("id", loungeId);
}

async function updatePostTitle(
  currentUser: User,
  title: string,
  loungeId: number
) {
  await supabase
    .from("posts")
    .update({
      title,
    })
    .eq("userId", currentUser!.id)
    .eq("id", loungeId);
}

async function updatePostContent(
  currentUser: User,
  content: string,
  loungeId: number
) {
  await supabase
    .from("posts")
    .update({
      content,
    })
    .eq("userId", currentUser!.id)
    .eq("id", loungeId);
}

async function getPostsICreated(currentUser: User) {
  const response = await supabase
    .from("posts")
    .select("*")
    .eq("userId", currentUser!.id);

  const posts = response.data;

  if (!posts) return [];

  return posts;
}

async function getPostsByLoungeId(loungeId: number) {
  const response = await supabase
    .from("posts")
    .select("*, likes (id)")
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
  updatePostImg,
  updatePostContent,
  updatePostTitle,
  setPostImage,
};

export default postsAPI;
