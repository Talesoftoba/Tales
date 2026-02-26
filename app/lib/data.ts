export const META = {
  initials: "TS",
  timezone: "UTC +5:30",
  location: "India /",
  experience: "3+ years",
  role: "Design Engineer, Frontend Engineer",
  skillset: "Design, Code and Agile",
  twitter: "https://twitter.com/Talesoftoba",
  email: "Tobaking4@gmail.com",
  github: "https://github.com/Talesoftoba",
linkedin: "https://linkedin.com/in/samuel-ayoola-7b70823ab",
phone: "+2349039224121"
};

export const TIMELINE: { role: string; period: string }[] = [
  { role: "Portdex",    period: "2025 – Now"  },
  { role: "Freelance",  period: "2024"        },
  { role: "Emids",      period: "2022 – 2023" },
  { role: "Internship", period: "2021 – 2022" },
];

export const WORK: { title: string; tag: string; desc: string }[] = [
  {
    title: "Design Engineering",
    tag: "Core",
    desc: "Bridging the gap between design and production-ready code. Pixel-perfect implementation of complex interfaces.",
  },
  {
    title: "Frontend Development",
    tag: "React / Next",
    desc: "Scalable, performant frontends with clean architecture that teams love to maintain.",
  },
  {
    title: "UI / UX Design",
    tag: "Figma",
    desc: "User-centred interfaces with strong visual hierarchy, interaction design, and motion.",
  },
];

export const STACK = [
  "React", "Next.js", "TypeScript",
  "Figma", "Framer", "Tailwind",
  "GSAP", "Node.js", "Git", "Agile",
];

export const NAV = [
  { label: "Home",  icon: "home"      },
  { label: "Work",  icon: "briefcase" },
  { label: "Craft", icon: "pen"       },
] as const;