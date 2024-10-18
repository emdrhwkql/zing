"use client";

import supabase from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//   프로필 수정 컴포넌트 불러와서 필요한 부분에서 불러오기
function Profile() {
  const [lounges, setLounges] = useState<Tables<"lounges">[] | null>(null);
  const [profiles, setProfiles] = useState<Tables<"profile">[] | null>(null);
  const [posts, setPosts] = useState<Tables<"posts">[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
        return;
      }

      const loungeData = await supabase
        .from("lounges")
        .select("*")
        .eq("userId", data.user.id);
      const lounges = loungeData.data;
      setLounges(lounges);

      const profileData = await supabase
        .from("profile")
        .select("*")
        .eq("userId", data.user.id);
      const profiles = profileData.data;
      setProfiles(profiles);

      const postData = await supabase
        .from("posts")
        .select("*")
        .eq("authorId", data.user.id);
      const posts = postData.data;
      setPosts(posts);
      console.log(data.user.id);
    })();
  }, []);
  return (
    <main className="flex-none gap-5">
      <ul className="ml-24 bg-indigo-300 w-[1500px] h-[300px] rounded-lg flex justify-center">
        {profiles?.map((profile) => (
          <li
            key={profile.id}
            className="grid gird-cols-5 border-black border-2"
          >
            <strong className="text-2xl">
              {profile.userName}님의 프로필 입니다.
            </strong>
            <img
              src={`${profile.profileImg}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full"
            />
            <p className="p-4 text-black">{profile.profileDesc}</p>
          </li>
        ))}
      </ul>
      <ul>
        {lounges?.map((lounge) => (
          <li key={lounge.id} className="">
            <div className="bg-indigo-700 w-[500px] h-[500px] rounded-lg">
              <p className="text-white text-center m-4 ">
                {lounge.name}님이 가입한 라운지를 보여드릴게요!
              </p>
              <div className="w-[400px] h-[400px] bg-white rounded-2xl ml-12 pt-4">
                라운지 목록 자리
                <br />
                <div className="w-[200px] h-[200px] bg-gray-400 rounded-xl">
                  <p className="text-xl text-white">
                    {lounge.name}
                    <br />
                    <span className="text-white">
                      작성일 {lounge.createdAt?.substring(0, 10)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} className="">
            <div className="bg-indigo-700 w-[500px] h-[500px] rounded-lg">
              <p className="text-white text-center m-4 ">
                {post.userId}님이 작성한 게시글을 보여드릴게요!
              </p>
              <div className="w-[400px] h-[400px] bg-white rounded-2xl ml-12 pt-4">
                게시글 목록 자리
                <br />
                <div className="w-[200px] h-[200px] bg-gray-400 rounded-xl">
                  <p className="text-xl text-white">
                    {post.title}
                    <br />
                    {post.content}
                    <br />
                    <span className="text-white">
                      작성일 {post.createdAt.substring(0, 10)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Profile;
