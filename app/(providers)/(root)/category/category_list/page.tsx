import supabase from "@/supabase/client";
import Link from "next/link";

async function CategoryListPage<categoryListTypes>() {
  const randomNumbs = Math.floor(Math.random() * 1000);
  const response = await supabase
    .from("category")
    .select("*")
    .limit(randomNumbs);
  const categoryList = response.data;
  if (!categoryList) return null;
  return (
    <ul className="h-[150px] flex flex-row gap-x-4 justify-around">
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

export default CategoryListPage;
