"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Sparkles, ArrowLeft } from "lucide-react";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  category?: string;
  color?: string;
  education?: {
    degree: string;
    institution: string;
    period: string;
  };
  link?: {
    url: string;
    text: string;
  };
}

interface Timeline3DProps {
  events: TimelineEvent[];
  backgroundColor?: string;
  textColor?: string;
  showImages?: boolean;
  className?: string;
}

const pinThemes = [
  { head: "#dc2626", highlight: "#f87171", rim: "#991b1b", dark: "#450a0a" }, // Red
  { head: "#0284c7", highlight: "#38bdf8", rim: "#0369a1", dark: "#082f49" }, // Sky Blue
  { head: "#d97706", highlight: "#fbbf24", rim: "#b45309", dark: "#451a03" }, // Amber
  { head: "#059669", highlight: "#34d399", rim: "#047857", dark: "#022c22" }, // Emerald
];

// Photorealistic 3D Pushpin Component with Steel Needle & Specular Highlights
const RealisticPushpin: React.FC<{ colorIndex: number }> = ({ colorIndex }) => {
  const theme = pinThemes[colorIndex % pinThemes.length];

  return (
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none filter drop-shadow-[1px_4px_5px_rgba(0,0,0,0.35)]">
      <svg width="34" height="44" viewBox="0 0 34 44" fill="none" className="overflow-visible">
        {/* Cast shadow of needle onto paper */}
        <ellipse cx="22" cy="40" rx="5" ry="2" fill="black" opacity="0.35" />

        {/* Steel Needle / Shaft entering paper */}
        <polygon points="17,24 15.5,39 18.5,39" fill="#e2e8f0" />
        <line x1="17" y1="24" x2="17" y2="39" stroke="#94a3b8" strokeWidth="1" />
        <polygon points="16.5,37 17,40 17.5,37" fill="#64748b" />

        {/* Pin Lower Flange Base */}
        <path d="M11 21 C11 18, 23 18, 23 21 L21 24 C21 25.5, 13 25.5, 13 24 Z" fill={theme.rim} />

        {/* Pin Cylindrical Waist */}
        <path d="M12 13 L22 13 L21 20.5 L13 20.5 Z" fill={theme.head} />
        {/* Specular highlight strip on waist */}
        <path d="M13.5 13 L16 13 L15.2 20.5 L13.8 20.5 Z" fill={theme.highlight} opacity="0.7" />
        <path d="M20 13 L21.5 13 L20.7 20.5 L19.5 20.5 Z" fill={theme.dark} opacity="0.5" />

        {/* Pin Upper Beveled Rim */}
        <ellipse cx="17" cy="12.5" rx="9.5" ry="3.5" fill={theme.rim} />
        <ellipse cx="17" cy="10.5" rx="9.5" ry="3.5" fill={theme.head} />

        {/* Top Glossy Cap with Radial Specular Shine */}
        <ellipse cx="17" cy="8.5" rx="8.5" ry="3" fill={`url(#pin-grad-${colorIndex})`} />
        {/* Shiny specular white reflection */}
        <ellipse cx="14.5" cy="7.5" rx="3.8" ry="1.3" fill="white" opacity="0.85" />
        <ellipse cx="13" cy="7" rx="1.4" ry="0.5" fill="white" opacity="0.95" />

        <defs>
          <radialGradient id={`pin-grad-${colorIndex}`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor={theme.highlight} />
            <stop offset="55%" stopColor={theme.head} />
            <stop offset="100%" stopColor={theme.dark} />
          </radialGradient>
        </defs>
      </svg>

      {/* Realistic Pierced Pinhole in Paper */}
      <div className="w-2.5 h-1 rounded-full bg-black/70 -mt-1 blur-[0.5px]" />
    </div>
  );
};

// 4 Unique, highly irregular hand-torn paper polygons with deep asymmetrical rips, notches, and rugged serrations
const tornPaperClips = [
  // 1. Nanda Indra
  `polygon(
    0% 2.8%, 3% 0.5%, 7% 2.2%, 12% 0.8%, 18% 3.0%, 25% 1.2%, 32% 2.8%, 40% 0.6%, 48% 2.5%, 55% 1.0%, 63% 3.2%, 70% 1.5%, 78% 2.9%, 85% 0.8%, 91% 3.5%, 95% 1.5%, 98% 4.8%, 100% 7.5%,
    98.5% 12%, 100% 17%, 96.8% 22%, 99.2% 28%, 97.0% 35%, 100% 41%, 96.5% 48%, 99.0% 55%, 96.8% 62%, 100% 70%, 97.2% 77%, 99.5% 84%, 96.0% 90%, 98.2% 94%, 95.5% 97%,
    91% 98.8%, 86% 96.2%, 80% 99.4%, 73% 97.0%, 67% 99.8%, 60% 96.5%, 53% 99.2%, 46% 96.0%, 39% 99.5%, 32% 96.8%, 25% 99.0%, 18% 96.5%, 12% 99.5%, 6% 97.2%, 1% 99.0%,
    2.5% 93%, 0.5% 86%, 3.2% 79%, 0.8% 72%, 2.8% 65%, 0.5% 58%, 3.0% 51%, 0.8% 44%, 2.6% 37%, 0.5% 30%, 3.2% 23%, 0.8% 16%, 2.5% 9%, 0.5% 4%
  )`,
  // 2. Shasy Kirana
  `polygon(
    2% 1.0%, 6% 3.2%, 12% 1.5%, 19% 3.8%, 26% 1.2%, 34% 3.0%, 42% 1.0%, 50% 3.5%, 58% 1.4%, 66% 3.2%, 74% 1.0%, 82% 3.6%, 89% 1.5%, 95% 3.0%, 99% 1.2%,
    97.5% 6%, 100% 13%, 97.0% 20%, 99.5% 27%, 96.5% 34%, 99.0% 42%, 96.8% 50%, 100% 58%, 97.0% 66%, 99.2% 74%, 96.5% 82%, 100% 89%, 97.5% 95%, 95.0% 99%,
    89% 97.0%, 83% 99.5%, 76% 96.8%, 69% 99.2%, 62% 96.5%, 55% 99.8%, 48% 97.0%, 41% 99.5%, 34% 96.2%, 27% 99.0%, 20% 96.5%, 13% 99.2%, 7% 96.8%, 1% 99.5%,
    4.0% 93%, 1.2% 86%, 4.5% 78%, 1.0% 70%, 5.0% 62%, 1.5% 54%, 4.2% 46%, 1.0% 38%, 4.8% 30%, 1.2% 22%, 4.0% 14%, 1.5% 7%
  )`,
  // 3. Aldi Kurniawan
  `polygon(
    5% 6.5%, 9% 3.0%, 15% 1.2%, 22% 3.5%, 30% 1.0%, 38% 3.2%, 46% 1.4%, 54% 3.6%, 62% 1.2%, 70% 3.4%, 78% 1.0%, 86% 3.2%, 93% 1.5%, 98% 3.8%,
    96.5% 8%, 99.5% 15%, 96.8% 23%, 100% 31%, 97.2% 39%, 99.8% 47%, 96.5% 55%, 100% 63%, 97.0% 71%, 99.5% 79%, 96.2% 87%, 98.8% 93%, 96.0% 98.5%,
    91% 96.5%, 84% 99.8%, 77% 96.2%, 70% 99.5%, 63% 96.8%, 56% 99.2%, 49% 96.0%, 42% 99.8%, 35% 96.5%, 28% 99.2%, 21% 96.8%, 14% 99.5%, 8% 96.0%, 2% 98.8%,
    0.8% 92%, 3.5% 84%, 0.5% 76%, 3.8% 68%, 0.8% 60%, 3.2% 52%, 0.5% 44%, 3.6% 36%, 0.8% 28%, 3.0% 20%, 1.2% 13%, 3.5% 8%
  )`,
  // 4. Bayu Dwi Aditya
  `polygon(
    1% 3.5%, 6% 1.2%, 13% 3.8%, 20% 1.5%, 28% 3.2%, 36% 1.0%, 44% 3.5%, 52% 1.2%, 60% 3.4%, 68% 1.0%, 76% 3.6%, 84% 1.4%, 91% 3.2%, 97% 1.0%, 100% 3.5%,
    97.0% 9%, 99.8% 17%, 96.5% 25%, 100% 33%, 97.2% 41%, 99.5% 49%, 96.8% 57%, 100% 65%, 97.0% 73%, 99.2% 81%, 96.5% 89%, 99.0% 95%, 96.2% 99.2%,
    90% 96.8%, 83% 99.5%, 76% 96.0%, 69% 99.8%, 62% 96.5%, 55% 99.0%, 48% 96.2%, 41% 99.6%, 34% 96.8%, 27% 99.2%, 20% 96.0%, 13% 99.5%, 7% 96.5%, 0% 98.0%,
    3.2% 91%, 0.8% 83%, 3.8% 75%, 1.0% 67%, 3.5% 59%, 0.6% 51%, 3.2% 43%, 1.0% 35%, 3.6% 27%, 0.8% 19%, 3.0% 11%, 1.2% 5%
  )`,
];

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  showImages: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  index,
  showImages,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, {
    once: false,
    amount: 0.2,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  const isEven = index % 2 === 0;
  const baseRotation = isEven ? 1.5 : -1.5;
  const tornClipPath = tornPaperClips[index % tornPaperClips.length];

  return (
    <motion.div
      ref={itemRef}
      className={`relative mb-12 sm:mb-16 md:mb-24 ${
        isEven ? "md:ml-auto" : "md:mr-auto"
      } md:w-1/2 flex ${isEven ? "md:justify-start" : "md:justify-end"} px-1 sm:px-3 md:px-5`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: isEven ? 40 : -40,
          y: 30,
          rotate: isEven ? 3 : -3,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: baseRotation,
          transition: {
            duration: 0.7,
            ease: "easeOut",
          },
        },
      }}
    >
      {/* 3D Container with Soft, Clean Contour Drop-Shadow */}
      <div
        className="relative z-10 w-full md:w-[94%] cursor-pointer select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] group"
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        style={{ perspective: "1200px" }}
      >
        {/* Photorealistic 3D Pushpin Pierced at Top Center */}
        <RealisticPushpin colorIndex={index} />

        {/* 3D Flipping Card */}
        <motion.div
          className="relative w-full h-[470px] sm:h-[520px] md:h-[560px] transition-all duration-300"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
            y: isFlipped ? -6 : 0,
            scale: isFlipped ? 1.015 : 1,
          }}
          transition={{
            duration: 0.65,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {/* ======================================================== */}
          {/* SISI DEPAN: Foto Penuh + Nama Simpel                      */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden shadow-xl"
            style={{
              clipPath: tornClipPath,
              transform: "rotateY(0deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Foto Penuh Anggota Tim */}
            {showImages && event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 contrast-105"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

            {/* Top Badges: Category & Date */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20 pointer-events-none">
              <span className="bg-slate-950/80 text-cyan-400 border border-cyan-400/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {event.date}
              </span>

              {event.category && (
                <span className="bg-blue-600/85 text-white border border-blue-400/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase shadow-md">
                  {event.category}
                </span>
              )}
            </div>

            {/* Bottom Front: Simple Clean Name & Role Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-20">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {event.title}
              </h3>
              {event.subtitle && (
                <p className="text-xs sm:text-sm text-cyan-300 font-semibold tracking-wide drop-shadow-md mt-0.5">
                  {event.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SISI BELAKANG: Background Polos Bersih + Rincian Lengkap  */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full bg-[#08182e] text-white p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-xl"
            style={{
              clipPath: tornClipPath,
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Header Sisi Belakang */}
            <div className="pt-2 border-b border-white/15 pb-2.5">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> REKAM JEJAK KUALIFIKASI
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-bold">
                  {event.date}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-cyan-300 mt-0.5">
                {event.subtitle}
              </p>
            </div>

            {/* Body Sisi Belakang: Rincian Pengalaman & Pendidikan */}
            <div className="space-y-3 my-auto py-1">
              {/* Rincian Pengalaman */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" /> Rincian Pengalaman
                </span>
                <div className="bg-[#0f2442] p-3 sm:p-3.5 rounded-xl border border-white/10 shadow-md">
                  <p className="text-white text-xs sm:text-sm leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Latar Belakang Pendidikan */}
              {event.education && (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Pendidikan
                  </span>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#0f2442] border border-white/10 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-1 text-xs">
                    <span className="font-bold text-cyan-300">
                      {event.education.degree}
                    </span>
                    <span className="text-slate-200 font-mono text-[11px]">
                      {event.education.institution} ({event.education.period})
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Sisi Belakang: Tombol / Hint Balik */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
              <span className="text-[11px] text-cyan-400 font-mono font-semibold flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Klik untuk kembali ke foto
              </span>
              <span className="text-[11px] text-slate-400 font-mono">CasstroDev</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Timeline3D: React.FC<Timeline3DProps> = ({
  events,
  backgroundColor = "bg-transparent",
  textColor = "text-white",
  showImages = true,
  className = "",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className={`w-full ${backgroundColor} py-6 sm:py-10 md:py-14 px-0 sm:px-2 lg:px-6 overflow-hidden ${textColor} ${className} relative`}
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Pinned Paper Cards - Zigzag Layout with 3D Flip & Realistic Pin */}
        <div className="relative z-10 pt-2">
          {events.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              showImages={showImages}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline3D;
