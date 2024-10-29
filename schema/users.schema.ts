import { Tables } from "@/supabase/database.types";

export type User = {
	createdAt: string;
	id: number;
	profileDesc: string;
	profileImg: string;
	userId: string;
	userName: string;
};

export type Users = Tables<"users">;
