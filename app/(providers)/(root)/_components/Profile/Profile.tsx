"use client";

// import profilesAPI from "@/api/profile.api";
import api from "@/api/api";
import supabase from "@/supabase/client";
import { queryClient } from "@/tanstack/query/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileLounge from "./ProfileLounge/ProfileLounge";
import ProfilePost from "./ProfilePost/ProfilePost";

//   프로필 수정 컴포넌트 불러와서 필요한 부분에서 불러오기
function Profile() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();

  const { data: myLounges } = useQuery({
    queryKey: ["myLounges"],
    queryFn: async () => api.lounges.getMyLounges(currentUser!),
    enabled: !!currentUser,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await api.users.getUser(currentUser!),
    enabled: !!currentUser,
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await api.posts.getPostsICreated(),
    enabled: !!currentUser,
  });

  const { mutate: selectProfile } = useMutation({
    mutationFn: async () =>
      await supabase.from("users").select("*").eq("userId", currentUser!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const { mutate: selectPost } = useMutation({
    mutationFn: async () =>
      await supabase.from("posts").select("*").eq("userId", currentUser!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  useEffect(() => {
    (async () => {
      if (!user!) {
        router.push("/");
        return;
      }
    })();
    selectPost();
    selectProfile();
  }, []);

  return (
    <main className="flex-none gap-5">
      <ul className="ml-24 bg-indigo-300 w-[1340px] h-full rounded-lg flex justify-center mt-4">
        <div className="bg-indigo-700 w-[300px] h-[700px] rounded-lg pt-1 mb-4 ml-4 mt-4">
          <h2 className="text-white text-center m-4">
            {user?.userName}님이 가입한 라운지를 보여드릴게요!
          </h2>
          {myLounges ? (
            myLounges.map((lounge) => (
              <ProfileLounge key={lounge.id} lounge={lounge} />
            ))
          ) : (
            <p>가입한 라운지가 없습니다.</p>
          )}
        </div>

        {user?.profileImg ? (
          <li key={user.id} className="flex mt-4 w-full justify-between">
            <strong className="text-4xl text-left ml-4">{user.userName}</strong>
            <img
              src={`${user.profileImg}`}
              alt=""
              className="w-[250px] h-[250px] rounded-full mx-4"
            />
            <p className="p-4 text-black mr-8 flex items-end">
              <span>{user.profileDesc}</span>
            </p>
          </li>
        ) : (
          <p>프로필을 추가해 주세요.</p>
        )}
        <section className="flex justify-between">
          <div className="bg-indigo-700 w-[300px] h-full rounded-lg pt-1 mb-4 mr-4 mt-4">
            <img
              src="https://i.pinimg.com/enabled/564x/3a/c8/2d/3ac82dfc0e349f84d3afe91093959b81.jpg"
              alt=""
              className="w-[250px] h-[250px] rounded-full mx-4"
            />

            <h2 className="text-white text-center m-4 ">
              {user?.userName}님이 작성한 게시글을 보여드릴게요!
            </h2>
            {posts ? (
              posts.map((post) => <ProfilePost post={post} key={post.id} />)
            ) : (
              <p>작성한 게시글이 없습니다.</p>
            )}
          </div>
        </section>
      </ul>
    </main>
  );
}

export default Profile;
