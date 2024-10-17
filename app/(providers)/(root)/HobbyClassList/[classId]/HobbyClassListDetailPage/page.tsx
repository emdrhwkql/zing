import supabase from "@/supabase/client";
import dayjs from "dayjs";

type HobbyClassListDetailProps = {
  params: {
    classId: string;
  };
  searchParams: {};
};

async function HobbyClassListDetailPage(props: HobbyClassListDetailProps) {
  const time = dayjs().format("YYYY-MM-DD");
  const randomNumbs = Math.floor(Math.random() * 1000);
  const response = await supabase
    .from("lectures")
    .select("*")
    .eq("id", props.params.classId)
    .limit(randomNumbs);
  const lectureList = response.data;
  //   const curriculum = lectureList?.slice(0, 30) + "...";
  //   console.log(curriculum);
  if (!lectureList) return null;
  return (
    <ul>
      {lectureList.map((lecture) => (
        <li
          key={lecture.id}
          className="mb-4 border-black border bg-indigo-500 flex gap-4 ml-4 mt-4 pt-4 pl-4 pr-4 h-[500px] w-[1500px]"
        >
          <img
            src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}`}
            className="w-[850px] h-[467px] object-cover opacity-80"
          />
          <section className="w-full h-[465px] bg-white pl-4">
            <h2 className="text-2xl font-semibold border-t-2 border-black mt-3 pt-2 mr-3">
              {lecture.lectureTitle}
            </h2>
            <br />
            <p className="text-3xl mb-4">
              <span className="text-xl mr-[232px]">시간당 강습료</span>
              {lecture.lectureCost}
            </p>
            <hr />
            <p className="text-3xl mb-4 mt-2 text-red-600 font-extrabold flex">
              <span className="text-xl mr-[250px] text-black font-normal">
                총 강습료
              </span>
              {lecture.lectureCharge}
              <strong className="text-black font-normal ml-1">원</strong>
            </p>
            <hr />
            <p className="text-lg mb-4">
              <span className="text-xl mr-[250px] text-black">클래스 인원</span>
              {lecture.lecturePersonnel}
            </p>
            <p className="">
              <span className=""></span>
            </p>
          </section>
          {/* <div className="text-white gap-4 flex flex-wrap grid-cols-2 font-medium">
            <div>
              <p>
                <span className="font-semibold">시 이름: </span>
                {lecture.cityName}
              </p>
              <p>
                <span className="font-semibold">현재 날짜: </span> {time}
              </p>
              <p>
                <span className="font-semibold">카테고리1: </span>
                {lecture.categoryOne}
              </p>
              <p>
                <span className="font-semibold">카테고리2: </span>
                {lecture.categoryTwo}
              </p>
              <p>
                <span className="font-semibold">카테고리3: </span>
                {lecture.categoryThree}
              </p>
              <p>
                <span className="font-semibold">도시 주소: </span>
                {lecture.cityAddress}
              </p>
              <p>
                <span className="font-semibold">최종 작성일: </span>
                {lecture.finalSaved}
              </p>
              <p>
                <span className="font-semibold">클래스 요금: </span>
                {lecture.lectureCharge}
              </p>
              <p>
                <span className="font-semibold">클래스 시간당 비용: </span>
                {lecture.lectureCost}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">클래스 커리큘럼: </span>
                {lecture.lectureCurriculum}
              </p>
              <p>
                <span className="font-semibold">클래스 인원: </span>
                {lecture.lecturePersonnel}
              </p>
              <p>
                <span className="font-semibold">클래스 시간: </span>
                {lecture.lectureTime}
              </p>
              <p>
                <span className="font-semibold">클래스 타이틀: </span>
                {lecture.lectureTitle}
              </p>
              <p>
                <span className="font-semibold">동 이름: </span>
                {lecture.locationName}
              </p>
              <p>
                <span className="font-semibold">도 이름: </span>
                {lecture.provinceName}
              </p>
            </div>
          </div> */}
        </li>
      ))}
    </ul>
  );
}

export default HobbyClassListDetailPage;
