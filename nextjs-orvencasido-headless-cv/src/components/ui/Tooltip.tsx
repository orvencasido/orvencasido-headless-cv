"use client";

import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className="group/item relative flex items-center justify-center">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0 z-10">
        <div className="relative px-2 py-1 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-xl text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap text-foreground flex items-center gap-2">
          <span className="tabular-nums">{text}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-background border-r border-b border-border/50 rotate-45 -mt-1"></div>
        </div>
      </div>
    </div>
  );
};
