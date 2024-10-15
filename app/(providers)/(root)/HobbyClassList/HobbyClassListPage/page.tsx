import supabase from "@/supabase/client";
import HobbyClassLists from "../_components/HobbyClassLists";

async function HobbyClassListPage() {
  const randomNumbs = Math.floor(Math.random() * 1000);
  const response = await supabase.from("lectures").select().limit(randomNumbs);
  const lectures = response.data;
  const isMoreShow = false;
  //   const classId = 1;
  console.log(response.data);
  if (!lectures) return null;

  const slicedLectures = lectures.slice(0);

  //여기서 데이터를 불러아서
  //   하비클래스 리스트에다 props로 내려주기
  return (
    <div>
      <HobbyClassLists lectures={slicedLectures} isMoreShow={isMoreShow} />
    </div>
  );
}

export default HobbyClassListPage;
