"use client";

import Image from "next/image";
import ContactButton from "./ContactButton";
import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";
import { META } from "../lib/data";
import { motion } from "framer-motion";

export default function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        #card::-webkit-scrollbar { display: none; }
        .right-panel::-webkit-scrollbar { display: none; }
        .page-bg {
          background: linear-gradient(to bottom, #F5F0E8 0%, #1C1A14 45%);
        }
        .card-glow {
          filter: drop-shadow(0 0 40px rgba(255, 92, 0, 0.18)) drop-shadow(0 20px 60px rgba(0, 0, 0, 0.25));
        }
      `}</style>

      <main className="page-bg relative flex justify-center min-h-screen font-body">

        {/* Ambient glows — fade in slowly */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute bottom-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-[#FF5C00]/10 blur-[90px]" />
          <div className="absolute top-[5%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#FF5C00]/7 blur-[70px]" />
        </motion.div>

        {/* ══════════════  MOBILE  ══════════════ */}
        <div
          className="md:hidden relative z-10 w-[96vw] max-w-130 flex flex-col pt-4 pb-4"
          style={{ height: "100dvh" }}
        >
          {/* Top bar — slides down */}
          <motion.div
            className="shrink-0 flex items-center justify-between px-1 pb-3"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden relative shrink-0">
              <Image src="/avatar2.jpg" alt="Avatar" quality={100} fill sizes="44px" className="object-cover" />
            </div>
            <ContactButton phone={META.phone} />
            <div className="text-right select-none pointer-events-none">
              <p className="font-display text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#000000]">Talesoftoba</p>
              <p className="font-display text-[8px] font-bold tracking-[0.14em] uppercase text-[#1a1a1a]">Portfolio ✦ 2026</p>
            </div>
          </motion.div>

          {/* White card — scales up from slightly below */}
          <motion.div
            className="card-glow flex-1 min-h-0 w-full bg-white rounded-[26px]"
            style={{ overflow: "hidden" }}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              id="card"
              style={{
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              } as React.CSSProperties}
              className="px-7 pt-8 pb-6"
            >
              {children}
            </div>
          </motion.div>

          <div className="shrink-0"><BottomNav /></div>
        </div>

        {/* ══════════════  DESKTOP  ══════════════ */}
        <div
          className="hidden md:flex relative z-10 flex-col"
          style={{ width: "92vw", height: "100dvh", paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          {/* White card — scales up from slightly below */}
          <motion.div
            className="card-glow flex-1 min-h-0 w-full bg-white rounded-[26px] flex overflow-hidden"
            initial={{ opacity: 0, y: 32, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* LEFT — static sidebar, slides in from left */}
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            >
              <DesktopSidebar />
            </motion.div>

            {/* RIGHT — page content, fades in */}
            <motion.div
              className="right-panel flex-1 min-w-0 px-10 py-10"
              style={{ overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </motion.div>

          {/* Bottom nav */}
          <div className="shrink-0">
            <BottomNav />
          </div>
        </div>

      </main>
    </>
  );
}