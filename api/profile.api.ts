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

const profilesAPI = {
  getProfile,
};

export default profilesAPI;
