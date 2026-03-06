"use client";

import Link from "next/link";
import CardShell from "./components/CardShell";
import { IconX, IconMail, IconGithub, IconLinkedin } from "./components/icons";
import { META, WORK } from "./lib/data";
import {
  SiReact, SiNextdotjs, SiTypescript, SiFigma,
  SiFramer, SiTailwindcss, SiGit,
} from "react-icons/si";
import { motion, type Variants } from "framer-motion";

const STACK = [
  { name: "React",      Icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",    Icon: SiNextdotjs,   color: "#000000" },
  { name: "TypeScript", Icon: SiTypescript,  color: "#3178C6" },
  { name: "Figma",      Icon: SiFigma,       color: "#F24E1E" },
  { name: "Framer",     Icon: SiFramer,      color: "#0055FF" },
  { name: "Tailwind",   Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git",        Icon: SiGit,         color: "#F05032" },
];

// ── Variants ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = (delay = 0.07): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

const chipVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 22 } },
};

const workCardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 24 } },
};

// ── Reusable pieces ─────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a]">
      {children}
    </p>
  );
}

const LINKS = [
  { href: META.twitter,           icon: <IconX />,        label: "Twitter",  target: true  },
  { href: `mailto:${META.email}`, icon: <IconMail />,     label: "Email",    target: false },
  { href: META.github,            icon: <IconGithub />,   label: "GitHub",   target: true  },
  { href: META.linkedin,          icon: <IconLinkedin />, label: "LinkedIn", target: true  },
];

function SocialChip({ href, icon, label, target, mobile }: {
  href: string; icon: React.ReactNode; label: string; target: boolean; mobile?: boolean;
}) {
  return (
    <motion.div
      variants={chipVariant}
      whileHover={{ scale: 1.07, y: -3, transition: { type: "spring", stiffness: 400, damping: 16 } }}
      whileTap={{ scale: 0.93, transition: { duration: 0.08 } }}
    >
      <Link
        href={href}
        target={target ? "_blank" : undefined}
        rel={target ? "noopener noreferrer" : undefined}
        className={`flex items-center gap-2 bg-[#F5F0E8] border border-black/[0.14] rounded-full
          font-display font-bold tracking-[0.07em] uppercase text-[#000000] no-underline
          hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-colors duration-150
          ${mobile ? "px-4 py-2 text-[11px]" : "px-5 py-2.5 text-[11px]"}`}
      >
        {icon}{label}
      </Link>
    </motion.div>
  );
}

function StackBadge({ name, Icon, color, size, mobile }: {
  name: string; Icon: React.ElementType; color: string; size: number; mobile?: boolean;
}) {
  return (
    <motion.span
      variants={chipVariant}
      whileHover={{
        scale: 1.1,
        y: -3,
        transition: { type: "spring", stiffness: 400, damping: 16 },
      }}
      whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
      className={`flex items-center gap-2 font-display font-semibold tracking-[0.04em]
        rounded-full border border-black/10 text-[#000000] cursor-default
        hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors duration-150
        ${mobile ? "px-3.5 py-1.5 text-[10.5px]" : "px-4 py-2 text-[11px]"}`}
    >
      <motion.span
        whileHover={{ rotate: 15, scale: 1.25, transition: { type: "spring", stiffness: 380, damping: 12 } }}
        style={{ display: "flex" }}
      >
        <Icon size={size} style={{ color }} />
      </motion.span>
      {name}
    </motion.span>
  );
}

function WorkCard({ title, tag, desc, mobile }: {
  title: string; tag: string; desc: string; mobile?: boolean;
}) {
  return (
    <motion.div
      variants={workCardVariant}
      whileHover={{
        y: -7,
        scale: 1.018,
        borderColor: "#FF5C00",
        boxShadow: "0 12px 40px rgba(255,92,0,0.18)",
        transition: { type: "spring", stiffness: 320, damping: 20 },
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
      className={`bg-[#0D0C0A] border border-black/8 rounded-2xl cursor-pointer
        ${mobile ? "p-5" : "p-6"}`}
    >
      <div className="flex items-start justify-between mb-2">
        <p className={`font-display font-bold text-white ${mobile ? "text-[14.5px]" : "text-[15px]"}`}>{title}</p>
        <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00]
          bg-[#FF5C00]/8 px-2 py-0.5 rounded-full shrink-0 ml-2">{tag}</span>
      </div>
      <p className={`font-body text-white/70 leading-relaxed ${mobile ? "text-[12.5px]" : "text-[13px]"}`}>{desc}</p>
    </motion.div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <CardShell>

      {/* ════════════  MOBILE  ════════════ */}
      <div className="md:hidden">

        <motion.section className="mb-6" variants={fadeUp} initial="hidden" animate="show">
          <p className="font-body text-[13.5px] text-[#000000]">{META.role}</p>
          <p className="font-body text-[12px] text-[#1a1a1a] mt-0.5">{META.location} · {META.timezone}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-display text-[10px] font-bold tracking-widest uppercase text-green-600">
              Available for work
            </span>
          </div>
        </motion.section>

        <motion.h1
          className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#000000] mb-8 text-[clamp(30px,8.5vw,40px)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          I build fast, design, ship clean —
          <span className="text-[#FF5C00]"> and it performs.</span>
        </motion.h1>

        <motion.div
          className="flex items-center gap-2 flex-wrap mb-10"
          variants={stagger(0.06)} initial="hidden" animate="show"
        >
          {LINKS.map(({ href, icon, label, target }) => (
            <SocialChip key={label} href={href} icon={icon} label={label} target={target} mobile />
          ))}
        </motion.div>

        {/* Tech stack — triggers when scrolled into view */}
        <motion.section
          className="mb-11"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <Label>Tech Stack</Label>
          <motion.div
            className="flex flex-wrap gap-2 mt-4"
            variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          >
            {STACK.map(({ name, Icon, color }) => (
              <StackBadge key={name} name={name} Icon={Icon} color={color} size={13} mobile />
            ))}
          </motion.div>
        </motion.section>

        {/* Fields of work — stagger in on scroll */}
        <motion.section
          className="mb-4"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
        >
          <Label>Fields of Work</Label>
          <p className="font-body text-[13px] text-[#1a1a1a] leading-relaxed mt-1.5 mb-5">
            Design, Build &amp; Ship for the Web.
          </p>
          <motion.div
            className="flex flex-col gap-3.5"
            variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          >
            {WORK.map(({ title, tag, desc }) => (
              <WorkCard key={title} title={title} tag={tag} desc={desc} mobile />
            ))}
          </motion.div>
        </motion.section>

      </div>

      {/* ════════════  DESKTOP  ════════════ */}
      <div className="hidden md:block">

        <motion.h1
          className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#000000] mb-10"
          style={{ fontSize: "clamp(36px, 3.5vw, 58px)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          I build fast, design,<br />ship clean —
          <span className="text-[#FF5C00]"> and it performs.</span>
        </motion.h1>

        <motion.div
          className="flex items-center gap-2 flex-wrap mb-14"
          variants={stagger(0.07)} initial="hidden" animate="show"
        >
          {LINKS.map(({ href, icon, label, target }) => (
            <SocialChip key={label} href={href} icon={icon} label={label} target={target} />
          ))}
        </motion.div>

        {/* Tech stack — scroll triggered */}
        <motion.section
          className="mb-14"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <Label>Tech Stack</Label>
          <motion.div
            className="flex flex-wrap gap-2.5 mt-4"
            variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          >
            {STACK.map(({ name, Icon, color }) => (
              <StackBadge key={name} name={name} Icon={Icon} color={color} size={14} />
            ))}
          </motion.div>
        </motion.section>

        {/* Fields of work — scroll triggered */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          <Label>Fields of Work</Label>
          <p className="font-body text-[13px] text-[#1a1a1a] leading-relaxed mt-1.5 mb-6">
            Design, Build &amp; Ship for the Web.
          </p>
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          >
            {WORK.map(({ title, tag, desc }) => (
              <WorkCard key={title} title={title} tag={tag} desc={desc} />
            ))}
          </motion.div>
        </motion.section>

      </div>
    </CardShell>
  );
}