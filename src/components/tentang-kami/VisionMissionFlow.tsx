"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function VisionMissionFlow() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient background glow orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-accent-cyan/15 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-accent-cyan/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="vm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vm-grid)" />
      </svg>
    </div>
  );
}
