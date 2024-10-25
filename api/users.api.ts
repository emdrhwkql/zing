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
	const { data: profileImage } = await supabase.storage
		.from("profile_image")
		.upload(filepath, imageFile, { upsert: true });

	return profileImage;
}

async function setBaseImage(currentUser: User, imageUrl: string) {
	await supabase
		.from("profile")
		.update({ profileImg: imageUrl })
		.eq("userId", currentUser.id);
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
	getProfile: getUser,
	createUser,
	setProfileImage,
	updateProfile,
	getProfileImage,
	setBaseImage,
};

export default profilesAPI;
