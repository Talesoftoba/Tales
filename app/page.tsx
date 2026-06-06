"use client";

import Link from "next/link";
import CardShell from "./components/CardShell";
import { IconX, IconMail, IconGithub, IconLinkedin } from "./components/icons";
import { META } from "./lib/data";
import { motion, type Variants } from "framer-motion";
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

// ── Shared pieces ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#888880]">
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

function DownloadCVChip({ mobile }: { mobile?: boolean }) {
  return (
    <motion.div
      variants={chipVariant}
      whileHover={{ scale: 1.07, y: -3, transition: { type: "spring", stiffness: 400, damping: 16 } }}
      whileTap={{ scale: 0.93, transition: { duration: 0.08 } }}
    >
      <a
        href="/Samuel_Ayoola_CV-fullstack.pdf"
        download="Samuel_Ayoola_CV-fullstack.pdf"
        className={chipClass(mobile)}
      >
        Download CV
      </a>
    </motion.div>
  );
}

function SkillCard({ category, chips }: { category: string; chips: string[] }) {
  return (
    <motion.div
      variants={skillCardVariant}
      className="bg-[#0D0C0A] border border-white/[0.07] rounded-2xl overflow-hidden"
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
        <p className="font-display text-[10px] font-bold tracking-[0.16em] uppercase text-[#FF5C00]">
          {category}
        </p>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]/50" />
      </div>
      {/* Chips */}
      <div className="px-5 py-4 flex flex-wrap gap-2">
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
          <ViewResumeChip mobile />
          <DownloadCVChip mobile />
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
          <TechStackMarquee />
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
          <ViewResumeChip />
          <DownloadCVChip />
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
          <TechStackMarquee />
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