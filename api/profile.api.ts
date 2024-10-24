import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

async function getProfile(currentUser: User) {
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("userId", currentUser!.id)
    .single();

  return profile;
}

async function setCreateProfile(
  currentUser: User,
  profileDesc: string,
  userName: string
) {
  await supabase
    .from("profile")
    .insert([{ profileDesc: profileDesc, userName: userName }])
    .eq("userId", currentUser!.id);
}

async function setProfileImage(filepath: string, imageFile: File) {
  const { data: profileImage } = await supabase.storage
    .from("profile_image")
    .upload(filepath, imageFile, { upsert: true });

  return profileImage;
}

async function updateProfile(
  currentUser: User,
  profileDesc: string,
  userName: string,
  imageUrl: string
) {
  await supabase
    .from("profile")
    .update({
      profileImg: imageUrl,
      profileDesc: profileDesc,
      userName: userName,
    })
    .eq("userId", currentUser!.id);
}

async function getProfileImage() {
  await supabase.storage.from("profile_image").download;
}

const profilesAPI = {
  getProfile,
  setCreateProfile,
  setProfileImage,
  updateProfile,
  getProfileImage,
};

export default profilesAPI;
