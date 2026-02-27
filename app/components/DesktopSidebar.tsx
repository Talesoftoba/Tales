"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconBriefcase, IconPen } from "./icons";
import ContactButton from "./ContactButton";
import { META, TIMELINE } from "../lib/data";

const NAV = [
  { label: "Home",  href: "/",      icon: IconHome      },
  { label: "Work",  href: "/work",  icon: IconBriefcase },
  { label: "Craft", href: "/craft", icon: IconPen       },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex-shrink-0 flex flex-col justify-between border-r border-black/8 px-8 py-10"
      style={{ width: "280px" }}
    >
      <div>
        {/* avatar + contact button side by side */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl overflow-hidden relative flex-shrink-0">
            <Image src="/avatar1.jpg" alt="Avatar" quality={100} fill className="object-cover" />
          </div>
          <ContactButton phone={META.phone} />
        </div>

        <h2 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-[#111111] leading-tight mb-1">
          Talesdev
        </h2>
        <p className="font-body text-[13px] text-[#9A9A9A] mb-1">{META.role}</p>
        <p className="font-body text-[12px] text-[#C8C8C8]">{META.location} · {META.timezone}</p>

        {/* availability badge */}
        <div className="flex items-center gap-2 mt-5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-display text-[10px] font-bold tracking-[0.1em] uppercase text-green-600">
            Available for work
          </span>
        </div>

        {/* nav */}
        <nav className="flex flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-display text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-200 no-underline ${
                  active
                    ? "text-[#FF5C00] bg-[#FF5C00]/8"
                    : "text-[#9A9A9A] hover:text-[#111111] hover:bg-black/4"
                }`}
              >
                <Icon />{label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* bottom: experience + copyright */}
      <div>
        <div className="border border-black/8 rounded-2xl p-4 mb-6">
          <p className="font-display text-[9px] font-bold tracking-[0.14em] uppercase text-[#C8C8C8] mb-3">Experience</p>
          <div className="flex flex-col gap-2.5">
            {TIMELINE.map(({ role, period }) => (
              <div key={role} className="flex items-center justify-between">
                <span className="font-display text-[10px] font-extrabold tracking-[0.04em] uppercase text-[#111111]">{role}</span>
                <span className="font-body text-[10px] text-[#C8C8C8]">{period}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-display text-[9px] font-bold tracking-[0.1em] uppercase text-[#C8C8C8]">
          2025 © Talesdev
        </p>
      </div>
    </aside>
  );
}