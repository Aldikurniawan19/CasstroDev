"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { GraduationCap, ArrowLeft } from "lucide-react";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  roleName?: string;
  iconCode?: string;
  description: string;
  bulletPoints?: string[];
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
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  textColor?: string;
  showImages?: boolean;
  className?: string;
}

// Photorealistic Round Domed Golden/Brown Pushpin with Cast Shadow (Matching Reference Image)
const RealisticPushpin: React.FC = () => {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
      <svg width="32" height="38" viewBox="0 0 32 38" fill="none" className="overflow-visible">
        {/* Soft shadow cast by the pin */}
        <ellipse cx="20" cy="34" rx="5" ry="2" fill="black" opacity="0.35" />

        {/* Steel Needle entering paper */}
        <polygon points="16,20 14.8,33 17.2,33" fill="#cbd5e1" />
        <line x1="16" y1="20" x2="16" y2="33" stroke="#94a3b8" strokeWidth="0.8" />

        {/* Golden-Bronze Domed Pushpin Head */}
        <ellipse cx="16" cy="13" rx="9" ry="8.5" fill="#451a03" />
        <ellipse cx="16" cy="12" rx="8.5" ry="8" fill="url(#gold-dome-grad)" />

        {/* Specular White Highlight Reflection */}
        <ellipse cx="13.5" cy="8.5" rx="3.2" ry="2" fill="white" opacity="0.8" />
        <ellipse cx="12" cy="7.8" rx="1.2" ry="0.8" fill="white" opacity="0.95" />

        <defs>
          <radialGradient id="gold-dome-grad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
        </defs>
      </svg>

      {/* Realistic Pinhole */}
      <div className="w-2 h-0.8 rounded-full bg-black/75 -mt-0.5 blur-[0.4px]" />
    </div>
  );
};

// Fine, authentic micro-serrated deckle torn paper edge polygons (Matching Reference Image)
const fineDeckleClips = [
  // 1. Deckle Pattern A
  `polygon(
    0% 0.4%, 6% 0.2%, 14% 0.5%, 22% 0.2%, 30% 0.6%, 40% 0.2%, 50% 0.5%, 60% 0.3%, 70% 0.6%, 80% 0.2%, 90% 0.5%, 96% 0.2%, 100% 0.4%,
    99.2% 3%, 99.9% 6%, 99.0% 9%, 99.8% 12%, 99.1% 15%, 100% 18%, 99.2% 21%, 99.9% 25%, 99.0% 29%, 99.8% 33%, 99.1% 37%, 100% 41%, 99.2% 45%, 99.9% 49%, 99.1% 53%, 99.8% 57%, 99.0% 61%, 100% 65%, 99.2% 69%, 99.8% 73%, 99.0% 77%, 100% 81%, 99.2% 85%, 99.9% 89%, 99.1% 93%, 99.8% 97%, 99.4% 100%,
    94% 99.5%, 88% 99.0%, 82% 99.8%, 76% 99.2%, 70% 99.7%, 64% 99.1%, 58% 99.8%, 52% 99.2%, 46% 99.7%, 40% 99.0%, 34% 99.8%, 28% 99.2%, 22% 99.7%, 16% 99.1%, 10% 99.8%, 4% 99.2%, 0% 99.6%,
    0.8% 97%, 0.1% 93%, 0.9% 89%, 0.2% 85%, 1.0% 81%, 0.0% 77%, 0.8% 73%, 0.2% 69%, 0.9% 65%, 0.0% 61%, 0.8% 57%, 0.2% 53%, 1.0% 49%, 0.1% 45%, 0.9% 41%, 0.0% 37%, 0.8% 33%, 0.2% 29%, 0.9% 25%, 0.1% 21%, 0.8% 17%, 0.2% 13%, 1.0% 9%, 0.1% 6%, 0.8% 3%
  )`,
  // 2. Deckle Pattern B
  `polygon(
    0% 0.3%, 8% 0.5%, 16% 0.2%, 25% 0.6%, 35% 0.2%, 45% 0.5%, 55% 0.3%, 65% 0.6%, 75% 0.2%, 85% 0.5%, 94% 0.2%, 100% 0.3%,
    99.1% 3%, 99.8% 6%, 99.0% 10%, 100% 14%, 99.2% 18%, 99.9% 22%, 99.1% 26%, 99.8% 30%, 99.0% 34%, 100% 38%, 99.2% 42%, 99.9% 46%, 99.1% 50%, 99.8% 54%, 99.0% 58%, 100% 62%, 99.2% 66%, 99.8% 70%, 99.0% 74%, 100% 78%, 99.2% 82%, 99.9% 86%, 99.1% 90%, 99.8% 94%, 99.0% 98%, 99.5% 100%,
    95% 99.6%, 89% 99.1%, 83% 99.7%, 77% 99.0%, 71% 99.8%, 65% 99.2%, 59% 99.7%, 53% 99.1%, 47% 99.8%, 41% 99.2%, 35% 99.7%, 29% 99.0%, 23% 99.8%, 17% 99.2%, 11% 99.7%, 5% 99.1%, 0% 99.5%,
    0.9% 97%, 0.2% 93%, 1.0% 89%, 0.1% 85%, 0.9% 81%, 0.0% 77%, 0.8% 73%, 0.2% 69%, 1.0% 65%, 0.1% 61%, 0.9% 57%, 0.0% 53%, 0.8% 49%, 0.2% 45%, 1.0% 41%, 0.1% 37%, 0.9% 33%, 0.0% 29%, 0.8% 25%, 0.2% 21%, 1.0% 17%, 0.1% 13%, 0.9% 9%, 0.0% 5%, 0.7% 2%
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
  const baseRotation = isEven ? 1.4 : -1.4;
  const deckleClipPath = fineDeckleClips[index % fineDeckleClips.length];

  return (
    <motion.div
      ref={itemRef}
      className={`relative mb-14 sm:mb-18 md:mb-24 ${
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
      {/* 3D Container without rasterizing CSS filter on parent to keep text 100% razor sharp */}
      <div
        className="relative z-10 w-full md:w-[94%] cursor-pointer select-none group"
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        style={{ perspective: "1200px" }}
      >
        {/* Photorealistic Golden-Bronze Pushpin */}
        <RealisticPushpin />

        {/* 3D Flippable Paper Card Envelope */}
        <motion.div
          className="relative w-full h-[490px] sm:h-[530px] md:h-[560px] transition-all duration-300"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
            y: isFlipped ? -6 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {/* ======================================================== */}
          {/* SISI DEPAN: Foto Penuh dengan Tepi Kertas Robek Halus      */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden shadow-md"
            style={{
              clipPath: deckleClipPath,
              transform: "rotateY(0deg) translateZ(1px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Foto Anggota Tim */}
            {showImages && event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 contrast-105"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

            {/* Top Badges */}
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

            {/* Bottom Front: Clean Name & Role Overlay */}
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
          {/* SISI BELAKANG: Razor-Sharp Vector Text & Memo Layout      */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full bg-[#fdfcf9] dark:bg-[#0c1f38] text-[#2c2217] dark:text-slate-100 p-6 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-md"
            style={{
              clipPath: deckleClipPath,
              transform: "rotateY(180deg) translateZ(1px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "optimizeLegibility",
            }}
          >
            {/* Header: Circle Icon Badge + Underlined Heading */}
            <div className="pt-2">
              <div className="flex items-start gap-3.5 sm:gap-4 mb-3.5">
                {/* Soft Cream/Pastel Circle Icon Badge */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#f6ebd8] dark:bg-amber-950/50 border border-[#e8d7be] dark:border-amber-500/20 text-[#543b22] dark:text-amber-300 flex items-center justify-center font-mono font-bold text-xl sm:text-2xl shadow-sm flex-shrink-0">
                  {event.iconCode || "</>"}
                </div>

                {/* Heading & Underline */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] font-mono text-[#8c6742] dark:text-amber-400 uppercase tracking-widest font-bold">
                      {event.category || "KUALIFIKASI"}
                    </span>
                    <span className="text-[10px] font-mono text-[#8c6742] dark:text-amber-400/80 font-bold bg-[#f1e4d0] dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                      {event.date}
                    </span>
                  </div>

                  {/* Main Role Heading */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#281c10] dark:text-white tracking-tight leading-tight pb-1 border-b-2 border-[#5c3e23] dark:border-amber-400/60 inline-block">
                    {event.roleName || event.title}
                  </h3>

                  {/* Subtitle / Member Name */}
                  <p className="text-xs sm:text-sm font-semibold text-[#664d34] dark:text-cyan-300 mt-1">
                    {event.title}
                  </p>
                </div>
              </div>

              {/* Description Paragraph (High contrast, crisp vector text) */}
              <p className="text-[#2b2014] dark:text-slate-100 text-xs sm:text-sm leading-relaxed font-semibold mb-3">
                {event.description}
              </p>

              {/* Bullet Points with Solid Dots */}
              {event.bulletPoints && event.bulletPoints.length > 0 && (
                <ul className="space-y-1.5 mb-3">
                  {event.bulletPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#241a10] dark:text-slate-100 font-semibold"
                    >
                      <span className="text-[#684627] dark:text-amber-400 font-bold text-base leading-none mt-0.5 flex-shrink-0">
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer: Education & Flip Back Hint */}
            <div className="pt-2.5 border-t border-[#e2d5c3] dark:border-white/15 space-y-1.5">
              {event.education && (
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#5e442c] dark:text-slate-300">
                  <span className="flex items-center gap-1.5 font-semibold truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-[#8c5a2b] dark:text-amber-400 flex-shrink-0" />
                    <strong className="text-[#2e1d0c] dark:text-cyan-300">{event.education.degree}</strong> – {event.education.institution}
                  </span>
                  <span className="font-mono text-[10px] text-[#785433] dark:text-slate-400 flex-shrink-0 ml-1">
                    {event.education.period}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-[#7d5d3c] dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[#5e442c] dark:text-cyan-400 font-mono font-medium">
                  <ArrowLeft className="w-3 h-3" /> Klik untuk kembali ke foto
                </span>
                <span className="font-mono font-semibold">CasstroDev Team</span>
              </div>
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
  textColor = "",
  showImages = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`w-full ${backgroundColor} py-6 sm:py-10 md:py-14 px-0 sm:px-2 lg:px-6 overflow-hidden ${textColor} ${className} relative`}
      ref={containerRef}
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Pinned Paper Cards - Zigzag Layout with 3D Flip & Fine Deckle Edge */}
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
