import Image from "next/image";
import ContactButton from "./ContactButton";
import BottomNav from "./BottomNav";
import ScrollHint from "./ScrollHint";
import { META } from "../lib/data";

export default function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        #card::-webkit-scrollbar { display: none; }

        .page-bg {
          background: linear-gradient(to bottom, #F5F0E8 0%, #F5F0E8 55%, #1C1A14 55%, #1C1A14 100%);
        }
      `}</style>

      <main className="page-bg relative flex items-center justify-center min-h-screen overflow-hidden font-body">

        {/* background glows */}
        <div aria-hidden className="pointer-events-none fixed inset-0">
          <div className="absolute bottom-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-[#FF5C00]/10 blur-[90px]" />
          <div className="absolute top-[5%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#FF5C00]/7 blur-[70px]" />
        </div>

        {/* entire layout column */}
        <div
          className="relative z-10 w-[min(415px,92vw)] flex flex-col"
          style={{ height: "min(100dvh, 860px)" }}
        >

          {/* ── TOP HEADER ── sits on the cream background */}
          <div className="shrink-0 flex items-center justify-between px-1 pt-4 pb-4">
            {/* left: avatar */}
            <div className="w-11 h-11 rounded-xl overflow-hidden relative shrink-0">
              <Image
                src="/avatar1.jpg"
                alt="Avatar"
                quality={100}
                fill
                className="object-cover"
              />
            </div>

            {/* center: contact button */}
            <ContactButton phone={META.phone} />

            {/* right: site tag */}
            <div className="text-right select-none">
              <p className="font-display text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#111111]">
                Talesdev
              </p>
              <p className="font-display text-[8px] font-bold tracking-[0.14em] uppercase text-[#9A9A9A]">
                Portfolio ✦ 2025
              </p>
            </div>
          </div>

          {/* ── WHITE CARD ── fills all space between header and nav */}
          <div
            className="flex-1 min-h-0 w-full bg-white rounded-[26px] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_16px_56px_rgba(0,0,0,0.18)]"
            style={{ overflow: "hidden" }}
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
          </div>

          {/* ── BOTTOM NAV ── floats on the dark background */}
          <div className="shrink-0">
            <BottomNav />
          </div>

        </div>

        <ScrollHint targetId="card" />
      </main>
    </>
  );
}