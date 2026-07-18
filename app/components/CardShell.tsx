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

        {/* Ambient glows */}
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
          {/* Top bar */}
          <motion.div
            className="shrink-0 flex items-center justify-between gap-3 px-1 pb-3"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Avatar + green dot (kept) */}
            <div className="flex-1 flex justify-start">
              <div className="relative shrink-0">
                <div
                  className="w-11 h-11 rounded-xl overflow-hidden relative"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.08)" }}
                >
                  <Image
                    src="/avatar2.jpg"
                    alt="Avatar"
                    quality={100}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                  style={{ background: "#F5F0E8" }}
                >
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
                  </span>
                </span>
              </div>
            </div>

            {/* Contact button — true center column */}
            <div className="shrink-0">
              <ContactButton phone={META.phone} />
            </div>

            {/* Name block */}
            <div className="flex-1 flex justify-end">
              <div className="text-right select-none pointer-events-none shrink-0 min-w-0">
                <p className="font-display text-[12.5px] font-bold tracking-[0.08em] uppercase text-black whitespace-nowrap leading-tight">
                  Talesoftoba
                </p>
                <p className="font-display text-[13px] font-bold tracking-[0.06em] text-[#3a3a3a] whitespace-nowrap leading-tight mt-0.5">
                  © 2026
                </p>
              </div>
            </div>
          </motion.div>

          {/* White card */}
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
              // pb-24 ensures content scrolls clear of the bottom nav
              className="px-7 pt-8 pb-24"
            >
              {children}
            </div>
          </motion.div>

          {/*
            BottomNav sits outside the scroll container and is rendered
            on top via z-50 + solid background (set inside BottomNav).
            It is NOT inside the scrollable #card div so taps never
            reach content scrolled behind it.
          */}
          <div className="shrink-0 relative z-50">
            <BottomNav />
          </div>
        </div>

        {/* ══════════════  DESKTOP  ══════════════ */}
        <div
          className="hidden md:flex relative z-10 flex-col"
          style={{ width: "92vw", height: "100dvh", paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          {/* Card shell — dark background so it blends with the sidebar's corners; right panel carries its own white bg */}
          <motion.div
            className="card-glow flex-1 min-h-0 w-full rounded-[26px] flex overflow-hidden"
            style={{ background: "rgba(10, 10, 11, 0.92)" }}
            initial={{ opacity: 0, y: 32, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* LEFT — static sidebar */}
            <motion.div
              className="h-full rounded-l-[26px] overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            >
              <DesktopSidebar />
            </motion.div>

            {/* RIGHT — page content (white background lives here now) */}
            <motion.div
              className="right-panel flex-1 min-w-0 px-10 py-10 bg-white"
              style={{ overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </motion.div>

          {/* BottomNav is md:hidden so this renders nothing on desktop */}
          <div className="shrink-0">
            <BottomNav />
          </div>
        </div>

      </main>
    </>
  );
}