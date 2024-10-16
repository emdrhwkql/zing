import supabase from "@/supabase/client";
import dayjs from "dayjs";
import { categoryDetailTypes } from "../types/category.types";

async function CategoryDetailPage(props: categoryDetailTypes) {
  const time = dayjs().format("YYYY-MM-DD");
  const randomNumbs = Math.floor(Math.random() * 1000);
  const response = await supabase
    .from("category")
    .select("*")
    .eq("id", props.params.categoryId)
    .limit(randomNumbs);
  const categoryList = response.data;
  if (!categoryList) return null;
  return (
    <main className="flex flex-row justify-between w-[980px] h-96 bg-black rounded-md">
      <div className="mt-4 ml-3 p-6 rounded-xl w-[950px] h-[350px] bg-[#fdfbfc]">
        <div className="flex flex-row gap-x-2 items-center">
          <div className="w-4 h-4 bg-gray-500 rounded-md"></div>

          <p>사용자 ID</p>
        </div>
        <ul className="">
          {categoryList.map((category) => (
            <li key={category.id} className="w-60 pl-5 pt-4">
              <div className="w-48">
                <img
                  src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${category.categoryImg}`}
                  className="w-screen h-48 object-cover "
                />
                <div className="bg-white h-0">
                  <strong className="font-semibold">
                    {category.categoryName} - 카테고리 이름
                  </strong>
                  <br />
                  <p className="border-t-2">{time} - 날짜</p>
                  <br />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default CategoryDetailPage;
