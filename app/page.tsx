"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconX, IconMail, IconGithub, IconLinkedin } from "./components/icons";
import { META } from "./lib/data";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiSharp,
  SiFirebase,
  SiGraphql,
  SiPostgresql,
  SiSupabase,
  SiPrisma,
  SiStripe,
  SiJsonwebtokens,
  SiOpenai,
  SiTailwindcss,
  SiFramer,
  SiCss3,
  SiHtml5,
  SiGit,
  SiGithubactions,
  SiVercel,
} from "react-icons/si";
import { TbApi, TbWebhook, TbLock, TbBroadcast, TbDatabase, TbCreditCard } from "react-icons/tb";

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

// Chip container fades/rises in; its icon then pops in with a spring a beat
// later, giving the sense that "the tech itself" arrives after the pill.
const chipContainerVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const chipIconVariant: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  show:   { opacity: 1, scale: 1.15, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 12, delay: 0.15 } },
};

const skillCardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 24 } },
};

// Split-line headline reveal — each line clips and rises from below
const headlineLine: Variants = {
  hidden: { y: "110%" },
  show:   { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// Every overflow-hidden wrapper around a headline line needs this so
// descenders (g, y, p, q) don't get clipped by the reveal mask.
const lineWrapClass = "block overflow-hidden pb-[0.15em] -mb-[0.15em]";

// ── Skills data ──────────────────────────────────────────────────────────────
// Each chip pairs a label with its official brand icon (react-icons/si — Simple
// Icons). A handful of items aren't real products with logos (e.g. "REST &
// GraphQL APIs" as a combined phrase, "Webhook handling", "RBAC") — those use a
// neutral outline icon from Tabler Icons instead so nothing is left blank.

type Chip = { label: string; icon: IconType; color?: string };

const SKILLS: { category: string; chips: Chip[] }[] = [
  {
    category: "Frontend",
    chips: [
      { label: "React.js", icon: SiReact, color: "#61DAFB" },
      { label: "Next.js (v14/15)", icon: SiNextdotjs, color: "#FFFFFF" },
      { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { label: "ES2022+", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    category: "Backend",
    chips: [
      { label: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { label: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { label: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { label: "C#", icon: SiSharp, color: "#68217A" },
      { label: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { label: "REST & GraphQL APIs", icon: SiGraphql, color: "#E10098" },
    ],
  },
  {
    category: "Database",
    chips: [
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { label: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { label: "Firestore", icon: SiFirebase, color: "#FFCA28" },
      { label: "Prisma ORM", icon: SiPrisma, color: "#FFFFFF" },
    ],
  },
  {
    category: "Payments",
    chips: [
      { label: "Paystack", icon: TbCreditCard, color: "#00C3F7" },
      { label: "Stripe", icon: SiStripe, color: "#635BFF" },
      { label: "Webhook handling", icon: TbWebhook, color: "#FF5C00" },
      { label: "Transaction reconciliation", icon: TbDatabase, color: "#FF5C00" },
    ],
  },
  {
    category: "Auth",
    chips: [
      { label: "NextAuth v4", icon: SiNextdotjs, color: "#FFFFFF" },
      { label: "JWT", icon: SiJsonwebtokens, color: "#FB015B" },
      { label: "OAuth 2.0", icon: TbLock, color: "#FF5C00" },
      { label: "RBAC", icon: TbLock, color: "#FF5C00" },
    ],
  },
  {
    category: "AI / RT",
    chips: [
      { label: "AI chat integration", icon: SiOpenai, color: "#FFFFFF" },
      { label: "SSE", icon: TbBroadcast, color: "#FF5C00" },
      { label: "Real-time data pipelines", icon: TbApi, color: "#FF5C00" },
    ],
  },
  {
    category: "Styling",
    chips: [
      { label: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { label: "Framer Motion", icon: SiFramer, color: "#FFFFFF" },
      { label: "CSS3", icon: SiCss3, color: "#1572B6" },
      { label: "HTML5", icon: SiHtml5, color: "#E34F26" },
    ],
  },
  {
    category: "DevOps",
    chips: [
      { label: "Git", icon: SiGit, color: "#F05032" },
      { label: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { label: "Vercel CI/CD", icon: SiVercel, color: "#FFFFFF" },
    ],
  },
];

const ROTATING_ROLES = ["scalable APIs", "clean UIs", "payment systems", "real-time features"];

// ── Small inline icons (no external icon font dependency) ──────────────────

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// ── Shared pieces ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#888880]">
      {children}
    </p>
  );
}

// Section header with a hairline and a trailing count/context detail
function SectionHeader({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <Label>{label}</Label>
      <div className="flex-1 h-px bg-black/[0.06]" />
      <span className="font-display text-[10px] font-bold text-[#888880]">{meta}</span>
    </div>
  );
}

// Ambient grain texture — sits behind everything, very low opacity
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

// Soft orange glow anchor — place behind a headline
function HeroGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute bg-[#FF5C00]/[0.12] blur-[100px] rounded-full pointer-events-none z-0 ${className}`}
    />
  );
}

// Cycles through short role fragments inside the about paragraph
function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING_ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block text-[#FF5C00] font-medium">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_ROLES[i]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {ROTATING_ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Nudges the visitor to scroll — sits under the contact row
function ScrollCue() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 mb-10 md:mb-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <span className="font-display text-[9px] font-bold tracking-[0.2em] uppercase text-[#888880]">
        Scroll
      </span>
      <motion.div
        className="text-[#888880]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDownIcon />
      </motion.div>
    </motion.div>
  );
}

const LINKS = [
  { href: META.twitter,           icon: <IconX />,        label: "Twitter",  target: true  },
  { href: `mailto:${META.email}`, icon: <IconMail />,     label: "Email",    target: false },
  { href: META.github,            icon: <IconGithub />,   label: "GitHub",   target: true  },
  { href: META.linkedin,          icon: <IconLinkedin />, label: "LinkedIn", target: true  },
];

// Small icon-only circle for a social link — quiet, grouped together
function SocialIconLink({ href, icon, label, target, mobile }: {
  href: string; icon: React.ReactNode; label: string; target: boolean; mobile?: boolean;
}) {
  return (
    <motion.div
      variants={chipVariant}
      whileHover={{ scale: 1.1, y: -2, transition: { type: "spring", stiffness: 400, damping: 16 } }}
      whileTap={{ scale: 0.9, transition: { duration: 0.08 } }}
      className="shrink-0"
    >
      <Link
        href={href}
        target={target ? "_blank" : undefined}
        rel={target ? "noopener noreferrer" : undefined}
        aria-label={label}
        className={`flex items-center justify-center rounded-full
          bg-[#F5F0E8] border border-black/[0.14] text-[#000000]
          hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/5
          transition-colors duration-150 ${mobile ? "w-8 h-8" : "w-10 h-10"}`}
      >
        {icon}
      </Link>
    </motion.div>
  );
}

// Standalone primary CTA — the one action that matters most, filled and distinct
function ResumeButton({ mobile }: { mobile?: boolean }) {
  return (
    <motion.div
      variants={chipVariant}
      whileHover={{ scale: 1.03, y: -2, transition: { type: "spring", stiffness: 400, damping: 16 } }}
      whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
      className="shrink-0"
    >
      <Link
        href="/Samuel_Ayoola_CV-fullstack.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 bg-[#FF5C00] text-white rounded-full
          font-display font-bold tracking-[0.07em] uppercase no-underline
          hover:bg-[#e65200] transition-colors duration-150 whitespace-nowrap
          ${mobile ? "px-4 py-2 text-[10.5px]" : "px-6 py-2.5 text-[11px]"}`}
      >
        View resume <ArrowUpRightIcon />
      </Link>
    </motion.div>
  );
}

// Skill card with a cursor-reactive orange glow on hover, plus an index number
// so a long list of 8 identical cards still gives the reader a sense of place.
// Chips now render their tech's official brand icon (react-icons/si) alongside
// the label instead of plain text-only pills.
function SkillCard({ category, chips, index }: { category: string; chips: Chip[]; index: number }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      variants={skillCardVariant}
      onMouseMove={handleMouseMove}
      whileHover={{ borderColor: "rgba(255,92,0,0.4)" }}
      className="group relative bg-[#0D0C0A] border border-white/[0.07] rounded-2xl overflow-hidden transition-colors"
    >
      {/* Cursor-reactive glow */}
      <div
        aria-hidden
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(180px circle at var(--x, 50%) var(--y, 0%), rgba(255,92,0,0.08), transparent 70%)",
        }}
      />

      {/* Card header */}
      <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] text-white/25">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-display text-[10px] font-bold tracking-[0.16em] uppercase text-[#FF5C00]">
            {category}
          </p>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]/50" />
      </div>
      {/* Chips — icon + label, staggered pop-in with per-chip hover glow */}
      <motion.div
        className="relative px-5 py-4 flex flex-wrap gap-2"
        variants={stagger(0.09)}
        initial="hidden"
        animate="show"
      >
        {chips.map(({ label, icon: Icon, color }) => {
          const glow = color ?? "#FF5C00";
          return (
            <motion.span
              key={label}
              variants={chipContainerVariant}
              whileHover={{
                y: -3,
                scale: 1.06,
                borderColor: `${glow}88`,
                boxShadow: `0 6px 18px ${glow}44`,
                transition: { type: "spring", stiffness: 400, damping: 18 },
              }}
              className="flex items-center gap-1.5 font-body text-[11.5px] text-white/70 bg-white/[0.05]
                border border-white/[0.08] px-3 py-1 rounded-lg leading-none cursor-default"
            >
              <motion.span
                variants={chipIconVariant}
                animate={{ scale: 1 }}
                transition={{ scale: { delay: 0.4, duration: 0.15 } }}
                className="flex items-center"
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.25, transition: { duration: 0.45 } }}
              >
                <Icon size={13} color={glow} />
              </motion.span>
              {label}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <GrainOverlay />

      {/* ════════════  MOBILE  ════════════ */}
      <div className="md:hidden">

        <motion.section className="mb-6" variants={fadeUp} initial="hidden" animate="show">
          <p className="font-body text-[13.5px] text-[#000000]">{META.role}</p>
          <p className="font-body text-[12px] text-[#1a1a1a] mt-0.5">{META.location} · {META.timezone}</p>
        </motion.section>

        <div className="relative">
          <HeroGlow className="-top-16 -left-8 w-[280px] h-[280px]" />

          <h1 className="relative font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#000000] mb-5 text-[clamp(30px,8.5vw,40px)]">
            <span className={lineWrapClass}>
              <motion.span
                className="block"
                variants={headlineLine} initial="hidden" animate="show"
              >
                I build fast,
              </motion.span>
            </span>
            <span className={lineWrapClass}>
              <motion.span
                className="block"
                variants={headlineLine} initial="hidden" animate="show"
                transition={{ delay: 0.1 }}
              >
                ship clean — <span className="text-[#FF5C00]">and it performs.</span>
              </motion.span>
            </span>
          </h1>
        </div>

        <motion.p
          className="max-w-xl mb-8 font-body text-[15px] leading-7 text-[#4B4B4B] border-l-2 border-[#FF5C00]/30 pl-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I&apos;m a software developer passionate about building intuitive, reliable, and
          impactful digital products that solve real-world problems. I currently spend most
          of my time on <RotatingRole />, with a strong emphasis on clean design,
          performance, scalability, and user experience.
        </motion.p>

        {/* Contact row — icons + resume button forced onto one line, no wrap */}
        <motion.div
          className="flex items-center gap-2 flex-nowrap mb-4 overflow-x-auto"
          variants={stagger(0.06)} initial="hidden" animate="show"
        >
          <div className="flex items-center gap-1.5 shrink-0">
            {LINKS.map(({ href, icon, label, target }) => (
              <SocialIconLink key={label} href={href} icon={icon} label={label} target={target} mobile />
            ))}
          </div>
          <span className="w-px h-6 bg-black/10 mx-0.5 shrink-0" />
          <ResumeButton mobile />
        </motion.div>

        <ScrollCue />

        {/* Core Skills — animate on mount, not scroll, so all 8 cards are visible */}
        <motion.section
          className="mb-6"
          variants={fadeUp} initial="hidden" animate="show"
        >
          <SectionHeader label="Core Skills" meta={`${SKILLS.length} areas`} />
          <p className="font-body text-[12px] text-[#888880] -mt-3 mb-4">
            The tools and technologies I reach for daily.
          </p>
          <motion.div
            className="grid grid-cols-1 gap-2.5"
            variants={stagger(0.07)} initial="hidden" animate="show"
          >
            {SKILLS.map(({ category, chips }, i) => (
              <SkillCard key={category} category={category} chips={chips} index={i} />
            ))}
          </motion.div>
        </motion.section>

      </div>

      {/* ════════════  DESKTOP  ════════════ */}
      <div className="hidden md:block">

        <div className="relative">
          <HeroGlow className="-top-20 -left-10 w-[420px] h-[420px]" />

          <h1
            className="relative font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#000000] mb-5"
            style={{ fontSize: "clamp(36px, 3.5vw, 58px)" }}
          >
            <span className={lineWrapClass}>
              <motion.span
                className="block"
                variants={headlineLine} initial="hidden" animate="show"
              >
                I build fast,
              </motion.span>
            </span>
            <span className={lineWrapClass}>
              <motion.span
                className="block"
                variants={headlineLine} initial="hidden" animate="show"
                transition={{ delay: 0.1 }}
              >
                ship clean — <span className="text-[#FF5C00]">and it performs.</span>
              </motion.span>
            </span>
          </h1>
        </div>

        <motion.p
          className="max-w-2xl mb-10 font-body text-[18px] leading-8 text-[#4B4B4B] border-l-2 border-[#FF5C00]/30 pl-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I&apos;m a software developer passionate about building intuitive, reliable, and
          impactful digital products that solve real-world problems. I currently spend most
          of my time on <RotatingRole />, with a strong emphasis on clean design,
          performance, scalability, and user experience.
        </motion.p>

        <motion.div
          className="flex items-center gap-3 flex-wrap mb-4"
          variants={stagger(0.07)} initial="hidden" animate="show"
        >
          <div className="flex items-center gap-2">
            {LINKS.map(({ href, icon, label, target }) => (
              <SocialIconLink key={label} href={href} icon={icon} label={label} target={target} />
            ))}
          </div>
          <span className="w-px h-6 bg-black/10 mx-1" />
          <ResumeButton />
        </motion.div>

        <ScrollCue />

        {/* Core Skills */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0 }}
        >
          <SectionHeader label="Core Skills" meta={`${SKILLS.length} areas`} />
          <p className="font-body text-[13px] text-[#888880] -mt-3 mb-5">
            The tools and technologies I reach for daily.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-2.5"
            variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0 }}
          >
            {SKILLS.map(({ category, chips }, i) => (
              <SkillCard key={category} category={category} chips={chips} index={i} />
            ))}
          </motion.div>
        </motion.section>

      </div>
    </>
  );
}