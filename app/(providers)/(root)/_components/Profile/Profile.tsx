"use client";

import supabase from "@/supabase/client";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//   프로필 수정 컴포넌트 불러와서 필요한 부분에서 불러오기
function Profile() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();

  const { data: lounge } = useQuery({
    queryKey: ["lounge"],
    queryFn: async () =>
      await supabase.from("lounges").select("*").eq("userId", currentUser!.id),
    enabled: !!currentUser,
  });

  const lounges = lounge?.data;
  console.log(lounges);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      await supabase.from("profile").select("*").eq("userId", currentUser!.id),
    enabled: !!currentUser,
  });

  const profiles = profile?.data;
  console.log("profiles", profiles);

  const { data: post } = useQuery({
    queryKey: ["post"],
    queryFn: async () =>
      await supabase.from("posts").select("*").eq("userId", currentUser!.id),
    enabled: !!currentUser,
  });

  const posts = post?.data;
  console.log(post);

  const { mutate: selectLounge } = useMutation({
    mutationFn: async () =>
      await supabase.from("lounges").select("*").eq("userId", currentUser!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lounge"] }),
  });

  const { mutate: selectProfile } = useMutation({
    mutationFn: async () =>
      await supabase.from("profile").select("*").eq("userId", currentUser!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  const { mutate: selectPost } = useMutation({
    mutationFn: async () =>
      await supabase.from("posts").select("*").eq("authorId", currentUser!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["post"] }),
  });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
        return;
      }

      selectLounge();
      selectProfile();
      selectPost();
    })();
  }, []);
  return (
    <main className="flex-none gap-5">
      <ul className="ml-24 bg-indigo-300 w-[1500px] h-[300px] rounded-lg flex justify-center">
        {profiles ? (
          profiles?.map((profile) => (
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
          ))
        ) : (
          <p>프로필이 없습니다.</p>
        )}
      </ul>
      <ul>
        {lounges ? (
          lounges?.map((lounge) => (
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
          ))
        ) : (
          <p>가입한 라운지가 없습니다.</p>
        )}
      </ul>
      <ul>
        {posts ? (
          posts?.map((post) => (
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
          ))
        ) : (
          <p>작성한 게시글이 없습니다.</p>
        )}
      </ul>
    </main>
  );
}

export default Profile;
