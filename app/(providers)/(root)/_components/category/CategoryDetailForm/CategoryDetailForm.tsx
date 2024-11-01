"use client";

import api from "@/api/api";
import FollowCategoryBtn from "@/components/FollowCategoryBtn";
import Page from "@/components/Page";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LuFilePlus } from "react-icons/lu";
import { TbUserHeart } from "react-icons/tb";
import LoungesList from "../../lounge/LoungesList/LoungesList";
import PopularLoungesList from "../../lounge/LoungesList/PopularLoungesList";

function CategoryDetailForm({ categoryId }: { categoryId: number }) {
  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: async () => api.categories.getCategory(categoryId),
  });

  const { data: followCategories = {} } = useQuery({
    queryKey: ["followCategories"],
    queryFn: async () =>
      api.followCategories.getFollowCategoriesByCategoryId(categoryId),
  });

  const { data: loungesByCategory = [] } = useQuery({
    queryKey: ["loungesByCategory"],
    queryFn: async () => api.lounges.getLoungesByCategoryId(categoryId),
  });

  const { data: lounges = [] } = useQuery({
    queryKey: ["lounges"],
    queryFn: async () => await api.lounges.getAllLounges(),
  });

  lounges!.sort(
    (loungeA, loungeB) =>
      loungeB.follow_lounges.length - loungeA.follow_lounges.length
  );

  return (
    <Page>
      {/* 배너 */}
      <div className="relative bg-black overflow-hidden z-auto rounded-md">
        <div className="h-full flex flex-row gap-x-4 text-white p-4">
          {/* 배너 이미지 */}
          <img
            src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${category?.categoryImg}`}
            className="absolute -top-96 left-0 w-full opacity-50 object-cover rounded-md z-auto"
          />

          {/* 라운지 이미지 */}
          <img
            src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${category?.categoryImg}`}
            className="hover:scale-110 hover:duration-300 w-40 h-40 rounded-md object-cover z-10"
          />

          {/* 카테고리 정보 (제목, 한 줄 설명) */}
          <div className="mt-auto pr-2 flex flex-col h-full z-10 border-l-2 border-b-2 pl-4 rounded-md">
            <h1 className="font-bold text-4xl">{category?.categoryName}</h1>
            <p className="w-full pt-10 pb-2 font-semibold text-xl">
              {category?.introduction}``
            </p>
          </div>

          {/* 버튼 박스 */}
          <div className="ml-auto grid grid-cols-1 place-items-center gap-x-3 z-10">
            {/* 카테고리 팔로우 버튼 */}

            <div className="rounded-full w-full h-10 py-2 px-4 flex flex-row gap-x-2 justify-center items-center border active:scale-90 active:duration-100 leading-tight">
              <TbUserHeart />
              <p>관심 유저 :</p>
              <p>{followCategories!.count}</p>
            </div>

            <FollowCategoryBtn categoryId={categoryId} />

            {/* 라운지 생성 링크 */}
            <Link
              href={`/categories/${categoryId}/lounges/new`}
              className="rounded-full w-full h-10 py-2 px-4 flex flex-row gap-x-2 justify-center items-center border active:scale-90 active:duration-100"
            >
              <LuFilePlus className="text-lg" />
              <p>라운지 만들기</p>
            </Link>
          </div>
        </div>
      </div>

      {/* 현재 카테고리에 해당하는 라운지 리스트 */}
      <div className="mt-5 flex flex-row justify-center">
        <div className=" flex flex-col items-center gap-y-10 p-4 rounded-md">
          <LoungesList lounges={loungesByCategory} />
        </div>

        {/* 사이드 박스 */}
        <div className="h-full flex flex-col items-center gap-y-6 p-3 rounded-md">
          <PopularLoungesList lounges={lounges} full={true} />
        </div>
      </div>
    </Page>
  );
}

export default CategoryDetailForm;
