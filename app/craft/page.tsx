"use client";

import CardShell from "../components/CardShell";
import { CRAFT } from "../lib/data";
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

// ── Craft card ───────────────────────────────────────────────────────────────

function CraftCard({ title, desc, type, mobile }: {
  title: string; desc: string; type: string; mobile?: boolean;
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
      className={`bg-[#0D0C0A] border border-black/8 rounded-2xl cursor-pointer ${mobile ? "p-5" : "p-6"}`}
    >
      <div className="flex items-start justify-between mb-2">
        <p className={`font-display font-bold text-white ${mobile ? "text-[14.5px]" : "text-[14.5px]"}`}>{title}</p>
        <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00]
          bg-[#FF5C00]/8 px-2 py-0.5 rounded-full shrink-0 ml-2">{type}</span>
      </div>
      <p className={`font-body text-white/70 leading-relaxed ${mobile ? "text-[12.5px]" : "text-[12.5px]"}`}>{desc}</p>
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
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] mb-2">Craft</p>
          <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#000000] text-[clamp(28px,8vw,36px)]">
            Details that make the <span className="text-[#FF5C00]">difference.</span>
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 mb-10"
          variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {CRAFT.map(({ title, desc, type }) => (
            <CraftCard key={title} title={title} desc={desc} type={type} mobile />
          ))}
        </motion.div>
      </div>

      {/* ════════════  DESKTOP  ════════════ */}
      <div className="hidden md:flex flex-col h-full">

        <motion.div
          className="shrink-0 mb-10"
          variants={fadeUp} initial="hidden" animate="show"
        >
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a] mb-3">Craft</p>
          <h1
            className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#000000] mb-3"
            style={{ fontSize: "clamp(34px, 3.2vw, 52px)" }}
          >
            Details that make the{" "}
            <span className="text-[#FF5C00]">difference.</span>
          </h1>
          <motion.p
            className="font-body text-[14px] text-[#1a1a1a] leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
          >
            The small things — motion, hierarchy, spacing — are what separate good interfaces from great ones.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}
        >
          {CRAFT.map(({ title, desc, type }) => (
            <CraftCard key={title} title={title} desc={desc} type={type} />
          ))}
        </motion.div>

      </div>

    </CardShell>
  );
}