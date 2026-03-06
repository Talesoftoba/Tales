"use client";

import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiFigma,
  SiFramer, SiTailwindcss, SiGit,
} from "react-icons/si";

const STACK = [
  { name: "React",      Icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",    Icon: SiNextdotjs,   color: "#000000" },
  { name: "TypeScript", Icon: SiTypescript,  color: "#3178C6" },
  { name: "Figma",      Icon: SiFigma,       color: "#F24E1E" },
  { name: "Framer",     Icon: SiFramer,      color: "#0055FF" },
  { name: "Tailwind",   Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git",        Icon: SiGit,         color: "#F05032" },
];

// Duplicate for seamless loop
const ITEMS = [...STACK, ...STACK, ...STACK];

function Badge({ name, Icon, color }: { name: string; Icon: React.ElementType; color: string }) {
  return (
    <motion.span
      whileHover={{
        scale: 1.1,
        y: -3,
        borderColor: "#FF5C00",
        color: "#FF5C00",
        transition: { type: "spring", stiffness: 400, damping: 16 },
      }}
      whileTap={{ scale: 0.92 }}
      className="flex items-center gap-2 font-display font-semibold tracking-[0.04em]
        px-4 py-2 rounded-full border border-black/10 text-[#000000] bg-white
        cursor-default shrink-0 text-[11px] hover:border-[#FF5C00] hover:text-[#FF5C00]
        transition-colors duration-150"
    >
      <motion.span
        whileHover={{ rotate: 15, scale: 1.25, transition: { type: "spring", stiffness: 380, damping: 12 } }}
        style={{ display: "flex" }}
      >
        <Icon size={14} style={{ color }} />
      </motion.span>
      {name}
    </motion.span>
  );
}

export default function TechStackMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-10
        bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 z-10
        bg-linear-to-l from-white to-transparent" />

      <motion.div
        className="flex gap-2.5 w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {ITEMS.map(({ name, Icon, color }, i) => (
          <Badge key={`${name}-${i}`} name={name} Icon={Icon} color={color} />
        ))}
      </motion.div>
    </div>
  );
}