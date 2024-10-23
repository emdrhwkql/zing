import { Tables } from "@/supabase/database.types";

export type Post = {
	content: string;
	createdAt: string;
	id: number;
	loungeId: number;
	title: string;
	userId: string;
};

export type Posts = Tables<"posts">;
