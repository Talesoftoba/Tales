"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CardShell from "./components/CardShell";
import { IconX, IconMail, IconGithub, IconLinkedin } from "./components/icons";
import { META } from "./lib/data";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import TechStackMarquee from "./components/TechStackMarquee";

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

const SKILLS = [
  { category: "Frontend",  chips: ["React.js", "Next.js (v14/15)", "TypeScript", "JavaScript", "ES2022+"] },
  { category: "Backend",   chips: ["Node.js", "Express.js", "NestJS", "C#", "Firebase", "REST & GraphQL APIs"] },
  { category: "Database",  chips: ["PostgreSQL", "Supabase", "Firestore", "Prisma ORM"] },
  { category: "Payments",  chips: ["Paystack", "Stripe", "Webhook handling", "Transaction reconciliation"] },
  { category: "Auth",      chips: ["NextAuth v4", "JWT", "OAuth 2.0", "RBAC"] },
  { category: "AI / RT",   chips: ["AI chat integration", "SSE", "Real-time data pipelines"] },
  { category: "Styling",   chips: ["Tailwind CSS", "Framer Motion", "CSS3", "HTML5"] },
  { category: "DevOps",    chips: ["Git", "GitHub Actions", "Vercel CI/CD"] },
];

const ROTATING_ROLES = ["scalable APIs", "clean UIs", "payment systems", "real-time features"];

// ── Shared pieces ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#888880]">
      {children}
    </p>
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

// Signature frame — bracket ticks in each corner of the whole card
function CornerTicks() {
  const tick = "absolute w-3 h-3 border-[#FF5C00]/40 pointer-events-none z-10";
  return (
    <>
      <span className={`${tick} top-4 left-4 border-t-2 border-l-2`} aria-hidden />
      <span className={`${tick} top-4 right-4 border-t-2 border-r-2`} aria-hidden />
      <span className={`${tick} bottom-4 left-4 border-b-2 border-l-2`} aria-hidden />
      <span className={`${tick} bottom-4 right-4 border-b-2 border-r-2`} aria-hidden />
    </>
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

// Fades the left/right edges of the tech stack marquee into the page background
function FadedMarquee({ bg }: { bg: string }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${bg}, transparent)` }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${bg}, transparent)` }}
      />
      <TechStackMarquee />
    </div>
  );
}

const LINKS = [
  { href: META.twitter,           icon: <IconX />,        label: "Twitter",  target: true  },
  { href: `mailto:${META.email}`, icon: <IconMail />,     label: "Email",    target: false },
  { href: META.github,            icon: <IconGithub />,   label: "GitHub",   target: true  },
  { href: META.linkedin,          icon: <IconLinkedin />, label: "LinkedIn", target: true  },
];

const chipClass = (mobile?: boolean) =>
  `flex items-center gap-2 bg-[#F5F0E8] border border-black/[0.14] rounded-full
  font-display font-bold tracking-[0.07em] uppercase text-[#000000] no-underline
  hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-colors duration-150
  ${mobile ? "px-4 py-2 text-[11px]" : "px-5 py-2.5 text-[11px]"}`;

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
        className={chipClass(mobile)}
      >
        {icon}{label}
      </Link>
    </motion.div>
  );
}

function ViewResumeChip({ mobile }: { mobile?: boolean }) {
  return (
    <motion.div
      variants={chipVariant}
      whileHover={{ scale: 1.07, y: -3, transition: { type: "spring", stiffness: 400, damping: 16 } }}
      whileTap={{ scale: 0.93, transition: { duration: 0.08 } }}
    >
      <Link
        href="/Samuel_Ayoola_CV-fullstack.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={chipClass(mobile)}
      >
        View Resume
      </Link>
    </motion.div>
  );
}

// Skill card with a cursor-reactive orange glow on hover.
// Pointer position is tracked via CSS custom properties (--x, --y) set on mousemove,
// consumed by the radial-gradient in the glow layer below.
function SkillCard({ category, chips }: { category: string; chips: string[] }) {
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
        <p className="font-display text-[10px] font-bold tracking-[0.16em] uppercase text-[#FF5C00]">
          {category}
        </p>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]/50" />
      </div>
      {/* Chips */}
      <div className="relative px-5 py-4 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="font-body text-[11.5px] text-white/70 bg-white/[0.05]
              border border-white/[0.08] px-3 py-1 rounded-lg leading-none"
          >
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <CardShell>
      <GrainOverlay />
      <CornerTicks />

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

        <div className="relative">
          <HeroGlow className="-top-16 -left-8 w-[280px] h-[280px]" />

          <h1 className="relative font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#000000] mb-5 text-[clamp(30px,8.5vw,40px)]">
            <span className={lineWrapClass}>
              <motion.span
                className="block"
                variants={headlineLine} initial="hidden" animate="show"
              >
                I build fast, design, ship clean —
              </motion.span>
            </span>
            <span className={lineWrapClass}>
              <motion.span
                className="block"
                variants={headlineLine} initial="hidden" animate="show"
                transition={{ delay: 0.1 }}
              >
                <span className="text-[#FF5C00]">and it performs.</span>
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

        <motion.div
          className="flex items-center gap-2 flex-wrap mb-10"
          variants={stagger(0.06)} initial="hidden" animate="show"
        >
          {LINKS.map(({ href, icon, label, target }) => (
            <SocialChip key={label} href={href} icon={icon} label={label} target={target} mobile />
          ))}
          <ViewResumeChip mobile />
        </motion.div>

        {/* Tech stack marquee */}
        <motion.section
          className="mb-12 -mx-7"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <div className="px-7 mb-4 flex items-center gap-3">
            <Label>Tech Stack</Label>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>
          <FadedMarquee bg="#F5F0E8" />
        </motion.section>

        {/* Core Skills — animate on mount, not scroll, so all 8 cards are visible */}
        <motion.section
          className="mb-6"
          variants={fadeUp} initial="hidden" animate="show"
        >
          <div className="flex items-center gap-3 mb-5">
            <Label>Core Skills</Label>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>
          <motion.div
            className="flex flex-col gap-2.5"
            variants={stagger(0.07)} initial="hidden" animate="show"
          >
            {SKILLS.map(({ category, chips }) => (
              <SkillCard key={category} category={category} chips={chips} />
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
                I build fast, design,
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
          className="flex items-center gap-2 flex-wrap mb-14"
          variants={stagger(0.07)} initial="hidden" animate="show"
        >
          {LINKS.map(({ href, icon, label, target }) => (
            <SocialChip key={label} href={href} icon={icon} label={label} target={target} />
          ))}
          <ViewResumeChip />
        </motion.div>

        {/* Tech stack marquee */}
        <motion.section
          className="mb-14 -mx-10"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <div className="px-10 mb-4 flex items-center gap-3">
            <Label>Tech Stack</Label>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>
          <FadedMarquee bg="#F5F0E8" />
        </motion.section>

        {/* Core Skills */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <Label>Core Skills</Label>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>
          <motion.div
            className="flex flex-col gap-2.5"
            variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0 }}
          >
            {SKILLS.map(({ category, chips }) => (
              <SkillCard key={category} category={category} chips={chips} />
            ))}
          </motion.div>
        </motion.section>

      </div>
    </CardShell>
  );
}