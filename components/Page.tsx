import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
	return <main className="min-h-screen sm:pt-10 p-10">{children}</main>;
}

export default Page;
