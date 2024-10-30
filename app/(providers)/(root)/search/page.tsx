"use client";

import supabase from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [posts, setPosts] = useState<Tables<"posts">[]>([]);
  const [lounges, setLounges] = useState<Tables<"lounges">[]>([]);

  const search = async (query: string) => {
    const searchPostsPromise = supabase
      .from("posts")
      .select("*")
      .ilike("title", `%${query}%`);

    const searchLoungesPromise = supabase
      .from("lounges")
      .select("*")
      .ilike("name", `%${query}%`);

    const [{ data: posts }, { data: lounges }] = await Promise.all([
      searchPostsPromise,
      searchLoungesPromise,
    ]);

    setPosts(posts || []);
    setLounges(lounges || []);
  };

  useEffect(() => {
    if (!query) return;

    search(query);
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 items-center justify-center">
        검색 결과: {query}
      </h1>

      <div className="grid grid-cols-2 gap-x-5">
        {/* 포스트 검색 결과 */}
        <div>
          <h2 className="text-xl font-bold mb-4">포스트 검색 결과</h2>

          {posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/posts/${post.id}`}
                    className="border p-4 rounded-md block"
                  >
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="mt-2">{post.content}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>포스트 검색 결과가 없습니다.</p>
          )}
        </div>

        {/* 라운지 검색 결과 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">라운지 검색 결과</h2>
          {lounges.length > 0 ? (
            <ul className="space-y-4">
              {lounges.map((lounge) => (
                <li key={lounge.id}>
                  <Link
                    href={`/lounges/${lounge.id}`}
                    className="border p-4 rounded-md block"
                  >
                    <h3 className="text-lg font-semibold">{lounge.name}</h3>
                    <p className="mt-2">{lounge.introduction}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>라운지 검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
