"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconBriefcase, IconPen } from "./icons";
import ContactButton from "./ContactButton";
import { META } from "../lib/data";
import { motion, type Variants } from "framer-motion";

const NAV = [
  { label: "Home",       href: "/",      icon: IconHome      },
  { label: "Work",       href: "/work",  icon: IconBriefcase },
  { label: "Experience", href: "/craft", icon: IconPen       },
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
      className="shrink-0 flex flex-col px-7 py-10 min-h-full"
      style={{
        width: "280px",
        background: "rgba(20, 18, 12, 0.72)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset -1px 0 0 rgba(255,255,255,0.04), 4px 0 32px rgba(0,0,0,0.12)",
      }}
      variants={sidebarVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex-1">

        {/* Avatar + contact */}
        <motion.div className="flex items-center gap-3 mb-6" variants={slideIn}>
          <motion.div
            className="relative shrink-0"
            whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 360, damping: 18 } }}
          >
            <div className="rounded-2xl overflow-hidden relative"
              style={{ width: 52, height: 52, boxShadow: "0 4px 16px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.1)" }}>
              <Image src="/avatar2.jpg" alt="Avatar" quality={100} fill sizes="52px" className="object-cover" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0D0C0A]" />
          </motion.div>
          <ContactButton phone={META.phone} />
        </motion.div>

        {/* Name / meta */}
        <motion.div variants={slideIn} className="mb-5">
          <h2 className="font-display text-[23px] font-extrabold tracking-[-0.03em] text-white leading-tight mb-1.5">
            Toba
          </h2>
          <div className="inline-flex items-center gap-1.5 bg-[#FF5C00]/15 border border-[#FF5C00]/25 rounded-full px-2.5 py-1 mb-2">
            <span className="w-1 h-1 rounded-full bg-[#FF5C00]" />
            <p className="font-display text-[9.5px] font-bold tracking-[0.1em] uppercase text-[#FF5C00]">{META.role}</p>
          </div>
          <p className="font-body text-[11px] text-white/30 block">{META.location} · {META.timezone}</p>
        </motion.div>

        {/* Availability */}
        <motion.div
          className="flex items-center gap-2 mb-7 w-fit px-3 py-1.5 rounded-full border"
          style={{
            background: "rgba(34,197,94,0.10)",
            borderColor: "rgba(34,197,94,0.25)",
          }}
          variants={slideIn}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-display text-[9.5px] font-bold tracking-widest uppercase text-green-400">
            Available for work
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mb-5"
          style={{ height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.01))" }}
          variants={slideIn}
        />

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
                    font-bold tracking-[0.08em] uppercase no-underline transition-all duration-150`}
                  style={active ? {
                    color: "#FF5C00",
                    background: "rgba(255,92,0,0.12)",
                    border: "1px solid rgba(255,92,0,0.20)",
                    boxShadow: "0 2px 12px rgba(255,92,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                  } : {
                    color: "rgba(255,255,255,0.40)",
                    border: "1px solid transparent",
                  }}
                >
                  <motion.span
                    animate={active ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ display: "flex" }}
                  >
                    <Icon />
                  </motion.span>
                  {label}
                  {active && (
                    <motion.span
                      layoutId="navDot"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF5C00]"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: copyright */}
      <motion.div variants={slideIn} className="mt-8 pt-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase"
          style={{ color: "rgba(255,255,255,0.18)" }}>
          2026 ✦ Talesoftoba
        </p>
      </motion.div>

    </motion.aside>
  );
}