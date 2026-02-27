import Image from "next/image";
import ContactButton from "./ContactButton";
import BottomNav from "./BottomNav";
import ScrollHint from "./ScrollHint";
import { META } from "../lib/data";

export default function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`#card::-webkit-scrollbar { display: none; }`}</style>
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
<div className="fixed top-5 right-6 z-20 select-none text-right">
  <p className="font-display text-[13px] font-extrabold tracking-[0.15em] uppercase text-[#111111] pr-2">
    Talesdev
  </p>
  <p className="font-display text-[9px] font-bold tracking-[0.16em] uppercase text-[#9A9A9A]">
    Portfolio ✦ 2025
  </p>
</div>

        {/* card wrapper */}
        <div className="relative z-10 w-[min(415px,92vw)]">

          {/* header outside card */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="w-12 h-12 rounded-xl overflow-hidden relative">
              <Image src="/avatar1.jpg" 
              alt="Avatar" 
              quality={100}
              fill
               className="object-cover" />
            </div>
            <ContactButton phone={META.phone} />
          </div>

          {/* scrollable white card */}
          <div
            id="card"
            style={{
              overflowY: "auto",
              overflowX: "hidden",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            } as React.CSSProperties}
            className="w-full h-[min(87vh,770px)] bg-white rounded-[26px] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_16px_56px_rgba(0,0,0,0.13)] px-7 pt-8 pb-0"
          >
            {children}
            <BottomNav />
          </div>

          <ScrollHint targetId="card" />
        </div>
      </main>
    </>
  );
}