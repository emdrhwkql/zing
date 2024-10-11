import React from "react";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default RootLayout;
