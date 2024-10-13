import { PropsWithChildren } from "react";

function PostBox({ children }: PropsWithChildren) {
	return (
		<div className="p-6 rounded-xl w-[950px] bg-[#fdfbfc]">{children}</div>
	);
}

export default PostBox;
