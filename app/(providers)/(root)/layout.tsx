import React from "react";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";
import AuthProvider from "./_components/AuthProvider";

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			<AuthProvider>
				{children}
			</AuthProvider>;
			<Footer />
		</div>
	);
}

export default RootLayout;