"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChipGraphic from "./ChipGraphic";
import Reveal from "@/components/common/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const TARGET_TEXT = "Solusi Digital";
const WORDS = TARGET_TEXT.split(" ");

export default function Hero() {
  const perfRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tlShimmer = useRef<gsap.core.Timeline | null>(null);

  const setLetterRef = useCallback(
    (el: HTMLSpanElement | null, i: number) => {
      lettersRef.current[i] = el;
    },
    []
  );

  useGSAP(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    /* ── Animasi 3D Letter Pop-In & Shimmer berulang secara kontinu ── */
    const tl = gsap.timeline({ repeat: -1, delay: 0.2, repeatDelay: 1.0 });

    // 1. Entrance: 3D letter pop-in (rotateX: -90, scale: 0.6, back.out)
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
        duration: 0.7,
        stagger: 0.045,
        ease: "back.out(1.7)",
      }
    );

    // 2. Continuous shimmer glow
    tl.to(letters, {
      color: "#00e5ff",
      textShadow: "0 0 18px rgba(0,229,255,0.7), 0 0 40px rgba(0,229,255,0.3)",
      duration: 0.35,
      stagger: { each: 0.06, from: "start" },
      ease: "power2.inOut",
    });

    tl.to(
      letters,
      {
        color: "var(--color-secondary)",
        textShadow: "0 0 0px transparent",
        duration: 0.4,
        stagger: { each: 0.06, from: "start" },
        ease: "power2.inOut",
      },
      "+=0.15"
    );

    // 3. Pause & smooth exit transition for repeating loop
    tl.to({}, { duration: 2.5 });

    tl.to(letters, {
      y: -20,
      opacity: 0,
      rotateX: 45,
      scale: 0.8,
      duration: 0.45,
      stagger: 0.025,
      ease: "power2.in",
    });

    tlShimmer.current = tl;
  }, []);

  /* ── 3. Hover: magnetic scatter & regroup ── */
  const handleMouseEnter = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    // Pause the shimmer while interacting
    tlShimmer.current?.pause();

    // Scatter
    letters.forEach((letter, i) => {
      const xOffset = (Math.random() - 0.5) * 28;
      const yOffset = (Math.random() - 0.5) * 20;
      const rot = (Math.random() - 0.5) * 25;
      gsap.to(letter, {
        x: xOffset,
        y: yOffset,
        rotation: rot,
        scale: 1.2,
        color: "#00e5ff",
        textShadow: "0 0 14px rgba(0,229,255,0.6)",
        duration: 0.35,
        delay: i * 0.02,
        ease: "power3.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    // Regroup with a satisfying bounce
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

  return (
    <section className="relative pt-10 sm:pt-14 md:pt-16 pb-16 md:pb-24 grid-layout items-center overflow-hidden" id="hero">
      {/* Background Graphic on Mobile & Tablet (< xl) - Holographic Blueprint */}
      <Reveal
        delay={0.1}
        className="hero-bg-graphic absolute inset-0 w-full h-full flex items-center justify-center opacity-60 dark:opacity-40 blur-[1.5px] pointer-events-none xl:hidden z-0 overflow-hidden"
      >
        <div className="w-[140%] max-w-[620px] h-full flex items-center justify-center scale-95 sm:scale-105">
          <ChipGraphic />
        </div>
      </Reveal>

      {/* Main Foreground Text Content */}
      <Reveal className="col-span-4 md:col-span-8 xl:col-span-7 flex flex-col gap-stack-lg relative z-10">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-black dark:text-white tracking-tight">
          Membangun{" "}
          <span
            ref={perfRef}
            className="inline-flex flex-wrap cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "600px" }}
          >
            {WORDS.map((word, wIdx) => {
              const charOffset = WORDS.slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0);
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
          </span>{" "}
          untuk Bisnis Anda.
        </h1>

        <p className="font-body-lg text-body-lg text-slate-700 dark:text-slate-200 max-w-2xl leading-relaxed font-medium">
          Kami membantu bisnis membangun website dan solusi digital yang modern, responsif, dan profesional, mulai dari web development hingga UI/UX design.
        </p>

        <div className="flex flex-col sm:flex-row gap-stack-md pt-stack-sm">
          <a
            href="/kontak"
            className="btn-animated bg-primary-container text-on-primary px-8 py-3.5 rounded-xl font-label-md text-label-md hover:bg-primary text-center shadow-md hover:shadow-lg font-semibold"
          >
            Hubungi Kami
          </a>
          <a
            href="/portofolio"
            className="btn-animated bg-white dark:bg-surface text-primary-container dark:text-white border border-primary-container/60 dark:border-white/20 px-8 py-3.5 rounded-xl font-label-md text-label-md hover:bg-surface-container-low text-center font-semibold"
          >
            Lihat Portofolio
          </a>
        </div>
      </Reveal>

      {/* Desktop Column Graphic (xl+) */}
      <Reveal delay={0.15} className="hidden xl:block xl:col-span-5 xl:h-[550px] relative z-10">
        <ChipGraphic />
      </Reveal>
    </section>
  );
}
