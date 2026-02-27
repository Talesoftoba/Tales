"use client";

import { useEffect, useState } from "react";
import { IconArrow } from  "./icons"; 

export default function ScrollHint({ targetId }: { targetId: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const fn = () => setShow(el.scrollTop < 30);
    el.addEventListener("scroll", fn, { passive: true });
    return () => el.removeEventListener("scroll", fn);
  }, [targetId]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-300 animate-nudge ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <IconArrow className="w-3.5 h-3.5 text-[#FF5C00]" />
      <span className="font-display text-[8px] font-bold tracking-[0.18em] uppercase text-[#FF5C00]">
        scroll
      </span>
    </div>
  );
}