"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar"; // Your provided Navbar component

export default function ConditionalNavbar() {
  const pathname = usePathname();
  // Only show the main navbar on "/" and "/blog" pages.
  const allowedPaths = ["/", "/blog"];
  const showNavbar = allowedPaths.some(
    (allowed) => pathname === allowed || pathname.startsWith(`${allowed}/`)
  );
  return showNavbar ? <Navbar /> : null;
}
