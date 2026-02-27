"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

export default function ContactButton({ phone }: { phone: string }) {
  const btn   = useRef<HTMLAnchorElement>(null);
  const left  = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!btn.current) return;
      const r  = btn.current.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const a  = Math.atan2(e.clientY - cy, e.clientX - cx);
      const d  = Math.min(2.5, Math.hypot(e.clientX - cx, e.clientY - cy) / 25);
      const tx = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`;
      if (left.current)  left.current.style.transform  = tx;
      if (right.current) right.current.style.transform = tx;
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        @keyframes eyeblink {
          0%, 88%, 100% { transform: scaleY(1); }
          93%            { transform: scaleY(0.08); }
        }
        .eye-outer-left  { animation: eyeblink 3.5s ease-in-out infinite; }
        .eye-outer-right { animation: eyeblink 3.5s ease-in-out infinite; animation-delay: 0.12s; }
      `}</style>

      <Link
        ref={btn}
        href={`https://wa.me/${phone}`}
        className="flex items-center gap-2 bg-[#FF5C00] text-white rounded-full px-4 py-2 font-display font-bold text-[12px] 
        tracking-wide no-underline transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_22px_rgba(255,92,0,0.38)]"
      >
        Contact me
        <span className="flex gap-1" aria-hidden>
          <span className="eye-outer-left flex items-center justify-center w-4.25 h-4.25 rounded-full bg-white">
            <span
              ref={left}
              className="block w-1.75 h-1.75 rounded-full bg-[#111111] transition-transform duration-100"
            />
          </span>
          <span className="eye-outer-right flex items-center justify-center w-4.25 h-4.25 rounded-full bg-white">
            <span
              ref={right}
              className="block w-1.75 h-1.75 rounded-full bg-[#111111] transition-transform duration-100"
            />
          </span>
        </span>
      </Link>
    </>
  );
}