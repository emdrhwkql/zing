"use client";
import { Tables } from "@/supabase/database.types";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import supabase from "@/supabase/client";
import api from "@/api/api";

// 인터페이스 정의
interface Lounge {
  id: number;
  name: string;
  introduction: string;
  imageUrl: string;
  categoryId: number;
  createdAt: string;
  isCompleted: boolean;
  userId: string;
}

// interface Lounges extends Array<Lounge> { }

// interface SearchPageProps {
//   lounges?: Lounge[];
//   full?: boolean;
// }

// 메인 컴포넌트
// full 사용 안해서 일단 지움
// export default function Component({ lounges = [], full = false }: SearchPageProps) {

// 사용 안해서 lounges 지움
//export default function Component({ lounges = [] }: SearchPageProps) {
export default function Component() {
  // 상태 선언
  // const [filteredLounges, setFilteredLounges] = useState<Lounge[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const [loungesByCategory, setLoungesByCategory] = useState<Lounge[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [posts, setPosts] = useState<Tables<"posts">[]>([]);
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 특정 카테고리의 라운지 데이터 로드
  const fetchLoungesByCategory = async (categoryId: number) => {
    if (categoryId === undefined) {
      console.error("Category ID가 없습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const lounges = await api.lounges.getLoungesByCategoryId(categoryId);

      // 필요한 속성이 포함된지 확인 후 상태 업데이트
      const completeLounges = lounges.map((lounge) => ({
        ...lounge,
        createdAt: lounge.createdAt || new Date().toISOString(),
        isCompleted: lounge.isCompleted ?? false,
        userId: lounge.userId || "",
      }));

      setLoungesByCategory(completeLounges);
    } catch (error) {
      console.error("Error fetching lounges by category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 기능
  const search = async (query: string) => {
    setIsLoading(true);
    try {
      const searchPostsPromise = supabase
        .from("posts")
        .select("*, author:users(profileImg, userId)")
        .ilike("title", `%${query}%`);

      const searchCategoriesPromise = supabase
        .from("categories")
        .select("*")
        .ilike("categoryName", `%${query}%`);

      const [{ data: posts }, { data: categories }] = await Promise.all([
        searchPostsPromise,
        searchCategoriesPromise,
      ]);

      setPosts(posts || []);
      setCategories(categories || []);

      // 카테고리가 검색되면 해당 카테고리에 속한 라운지 필터링
      // if (categories) {
      //   const filteredLounges = lounges.filter((lounge: Lounge) =>
      //     categories.some(category => category.id === lounge.categoryId)
      //   );
        // setFilteredLounges(filteredLounges);
      // } else {
        // setFilteredLounges([]);
      // }

    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };


  //검색하고나서 동작을 할 때마다 자동초기화
  useEffect(() => {
    if (query) {
      // setFilteredLounges([]);
      setPosts([]);
      setCategories([]);
      search(query);
    }
  }, [query]);

  // 로딩 상태 처리
  if (isLoading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  // UI 렌더링
  return (
    <div className="container mx-auto p-4">
      {/* 헤더 및 결과 수 */}
      <div className="flex items-center justify-center mb-2">
        <span className="text-black font-semibold mr-1">검색결과</span>
        <span className="text-blue-600 font-semibold">{posts.length + categories.length}개</span>
      </div>
      <hr className="border-gray-300 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 포스트 검색 결과 */}
        <div className="md:pr-5">
          <h2 className="text-xl font-bold mb-4 text-center">
            포스트 검색 결과: {posts.length}개
          </h2>
          {posts.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {posts.map((post) => (
                <li key={post.id} className="border p-4 rounded-md bg-white">
                  <Link href={`/posts/${post.id}`} className="block">
                    <div className="relative h-48 bg-gray-200 rounded-md mb-4">
                      <Image
                        src={post.imageUrl || "/placeholder.svg?height=192&width=256"}
                        alt={post.title || "포스트 이미지"}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-500 line-clamp-2">{post.content}</p>
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

        {/* 카테고리 검색 결과 */}
        <div className="md:pl-5 md:border-l border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-center">
            카테고리 검색 결과: {categories.length}개
          </h2>
          {categories.length > 0 ? (
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id} className="flex justify-center">
                  <Link
                    href={`/categories/${category.id}`}
                    className="border p-3 rounded-md block bg-white w-full md:w-3/4 hover:-translate-x-3 transition-transform duration-200"
                  >
                    <div className="flex flex-row items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                        <Image
                          src={
                            category.categoryImg
                              ? `https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_images/${category.categoryImg}`
                              : "/placeholder.svg?height=40&width=40"
                          }
                          alt={category.categoryName}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-3 flex flex-col">
                        <p className="text-lg font-semibold">{category.categoryName}</p>
                        <p className="text-sm text-gray-600">{category.introduction}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-thin text-center">카테고리 검색 결과가 없습니다.</p>
          )}

          {/* 더 보기 버튼 */}
          <div className="mt-8 flex justify-center relative">
            <button
              onClick={() => {
                setIsShowMore((prev) => !prev);
                if (!isShowMore) fetchLoungesByCategory(categories[0]?.id);
              }}
              className="bg-[#fdfbfc] rounded-full p-2 shadow-[0_4px_4px_rgb(75,85,99)] active:scale-75 active:duration-100"
            >
              {isShowMore ? <FaMinus className="text-lg" /> : <FaPlus className="text-lg" />}
            </button>
          </div>

          {/* 라운지 목록 */}
          {isShowMore && (
            <ul className="space-y-3">
              {loungesByCategory.map((lounge) => (
                <li
                  key={lounge.id}
                  className="flex justify-center"
                >
                  <Link href={`/lounges/${lounge.id}`} className="border p-3 rounded-md block bg-white w-full md:w-3/4 hover:-translate-x-3 transition-transform duration-200">
                    <div className="flex flex-row items-center">
                      <Image
                        src={lounge.imageUrl || "/placeholder.svg?height=40&width=40"}
                        alt={lounge.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                      <div className="ml-3 flex flex-col">
                        <p className="text-lg font-semibold">{lounge.name}</p>
                        <p className="text-sm text-gray-600">{lounge.introduction}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
