"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";
import {
  Target,
  Users,
  Lightbulb,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import VisionMissionFlow from "./VisionMissionFlow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const framesData = [
  {
    type: "visi",
    number: "00",
    pillTag: "VISI UTAMA",
    title: "Membangun Solusi Digital untuk Menciptakan Dampak yang Nyata",
    icon: Target,
    badgeBg: "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30",
    glowColor: "rgba(0, 229, 255, 0.3)",
  },
  {
    type: "misi",
    number: "01",
    pillTag: "KEMITRAAN & KOMUNIKASI",
    title: "Kemitraan Komunikatif & Transparan",
    description:
      "Membangun hubungan yang dekat dan komunikatif dengan client dalam memahami kebutuhan dan tujuan proyek secara mendalam.",
    icon: Users,
    badgeBg: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
    glowColor: "rgba(0, 229, 255, 0.25)",
  },
  {
    type: "misi",
    number: "02",
    pillTag: "INOVASI RELEVAN",
    title: "Solusi Digital Inovatif & Relevan",
    description:
      "Mengembangkan solusi digital yang inovatif dan relevan sesuai dengan kebutuhan spesifik serta dinamika perkembangan bisnis.",
    icon: Lightbulb,
    badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
  {
    type: "misi",
    number: "03",
    pillTag: "STANDAR KUALITAS",
    title: "Kualitas, Kreativitas & Presisi",
    description:
      "Mengutamakan kualitas, kreativitas, dan ketelitian tinggi dalam setiap proses pengembangan sistem dan arsitektur perangkat lunak.",
    icon: ShieldCheck,
    badgeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    type: "misi",
    number: "04",
    pillTag: "KOLABORASI PROFESIONAL",
    title: "Pengalaman Kerja Sama Profesional",
    description:
      "Memberikan pengalaman kerja sama yang profesional, kolaboratif, dan menyenangkan dalam setiap tahapan proyek.",
    icon: Briefcase,
    badgeBg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
    glowColor: "rgba(99, 102, 241, 0.25)",
  },
  {
    type: "misi",
    number: "05",
    pillTag: "DAMPAK SUBSTANSIAL",
    title: "Dampak & Nilai Manfaat Nyata",
    description:
      "Menghasilkan solusi digital yang memiliki nilai substansial dan memberikan manfaat nyata bagi pengguna serta pertumbuhan bisnis.",
    icon: TrendingUp,
    badgeBg: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    glowColor: "rgba(0, 229, 255, 0.25)",
  },
];

export default function VisionMissionRedesign() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);

  // Pure 100% Scroll-driven GSAP ScrollTrigger pinned animation
  useGSAP(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const totalFrames = framesData.length;

    ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: () => `+=${totalFrames * 450}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * totalFrames),
          totalFrames - 1
        );
        setActiveFrame(frameIndex);
      },
    });
  }, { scope: pinRef });

  return (
    <section className="relative overflow-hidden" id="visi-misi">
      {/* Background ambient lighting */}
      <VisionMissionFlow />

      {/* PINNED PURE SCROLL FRAME-BY-FRAME STAGE */}
      <div
        ref={pinRef}
        id="vm-pin-trigger"
        className="h-screen w-full flex flex-col justify-between py-6 sm:py-8 md:py-12 relative z-10 overflow-hidden"
      >
        {/* FIXED HEADER */}
        <div className="max-w-container-max mx-auto px-4 md:px-8 w-full text-center shrink-0">
          <Reveal y={15}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-[11px] sm:text-xs tracking-widest uppercase font-semibold mb-1 sm:mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Arah & Tujuan</span>
            </div>
            <h2 className="font-headline-xl-mobile md:font-headline-xl text-primary text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Visi <span className="text-secondary font-light">&</span> Misi Kami
            </h2>
          </Reveal>
        </div>

        {/* FRAME-BY-FRAME CARD STAGE */}
        <div className="relative my-auto w-full max-w-3xl mx-auto px-3 sm:px-6 flex items-center justify-center">
          
          {/* CARDS DISPLAY CONTAINER */}
          <div ref={trackRef} className="w-full flex items-center justify-center relative min-h-[290px] sm:min-h-[350px] md:min-h-[380px]">
            {framesData.map((item, index) => {
              const isActive = index === activeFrame;
              const isVisi = item.type === "visi";
              const IconComponent = item.icon;

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
                    isActive
                      ? "opacity-100 scale-100 pointer-events-auto z-20"
                      : index < activeFrame
                      ? "opacity-0 -translate-x-16 sm:-translate-x-24 scale-95 pointer-events-none z-0"
                      : "opacity-0 translate-x-16 sm:translate-x-24 scale-95 pointer-events-none z-0"
                  }`}
                >
                  {isVisi ? (
                    /* VISI FRAME CARD */
                    <div className="w-full max-w-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 bg-gradient-to-br from-[#002756] via-[#003877] to-[#001d42] text-white shadow-[0_20px_50px_rgba(0,56,119,0.35)] border-2 border-accent-cyan/60 overflow-hidden relative group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-3xl pointer-events-none" />

                      <div className="relative z-10 space-y-4 sm:space-y-6">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
                              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-mono tracking-wider text-accent-cyan uppercase font-bold px-2.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30">
                              {item.pillTag}
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs font-mono text-accent-cyan font-bold shrink-0">
                            01 / 06
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white tracking-tight">
                          &ldquo;{item.title}&rdquo;
                        </h3>

                        <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs text-accent-cyan font-mono font-semibold gap-2 flex-wrap">
                          <span>PONDASI TEKNOLOGI CASSTRODEV</span>
                          <span>FRAME 01</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* MISI FRAME CARD */
                    <div className="w-full max-w-2xl bg-white/95 dark:bg-[#07162c]/95 backdrop-blur-2xl border-2 border-slate-200 dark:border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 transition-all duration-500 hover:border-accent-cyan/80 shadow-[0_15px_40px_rgba(0,229,255,0.15)] relative overflow-hidden group">
                      
                      {/* Top Accent Stripe */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-cyan via-primary to-transparent" />

                      {/* Corner Glow */}
                      <div
                        className="absolute -top-24 -right-24 w-48 h-48 sm:w-56 sm:h-56 rounded-full blur-3xl pointer-events-none"
                        style={{ backgroundColor: item.glowColor }}
                      />

                      <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center font-bold ${item.badgeBg} shrink-0 shadow-sm`}
                            >
                              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase border border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10">
                              {item.pillTag}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-accent-cyan font-mono font-bold text-[11px] sm:text-xs shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>0{index + 1} / 06</span>
                          </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-primary dark:text-white leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-text-muted dark:text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[10px] sm:text-xs text-text-muted/80 font-mono gap-2 flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan inline-block" />
                            PILAR MISI {item.number}
                          </span>
                          <span className="font-bold text-accent-cyan">Standard Rekayasa Presisi</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
