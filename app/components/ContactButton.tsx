"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";

// ── Eye — defined OUTSIDE the parent component ────────────────────────────────
function Eye({
  scaleY,
  eyeX,
  eyeY,
}: {
  scaleY: MotionValue<number>;
  eyeX: MotionValue<number>;
  eyeY: MotionValue<number>;
}) {
  return (
    <motion.span
      className="flex items-center justify-center w-4.25 h-4.25 rounded-full bg-white overflow-hidden"
      style={{ scaleY, transformOrigin: "center" }}
    >
      <motion.span
        className="block w-1.75 h-1.75 rounded-full bg-[#111111]"
        style={{ x: eyeX, y: eyeY }}
      />
    </motion.span>
  );
}

// ── ContactButton ─────────────────────────────────────────────────────────────
export default function ContactButton({ phone }: { phone: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Eye tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 140, damping: 14, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 140, damping: 14, mass: 0.5 });

  const eyeX = useTransform(x, [-1, 1], [-2.2, 2.2]);
  const eyeY = useTransform(y, [-1, 1], [-2.2, 2.2]);

  // Blink state
  const leftScaleY  = useMotionValue(1);
  const rightScaleY = useMotionValue(1);

  // Blinking loop
  useEffect(() => {
    let cancelled = false;

    const blink = async () => {
      while (!cancelled) {
        await new Promise<void>(r => setTimeout(r, 2500 + Math.random() * 2500));
        if (cancelled) break;

        animate(leftScaleY,  0.08, { duration: 0.06, ease: "easeIn" });
        await animate(rightScaleY, 0.08, { duration: 0.06, ease: "easeIn", delay: 0.03 });
        await new Promise<void>(r => setTimeout(r, 55));
        animate(leftScaleY,  1, { duration: 0.1, ease: "easeOut" });
        await animate(rightScaleY, 1, { duration: 0.1, ease: "easeOut", delay: 0.03 });

        // ~35% chance of a double-blink
        if (Math.random() > 0.65) {
          await new Promise<void>(r => setTimeout(r, 110));
          animate(leftScaleY,  0.08, { duration: 0.055, ease: "easeIn" });
          await animate(rightScaleY, 0.08, { duration: 0.055, ease: "easeIn", delay: 0.03 });
          await new Promise<void>(r => setTimeout(r, 50));
          animate(leftScaleY,  1, { duration: 0.1, ease: "easeOut" });
          await animate(rightScaleY, 1, { duration: 0.1, ease: "easeOut", delay: 0.03 });
        }
      }
    };

    blink();
    return () => { cancelled = true; };
  }, [leftScaleY, rightScaleY]);

  // Global mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!btnRef.current) return;
      const r     = btnRef.current.getBoundingClientRect();
      const cx    = r.left + r.width  / 2;
      const cy    = r.top  + r.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const d     = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / 30);
      rawX.set(Math.cos(angle) * d);
      rawY.set(Math.sin(angle) * d);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <motion.div
      whileHover={{ scale: 1.07, boxShadow: "0 8px 26px rgba(255,92,0,0.42)" }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 360, damping: 18 }}
      style={{ borderRadius: "9999px", display: "inline-flex" }}
    >
      <Link
        ref={btnRef}
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#FF5C00] text-white rounded-full px-4 py-2
          font-display font-bold text-[12px] tracking-wide no-underline"
      >
        WhatsApp
        <span className="flex gap-1" aria-hidden>
          <Eye scaleY={leftScaleY}  eyeX={eyeX} eyeY={eyeY} />
          <Eye scaleY={rightScaleY} eyeX={eyeX} eyeY={eyeY} />
        </span>
      </Link>
    </motion.div>
  );
}