import { Post } from "@/schema/posts.schema";

function ProfilePost({ post }: { post: Post }) {
  return (
    <ul className="">
      <li key={post.id} className="mt-4">
        <br />
        <div className="w-[100px] h-[100px] bg-gray-400 rounded-xl">
          <p className="text-xl text-white">
            {post.title}
            <br />
            {post.content}
            <br />
            <span className="text-white">
              작성일 {post.createdAt.substring(0, 10)}
            </span>
          </p>
        </div>
      </li>
    </ul>
  );
}

export default ProfilePost;
