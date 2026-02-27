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

        /* dvh shrinks when mobile browser chrome appears — correct unit for mobile */
        .card-wrapper { height: min(100dvh, 860px); }

        @supports not (height: 1dvh) {
          .card-wrapper { height: min(93vh, 860px); }
        }
      `}</style>

      <main
        className="relative flex items-center justify-center min-h-screen overflow-hidden font-body"
        style={{
          background: "linear-gradient(to bottom, #F5F0E8 40%, #1C1A14 60%)",
        }}
      >
        {/* background glows */}
        <div aria-hidden className="pointer-events-none fixed inset-0">
          <div className="absolute bottom-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-[#FF5C00]/10 blur-[90px]" />
          <div className="absolute top-[5%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#FF5C00]/7 blur-[70px]" />
        </div>

        {/* floating site tag */}
        <div className="fixed top-5 right-6 z-20 select-none text-right pointer-events-none">
          <p className="font-display text-[13px] font-extrabold tracking-[0.15em] uppercase text-[#111111] pr-2">
            Talesdev
          </p>
          <p className="font-display text-[9px] font-bold tracking-[0.16em] uppercase text-[#9A9A9A]">
            Portfolio ✦ 2025
          </p>
        </div>

        {/* outer wrapper — full height, flex-col: header + card + nav stacked */}
        <div className="card-wrapper relative z-10 w-[min(415px,92vw)] flex flex-col justify-center">

          {/* header */}
          <div className="flex items-center justify-between mb-4 px-1 pr-30 sm:pr-1 shrink-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
              <Image
                src="/avatar1.jpg"
                alt="Avatar"
                quality={100}
                fill
                className="object-cover"
              />
            </div>
            <ContactButton phone={META.phone} />
          </div>

          {/* white card — takes remaining space, no nav inside */}
          <div
            className="flex-1 min-h-0 w-full bg-white rounded-[26px] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_16px_56px_rgba(0,0,0,0.13)] overflow-hidden"
          >
            <div
              id="card"
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                height: "100%",
              } as React.CSSProperties}
              className="px-7 pt-8 pb-4"
            >
              {children}
            </div>
          </div>

          {/* nav sits OUTSIDE the card, floats over the dark gradient bottom */}
          <div className="shrink-0">
            <BottomNav />
          </div>

        </div>

        <ScrollHint targetId="card" />
      </main>
    </>
  );
}