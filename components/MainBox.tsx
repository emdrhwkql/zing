import { PropsWithChildren } from "react";

function MainBox({
	children,
	bgColor,
}: PropsWithChildren<{ bgColor?: string }>) {
	return (
		<div>
			{bgColor === "none" ? (
				<div className="p-6 rounded-xl w-[950px]">{children}</div>
			) : (
				<div className="p-6 rounded-xl w-[950px] bg-white">
					{children}
				</div>
			)}
		</div>
	);
}

export default MainBox;
