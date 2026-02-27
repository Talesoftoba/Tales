import { Fragment } from "react";
import Link from "next/link";
import CardShell from "./components/CardShell";
import { IconX, IconMail, IconGithub, IconLinkedin} from "./components/icons"; 
import { META, TIMELINE, WORK, STACK } from "./lib/data"; 

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

      {/* info grid */}
      <section
        className="grid gap-y-1.75 gap-x-5 mb-9"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        {(
          [
            ["Timezone",   META.timezone  ],
            ["Location",   META.location  ],
            ["Experience", META.experience],
            ["Role",       META.role      ],
            ["Skillset",   META.skillset  ],
          ] as [string, string][]
        ).map(([k, v]) => (
          <Fragment key={k}>
            <span className="font-display text-[10px] font-bold tracking-widest uppercase text-[#9A9A9A] pt-0.5 whitespace-nowrap">
              {k}
            </span>
            <span className="text-[13.5px] text-[#111111] leading-snug">
              {v}
            </span>
          </Fragment>
        ))}
      </section>

      {/* headline */}
      <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#111111] mb-8 text-[clamp(30px,8.5vw,40px)]">
        I build fast, design ,ship clean —
        <span className="text-[#FF5C00]"> and it performs.</span>
      </h1>

      {/* CTA row */}
      <div className="flex items-center gap-2 flex-wrap mb-10">
        <Link
          href={META.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-black/[0.14] rounded-full px-4 py-2.25 font-display text-[11px] 
          font-bold tracking-[0.07em] uppercase text-[#111111] no-underline hover:border-[#FF5C00] hover:text-[#FF5C00]
           hover:bg-[#FF5C00]/4 transition-all duration-200"
        >
          <IconX />
          Twitter
        </Link>
        <Link
          href={`mailto:${META.email}`}
          className="flex items-center gap-2 border border-black/[0.14] rounded-full px-4 py-2.25 font-display text-[11px] f
          ont-bold tracking-[0.07em] uppercase text-[#111111] no-underline hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-all duration-200"
        >
          <IconMail />
          Email
        </Link>
        <Link
          href={META.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-black/[0.14] rounded-full px-4 py-2.25 font-display 
          text-[11px] font-bold tracking-[0.07em] uppercase text-[#111111] no-underline hover:border-[#FF5C00]
           hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-all duration-200"
        >
          <IconGithub />
          GitHub
        </Link>
        <Link
          href={META.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-black/[0.14] rounded-full px-4 py-2.25 font-display text-[11px] font-bold tracking-[0.07em]
           uppercase text-[#111111] no-underline hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/4 transition-all duration-200"
        >
          <IconLinkedin />
          LinkedIn
        </Link>
      </div>

      {/* timeline */}
      <section className="mb-11">
        <div className="relative h-2.5 mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-black/10" />
            <div className="absolute inset-0 flex items-center">
              <div className="h-px bg-linear-to-r from-[#FF5C00] to-[#FF5C00]/25 w-full" />
            </div>
          </div>
          <div className="absolute inset-0 flex justify-between items-center">
            {TIMELINE.map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[#FF5C00] border-2 border-white shadow-[0_0_0_2px_#FF5C00]
                 hover:scale-150 transition-transform duration-150 cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          {TIMELINE.map(({ role, period }) => (
            <div key={role}>
              <p className="font-display text-[10px] font-extrabold tracking-[0.06em] uppercase text-[#111111] mb-0.5">
                {role}
              </p>
              <p className="font-body text-[10px] text-[#9A9A9A]">{period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* fields of work */}
      <section className="mb-11">
        <Label>Fields of Work</Label>
        <p className="font-body text-[13px] text-[#9A9A9A] leading-relaxed mt-1.5 mb-5">
           Design, Build & Ship for the Web.
        </p>
        <div className="flex flex-col gap-3.5">
          {WORK.map(({ title, tag, desc }) => (
            <div
              key={title}
              className="border border-black/8 rounded-2xl p-5 hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-display text-[14.5px] font-bold text-[#111111]">{title}</p>
                <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              </div>
              <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* tech stack */}
      <section className="mb-10">
        <Label>Tech Stack</Label>
        <div className="flex flex-wrap gap-2 mt-4">
          {STACK.map((s) => (
            <span
              key={s}
              className="font-display text-[10.5px] font-semibold tracking-[0.04em] px-3.5 py-1.5 rounded-full border
               border-black/10 text-[#111111] hover:border-[#FF5C00] hover:text-[#FF5C00] hover:bg-[#FF5C00]/3 transition-all
                duration-200 cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

    </CardShell>
  );
}