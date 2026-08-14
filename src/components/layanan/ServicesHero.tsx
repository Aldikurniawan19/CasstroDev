"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const TARGET_TEXT = "Solusi Perangkat Lunak";
const WORDS = TARGET_TEXT.split(" ");

export default function ServicesHero() {
  const containerRef = useRef<HTMLSpanElement>(null);
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

    /* ── Animasi 3D Letter Pop-In & Shimmer berulang (seperti "Performance" di Hero.tsx) ── */
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

  /* ── Hover: Magnetic Scatter & Regroup (seperti "Performance" di Hero.tsx) ── */
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

  return (
    <section
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8 md:pt-12 pb-2 md:pb-4"
      id="services-hero"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
        <Reveal className="col-span-4 md:col-span-8 md:col-start-3 text-center">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-black dark:text-white mb-stack-md">
            <span
              ref={containerRef}
              className="inline-flex flex-wrap justify-center cursor-pointer max-w-full"
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
            </span>
          </h1>
          <p className="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Kami merancang dan membangun solusi digital modern yang sesuai dengan kebutuhan Anda, mulai dari UI/UX Design hingga pengembangan website yang responsif, cepat, dan fungsional.
          </p>
        </Reveal>
      </div>
    </section>
  );
}