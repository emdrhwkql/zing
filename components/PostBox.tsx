import { PropsWithChildren } from "react";

function PostBox({
	children,
	bgColor,
}: PropsWithChildren<{ bgColor?: string }>) {
	return (
		<div>
			{bgColor === "bg-gray-600" ? (
				<div className="p-6 rounded-xl w-[950px] bg-gray-600">
					{children}
				</div>
			) : (
				<div className="p-6 rounded-xl w-[950px] bg-[#fdfbfc]">
					{children}
				</div>
			)}
		</div>
	);
}

export default PostBox;
