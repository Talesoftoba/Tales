"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconBriefcase, IconPen } from "./icons";
import ContactButton from "./ContactButton";
import { META, TIMELINE } from "../lib/data";
import { motion, type Variants } from "framer-motion";

const NAV = [
  { label: "Home",  href: "/",      icon: IconHome      },
  { label: "Work",  href: "/work",  icon: IconBriefcase },
  { label: "Craft", href: "/craft", icon: IconPen       },
];

const sidebarVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.18 } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const navItemVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
};

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      className="shrink-0 flex flex-col justify-between border-r border-black/8 px-8 py-10"
      style={{ width: "280px" }}
      variants={sidebarVariants}
      initial="hidden"
      animate="show"
    >
      <div>
        {/* Avatar + contact */}
        <motion.div className="flex items-center gap-3 mb-5" variants={slideIn}>
          <motion.div
            className="w-12 h-12 rounded-2xl overflow-hidden relative shrink-0"
            whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 360, damping: 18 } }}
          >
            <Image src="/avatar2.jpg" alt="Avatar" quality={100} fill sizes="140px" className="object-cover" />
          </motion.div>
          <ContactButton phone={META.phone} />
        </motion.div>

        {/* Name / meta */}
        <motion.div variants={slideIn}>
          <h2 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-[#111111] leading-tight mb-1">
            Talesdev
          </h2>
          <p className="font-body text-[13px] text-[#9A9A9A] mb-1">{META.role}</p>
          <p className="font-body text-[12px] text-[#C8C8C8]">{META.location} · {META.timezone}</p>
        </motion.div>

        {/* Availability */}
        <motion.div className="flex items-center gap-2 mt-5 mb-8" variants={slideIn}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-display text-[10px] font-bold tracking-widest uppercase text-green-600">
            Available for work
          </span>
        </motion.div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <motion.div
                key={label}
                variants={navItemVariant}
                whileHover={
                  !active
                    ? { x: 4, transition: { type: "spring", stiffness: 400, damping: 20 } }
                    : {}
                }
                whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-display text-[11px]
                    font-bold tracking-[0.08em] uppercase no-underline transition-colors duration-150
                    ${active
                      ? "text-[#FF5C00] bg-[#FF5C00]/8"
                      : "text-[#9A9A9A] hover:text-[#111111] hover:bg-black/4"
                    }`}
                >
                  <motion.span
                    animate={active ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ display: "flex" }}
                  >
                    <Icon />
                  </motion.span>
                  {label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: experience + copyright */}
      <motion.div variants={slideIn}>
        <div className="border border-black/8 rounded-2xl p-4 mb-6">
          <p className="font-display text-[9px] font-bold tracking-[0.14em] uppercase text-[#C8C8C8] mb-3">
            Experience
          </p>
          <div className="flex flex-col gap-2.5">
            {TIMELINE.map(({ role, period }, i) => (
              <motion.div
                key={role}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.07, ease: "easeOut" }}
              >
                <span className="font-display text-[10px] font-extrabold tracking-[0.04em] uppercase text-[#111111]">
                  {role}
                </span>
                <span className="font-body text-[10px] text-[#C8C8C8]">{period}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="font-display text-[12px] font-bold tracking-widest uppercase text-[#0D0C0A]">
          2026 ✦ Talesoftoba
        </p>
      </motion.div>
    </motion.aside>
  );
}