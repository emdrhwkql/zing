import { PropsWithChildren } from "react";

function PostBox({
	children,
	bgColor,
}: PropsWithChildren<{ bgColor?: string }>) {
	return (
		<div>
			{bgColor === "pink" ? (
				<div className="p-6 rounded-xl w-[950px] bg-[#928490]">
					{children}
				</div>
			) : (
				<div className="p-6 rounded-xl w-[950px] bg-white">
					{children}
				</div>
			)}
		</div>
	);
}

export default PostBox;
