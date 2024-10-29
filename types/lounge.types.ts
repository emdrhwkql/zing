export type Lounge = {
  categoryId: number;
  createdAt: string;
  id: number;
  imageUrl: string;
  introduction: string;
  isCompleted: boolean;
  name: string;
  userId: string;
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
