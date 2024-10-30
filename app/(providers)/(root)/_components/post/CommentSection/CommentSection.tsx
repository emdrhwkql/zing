"use client";

import api from "@/api/commet.api";
import { useEffect, useState } from "react";

interface Comment {
    id: number;
    postId: number;
    userId: string;
    content: string;
    createdAt: string;
}

const CommentSection = ({ postId, initialComments, userId }: { postId: number; initialComments: Comment[] | null; userId: string }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments ?? []);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //type에러 > null 유형은 할당할 수 없다고 떠서 추가
    //에러가 뜬다면 댓글 작성 실패했다고 뜨게 만듬
    const [error, setError] = useState<string | null>(null);

    const fetchComments = async () => {
        try {
            setIsLoading(true);
            const fetchedComments = await api.getComments(postId);
            const commentsWithUserId: Comment[] = (fetchedComments ?? []).map(comment => ({
                ...comment,

                //id를 string으로 바꾸게 코드 설정
                userId: String(comment.id)
            }));
            setComments(commentsWithUserId);
        } catch (error) {
            console.error("댓글을 가져오는 데 실패했습니다:", error);
            setError("댓글을 가져오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment) return;

        try {
            setIsLoading(true);
            await api.addComment(postId, newComment, userId);
            setNewComment("");
            fetchComments();
        } catch (error) {
            console.error("댓글 추가에 실패했습니다:", error);
            setError("댓글 추가에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">댓글</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-2">
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="border p-2 rounded">
                            <p>{comment.content}</p>
                            <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</span>
                        </div>
                    ))
                )}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                    placeholder="댓글을 입력하세요..."
                    disabled={isLoading}
                />
                <button
                    onClick={handleAddComment}
                    className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? "추가 중..." : "추가"}
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
