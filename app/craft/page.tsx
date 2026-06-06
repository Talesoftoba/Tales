"use client";

import CardShell from "../components/CardShell";
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

// ── Experience card ──────────────────────────────────────────────────────────

function ExperienceCard({ role, company, type, period, bullets, mobile }: {
  role: string; company: string; type: string; period: string; bullets: string[]; mobile?: boolean;
}) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -7,
        scale: 1.018,
        borderColor: "#FF5C00",
        boxShadow: "0 12px 40px rgba(255,92,0,0.18)",
        transition: { type: "spring", stiffness: 320, damping: 20 },
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.09 } }}
      className={`bg-[#0D0C0A] border border-black/8 rounded-2xl overflow-hidden cursor-pointer`}
    >
      {/* Header */}
      <div className={`flex items-start justify-between gap-3 border-b border-white/[0.06] ${mobile ? "px-5 py-4" : "px-6 py-4"}`}>
        <div>
          <p className={`font-display font-bold text-white leading-snug mb-1 ${mobile ? "text-[13.5px]" : "text-[15px]"}`}>{role}</p>
          <p className="font-body text-[11px] text-white/50">{company} · {period}</p>
        </div>
        <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00]
          bg-[#FF5C00]/8 px-2 py-0.5 rounded-full shrink-0 mt-1">{type}</span>
      </div>

      {/* Bullets */}
      <ul className={`flex flex-col gap-2.5 ${mobile ? "px-5 py-4" : "px-6 py-5"}`}>
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Craft() {
  return (
    <CardShell>

      {/* ════════════  MOBILE  ════════════ */}
      <div className="md:hidden">
        <motion.div
          className="mb-8"
          variants={fadeUp} initial="hidden" animate="show"
        >
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] mb-2">Experience</p>
          <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#000000] text-[clamp(28px,8vw,36px)]">
            Where I&apos;ve built <span className="text-[#FF5C00]">things that ship.</span>
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 mb-10"
          variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {EXPERIENCE.map(({ role, company, type, period, bullets }) => (
            <ExperienceCard key={role} role={role} company={company} type={type} period={period} bullets={bullets} mobile />
          ))}
        </motion.div>
      </div>

      {/* ════════════  DESKTOP  ════════════ */}
      <div className="hidden md:flex flex-col h-full">

        <motion.div
          className="shrink-0 mb-10"
          variants={fadeUp} initial="hidden" animate="show"
        >
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] mb-3">Experience</p>
          <h1
            className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#000000] mb-3"
            style={{ fontSize: "clamp(34px, 3.2vw, 52px)" }}
          >
            Where I&apos;ve built{" "}
            <span className="text-[#FF5C00]">things that ship.</span>
          </h1>
          <motion.p
            className="font-body text-[14px] text-[#1a1a1a] leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
          >
            Production work across B2B platforms, SaaS products, and client projects — shipped and running.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-5"
          variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {EXPERIENCE.map(({ role, company, type, period, bullets }) => (
            <ExperienceCard key={role} role={role} company={company} type={type} period={period} bullets={bullets} />
          ))}
        </motion.div>

      </div>

    </CardShell>
  );
}