"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";
import { Sparkles } from "lucide-react";

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
  const flowPathRef = useRef<SVGPathElement>(null);
  const visiCardRef = useRef<HTMLDivElement>(null);
  const missionCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setMissionCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    missionCardsRef.current[i] = el;
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const path = pathRef.current;
    const flowPath = flowPathRef.current;

    if (path) {
      const length = path.getTotalLength();

      // Main S-curve path stroke reveal synced to scroll
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 85%",
          scrub: 0.5,
        },
      });

      // Flowing stream pulse segment synced directly to scroll movement
      if (flowPath) {
        gsap.set(flowPath, {
          strokeDasharray: `100 ${length}`,
          strokeDashoffset: length,
        });

        gsap.to(flowPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            end: "bottom 85%",
            scrub: 0.5,
          },
        });
      }
    }

    if (visiCardRef.current) {
      gsap.fromTo(
        visiCardRef.current,
        {
          autoAlpha: 0,
          y: 50,
          scale: 0.92,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: visiCardRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    const cards = missionCardsRef.current.filter(Boolean) as HTMLDivElement[];
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          autoAlpha: 0,
          y: 50,
          scale: 0.92,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24" id="visi-misi">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container-max mx-auto px-4 md:px-8 relative z-10">
        <Reveal y={24} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-primary text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Visi <span className="text-secondary font-light">&</span> Misi Kami
          </h2>
        </Reveal>

        <div className="max-w-2xl mx-auto mb-12 md:mb-16 relative z-20">
          <div
            ref={visiCardRef}
            className="bg-white dark:bg-[#07162c] border-2 border-accent-cyan/40 dark:border-accent-cyan/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-cyan-500/5 hover:border-accent-cyan hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-cyan/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-center relative z-10">
              <span className="text-[11px] font-mono font-bold tracking-wider text-accent-cyan uppercase bg-accent-cyan/10 border border-accent-cyan/30 px-2.5 py-0.5 rounded-full inline-block mb-3">
                VISI UTAMA
              </span>
              <h3 className="font-headline-md text-lg sm:text-xl md:text-2xl font-extrabold text-primary dark:text-white leading-snug group-hover:text-secondary transition-colors">
                {visiData.title}
              </h3>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          <Reveal y={30}>
            <div className="text-center mb-20 md:mb-28 relative z-10">
              <span className="text-[11px] font-mono font-bold tracking-wider text-amber-500 uppercase bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full inline-block mb-3">
                MISI KAMI
              </span>
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-amber-500/60 to-transparent mx-auto mt-4" />
            </div>
          </Reveal>

          <div className="absolute inset-0 pointer-events-none z-0" style={{ top: '140px' }}>
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

              <path
                d="M 500 0 C 180 100, 180 250, 500 350 C 820 450, 820 600, 500 700 C 180 800, 180 950, 500 1050 C 820 1150, 820 1300, 500 1400"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeOpacity="0.12"
                className="blur-md"
              />

              <path
                d="M 500 0 C 180 100, 180 250, 500 350 C 820 450, 820 600, 500 700 C 180 800, 180 950, 500 1050 C 820 1150, 820 1300, 500 1400"
                fill="none"
                stroke="var(--color-border-subtle)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />

              <path
                ref={pathRef}
                d="M 500 0 C 180 100, 180 250, 500 350 C 820 450, 820 600, 500 700 C 180 800, 180 950, 500 1050 C 820 1150, 820 1300, 500 1400"
                fill="none"
                stroke="url(#sCurveGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <path
                ref={flowPathRef}
                d="M 500 0 C 180 100, 180 250, 500 350 C 820 450, 820 600, 500 700 C 180 800, 180 950, 500 1050 C 820 1150, 820 1300, 500 1400"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.9"
                className="filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
              />
            </svg>
          </div>

          <div className="space-y-28 md:space-y-40 relative z-10">
            {missionItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.number}
                  className="relative flex flex-col md:flex-row items-center w-full"
                >
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div
                      ref={(el) => setMissionCardRef(el, index)}
                      className="bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm md:text-base shrink-0 shadow-md">
                          {item.number}
                        </div>
                        <h3 className="font-headline-md text-sm sm:text-lg md:text-xl font-bold text-primary dark:text-white leading-snug pt-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.text}
                        </h3>
                      </div>
                    </div>
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
