"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";

const NAV = [
  { label: "Home",  href: "/"      },
  { label: "Work",  href: "/work"  },
  { label: "Craft", href: "/craft" },
];

const navVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: -8 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } },
};

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="flex items-center gap-1 bg-black/6 rounded-full px-2 py-2"
      variants={navVariants}
      initial="hidden"
      animate="show"
    >
      {NAV.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <motion.div
            key={label}
            variants={itemVariant}
            whileHover={
              !active
                ? { scale: 1.06, y: -1, transition: { type: "spring", stiffness: 380, damping: 18 } }
                : {}
            }
            whileTap={{ scale: 0.93, transition: { duration: 0.08 } }}
          >
            <Link
              href={href}
              className={`px-5 py-1.5 rounded-full font-display text-[11px] font-bold tracking-widest uppercase
                no-underline inline-block transition-colors duration-150
                ${active
                  ? "bg-[#FF5C00] text-white shadow-[0_2px_8px_rgba(255,92,0,0.35)]"
                  : "text-[#555] hover:text-[#111] hover:bg-black/6"
                }`}
            >
              {label}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}