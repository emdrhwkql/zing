"use client";

import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/search")) {
    return null;
  }

  return (
    <footer className="h-52 bg-black/70 text-white text-center text-3xl mt-[400px]">
      Footer
    </footer>
  );
}

export default Footer;
