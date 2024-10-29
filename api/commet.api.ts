import supabase from "@/supabase/client";

interface Post {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	userId: string;
	// 필요한 다른 필드들...
}

interface Comment {
	id: number;
	postId: number;
	userId: string;
	content: string;
	createdAt: string;
}

const api = {
	posts: {
		createPost: async (
			title: string,
			content: string,
			loungeId: number
		): Promise<void> => {
			// 게시물 생성 로직...
		},
		getPost: async (postId: number): Promise<Post | null> => {
			const { data, error } = await supabase
				.from("posts")
				.select("*")
				.eq("id", postId)
				.single();

			if (error) throw new Error(error.message);
			return data as Post | null;
		},
		getComments: async (postId: number): Promise<Comment[]> => {
			const { data, error } = await supabase
				.from("comments")
				.select("*")
				.eq("postId", postId)
				.order("createdAt", { ascending: false });

			if (error) throw new Error(error.message);
			return (data || []).map((comment: any) => ({
				id: comment.id,
				postId: Number(comment.postId),
				userId: comment.userId,
				content: comment.content,
				createdAt: comment.createdAt,
			})) as Comment[];
		},
		addComment: async (
			postId: number,
			content: string,
			userId: string
		): Promise<Comment> => {
			const { data, error } = await supabase
				.from("comments")
				.insert([{ postId, content, userId }])
				.select()
				.single();

			if (error) throw new Error(error.message);
			if (!data) {
				throw new Error("댓글 추가 실패");
			}

			return {
				id: data.id,
				postId: Number(data.postId),
				userId: data.userId,
				content: data.content,
				createdAt: data.createdAt,
			} as Comment;
		},
	},
};

export default api;
