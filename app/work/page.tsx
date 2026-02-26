import CardShell from "../components/CardShell";
import { PROJECTS } from "../lib/data"; 

export default function Work() {
  return (
    <CardShell>

      {/* heading */}
      <div className="mb-8">
        <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#9A9A9A] mb-2">
          Selected Work
        </p>
        <h1 className="font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[#111111] text-[clamp(28px,8vw,36px)]">
          Things I&apos;ve built that <span className="text-[#FF5C00]">actually shipped.</span>
        </h1>
      </div>

      {/* project cards */}
      <div className="flex flex-col gap-4 mb-10">
        {PROJECTS.map(({ title, desc, tags, year, link }) => (
          <a
            key={title}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-black/8 rounded-2xl p-5 hover:border-[#FF5C00] hover:-translate-y-px transition-all duration-200 no-underline"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="font-display text-[14.5px] font-bold text-[#111111] group-hover:text-[#FF5C00] transition-colors duration-200">
                {title}
              </p>
              <span className="font-display text-[9px] font-bold tracking-[0.08em] uppercase text-[#9A9A9A]">
                {year}
              </span>
            </div>
            <p className="font-body text-[12.5px] text-[#9A9A9A] leading-relaxed mb-3">{desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-display text-[9px] font-bold tracking-[0.06em] uppercase text-[#FF5C00] bg-[#FF5C00]/8 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

    </CardShell>
  );
}