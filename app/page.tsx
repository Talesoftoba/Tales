import Link from "next/link";
import CardShell from "./components/CardShell";
import { IconX, IconMail, IconGithub, IconLinkedin } from "./components/icons";
import { META, WORK } from "./lib/data";
import {
  SiReact, SiNextdotjs, SiTypescript, SiFigma,
  SiFramer, SiTailwindcss, SiGit,
} from "react-icons/si";

const STACK = [
  { name: "React",      Icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",    Icon: SiNextdotjs,   color: "#000000" },
  { name: "TypeScript", Icon: SiTypescript,  color: "#3178C6" },
  { name: "Figma",      Icon: SiFigma,       color: "#F24E1E" },
  { name: "Framer",     Icon: SiFramer,      color: "#0055FF" },
  { name: "Tailwind",   Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git",        Icon: SiGit,         color: "#F05032" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#9A9A9A]">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <CardShell>

      {/* ── MOBILE ── */}
      <div className="md:hidden">
        <section className="mb-6">
          <p className="font-body text-[13.5px] text-[#111111]">{META.role}</p>
          <p className="font-body text-[12px] text-[#9A9A9A] mt-0.5">{META.location} · {META.timezone}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-display text-[10px] font-bold tracking-widest uppercase text-green-600">
              Available for work
            </span>
          </div>
        </section>

        <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#111111] mb-8 text-[clamp(30px,8.5vw,40px)]">
          I build fast, design, ship clean —
          <span className="text-[#FF5C00]"> and it performs.</span>
        </h1>

        <div className="flex items-center gap-2 flex-wrap mb-10">
          {[
            { href: META.twitter, icon: <IconX />, label: "Twitter", target: true },
            { href: `mailto:${META.email}`, icon: <IconMail />, label: "Email", target: false },
            { href: META.github, icon: <IconGithub />, label: "GitHub", target: true },
            { href: META.linkedin, icon: <IconLinkedin />, label: "LinkedIn", target: true },
          ].map(({ href, icon, label, target }) => (
            <Link key={label} href={href} target={target ? "_blank" : undefined} rel={target ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 border border-black/[0.14] rounded-full px-4 py-2 font-display text-[11px] font-bold tracking-[0.07em]
               uppercase text-[#111111] no-underline hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-all duration-200">
              {icon}{label}
            </Link>
          ))}
        </div>

        {/* tech stack FIRST */}
        <section className="mb-11">
          <Label>Tech Stack</Label>
          <div className="flex flex-wrap gap-2 mt-4">
            {STACK.map(({ name, Icon, color }) => (
              <span key={name} className="flex items-center gap-2 font-display text-[10.5px] font-semibold tracking-[0.04em] px-3.5 py-1.5
               rounded-full border border-black/10 text-[#111111] hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/3 transition-all duration-200 cursor-default group">
                <Icon size={13} style={{ color }} className="group-hover:scale-110 transition-transform duration-200" />
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* fields of work SECOND */}
        <section className="mb-4">
          <Label>Fields of Work</Label>
          <p className="font-body text-[13px] text-[#9A9A9A] leading-relaxed mt-1.5 mb-5">Design, Build & Ship for the Web.</p>
          <div className="flex flex-col gap-3.5">
            {WORK.map(({ title, tag, desc }) => (
              <div key={title} className="border border-black/8 rounded-2xl p-5 hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-display text-[14.5px] font-bold text-[#111111]">{title}</p>
                  <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 
                  rounded-full shrink-0 ml-2">{tag}</span>
                </div>
                <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── DESKTOP right panel content ── */}
      <div className="hidden md:block">

        <h1 className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111111] mb-10"
          style={{ fontSize: "clamp(36px, 3.5vw, 58px)" }}>
          I build fast, design,<br />ship clean —
          <span className="text-[#FF5C00]"> and it performs.</span>
        </h1>

        <div className="flex items-center gap-2 flex-wrap mb-14">
          {[
            { href: META.twitter, icon: <IconX />, label: "Twitter", target: true },
            { href: `mailto:${META.email}`, icon: <IconMail />, label: "Email", target: false },
            { href: META.github, icon: <IconGithub />, label: "GitHub", target: true },
            { href: META.linkedin, icon: <IconLinkedin />, label: "LinkedIn", target: true },
          ].map(({ href, icon, label, target }) => (
            <Link key={label} href={href} target={target ? "_blank" : undefined} rel={target ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 border border-black/[0.14] rounded-full px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.07em] 
              uppercase text-[#111111] no-underline hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-all duration-200">
              {icon}{label}
            </Link>
          ))}
        </div>

        {/* tech stack FIRST */}
        <section className="mb-14">
          <Label>Tech Stack</Label>
          <div className="flex flex-wrap gap-2.5 mt-4">
            {STACK.map(({ name, Icon, color }) => (
              <span key={name} className="flex items-center gap-2 font-display text-[11px] font-semibold tracking-[0.04em] px-4 py-2
               rounded-full border border-black/10 text-[#111111] hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/3 transition-all duration-200 cursor-default group">
                <Icon size={14} style={{ color }} className="group-hover:scale-110 transition-transform duration-200" />
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* fields of work SECOND */}
        <section>
          <Label>Fields of Work</Label>
          <p className="font-body text-[13px] text-[#9A9A9A] leading-relaxed mt-1.5 mb-6">Design, Build & Ship for the Web.</p>
          <div className="grid grid-cols-2 gap-4">
            {WORK.map(({ title, tag, desc }) => (
              <div key={title} className="border border-black/8 rounded-2xl p-6 hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-display text-[15px] font-bold text-[#111111]">{title}</p>
                  <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full shrink-0 ml-2">{tag}</span>
                </div>
                <p className="font-body text-[13px] text-[#9A9A9A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </CardShell>
  );
}