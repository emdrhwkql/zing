import supabase from "@/supabase/client";

async function deleteUserLounges(loungeId: number) {
  await supabase.from("user_lounges").delete().eq("loungeId", loungeId);
}

async function insertUserLounges(loungeId: number) {
  await supabase.from("user_lounges").insert({ loungeId: Number(loungeId) });
}

const followLoungesAPI = {
  deleteUserLounges,
  insertUserLounges,
};

export default followLoungesAPI;
