"use client";

import Image from "next/image";
import CardShell from "../components/CardShell";
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

// ── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ title, desc, tags, year, link, image, mobile }: {
  title: string; desc: string; tags: string[]; year: string;
  link: string; image?: string; mobile?: boolean;
}) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -7,
        scale: 1.015,
        borderColor: "#FF5C00",
        boxShadow: "0 14px 44px rgba(255,92,0,0.15)",
        transition: { type: "spring", stiffness: 320, damping: 20 },
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.09 } }}
      className="border border-black/8 rounded-2xl overflow-hidden cursor-pointer"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group no-underline block"
      >
        {image && (
          <div className={`relative w-full overflow-hidden ${mobile ? "h-40" : "h-44"}`}>
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.06, transition: { duration: 0.5, ease: "easeOut" } }}
            >
              <Image src={image} alt={title} fill className="object-cover" />
            </motion.div>
          </div>
        )}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <p className={`font-display font-bold text-[#000000] group-hover:text-[#FF5C00] transition-colors duration-150 ${mobile ? "text-[14.5px]" : "text-[14px]"}`}>
              {title}
            </p>
            <span className="font-display text-[9px] font-bold uppercase text-[#1a1a1a] shrink-0 ml-2">{year}</span>
          </div>
          <p className="font-body text-[12.5px] text-[#1a1a1a] leading-relaxed mb-3">{desc}</p>
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Work() {
  return (
    <CardShell>

      {/* ════════════  MOBILE  ════════════ */}
      <div className="md:hidden">
        <motion.div
          className="mb-8"
          variants={fadeUp} initial="hidden" animate="show"
        >
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] mb-2">
            Selected Work
          </p>
          <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#000000] text-[clamp(28px,8vw,36px)]">
            Things I&apos;ve built that{" "}
            <span className="text-[#FF5C00]">actually shipped.</span>
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 mb-10"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {PROJECTS.map(({ title, desc, tags, year, link, image }) => (
            <ProjectCard key={title} title={title} desc={desc} tags={tags} year={year} link={link} image={image} mobile />
          ))}
        </motion.div>
      </div>

      {/* ════════════  DESKTOP  ════════════ */}
      <div className="hidden md:block">
        <motion.div
          className="mb-10"
          variants={fadeUp} initial="hidden" animate="show"
        >
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] mb-2">
            Selected Work
          </p>
          <h1
            className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#000000]"
            style={{ fontSize: "clamp(34px, 3.2vw, 52px)" }}
          >
            Things I&apos;ve built that{" "}
            <span className="text-[#FF5C00]">actually shipped.</span>
          </h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-5"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {PROJECTS.map(({ title, desc, tags, year, link, image }) => (
            <ProjectCard key={title} title={title} desc={desc} tags={tags} year={year} link={link} image={image} />
          ))}
        </motion.div>
      </div>

    </CardShell>
  );
}