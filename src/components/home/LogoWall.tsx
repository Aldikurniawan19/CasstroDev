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
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeList.map((tech, index) => (
            <div
              className="tech-badge flex items-center gap-3 text-[#9ca3af] select-none px-8 group hover:text-[var(--brand)] transition-colors duration-300"
              style={{ "--brand": tech.color } as React.CSSProperties}
              key={`${tech.name}-${index}`}
            >
              <span className="tech-icon transition-transform duration-300 group-hover:scale-110">
                {tech.icon}
              </span>
              <span className="text-base font-medium tracking-wide whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}