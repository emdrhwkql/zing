"use client";

import supabase from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import Link from "next/link";

function SideBar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleClickLogOut = () => supabase.auth.signOut();

  return (
    <main>
      {isLoggedIn ? (
        <div className="w-80 h-full absolute top-0 -right-0 bg-slate-400 opacity-0 group-hover:opacity-70">
          <button onClick={handleClickLogOut} className="">
            로그아웃
          </button>
          <button>
            <Link href={"my-profile"}>프로필 페이지</Link>
          </button>
        </div>
      ) : (
        <div>
          <Link
            href={"/sign-up"}
            className="font-medium text-base rounded-[15px] border border-white py-1.5 px-2.5"
          >
            로그인/회원가입
          </Link>
        </div>
      )}
    </main>
  );
}

export default SideBar;
