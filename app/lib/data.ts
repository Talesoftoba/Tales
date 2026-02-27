export const META = {
  initials: "TS",
  timezone: "GMT+1",
  location: "Nigeria /",
  experience: "3+ years",
  role: "Frontend Engineer",
  skillset: "Design, Code and Push",
  twitter: "https://twitter.com/Talesoftoba",
  email: "Tobaking4@gmail.com",
  github: "https://github.com/Talesoftoba",
  linkedin: "https://linkedin.com/in/samuel-ayoola-7b70823ab",
  phone: "2349039224121",
};

export const TIMELINE: { role: string; period: string }[] = [
  { role: "Freelance",    period: "2025 – Now"  },
  { role: "Site",         period: "2024"        },
  { role: "Tutor-class",      period: "2022 -2023" },
  { role: "Internship", period: "2021 – 2022" },
];

export const WORK: {
   title: string;
   tag: string;
    desc: string;
   link:string;
   image:string;
   }[] = [
  {
    title: "Full stack ",
    tag: "Nextjs / React / Typescript",
    desc: "I build things for the web  — clean interfaces, solid backends and everything in between. ",
    link: "",
    image:""
  },
  {
    title: "Frontend Development",
    tag: "React / Typescript",
    desc: "I turn designs into fast, clean, and intuitive web experiences. React & Next.js are my playground — every pixel intentional, every interaction smooth.",
    link:"",
    image:"",
  },
  {
    title: "UI / UX Design",
    tag: "Figma",
    desc: "I design experiences people don't have to think about. Clean layouts, thoughtful interactions, and interfaces that just feel right.",
    link:"",
    image:""
  },
];

export const STACK = [
  "React", "Next.js", "TypeScript",
  "Figma", "Framer", "Tailwind",
   "Git", 
];

export const PROJECTS: { title: string; desc: string; tags: string[]; year: string; link: string; image: string }[] = [
  {
    title: "Full stack e-commerce site",
    desc: "A modern, production-ready e-commerce platform built for performance, security, and seamless user experience.",
    tags: ["Next.js", "Tailwind", "TypeScript", "React"],
    year: "2025",
    link: "https://nextjs-storeweb.vercel.app",
    image:"/projects/ecomm.jpg",
  },
  {
    title: "Emids Dashboard",
    desc: "Healthcare analytics dashboard with real-time data visualization and reporting.",
    tags: ["React", "D3.js", "Figma"],
    year: "2023",
    link: "#",
    image:"",
  },
  {
    title: "Freelance Projects",
    desc: "A collection of client work spanning landing pages, design systems, and web apps.",
    tags: ["Framer", "React", "GSAP"],
    year: "2024",
    link: "#",
    image:"",
  },
];

export const CRAFT: { title: string; desc: string; type: string }[] = [
  {
    title: "Micro-interactions",
    desc: "Subtle animations that make interfaces feel alive — hover states, transitions, and feedback loops.",
    type: "Motion",
  },
  {
    title: "Typography Systems",
    desc: "Building type scales that are beautiful at every size, from display headings to captions.",
    type: "Design",
  },
  {
    title: "Component Architecture",
    desc: "Structuring React components for maximum reusability and minimum complexity.",
    type: "Code",
  },
  {
    title: "Design Tokens",
    desc: "Creating single-source-of-truth token systems that keep design and code in sync.",
    type: "Systems",
  },
];

export const NAV = [
  { label: "Home",  icon: "home"      },
  { label: "Work",  icon: "briefcase" },
  { label: "Craft", icon: "pen"       },
] as const;