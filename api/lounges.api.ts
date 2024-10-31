import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

async function createLounge(
  name: string,
  introduction: string,
  categoryId: number,
  currentUser: User
) {
  const response = await supabase
    .from("lounges")
    .insert({ name, introduction, categoryId, userId: currentUser!.id })
    .select("*")
    .single();

  const lounge = response.data;

  return lounge;
}

async function getLounge(loungeId: number) {
  const response = await supabase
    .from("lounges")
    .select("*")
    .eq("id", loungeId)
    .single();

  const lounges = response.data;
  if (!lounges) return;

  return lounges;
}

async function getAllLounges() {
  const response = await supabase
    .from("lounges")
    .select("*, follow_lounges (id)");

  const lounges = response.data;

  if (!lounges) return [];

  return lounges;
}

async function getLoungeByName(name: string) {
  const response = await supabase
    .from("lounges")
    .select("*")
    .eq("name", name)
    .single();
  const lounge = response.data;
  if (!lounge) return;

  return lounge;
}

async function setLoungeImage(filepath: string, imageFile: File) {
  const { data: postImg } = await supabase.storage
    .from("lounge_images")
    .upload(filepath, imageFile, { upsert: true });

  return postImg;
}

async function updateLoungeImg(
  currentUser: User,
  imageUrl: string,
  loungeId: number
) {
  await supabase
    .from("lounges")
    .update({
      imageUrl,
    })
    .eq("userId", currentUser.id)
    .eq("id", loungeId);
}

async function updateLoungeName(
  currentUser: User,
  name: string,
  loungeId: number
) {
  await supabase
    .from("lounges")
    .update({
      name,
    })
    .eq("userId", currentUser!.id)
    .eq("id", loungeId);
}

async function updateLoungeIntroduction(
  currentUser: User,
  introduction: string,
  loungeId: number
) {
  const response = await supabase
    .from("lounges")
    .update({
      introduction,
    })
    .eq("userId", currentUser!.id)
    .eq("id", loungeId)
    .select("*");

  const lounge = response.data;
  return lounge;
}

async function getLoungesICreated(currentUser: User) {
  const response = await supabase
    .from("lounges")
    .select("*")
    .eq("userId", currentUser!.id);

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

async function deleteLounge(loungeId: number, currentUser: User) {
  await supabase
    .from("lounges")
    .delete()
    .eq("id", loungeId)
    .eq("userId", currentUser!.id);
}

const loungesAPI = {
  createLounge,
  getLounge,
  getAllLounges,
  getLoungesICreated,
  getLoungesByCategoryId,
  deleteLounge,
  setLoungeImage,
  updateLoungeImg,
  updateLoungeIntroduction,
  updateLoungeName,
  getLoungeByName,
};

export default loungesAPI;
