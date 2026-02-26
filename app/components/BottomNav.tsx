"use client";

import { useState } from "react";
import { NAV } from "../lib/data";      
import { IconHome, IconBriefcase, IconPen } from "./icons"; 

const ICON_MAP = { home: IconHome, briefcase: IconBriefcase, pen: IconPen } as const;

export default function BottomNav() {
  const [active, setActive] = useState(0);

  return (
    <nav className="sticky bottom-0 -mx-7 bg-white/95 backdrop-blur-md border-t border-black/5 flex justify-around pt-3 pb-2">
      {NAV.map(({ label, icon }, i) => {
        const Icon    = ICON_MAP[icon];
        const current = active === i;
        return (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`flex flex-col items-center gap-1.25 px-5 font-display text-[9px] font-bold tracking-widest
               uppercase transition-colors duration-150 cursor-pointer bg-transparent border-0 ${
              current ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            <Icon />
            {label}
          </button>
        );
      })}
    </nav>
  );
}