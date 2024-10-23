export type Posts = {
	id: number;
	title: string;
	loungeId: number;
	userId: string;
	content: string;
	createdAt: string;
}[];

export type PostsIdPropsType = {
	params: {
		postId: string;
		searchParams: {};
	};
};
