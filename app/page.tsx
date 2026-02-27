import { Fragment } from "react";
import Link from "next/link";
import CardShell from "./components/CardShell";
import { IconX, IconMail, IconGithub, IconLinkedin } from "./components/icons";
import { META, TIMELINE, WORK } from "./lib/data";
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

      {/* ══════════════════════════════
          MOBILE layout
      ══════════════════════════════ */}
      <div className="md:hidden">

        <section className="grid gap-y-1.5 gap-x-5 mb-9" style={{ gridTemplateColumns: "auto 1fr" }}>
          {([
            ["Timezone",   META.timezone  ],
            ["Location",   META.location  ],
            ["Experience", META.experience],
            ["Role",       META.role      ],
            ["Skillset",   META.skillset  ],
          ] as [string, string][]).map(([k, v]) => (
            <Fragment key={k}>
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[#9A9A9A] pt-0.5 whitespace-nowrap">{k}</span>
              <span className="text-[13.5px] text-[#111111] leading-snug">{v}</span>
            </Fragment>
          ))}
        </section>

        <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#111111] mb-8 text-[clamp(30px,8.5vw,40px)]">
          I build fast, design, ship clean —
          <span className="text-[#FF5C00]"> and it performs.</span>
        </h1>

        <div className="flex items-center gap-2 flex-wrap mb-10">
          {[
            { href: META.twitter,           icon: <IconX />,        label: "Twitter",  target: true  },
            { href: `mailto:${META.email}`, icon: <IconMail />,     label: "Email",    target: false },
            { href: META.github,            icon: <IconGithub />,   label: "GitHub",   target: true  },
            { href: META.linkedin,          icon: <IconLinkedin />, label: "LinkedIn", target: true  },
          ].map(({ href, icon, label, target }) => (
            <Link key={label} href={href} target={target ? "_blank" : undefined} rel={target ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 border border-black/[0.14] rounded-full px-4 py-2 font-display text-[11px] font-bold tracking-[0.07em] uppercase text-[#111111] no-underline hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-all duration-200">
              {icon}{label}
            </Link>
          ))}
        </div>

        <section className="mb-11">
          <div className="relative h-2.5 mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="h-px bg-gradient-to-r from-[#FF5C00] to-[#FF5C00]/25 w-full" />
            </div>
            <div className="absolute inset-0 flex justify-between items-center">
              {TIMELINE.map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#FF5C00] border-2 border-white shadow-[0_0_0_2px_#FF5C00] hover:scale-150 transition-transform duration-150 cursor-pointer" />
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            {TIMELINE.map(({ role, period }) => (
              <div key={role}>
                <p className="font-display text-[10px] font-extrabold tracking-[0.06em] uppercase text-[#111111] mb-0.5">{role}</p>
                <p className="font-body text-[10px] text-[#9A9A9A]">{period}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-11">
          <Label>Fields of Work</Label>
          <p className="font-body text-[13px] text-[#9A9A9A] leading-relaxed mt-1.5 mb-5">Design, Build & Ship for the Web.</p>
          <div className="flex flex-col gap-3.5">
            {WORK.map(({ title, tag, desc }) => (
              <div key={title} className="border border-black/8 rounded-2xl p-5 hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-display text-[14.5px] font-bold text-[#111111]">{title}</p>
                  <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{tag}</span>
                </div>
                <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <Label>Tech Stack</Label>
          <div className="flex flex-wrap gap-2 mt-4">
            {STACK.map(({ name, Icon, color }) => (
              <span key={name} className="flex items-center gap-2 font-display text-[10.5px] font-semibold tracking-[0.04em] px-3.5 py-1.5 rounded-full border border-black/10 text-[#111111] hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/3 transition-all duration-200 cursor-default group">
                <Icon size={13} style={{ color }} className="group-hover:scale-110 transition-transform duration-200" />
                {name}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════
          DESKTOP layout — full width, side by side
      ══════════════════════════════ */}
      <div className="hidden md:block">

        {/* HERO: left = headline + links, right = info grid */}
        <section className="grid grid-cols-[1fr_340px] gap-12 mb-16 pb-16 border-b border-black/8">
          <div>
            {/* info pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {([
                ["Timezone", META.timezone], ["Location", META.location],
                ["Experience", META.experience], ["Role", META.role],
              ] as [string, string][]).map(([k, v]) => (
                <span key={k} className="flex items-center gap-1.5 border border-black/10 rounded-full px-3 py-1">
                  <span className="font-display text-[9px] font-bold tracking-widest uppercase text-[#9A9A9A]">{k}</span>
                  <span className="w-px h-3 bg-black/10" />
                  <span className="font-body text-[11px] text-[#111111]">{v}</span>
                </span>
              ))}
            </div>

            <h1 className="font-display font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111111] mb-8" style={{ fontSize: "clamp(40px, 4vw, 62px)" }}>
              I build fast, design,<br />ship clean —
              <span className="text-[#FF5C00]"> and it performs.</span>
            </h1>

            <div className="flex items-center gap-2 flex-wrap">
              {[
                { href: META.twitter,           icon: <IconX />,        label: "Twitter",  target: true  },
                { href: `mailto:${META.email}`, icon: <IconMail />,     label: "Email",    target: false },
                { href: META.github,            icon: <IconGithub />,   label: "GitHub",   target: true  },
                { href: META.linkedin,          icon: <IconLinkedin />, label: "LinkedIn", target: true  },
              ].map(({ href, icon, label, target }) => (
                <Link key={label} href={href} target={target ? "_blank" : undefined} rel={target ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 border border-black/[0.14] rounded-full px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.07em] uppercase text-[#111111] no-underline hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-all duration-200">
                  {icon}{label}
                </Link>
              ))}
            </div>
          </div>

          {/* right: full info grid */}
          <div className="border border-black/8 rounded-2xl p-7 self-start">
            <div className="grid gap-y-4 gap-x-6" style={{ gridTemplateColumns: "auto 1fr" }}>
              {([
                ["Timezone",   META.timezone  ],
                ["Location",   META.location  ],
                ["Experience", META.experience],
                ["Role",       META.role      ],
                ["Skillset",   META.skillset  ],
              ] as [string, string][]).map(([k, v]) => (
                <Fragment key={k}>
                  <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[#9A9A9A] pt-0.5 whitespace-nowrap">{k}</span>
                  <span className="text-[13px] text-[#111111] leading-snug">{v}</span>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="mb-16 pb-16 border-b border-black/8">
          <Label>Experience</Label>
          <div className="relative h-2.5 my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="h-px bg-gradient-to-r from-[#FF5C00] to-[#FF5C00]/25 w-full" />
            </div>
            <div className="absolute inset-0 flex justify-between items-center">
              {TIMELINE.map((_, i) => (
                <span key={i} className="w-3 h-3 rounded-full bg-[#FF5C00] border-2 border-white shadow-[0_0_0_2px_#FF5C00] hover:scale-150 transition-transform duration-150 cursor-pointer" />
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            {TIMELINE.map(({ role, period }) => (
              <div key={role}>
                <p className="font-display text-[11px] font-extrabold tracking-[0.06em] uppercase text-[#111111] mb-0.5">{role}</p>
                <p className="font-body text-[11px] text-[#9A9A9A]">{period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FIELDS OF WORK + STACK side by side */}
        <section className="grid grid-cols-[1fr_280px] gap-12 mb-8">
          <div>
            <Label>Fields of Work</Label>
            <p className="font-body text-[13px] text-[#9A9A9A] leading-relaxed mt-1.5 mb-6">Design, Build & Ship for the Web.</p>
            <div className="grid grid-cols-2 gap-4">
              {WORK.map(({ title, tag, desc }) => (
                <div key={title} className="border border-black/8 rounded-2xl p-5 hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-display text-[14px] font-bold text-[#111111]">{title}</p>
                    <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{tag}</span>
                  </div>
                  <p className="font-body text-[12px] text-[#9A9A9A] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack stacked on the right */}
          <div>
            <Label>Tech Stack</Label>
            <div className="flex flex-col gap-2 mt-4">
              {STACK.map(({ name, Icon, color }) => (
                <span key={name} className="flex items-center gap-3 font-display text-[11px] font-semibold tracking-[0.04em] px-4 py-2.5 rounded-xl border border-black/10 text-[#111111] hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/3 transition-all duration-200 cursor-default group">
                  <Icon size={14} style={{ color }} className="group-hover:scale-110 transition-transform duration-200" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

      </div>
    </CardShell>
  );
}