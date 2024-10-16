import supabase from "@/supabase/client";
import Link from "next/link";

async function CategoryList<categoryListTypes>() {
  // 10-16에는 category.id에 맞는 값들만 뿌려주기
  //   if ((category.categoryId - category.id) % 9 === 0)
  const randomNumbs = Math.floor(Math.random() * 1000);
  const response = await supabase
    .from("category")
    .select("*")
    .limit(randomNumbs);
  const categoryList = response.data;
  if (!categoryList) return null;
  console.log(categoryList);
  return (
    <ul className="h-[150px] flex flex-row gap-x-4 justify-around">
      <Link href={"category/category_list"}>더보기</Link>
      {categoryList.map((category) => (
        <li key={category.id}>
          <Link href={`/category/${category.id}`}>
            <img
              src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${category.categoryImg}`}
              className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90"
            />
          </Link>
          <p className="font-bold text-2xl text-white text-center pt-2 object-cover">
            {category.categoryName}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
