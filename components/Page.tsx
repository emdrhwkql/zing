import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
	return (
		<main className="border mx-10 mt-10 py-5 grid place-items-center">
			{children}
		</main>
	);
}

export default Page;
