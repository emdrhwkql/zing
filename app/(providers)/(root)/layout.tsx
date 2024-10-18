import React from "react";
import AuthProvider from "./_components/AuthProvider/AuthProvider";
import Footer from "./_components/Footer/Footer";
import Header from "./_components/Header/Header";
import SideBar from "./_components/SideBar/SideBar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <SideBar />
      <AuthProvider>{children}</AuthProvider>
      <Footer />
    </div>
  );
}

export default RootLayout;
