import CardShell from "../components/CardShell";
import { CRAFT } from "../lib/data";

export default function Craft() {
  return (
    <CardShell>

      {/* mobile */}
      <div className="md:hidden">
        <div className="mb-8">
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#9A9A9A] mb-2">Craft</p>
          <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#111111] text-[clamp(28px,8vw,36px)]">
            Details that make the <span className="text-[#FF5C00]">difference.</span>
          </h1>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          {CRAFT.map(({ title, desc, type }) => (
            <div key={title} className="border border-black/8 rounded-2xl p-5 hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <p className="font-display text-[14.5px] font-bold text-[#111111]">{title}</p>
                <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{type}</span>
              </div>
              <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* desktop */}
      <div className="hidden md:block">
        <div className="mb-12">
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#9A9A9A] mb-2">Craft</p>
          <h1 className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111111]" style={{ fontSize: "clamp(40px, 4vw, 60px)" }}>
            Details that make the <span className="text-[#FF5C00]">difference.</span>
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-10">
          {CRAFT.map(({ title, desc, type }) => (
            <div key={title} className="border border-black/8 rounded-2xl p-6 hover:border-[#FF5C00] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <p className="font-display text-[15px] font-bold text-[#111111]">{title}</p>
                <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{type}</span>
              </div>
              <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

    </CardShell>
  );
}