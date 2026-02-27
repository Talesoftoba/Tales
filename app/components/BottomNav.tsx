"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconBriefcase, IconPen } from "./icons";

const NAV = [
  { label: "Home",  href: "/",      icon: IconHome      },
  { label: "Work",  href: "/work",  icon: IconBriefcase },
  { label: "Craft", href: "/craft", icon: IconPen       },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden flex justify-around items-center py-3">
      {NAV.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={label} href={href}
            className={`flex flex-col items-center gap-1.5 px-6 py-2 rounded-2xl font-display text-[10px] font-extrabold tracking-[0.12em] uppercase transition-all duration-200 no-underline ${
              active ? "text-[#FF5C00] bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className={`transition-transform duration-200 ${active ? "scale-110" : ""}`}><Icon /></span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}