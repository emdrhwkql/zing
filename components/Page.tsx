import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
	return (
		<main className="min-h-screen sm:pt-10 p-10 px-[calc((100%-1470px)/2)]">
			{children}
		</main>
	);
}

export default Page;
