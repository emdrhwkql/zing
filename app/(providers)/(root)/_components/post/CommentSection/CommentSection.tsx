"use client";

import { useEffect, useState } from "react";
import api from "@/api/commet.api";

interface Comment {
    id: number;
    postId: number;
    userId: string;
    content: string;
    createdAt: string;
}

const CommentSection = ({ postId, initialComments, userId }: { postId: number; initialComments: Comment[]; userId: string }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async () => {
        try {
            const fetchedComments = await api.posts.getComments(postId);
            setComments(fetchedComments);
        } catch (error) {
            console.error("댓글을 가져오는 데 실패했습니다:", error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment) return;

        try {
            await api.posts.addComment(postId, newComment, userId); // 사용자 ID를 동적으로 가져옴
            setNewComment("");
            fetchComments(); // 댓글 리스트 업데이트
        } catch (error) {
            console.error("댓글 추가에 실패했습니다:", error);
        }
    };

    // 컴포넌트가 마운트될 때 댓글을 가져옵니다.
    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">댓글</h2>
            <div className="space-y-2">
                {comments.map((comment) => (
                    <div key={comment.id} className="border p-2 rounded">
                        <p>{comment.content}</p>
                        <span className="text-gray-500 text-sm">{comment.createdAt}</span>
                    </div>
                ))}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                    placeholder="댓글을 입력하세요..."
                />
                <button
                    onClick={handleAddComment}
                    className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
                >
                    추가
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
