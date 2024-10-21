/* eslint-disable @typescript-eslint/no-empty-object-type */
import api from "@/api/api";
import Page from "@/components/Page";
import SideBox from "@/components/SideBox";
import { CategoryIdPropsType } from "@/types/category.types";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
import LoungesList from "../../_components/lounge/LoungesList/LoungesList";

export const revalidate = 0;

async function CategoriesDetailPage(props: CategoryIdPropsType) {
  const categoryId = props.params.categoryId;
  const lounges = await api.lounges.getLoungesByCategoryId(Number(categoryId));

  const categories = await api.categories.getCategory();

  // console.log(categories?.map((category) => category.categoryName));

  const categoryName = categories?.find(
    (category) => category.id === Number(categoryId)
  )?.categoryName;

  const categoryImg = categories?.find(
    (category) => category.id === Number(categoryId)
  )?.categoryImg;

  console.log(categoryImg);

  // console.log(props);

  return (
    <Page>
      <div className="mb-10 px-[calc((100%-1429px)/2)] ">
        <div className="pb-5 flex flex-row gap-x-4">
          <img
            src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${categoryImg}`}
            className="w-40 h-40 rounded-md object-cover"
          />

          <div className="mt-auto flex flex-col h-full">
            <h1 className="font-bold text-4xl">{categoryName}</h1>
            <p className="pt-10 pb-2 font-semibold text-xl">설명</p>
          </div>
        </div>
        <div className="w-full px-8 rounded-md bg-[#4D4246] h-14 flex flex-row items-center text-white text-base font-bold text-center">
          <div className="flex flex-row gap-x-4">
            <div>첫번째</div>
            <div>두번째</div>
            <div>세번째</div>
            <div>네번째</div>
            <div>다섯번째</div>
          </div>
          <div className="ml-auto flex flex-row gap-x-3">
            <button className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border">
              <FaCheck />
              <p>가입하기</p>
            </button>
            <Link
              href={`/categories/${categoryId}/lounges/new`}
              className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border"
            >
              <LuFilePlus />
              <p>글 쓰기</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-10 justify-center">
        <div className="bg-[#DBC1AD] flex flex-col items-center gap-y-14 p-4 rounded-md">
          {/* <PopularLoungePostsPage /> */}
          <LoungesList lounges={lounges} />
        </div>

        <div className="h-full bg-[#DBC1AD] flex flex-col items-center gap-y-6 p-3 rounded-md">
          <SideBox />
        </div>
      </div>
    </Page>
  );
}

export default CategoriesDetailPage;
