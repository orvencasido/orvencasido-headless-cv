"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
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
                    No Cost Headless Website Using Sanity and Vercel
                </Link>
                {/* <nav className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                    >
                        Resume
                    </Link>
                    <Link
                        href="/blogs"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Blogs
                    </Link>
                    <Link
                        href="/journey"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        My Journey
                    </Link>
                </nav> */}
            </div>
        </header>
    );
}

