"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Only render the component once mounted to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-2 w-10 h-10 border border-border/50 rounded-full bg-muted/20" />;
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="group relative p-2.5 rounded-full bg-muted/20 hover:bg-muted/40 transition-all duration-500 border border-border/50 hover:border-foreground/20 cursor-pointer"
            aria-label="Toggle Theme"
        >
            <div className="relative w-5 h-5 overflow-hidden">
                {/* Sun Icon */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${resolvedTheme === "dark" ? "translate-y-[120%] opacity-0 rotate-90" : "translate-y-0 opacity-100 rotate-0"
                        }`}
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                </svg>

                {/* Moon Icon */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${resolvedTheme === "dark" ? "translate-y-0 opacity-100 rotate-0" : "translate-y-[-120%] opacity-0 -rotate-90"
                        }`}
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>

            </div>

            {/* Subtle glow effect on hover */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-foreground/5 blur-sm transition-opacity duration-500"></span>
        </button>
    );
}

