import supabase from "@/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

interface Comment {
	id: number;
	postId: number;
	userId: string;
	content: string;
	createdAt: string;
}

// GET: 특정 포스트의 댓글 가져오기
const getComments = async (postId: number): Promise<Comment[]> => {
	const { data, error } = await supabase
		.from("comments")
		.select("*")
		.eq("postId", postId)
		.order("createdAt", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}
	return data as Comment[];
};

// POST: 특정 포스트에 댓글 추가하기
const addComment = async (
	postId: number,
	content: string,
	userId: string
): Promise<Comment> => {
	// Ensure userId is a valid UUID
	const validUserId = isValidUUID(userId) ? userId : uuidv4();

	const { data, error } = await supabase
		.from("comments")
		.insert([{ postId, content, userId: validUserId }])
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	if (!data) {
		throw new Error("댓글 추가에 실패했습니다. 데이터가 null입니다.");
	}

	return data as Comment;
};

// UUID 유효성 검사 함수
function isValidUUID(uuid: string): boolean {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(uuid);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { postId } = req.query;

	if (req.method === "GET") {
		try {
			const comments = await getComments(Number(postId));
			return res.status(200).json(comments);
		} catch (error) {
			alert(error);
			return res
				.status(500)
				.json({ message: "댓글을 가져오는 데 실패했습니다." });
		}
	}

	if (req.method === "POST") {
		const { content } = req.body;
		const userId = req.headers["user-id"] as string;

		if (!content) {
			return res.status(400).json({ message: "댓글 내용을 입력하세요." });
		}

		try {
			const newComment = await addComment(
				Number(postId),
				content,
				userId
			);
			return res.status(201).json(newComment);
		} catch (error) {
			alert(error);
			return res
				.status(500)
				.json({ message: "댓글을 추가하는 데 실패했습니다." });
		}
	}

	// 지원되지 않는 HTTP 메서드
	res.setHeader("Allow", ["GET", "POST"]);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}
