"use client";

import supabase from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function SearchPage() {
  const [isShowMore, setIsShowMore] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [posts, setPosts] = useState<Tables<"posts">[]>([]);
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);

  const search = async (query: string) => {
    const searchPostsPromise = supabase
      .from("posts")
      .select("*, author:users(profileImg, userId)")
      .ilike("title", `%${query}%`);

    const searchcategoreisPromise = supabase
      .from("categories")
      .select("*")
      .ilike("categoryName", `%${query}%`);

    const [{ data: posts }, { data: categories }] = await Promise.all([
      searchPostsPromise,
      searchcategoreisPromise,
    ]);

    setPosts(posts || []);
    setCategories(categories || []);
  };

  useEffect(() => {
    if (!query) return;

    search(query);
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center mb-2">
        <span className="text-black font-semibold mr-1">검색결과</span>
        <span className="text-blue-600 font-semibold">{posts.length + categories.length}개</span>
      </div>
      <hr className="border-gray-300 mb-4" />

      <div className="grid grid-cols-2 gap-x-5">
        {/* 포스트 검색 결과 */}
        <div className="pr-5">
          <h2 className="text-xl font-bold mb-4 text-center">
            포스트 검색 결과: {posts.length}개
          </h2>
          {posts.length > 0 ? (
            <ul className="grid grid-cols-3 gap-4">
              {posts.map((post) => (
                <li key={post.id} className="border p-4 rounded-md bg-white">
                  <Link href={`/posts/${post.id}`} className="block">
                    <div className="relative h-48 bg-red-600 rounded-md mb-4">
                      <Image
                        src={post.imageUrl}
                        alt={post.userName}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-500">{post.content}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      작성일: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-thin text-center">포스트 검색 결과가 없습니다.</p>
          )}
        </div>

        {/* 라운지 검색 결과 */}
        <div className="pl-5 border-l border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-center">
            카테코리 검색 결과: {categories.length}개
          </h2>
          {categories.length > 0 ? (
            <ul className="space-y-3">
              {categories.map((categori) => (
                <li key={categori.id} className="flex justify-center">
                  <Link
                    href={`/categories/${categori.id}`}
                    className="border p-3 rounded-md block bg-white w-3/4 hover:-translate-x-3 transition-transform duration-200"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={categori.categoryImg ? `https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${categori.categoryImg}` : 'path/to/default/image.png'}
                        className="w-10 h-10 bg-black"
                      />

                      <div className="ml-3 flex flex-col">
                        <p className="text-lg font-semibold">{categori.categoryName}</p>
                        <p className="mt-1">{categori.introduction}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-thin text-center">라운지 검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
      <div className="mt-3 flex justify-center relative ">
        <button
          onClick={() => {
            setIsShowMore((e) => !e);
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-2 shadow-[0_4px_4px_rgb(75,85,99)] active:scale-75 active:duration-100"
        >
          {isShowMore ? (
            <FaMinus className="text-lg " />
          ) : (
            <FaPlus className="text-lg" />
          )}
        </button>
      </div>
    </div>
  );
}
