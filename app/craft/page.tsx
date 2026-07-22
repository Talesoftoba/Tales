"use client";

import { motion, type Variants } from "framer-motion";

// ── Variants ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = (delay = 0.09): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 210, damping: 24 } },
};

// Whole-headline reveal — the wrapper clips, the inner span slides up into view.
// pb/-mb keeps descenders (g, y, p, q) from getting clipped by the mask.
const headlineReveal: Variants = {
  hidden: { y: "100%" },
  show:   { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── Experience data ──────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    role: "Full-Stack Engineer — Backend Lead",
    company: "Nubia Astar",
    type: "Contract",
    period: "Jan 2025 – Present",
    bullets: [
      "Architected and led backend development of PrimX, a marine engineering listing & e-commerce platform serving B2B industry procurement workflows.",
      "Engineered Paystack payment integration with webhook event handling, order lifecycle management, and transaction reconciliation.",
      "Built and deployed an AI-powered live chat system to streamline buyer–seller communication at scale.",
      "Designed Firestore data models and real-time sync pipelines supporting high-concurrency listing and inventory operations.",
      "Defined TypeScript/React API contracts with frontend team, eliminating integration regressions across releases.",
    ],
  },
  {
    role: "Senior Frontend & Full-Stack Engineer",
    company: "Freelance / Independent",
    type: "Freelance",
    period: "2023 – Present",
    bullets: [
      "Delivered Spendly, a multi-tenant SaaS finance dashboard with real-time SSE budget alerts, multi-currency ledger, and Recharts analytics — zero downtime since launch.",
      "Built MarketStore: full e-commerce platform with Stripe checkout, webhook-driven order status, and role-based admin panel.",
      "Implemented NextAuth v4 / JWT authentication and RBAC across multiple production client applications.",
      "Resolved production-critical issues: Prisma adapter migrations, SSE deduplication, and Supabase PostgreSQL hydration edge cases.",
      "Maintained CI/CD pipelines on Vercel with environment-specific configurations across all projects.",
    ],
  },
];

// ── Shared page chrome (matches the home page) ──────────────────────────────
// NOTE: this is duplicated across page.tsx / work/page.tsx / craft/page.tsx.
// Worth extracting into e.g. components/PageChrome.tsx if you want a single
// source of truth — happy to do that split if you'd like.

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

function HeroGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute bg-[#FF5C00]/[0.12] blur-[100px] rounded-full pointer-events-none z-0 ${className}`}
    />
  );
}

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

// ── Experience card ──────────────────────────────────────────────────────────

function ExperienceCard({ role, company, type, period, bullets, index, mobile }: {
  role: string; company: string; type: string; period: string; bullets: string[]; index: number; mobile?: boolean;
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -7,
        scale: 1.018,
        borderColor: "#FF5C00",
        boxShadow: "0 12px 40px rgba(255,92,0,0.18)",
        transition: { type: "spring", stiffness: 320, damping: 20 },
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.09 } }}
      className="group relative bg-[#0D0C0A] border border-black/8 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Cursor-reactive glow, matches the skill cards and project cards */}
      <div
        aria-hidden
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 0%), rgba(255,92,0,0.08), transparent 70%)",
        }}
      />

      {/* Header */}
      <div className={`relative flex items-start justify-between gap-3 border-b border-white/[0.06] ${mobile ? "px-5 py-4" : "px-6 py-4"}`}>
        <div className="flex items-start gap-2.5">
          <span className="font-mono text-[10px] text-white/25 mt-[3px]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className={`font-display font-bold text-white leading-snug mb-1 ${mobile ? "text-[13.5px]" : "text-[15px]"}`}>{role}</p>
            <p className="font-body text-[11px] text-white/50">{company} · {period}</p>
          </div>
        </div>
        <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00]
          bg-[#FF5C00]/8 px-2 py-0.5 rounded-full shrink-0 mt-1">{type}</span>
      </div>

      {/* Bullets */}
      <ul className={`relative flex flex-col gap-2.5 ${mobile ? "px-5 py-4" : "px-6 py-5"}`}>
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <span className="mt-[7px] w-1 h-1 rounded-full bg-[#FF5C00] shrink-0" />
            <p className={`font-body text-white/70 leading-relaxed ${mobile ? "text-[12px]" : "text-[12.5px]"}`}>{b}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Page header (eyebrow + reveal headline + count) ─────────────────────────

function PageIntro({ mobile }: { mobile?: boolean }) {
  return (
    <motion.div
      className={`relative shrink-0 ${mobile ? "mb-8" : "mb-10"}`}
      variants={fadeUp} initial="hidden" animate="show"
    >
      <HeroGlow className={mobile ? "-top-14 -left-8 w-[240px] h-[240px]" : "-top-16 -left-10 w-[360px] h-[360px]"} />
      <div className="relative flex items-center gap-3 mb-2">
        <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a]">
          Experience
        </p>
        <span className="font-display text-[10px] font-bold text-[#888880]">
           roles
        </span>
      </div>
      <h1
        className={`relative font-display font-extrabold text-[#000000] mb-3 ${
          mobile
            ? "leading-[1.06] tracking-[-0.03em] text-[clamp(28px,8vw,36px)]"
            : "leading-[1.02] tracking-[-0.04em]"
        }`}
        style={!mobile ? { fontSize: "clamp(34px, 3.2vw, 52px)" } : undefined}
      >
        <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className="block"
            variants={headlineReveal} initial="hidden" animate="show"
          >
            Where I&apos;ve built <span className="text-[#FF5C00]">things that ship.</span>
          </motion.span>
        </span>
      </h1>
      {!mobile && (
        <motion.p
          className="relative font-body text-[14px] text-[#1a1a1a] leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
        >
          Production work across B2B platforms, SaaS products, and client projects — shipped and running.
        </motion.p>
      )}
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Craft() {
  return (
    <>
      <GrainOverlay />
      <CornerTicks />

      {/* ════════════  MOBILE  ════════════ */}
      <div className="md:hidden">
        <PageIntro mobile />

        <motion.div
          className="flex flex-col gap-4 mb-10"
          variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {EXPERIENCE.map(({ role, company, type, period, bullets }, i) => (
            <ExperienceCard key={role} role={role} company={company} type={type} period={period} bullets={bullets} index={i} mobile />
          ))}
        </motion.div>
      </div>

      {/* ════════════  DESKTOP  ════════════ */}
      <div className="hidden md:flex flex-col h-full">
        <PageIntro />

        <motion.div
          className="flex flex-col gap-5"
          variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {EXPERIENCE.map(({ role, company, type, period, bullets }, i) => (
            <ExperienceCard key={role} role={role} company={company} type={type} period={period} bullets={bullets} index={i} />
          ))}
        </motion.div>

      </div>
    </>
  );
}