"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  // search는 검색할 때 footer 안 보이게 처리
  if (pathname.startsWith("/search")) {
    return null;
  }

  return (
    <footer className="h-52 bg-black/70 text-white py-4 text-center text-2xl mt-[170px] flex flex-col justify-center items-center">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mt-2">
          <p>담당 이메일 : zing@gmail.com | </p>
          <a href="#" className="hover:text-gray-400">개인정보처리방침 |</a>
          <a href="#" className="hover:text-gray-400">청소년보호정책 |</a>
          <a href="#" className="hover:text-gray-400">문의 신고 |</a>
          <a href="#" className="hover:text-gray-400">고객센터 |</a>
          <a href="#" className="hover:text-gray-400">게시글 중단 요청</a>
        </div>
      </div>
      <div className="border-t border-white w-full mt-4"></div>
      <p className="text-sm">
        Copyright ©  {new Date().getFullYear()} zing. All rights reserved.
      </p>
      <p className="text-sm">

      </p>
      <div className="mt-4">
      </div>
    </footer>
  );
}

export default Footer;

