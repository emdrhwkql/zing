import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
	return <main className="min-h-screen sm:mt-[64px] m-10">{children}</main>;
}

export default Page;
