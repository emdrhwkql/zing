import React, { Suspense } from "react";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense>
			<div>
				<Header />
				{children}
				<Footer />
			</div>
		</Suspense>
	);
}

export default RootLayout;
