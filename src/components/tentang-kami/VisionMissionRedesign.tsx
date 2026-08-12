"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";
import { Sparkles, Target } from "lucide-react";
import VisionMissionFlow from "./VisionMissionFlow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const visiData = {
  title: "Membangun solusi digital untuk menciptakan dampak yang nyata",
};

const missionItems = [
  {
    number: "1",
    text: "Membangun hubungan yang dekat dan komunikatif dengan client dalam memahami kebutuhan dan tujuan proyek.",
  },
  {
    number: "2",
    text: "Mengembangkan solusi digital yang inovatif dan relevan sesuai dengan kebutuhan yang ada.",
  },
  {
    number: "3",
    text: "Mengutamakan kualitas, kreativitas, dan ketelitian dalam setiap proses pengembangan.",
  },
  {
    number: "4",
    text: "Memberikan pengalaman kerja sama yang profesional dan menyenangkan dalam setiap proyek.",
  },
  {
    number: "5",
    text: "Menghasilkan solusi digital yang memiliki nilai dan manfaat nyata bagi pengguna.",
  },
];

export default function VisionMissionRedesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // GSAP ScrollTrigger path drawing animation along the S-curve
  useGSAP(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 80%",
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <section className="relative overflow-hidden py-16 md:py-24" id="visi-misi">
      {/* Background ambient lighting */}
      <VisionMissionFlow />

      <div className="max-w-container-max mx-auto px-4 md:px-8 relative z-10">
        {/* SECTION HEADER */}
        <Reveal y={24} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-xs tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arah & Tujuan</span>
          </div>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-primary text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Visi <span className="text-secondary font-light">&</span> Misi Kami
          </h2>
        </Reveal>

        {/* TOP CENTERED VISI CARD */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 relative z-20">
          <Reveal y={30}>
            <div className="bg-white dark:bg-[#07162c] border-2 border-accent-cyan/40 dark:border-accent-cyan/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-cyan-500/5 hover:border-accent-cyan hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-cyan/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header: Icon + Title */}
              <div className="flex items-start gap-3 md:gap-4 relative z-10">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs md:text-sm shrink-0 shadow-md">
                  <Target className="w-5 h-5 text-accent-cyan" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-accent-cyan uppercase bg-accent-cyan/10 border border-accent-cyan/30 px-2.5 py-0.5 rounded-full inline-block mb-2">
                    VISI UTAMA
                  </span>
                  <h3 className="font-headline-md text-lg sm:text-xl md:text-2xl font-extrabold text-primary dark:text-white leading-snug group-hover:text-secondary transition-colors">
                    {visiData.title}
                  </h3>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ALTERNATING MISI TIMELINE SECTION */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* SMOOTH CONTINUOUS S-CURVE RIBBON SVG PATH */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 1400" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="25%" stopColor="#00e5ff" stopOpacity="1" />
                  <stop offset="50%" stopColor="#0b4f9e" stopOpacity="1" />
                  <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Ambient Glow Ribbon Trace */}
              <path
                d="M 500 0 C 180 100, 180 250, 500 350 C 820 450, 820 600, 500 700 C 180 800, 180 950, 500 1050 C 820 1150, 820 1300, 500 1400"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeOpacity="0.12"
                className="blur-md"
              />

              {/* Dotted Base S-Curve Track */}
              <path
                d="M 500 0 C 180 100, 180 250, 500 350 C 820 480, 820 600, 500 700 C 180 800, 180 950, 500 1050 C 820 1150, 820 1300, 500 1400"
                fill="none"
                stroke="var(--color-border-subtle)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />

              {/* Scroll-Linked Animated Flowing S-Curve Ribbon */}
              <path
                ref={pathRef}
                d="M 500 0 C 180 100, 180 250, 500 350 C 820 450, 820 600, 500 700 C 180 800, 180 950, 500 1050 C 820 1150, 820 1300, 500 1400"
                fill="none"
                stroke="url(#sCurveGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* ALTERNATING MISI CARDS LIST */}
          <div className="space-y-28 md:space-y-40 relative z-10">
            {missionItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.number}
                  className="relative flex flex-col md:flex-row items-center w-full"
                >
                  {/* MISI CARD ALIGNED LEFT OR RIGHT */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <Reveal y={50}>
                      {/* CARD STYLING MATCHING REFERENCE IMAGE */}
                      <div className="bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 group">
                        
                        {/* Header: Number Circle + Text */}
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#873a00] text-white flex items-center justify-center font-bold text-sm md:text-base shrink-0 shadow-md">
                            {item.number}
                          </div>
                          <h3 className="font-headline-md text-base sm:text-lg md:text-xl font-bold text-primary dark:text-white leading-snug pt-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {item.text}
                          </h3>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
