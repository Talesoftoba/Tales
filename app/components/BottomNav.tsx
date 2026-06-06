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
      className="md:hidden grid grid-cols-3 items-center py-2"
      variants={navVariants}
      initial="hidden"
      animate="show"
    >
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
              className={`flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl font-display text-[10px]
                font-extrabold tracking-[0.12em] uppercase no-underline transition-colors duration-150
                ${active ? "text-[#FF5C00] bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              <motion.span
                animate={active
                  ? { scale: 1.2, transition: { type: "spring", stiffness: 340, damping: 18 } }
                  : { scale: 1,   transition: { type: "spring", stiffness: 280, damping: 22 } }
                }
                style={{ display: "flex" }}
              >
                <Icon />
              </motion.span>
              {label}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}