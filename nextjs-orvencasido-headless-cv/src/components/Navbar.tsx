"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
    const pathname = usePathname();

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="max-w-3xl mx-auto flex h-16 items-center justify-between px-6">
                <Link
                    href="/"
                    onClick={handleScrollToTop}
                    className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
                >
                    Home
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>

            </div>
        </header>
    );
}
