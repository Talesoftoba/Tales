"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconBriefcase, IconPen } from "./icons";
import { motion, type Variants } from "framer-motion";

const NAV = [
  { label: "Home",       href: "/",      icon: IconHome      },
  { label: "Work",       href: "/work",  icon: IconBriefcase },
  { label: "Experience", href: "/craft", icon: IconPen       },
];

const navVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } },
};

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="md:hidden grid grid-cols-3 items-center py-2
        relative z-50 bg-[#1C1A17]/95 backdrop-blur-md
        border-t border-white/[0.08]
        after:absolute after:inset-0 after:pointer-events-none"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      variants={navVariants}
      initial="hidden"
      animate="show"
    >
      {/* Faint top-edge glow — ties this nav to the sidebar and card seam */}
      <div
        aria-hidden
        className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,92,0,0.4), transparent)" }}
      />

      {NAV.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <motion.div
            key={label}
            variants={itemVariant}
            whileHover={{ scale: 1.1, y: -2, transition: { type: "spring", stiffness: 380, damping: 18 } }}
            whileTap={{ scale: 0.88, transition: { duration: 0.08 } }}
            className="flex justify-center"
          >
            <Link
              href={href}
              prefetch
              className={`relative flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl font-display text-[10px]
                font-extrabold tracking-[0.12em] uppercase no-underline transition-colors duration-150
                touch-manipulation select-none
                ${active ? "text-[#FF5C00]" : "text-white/60 active:text-white"}`}
            >
              {/* Sliding active pill — same layoutId trick as DesktopSidebar's navActive */}
              {active && (
                <motion.span
                  layoutId="bottomNavActive"
                  className="absolute inset-0 rounded-2xl bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Small active dot above the icon, echoes the sidebar's navDot */}
              {active && (
                <motion.span
                  layoutId="bottomNavDot"
                  className="absolute -top-0.5 w-1 h-1 rounded-full bg-[#FF5C00]"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}

              <motion.span
                className="relative"
                animate={active
                  ? { scale: 1.2, transition: { type: "spring", stiffness: 340, damping: 18 } }
                  : { scale: 1,   transition: { type: "spring", stiffness: 280, damping: 22 } }
                }
                style={{ display: "flex" }}
              >
                <Icon />
              </motion.span>
              <span className="relative">{label}</span>
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}