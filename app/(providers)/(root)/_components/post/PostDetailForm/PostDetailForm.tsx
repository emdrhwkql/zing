"use client";

import api from "@/api/api";
import LikeButton from "@/components/LikeButton";
import MainBox from "@/components/MainBox";
import Page from "@/components/Page";
import UpdatePostModal from "@/components/UpdatePostModal";
import { Post } from "@/types/posts.types";
import { useModalStore } from "@/zustand/modal.store";
import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import CommentSection from "../CommentSection/CommentSection";

interface CommentTypeProps {
  comments: {
    content: string;
    createdAt: string;
    id: number;
    postId: number | null;
    userId: string;
  }[];
}
[];

function PostDetailForm({ postId }: { postId: number }) {
  const [comments, setComments] = useState<CommentTypeProps[]>([]);
  const [post, setPost] = useState<Post>();
  const openModal = useModalStore((state) => state.openModal);

  const handleClickOpenModal = () => {
    openModal(<UpdatePostModal />);
  };

  useEffect(() => {
    (async () => {
      const post = await api.posts.getPost(postId);
      const comments = await api.comments.getComments(postId);

      setPost(post);
      setComments(comments);
    })();
  }, []);

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const userId = post.userId;

  const commentsWithUserId = comments
    ? comments.map((comment) => ({
        ...comment,
        userId: userId, // 포스트의 유저 아이도로 넣음
      }))
    : null;

  return (
    <Page>
      <MainBox>
        <div className="grid grid-cols-1 gap-y-2 items-center pb-2">
          <div className="w-4 h-4 bg-gray-500 rounded-md" />
          <p>{post.userId}</p>

          <img src={post.imageUrl} alt="" className="w-48 h-48 bg-black" />
          <h1 className="font-semibold text-lg">{post.title}</h1>

          <p>{post.content}</p>
          <button
            onClick={handleClickOpenModal}
            className="rounded-full w-36 h-10 py-2 flex flex-row gap-x-2 justify-center items-center border hover:bg-[#73020b9d] hover:duration-300 active:scale-110"
          >
            수정하기
          </button>
          <div className="flex flex-row items-center mt-2 pt-2 border-t">
            <span className="leading-3">{post.createdAt.slice(0, 10)}</span>

            <div className="ml-auto flex flex-row gap-x-3">
              <LikeButton postId={postId} />
              <FaShareAlt />
            </div>
          </div>
        </div>
        <CommentSection
          postId={postId}
          initialComments={commentsWithUserId}
          userId={userId}
        />
      </MainBox>
    </Page>
  );
}

export default PostDetailForm;
