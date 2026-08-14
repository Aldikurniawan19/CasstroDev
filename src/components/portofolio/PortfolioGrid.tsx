"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";
import { SquareArrowOutUpRight } from "lucide-react";
import { projectsData, type ProjectItem } from "@/data/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const PORTFOLIO_TITLE = "Projek yang Pernah Kami Kerjakan";
const PORTFOLIO_WORDS = PORTFOLIO_TITLE.split(" ");

type FilterType = "Semua" | "Web Development" | "Sistem Informasi" | "UI/UX Design" | "Lainnya";

const filters: FilterType[] = [
  "Semua",
  "Web Development",
  "Sistem Informasi",
  "UI/UX Design",
  "Lainnya",
];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Semua");

  const titleContainerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tlShimmer = useRef<gsap.core.Timeline | null>(null);

  const setLetterRef = useCallback((el: HTMLSpanElement | null, i: number) => {
    lettersRef.current[i] = el;
  }, []);

  useGSAP(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    /* ── Animasi 3D Letter Pop-In & Shimmer berulang ── */
    const tl = gsap.timeline({ repeat: -1, delay: 0.2, repeatDelay: 1.0 });

    // 1. Entrance: 3D letter pop-in
    tl.fromTo(
      letters,
      {
        y: 30,
        opacity: 0,
        rotateX: -90,
        scale: 0.6,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.04,
        ease: "back.out(1.7)",
      }
    );

    // 2. Continuous Shimmer Glow
    tl.to(letters, {
      color: "#00e5ff",
      textShadow: "0 0 18px rgba(0,229,255,0.7), 0 0 35px rgba(0,229,255,0.4)",
      duration: 0.35,
      stagger: { each: 0.05, from: "start" },
      ease: "power2.inOut",
    });

    tl.to(
      letters,
      {
        color: "var(--color-secondary)",
        textShadow: "0 0 0px transparent",
        duration: 0.4,
        stagger: { each: 0.05, from: "start" },
        ease: "power2.inOut",
      },
      "+=0.15"
    );

    // 3. Pause & smooth reset for repeating loop
    tl.to({}, { duration: 2.5 });

    tl.to(letters, {
      y: -20,
      opacity: 0,
      rotateX: 45,
      scale: 0.8,
      duration: 0.45,
      stagger: 0.02,
      ease: "power2.in",
    });

    tlShimmer.current = tl;
  }, []);

  /* ── Hover: Magnetic Scatter & Regroup ── */
  const handleMouseEnter = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    tlShimmer.current?.pause();

    letters.forEach((letter, i) => {
      const xOffset = (Math.random() - 0.5) * 26;
      const yOffset = (Math.random() - 0.5) * 18;
      const rot = (Math.random() - 0.5) * 22;
      gsap.to(letter, {
        x: xOffset,
        y: yOffset,
        rotation: rot,
        scale: 1.2,
        color: "#00e5ff",
        textShadow: "0 0 14px rgba(0,229,255,0.6)",
        duration: 0.35,
        delay: i * 0.015,
        ease: "power3.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    gsap.to(letters, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      color: "var(--color-secondary)",
      textShadow: "0 0 0px transparent",
      duration: 0.5,
      stagger: 0.025,
      ease: "elastic.out(1, 0.4)",
      onComplete: () => {
        tlShimmer.current?.resume();
      },
    });
  }, []);

  const filteredProjects =
    activeFilter === "Semua"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section className="w-full bg-slate-50/70 dark:bg-[#040d1a] py-16 md:py-24" id="projek-section">
      <div className="max-w-container-max mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <Reveal y={24}>
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-black dark:text-white font-extrabold tracking-tight mb-4">
              <span
                ref={titleContainerRef}
                className="inline-flex cursor-pointer flex-wrap justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "600px" }}
              >
                {PORTFOLIO_WORDS.map((word, wIdx) => {
                  const charOffset =
                    PORTFOLIO_WORDS.slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0);
                  return (
                    <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
                      {word.split("").map((char, cIdx) => {
                        const globalIndex = charOffset + cIdx;
                        return (
                          <span
                            key={cIdx}
                            ref={(el) => setLetterRef(el, globalIndex)}
                            className="inline-block text-secondary transition-none"
                            style={{ willChange: "transform, opacity, color" }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
              Eksplorasi portofolio proyek rekayasa perangkat lunak yang telah kami bangun dengan arsitektur modern, performa tinggi, dan dampak bisnis terukur.
            </p>
          </Reveal>
        </div>

        {/* Category Filters */}
        <Reveal y={20} className="mb-10 md:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`btn-animated px-4 sm:px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary-container text-on-primary shadow-md hover:bg-primary"
                      : "bg-white dark:bg-surface text-primary-container border border-primary-container/60 hover:bg-primary-container/10 hover:border-primary-container"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            return (
              <Reveal key={project.id} delay={index * 0.08} y={30} className="h-full">
                <Link
                  href={`/portofolio/${project.id}`}
                  className="group bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer block"
                >
                  {/* Card Image */}
                  <div className="relative h-52 sm:h-56 md:h-60 w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-mono font-semibold border border-white/20 shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 md:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2.5">
                        {project.title}
                      </h3>

                      <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-5 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Card Footer Tech Tags & Action Arrow */}
                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-white/10 mt-auto">
                      <div className="flex flex-wrap gap-1.5 items-center max-w-[80%]">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-surface-container-low text-secondary border border-border-subtle px-2.5 py-0.5 rounded-md text-label-sm font-label-sm font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-xs font-mono text-slate-400">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div
                        className="w-8 h-8 rounded-lg border border-slate-200/90 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 flex items-center justify-center transition-all shrink-0"
                        title="Lihat Detail Proyek"
                      >
                        <SquareArrowOutUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
