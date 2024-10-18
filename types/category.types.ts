export type categoryListTypes = {
	categoryId: string;
	categoryName: string;
	categoryImg: string | null;
	createdAt: string;
	id: number;
};

export type categoryDetailTypes = {
	params: {
		categoryId: string;
	};
	searchParams: {};
};

export type CategoryIdPropsType = {
	params: {
		categoryId: string;
		searchParams: {};
	};
};
