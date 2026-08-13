import { SiFigma, SiLaravel, SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si";
import Reveal from "@/components/common/Reveal";

const techStack = [
  {
    name: "Laravel",
    color: "#FF2D20",
    icon: <SiLaravel className="w-7 h-7" />,
  },
  {
    name: "Next.js",
    color: "#000000",
    icon: <SiNextdotjs className="w-7 h-7" />,
  },
  {
    name: "React",
    color: "#61DAFB",
    icon: <SiReact className="w-7 h-7" />,
  },
  {
    name: "Tailwind",
    color: "#38BDF8",
    icon: <SiTailwindcss className="w-7 h-7" />,
  },
  {
    name: "Figma",
    color: "#F24E1E",
    icon: <SiFigma className="w-7 h-7" />,
  },
];

// Duplicate 6x for seamless infinite marquee
const marqueeList = [...techStack, ...techStack, ...techStack, ...techStack, ...techStack, ...techStack];

export default function LogoWall() {
  return (
    <section className="py-10 bg-white overflow-hidden" aria-label="Teknologi Utama">
      {/* Title */}
      <Reveal y={20}>
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9ca3af] font-medium">
            Teknologi Utama Yang Sering Digunakan
          </span>
        </div>
      </Reveal>

      {/* Marquee Slider */}
      <div className="marquee-wrapper py-2">
        <div className="marquee-track">
          {marqueeList.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="tech-badge flex items-center gap-3.5 px-8 select-none"
            >
              <span
                className="tech-icon text-slate-900 dark:text-white flex items-center justify-center"
                style={tech.color !== "#000000" ? { color: tech.color } : {}}
              >
                {tech.icon}
              </span>
              <span
                className="text-base font-semibold tracking-wide whitespace-nowrap text-slate-900 dark:text-white"
                style={tech.color !== "#000000" ? { color: tech.color } : {}}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}