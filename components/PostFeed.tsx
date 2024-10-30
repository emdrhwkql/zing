import { Tables } from "@/supabase/database.types";
import Image from "next/image";
import Link from "next/link";

interface PostFeedProps {
  post: Tables<"posts"> & { author: Tables<"users"> };
}

function PostFeed({ post }: PostFeedProps) {
  return (
    <article>
      <Link
        href={`/posts/${post.id}`}
        className="flex flex-col max-w-sm w-full"
      >
        {/* Header */}
        <div className="flex flex-row gap-x-2 items-center pb-2">
          <div className="w-10 h-10 relative">
            <Image
              src={post.author.profileImg}
              alt={post.author.userId}
              fill
              className="rounded-full"
            />
          </div>

          <span>{post.author.userName}</span>
        </div>

        {/* Image */}
        <div>
          <div className="aspect-square w-full relative">
            <Image src={post.imageUrl} fill alt={post.title} />
          </div>
          <h6 className="font-semibold text-lg">{post.title}</h6>

          <p>{post.content}</p>
        </div>
        {/* Title and Content */}

        {/* Footer */}
        <div className="flex flex-row items-center mt-2 pt-2 border-t">
          <span className="leading-3">{post.createdAt.slice(0, 10)}</span>

          <div className="ml-auto flex flex-row gap-x-2 items-center">
            {/* <LikeButton postId={post.id} />

            <FaShareAlt /> */}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostFeed;
