import Image from "next/image";
import CardShell from "../components/CardShell";
import Link from "next/link";
import { PROJECTS } from "../lib/data";

export default function Work() {
  return (
    <CardShell>

      {/* mobile */}
      <div className="md:hidden">
        <div className="mb-8">
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#9A9A9A] mb-2">Selected Work</p>
          <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#111111] text-[clamp(28px,8vw,36px)]">
            Things I&apos;ve built that <span className="text-[#FF5C00]">actually shipped.</span>
          </h1>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          {PROJECTS.map(({ title, desc, tags, year, link, image }) => (
            <Link key={title} href={link} target="_blank" rel="noopener noreferrer"
              className="group border border-black/8 rounded-2xl overflow-hidden hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 no-underline">
              {image && (
                <div className="relative w-full h-40 overflow-hidden">
                  <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-display text-[14.5px] font-bold text-[#111111] group-hover:text-[#FF5C00] transition-colors duration-200">{title}</p>
                  <span className="font-display text-[9px] font-bold uppercase text-[#9A9A9A] shrink-0 ml-2">{year}</span>
                </div>
                <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed mb-3">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="font-display text-[9px] font-bold tracking-[0.06em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5
                     rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* desktop right panel */}
      <div className="hidden md:block">
        <div className="mb-10">
          <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#9A9A9A] mb-2">Selected Work</p>
          <h1 className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111111]"
            style={{ fontSize: "clamp(34px, 3.2vw, 52px)" }}>
            Things I&apos;ve built that <span className="text-[#FF5C00]">actually shipped.</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {PROJECTS.map(({ title, desc, tags, year, link, image }) => (
            <Link key={title} href={link} target="_blank" rel="noopener noreferrer"
              className="group border border-black/8 rounded-2xl overflow-hidden hover:border-[#FF5C00] hover:-translate-y-1 transition-all duration-200
               no-underline">
              {image && (
                <div className="relative w-full h-44 overflow-hidden">
                  <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-display text-[14px] font-bold text-[#111111] group-hover:text-[#FF5C00] transition-colors duration-200">{title}</p>
                  <span className="font-display text-[9px] font-bold uppercase text-[#9A9A9A] shrink-0 ml-2">{year}</span>
                </div>
                <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed mb-3">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="font-display text-[9px] font-bold tracking-[0.06em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5
                     rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </CardShell>
  );
}