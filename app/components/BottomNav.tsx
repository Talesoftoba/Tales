"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconBriefcase, IconPen } from "./icons";

const NAV = [
  { label: "Home",  href: "/",      icon: IconHome       },
  { label: "Work",  href: "/work",  icon: IconBriefcase  },
  { label: "Craft", href: "/craft", icon: IconPen        },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 -mx-7 bg-white/95 backdrop-blur-md border-t border-black/5 flex justify-around pt-3 pb-2">
      {NAV.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center gap-1.25 px-5 font-display text-[9px] font-bold tracking-widest uppercase transition-colors duration-150 no-underline ${
              active ? "text-[#FF5C00]" : "text-[#9A9A9A] hover:text-[#111111]"
            }`}
          >
            <Icon />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}