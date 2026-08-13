"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className,
  y = 40,
  x = 0,
  delay = 0,
  duration = 0.8,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { autoAlpha: 0, y, x },
      {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: once
          ? {
              trigger: el,
              start: "top 88%",
              once: true,
            }
          : {
              trigger: el,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
              once: false,
            },
      }
    );
  }, [y, x, delay, duration, once]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}