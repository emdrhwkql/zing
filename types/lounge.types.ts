export type Lounges = {
	id: number;
	name: string;
	categoryId: number;
	userId: string | null;
	isCompleted: boolean;
	introduction: string;
	isLiked: boolean;
}[];

export type LoungeIdPropsType = {
	params: {
		loungeId: string;
		searchParams: {};
	};
};
