"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const TARGET_TEXT = "Perangkat Lunak";
const CHARS = TARGET_TEXT.split("");

export default function AboutHero() {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tlShimmer = useRef<gsap.core.Timeline | null>(null);

  const setLetterRef = useCallback((el: HTMLSpanElement | null, i: number) => {
    lettersRef.current[i] = el;
  }, []);

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

  return (
    <section className="pt-8 md:pt-14 pb-16 md:pb-24 grid grid-cols-4 md:grid-cols-12 gap-gutter items-center" id="about-hero">
      <Reveal className="col-span-4 md:col-span-7 flex flex-col gap-stack-lg">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-black dark:text-white leading-tight">
          Membangun{" "}
          <span
            ref={containerRef}
            className="inline-block cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "600px" }}
          >
            {CHARS.map((char, i) => (
              <span
                key={i}
                ref={(el) => setLetterRef(el, i)}
                className="inline-block text-secondary transition-none"
                style={{ willChange: "transform, opacity, color" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>{" "}
          dengan Presisi.
        </h1>
        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl leading-relaxed">
          Kami adalah firma rekayasa perangkat lunak yang berdedikasi pada standar keunggulan teknis
          tertinggi. Visi kami bukan sekadar menulis kode, melainkan merancang arsitektur digital
          yang stabil, terukur, dan presisi. Misi kami adalah menjadi mitra teknologi jangka panjang
          bagi perusahaan yang mengutamakan kualitas substansial di atas tren sesaat.
        </p>
      </Reveal>
      <Reveal delay={0.15} className="col-span-4 md:col-span-5 flex items-center justify-center">
        <img
          className="w-full max-w-[350px] md:max-w-[380px] h-auto"
          src="/images/gambarOrang.png"
          alt="Modern Software House Corporate Engineering Office Environment"
          loading="lazy"
        />
      </Reveal>
    </section>
  );
}