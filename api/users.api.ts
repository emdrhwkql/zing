import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

async function createUser(userName: string, currentUser: User) {
  await supabase.from("users").insert({ userName, userId: currentUser!.id });
}

async function getUser(currentUser: User) {
  const response = await supabase
    .from("users")
    .select("*")
    .eq("userId", currentUser!.id)
    .single();

  const users = response.data;

  if (!users) return null;

  return users;
}

async function setProfileImage(filepath: string, imageFile: File) {
  const { data: userImg } = await supabase.storage
    .from("user_images")
    .upload(filepath, imageFile, { upsert: true });

  return userImg;
}

// async function updateProfile(
// 	currentUser: User,
// 	profileDesc: string,
// 	userName: string,
// 	imageUrl: string
// ) {
// 	await supabase
// 		.from("profile")
// 		.update({
// 			profileImg: imageUrl,
// 			profileDesc: profileDesc,
// 			userName: userName,
// 		})
// 		.eq("userId", currentUser!.id);
// }

async function updateUserImg(currentUser: User, profileImg: string) {
  await supabase
    .from("users")
    .update({
      profileImg,
    })
    .eq("userId", currentUser!.id);
}

async function updateUserName(currentUser: User, userName: string) {
  await supabase
    .from("users")
    .update({
      userName,
    })
    .eq("userId", currentUser!.id);
}

async function updateUserDesc(currentUser: User, profileDesc: string) {
  await supabase
    .from("users")
    .update({
      profileDesc,
    })  
    .eq("userId", currentUser!.id);
}

async function getProfileImage() {
  await supabase.storage.from("user_images").download;
}

const profilesAPI = {
  getUser,
  updateUserName,
  updateUserDesc,
  createUser,
  setProfileImage,
  updateUserImg,
  getProfileImage,
};

export default profilesAPI;
