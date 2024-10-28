export type Lounge = {
	id: number;
	name: string;
	categoryId: number;
	userId: string | null;
	isCompleted: boolean;
	introduction: string;
	isLiked: boolean;
};

export type Lounges = Lounge[];

export type LoungeIdPropsType = {
	params: {
		loungeId: string;
	};
	searchParams: {
		type?: "popular" | "newest" | undefined;
	};
};
