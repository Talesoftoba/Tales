"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Home",  href: "/"      },
  { label: "Work",  href: "/work"  },
  { label: "Craft", href: "/craft" },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 bg-black/[0.06] rounded-full px-2 py-2">
      {NAV.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={`px-5 py-1.5 rounded-full font-display text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-200 no-underline ${
              active
                ? "bg-[#FF5C00] text-white shadow-[0_2px_8px_rgba(255,92,0,0.35)]"
                : "text-[#555] hover:text-[#111] hover:bg-black/[0.06]"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}