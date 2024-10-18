export type Lounges = {
	id: number;
	name: string;
	categoryId: number;
	userId: string;
	isCompleted: boolean;
	introduction: string;
}[];

export type LoungeIdPropsType = {
	params: {
		loungeId: string;
		searchParams: {};
	};
};
