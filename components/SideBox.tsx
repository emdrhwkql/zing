import { PropsWithChildren } from "react";

function SideBox({ children }: PropsWithChildren) {
	return (
		<div className="py-6 px-8 rounded-xl w-96 bg-[#fdfbfc]">{children}</div>
	);
}

export default SideBox;
