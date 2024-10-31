export type Post = {
	content: string;
	createdAt: string;
	id: number;
	loungeId: number;
	title: string;
	userId: string;
	imageUrl: string;
	view_count: number;
};

// 이 경우 PostFeed은 잘 적용 되지만 다른 post props 타입들이 맞지 않음
// export type Post = {
// 	content: string;
// 	createdAt: string;
// 	id: number;
// 	imageUrl: string;
// 	loungeId: number;
// 	title: string;
// 	userId: string;
// 	view_count: number;
// } & {
// 	author: Tables<"users">;
// };

export type Posts = Post[];

export type PostsIdPropsType = {
	params: {
		postId: string;
		searchParams: {};
	};
};
