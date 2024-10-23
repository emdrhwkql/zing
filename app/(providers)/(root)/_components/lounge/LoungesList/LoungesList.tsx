"use client";

import { Lounges } from "@/types/lounge.types";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function LoungesList({
  lounges,
  pageTitle,
}: {
  lounges: Lounges;
  pageTitle?: boolean;
}) {
  const [isShowMore, setIsShowMore] = useState(false);

  const noFreeLounge = lounges?.filter((lounge) => lounge.categoryId !== 0);

  return (
    <PostBox>
      {pageTitle ? (
        <h1 className="mb-4 pb-4 font-bold text-2xl border-b">
          인기 라운지 목록
        </h1>
      ) : (
        <h1 className="mb-4 pb-4 font-bold text-2xl border-b">라운지 목록</h1>
      )}

      {isShowMore ? (
        <ul className="grid grid-cols-1 gap-y-5">
          {noFreeLounge
            .map((lounge) => (
              <li
                key={lounge.id}
                className="border-l-4 border-[#DBC1AD] rounded-md h-14 px-2 grid items-center"
              >
                <Link href={`/lounges/${lounge.id}`}>
                  <div className="flex flex-row items-center">
                    <div className="w-10 h-10 bg-gray-300" />

                    <div className="ml-3 flex flex-col">
                      <p>{lounge.name}</p>
                      <p>{lounge.introduction}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))
            .slice(0, 10)}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 gap-y-5">
          {noFreeLounge
            .map((lounge) => (
              <li
                key={lounge.id}
                className="border-l-4 border-[#DBC1AD] rounded-md h-14 px-2 grid items-center"
              >
                <Link href={`/lounges/${lounge.id}`}>
                  <div className="flex flex-row items-center">
                    <div className="w-10 h-10 bg-gray-300" />

                    <div className="ml-3 flex flex-col">
                      <p>{lounge.name}</p>
                      <p>{lounge.introduction}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))
            .slice(0, 4)}
        </ul>
      )}

      <div className="mt-3 flex justify-center relative">
        <button
          onClick={() => {
            setIsShowMore((e) => !e);
          }}
          className="absolute top-0 left-50 -translate-x-1/2 bg-[#fdfbfc] rounded-full p-3 shadow-[0_4px_4px_rgb(75,85,99)]"
        >
          {isShowMore ? (
            <FaMinus className="text-2xl" />
          ) : (
            <FaPlus className="text-2xl" />
          )}
        </button>
      </div>
    </PostBox>
  );
}

export default LoungesList;
