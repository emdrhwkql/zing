import supabase from "@/supabase/client";
import HobbyClassListForm from "../../_components/HobbyClassListForm/HobbyClassListForm";

async function HobbyClassListPage() {
  const randomNumbs = Math.floor(Math.random() * 1000);
  const response = await supabase.from("lectures").select().limit(randomNumbs);
  const lectures = response.data;
  const isMoreShow = false;
  console.log(response.data);
  if (!lectures) return null;

  const slicedLectures = lectures.slice(0);
  return (
    <div>
      <HobbyClassListForm lectures={slicedLectures} isMoreShow={isMoreShow} />
    </div>
  );
}

export default HobbyClassListPage;
