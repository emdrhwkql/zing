import { Tables } from "@/supabase/database.types";
import Image from "next/image";
import Link from "next/link";
import { FaShareAlt } from "react-icons/fa";
import LikeButton from "./LikeButton";

interface PostFeedProps {
	post: Tables<"posts"> & { author: Tables<"users"> };
}

function PostByLoungeIdFeed({ post }: PostFeedProps) {
	return (
		<article>
			<Link
				href={`/posts/${post.id}`}
				className="flex flex-col max-w-sm w-full h-full"
			>
				{/* Header */}
				<div className="flex flex-row gap-x-2 items-center pb-2">
					<div className="w-8 h-8 relative">
						<Image
							src={post.author.profileImg}
							alt={post.author.userId}
							fill
							className="rounded-md"
						/>
					</div>
					{post.author.userName.length > 9 ? (
						<span>{post.author.userName.slice(0, 7)} • • •</span>
					) : (
						<span>{post.author.userName}</span>
					)}
				</div>

				{/* Image */}
				<div>
					<div className="h-80 relative">
						<Image
							src={post.imageUrl}
							fill
							alt={post.title}
							className="object-cover"
						/>
					</div>
					{post.title.length > 10 ? (
						<h6 className="font-semibold text-lg">
							{post.title.slice(0, 8)} • • •
						</h6>
					) : (
						<h6 className="font-semibold text-lg">{post.title}</h6>
					)}

					{post.content.length > 10 ? (
						<p>{post.content.slice(0, 9)} · · ·</p>
					) : (
						<p>{post.content}</p>
					)}
				</div>
				{/* Title and Content */}

				{/* Footer */}
				<div className="flex flex-row items-center mt-2 pt-2 border-t">
					<span className="leading-3">
						{post.createdAt.slice(0, 10)}
					</span>

					<div className="ml-auto flex flex-row gap-x-2 items-center">
						<LikeButton postId={post.id} />

						<FaShareAlt />
					</div>
				</div>
			</Link>
		</article>
	);
}

export default PostByLoungeIdFeed;
