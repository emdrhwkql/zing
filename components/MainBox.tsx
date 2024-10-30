import { PropsWithChildren } from "react";

function MainBox({ children }: PropsWithChildren) {
	return (
		<div>
			<div className="p-6 rounded-xl w-[1000px] bg-white">{children}</div>
		</div>
	);
}

export default MainBox;
