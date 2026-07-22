"use client";

import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../lib/data";
import { motion, type Variants } from "framer-motion";

// ── Variants ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 24 } },
};

// Whole-headline reveal — the wrapper clips, the inner span slides up into view.
// pb/-mb keeps descenders (g, y, p, q) from getting clipped by the mask.
const headlineReveal: Variants = {
  hidden: { y: "100%" },
  show:   { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

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

// Wraps a screenshot in a minimal browser-chrome frame — a thin title bar with
// three traffic-light dots above the image — so it reads as a product shot
// rather than a flat crop. The bar shares the card's rounded top corners;
// the image sits directly below with no gap so the two feel like one frame.
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden bg-[#151412]">
      <div className="flex items-center gap-1.5 px-3 h-[22px] bg-[#1a1917] border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
      </div>
      {children}
    </div>
  );
}

// ── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ title, desc, tags, year, link, image, index, mobile }: {
  title: string; desc: string; tags: string[]; year: string;
  link: string; image?: string; index: number; mobile?: boolean;
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
        scale: 1.015,
        borderColor: "#FF5C00",
        boxShadow: "0 14px 44px rgba(255,92,0,0.15)",
        transition: { type: "spring", stiffness: 320, damping: 20 },
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.09 } }}
      className="group relative bg-[#0D0C0A] border border-black/8 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Cursor-reactive glow, matches the skill cards on the home page */}
      <div
        aria-hidden
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(220px circle at var(--x, 50%) var(--y, 0%), rgba(255,92,0,0.10), transparent 70%)",
        }}
      />

      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group no-underline block h-full relative"
      >
        {image && (
          <BrowserFrame>
            <div className={`relative w-full overflow-hidden ${mobile ? "h-[136px]" : "h-[154px]"}`}>
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.06, transition: { duration: 0.5, ease: "easeOut" } }}
              >
                <Image src={image} alt={title} fill className="object-cover" />
              </motion.div>
            </div>
          </BrowserFrame>
        )}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-white/25">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className={`font-display font-bold text-white group-hover:text-[#FF5C00] transition-colors duration-150 ${mobile ? "text-[14.5px]" : "text-[14px]"}`}>
                {title}
              </p>
            </div>
            <span className="font-display text-[9px] font-bold uppercase text-white/40 shrink-0 ml-2">{year}</span>
          </div>
          <p className="font-body text-[12.5px] text-white/70 leading-relaxed mb-3">{desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 380, damping: 18 } }}
                className="font-display text-[9px] font-bold tracking-[0.06em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Page header (eyebrow + reveal headline + count) ─────────────────────────

function PageIntro({ mobile }: { mobile?: boolean }) {
  return (
    <motion.div
      className={`relative ${mobile ? "mb-8" : "mb-10"}`}
      variants={fadeUp} initial="hidden" animate="show"
    >
      <HeroGlow className={mobile ? "-top-14 -left-8 w-[240px] h-[240px]" : "-top-16 -left-10 w-[360px] h-[360px]"} />
      <div className="relative flex items-center gap-3 mb-2">
        <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a]">
          Selected Work
        </p>
        <span className="font-display text-[10px] font-bold text-[#888880]">
           projects
        </span>
      </div>
      <h1
        className={`relative font-display font-extrabold text-[#000000] ${
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
            Things I&apos;ve built that <span className="text-[#FF5C00]">actually shipped.</span>
          </motion.span>
        </span>
      </h1>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Work() {
  return (
    <>
      <GrainOverlay />

      {/* ════════════  MOBILE  ════════════ */}
      <div className="md:hidden">
        <PageIntro mobile />

        <motion.div
          className="flex flex-col gap-4 mb-10"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {PROJECTS.map(({ title, desc, tags, year, link, image }, i) => (
            <ProjectCard key={title} title={title} desc={desc} tags={tags} year={year} link={link} image={image} index={i} mobile />
          ))}
        </motion.div>
      </div>

      {/* ════════════  DESKTOP  ════════════ */}
      <div className="hidden md:block">
        <PageIntro />

        <motion.div
          className="grid grid-cols-2 gap-5"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {PROJECTS.map(({ title, desc, tags, year, link, image }, i) => (
            <ProjectCard key={title} title={title} desc={desc} tags={tags} year={year} link={link} image={image} index={i} />
          ))}
        </motion.div>
      </div>
    </>
  );
}