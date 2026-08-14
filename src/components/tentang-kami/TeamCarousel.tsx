"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Nanda Indra Saputra",
    title: "Project Manager",
    description:
      "Mengelola proyek dari perencanaan hingga penyelesaian melalui koordinasi tim, komunikasi dengan client, serta pengawasan terhadap waktu, ruang lingkup, dan kualitas proyek.",
    imageUrl: "/images/indra.png",
  },
  {
    name: "Shasy kirana syaharani",
    title: "UI/UX Designer",
    description:
      "Menerjemahkan kebutuhan pengguna menjadi rancangan antarmuka dan pengalaman yang intuitif. Berkolaborasi dengan tim untuk memastikan setiap desain dapat diwujudkan menjadi produk digital yang fungsional.",
    imageUrl: "/images/shasy.png",
  },
  {
    name: "Aldi Kurniawan",
    title: "FrontEnd Developer",
    description:
      "Mengubah rancangan UI/UX menjadi antarmuka web yang responsif dan interaktif. Berkolaborasi dengan UI/UX dan Backend untuk memastikan tampilan berjalan optimal sesuai kebutuhan pengguna.",
    imageUrl: "/images/aldi.png",
  },
  {
    name: "Bayu Dwi Aditya Saputra",
    title: "BackEnd Developer",
    description:
      "Membangun sistem di balik produk digital melalui pengelolaan logika, database, dan integrasi API. Memastikan sistem berjalan aman, stabil, dan terhubung dengan baik dengan sisi frontend.",
    imageUrl: "/images/bayu.png",
  },
];

// Stacking visual configurations for cards behind the active card
const stackStyles = [
  { scale: 1.0, y: 0, x: 0, rotate: 0, opacity: 1 },
  { scale: 0.93, y: 16, x: 22, rotate: 7, opacity: 0.9 },
  { scale: 0.86, y: 30, x: -20, rotate: -6, opacity: 0.78 },
  { scale: 0.8, y: 42, x: 28, rotate: 5, opacity: 0.65 },
];

export default function TeamCarousel() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // Swipe / Drag gesture handler
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const swipeVelocity = 300;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      handlePrev();
    }
  };

  return (
    <div
      className="mx-auto max-w-sm px-4 antialiased md:max-w-4xl md:px-8 lg:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-16 lg:gap-x-20 items-center min-h-[440px] md:min-h-[460px]">
        {/* Card Stack Image Container with Drag Gestures (Fixed Height) */}
        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative h-80 sm:h-88 md:h-96 w-full max-w-xs sm:max-w-sm">
            {teamMembers.map((member, index) => {
              const offset = (index - active + teamMembers.length) % teamMembers.length;
              const isActive = offset === 0;
              const style = stackStyles[offset] || stackStyles[stackStyles.length - 1];

              return (
                <motion.div
                  key={member.imageUrl}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={isActive ? handleDragEnd : undefined}
                  whileDrag={{ scale: 1.04, cursor: "grabbing" }}
                  className={`absolute inset-0 origin-bottom select-none touch-pan-y ${
                    isActive
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-pointer hover:opacity-100"
                  }`}
                  style={{ perspective: "1000px" }}
                  onClick={() => {
                    if (!isActive) setActive(index);
                  }}
                  animate={{
                    scale: style.scale,
                    y: style.y,
                    x: style.x,
                    rotate: `${style.rotate}deg`,
                    opacity: style.opacity,
                    zIndex: teamMembers.length - offset,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 24,
                  }}
                >
                  <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white dark:border-white/20 bg-slate-900">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full object-cover pointer-events-none transition-transform duration-300"
                    />

                    {/* Active Card Glow Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                    )}

                    {/* Stack Indicator Badge for background cards */}
                    {!isActive && (
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-sm text-white text-[10px] font-mono">
                        {member.name.split(" ")[0]}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Content Info Container with Fixed Stable Dimensions (No Layout Shifting) */}
        <div className="flex flex-col justify-between py-2 min-h-[290px] sm:min-h-[270px] md:min-h-[320px]">
          {/* Text Area with reserved height */}
          <div className="min-h-[190px] sm:min-h-[170px] md:min-h-[210px] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full"
              >
                <h3 className="font-headline-lg text-headline-lg text-primary dark:text-white font-bold">
                  {teamMembers[active].name}
                </h3>
                <p className="font-label-md text-label-md text-secondary dark:text-accent-cyan uppercase tracking-widest font-bold mt-1">
                  {teamMembers[active].title}
                </p>
                <p className="font-body-lg text-body-lg text-slate-700 dark:text-slate-200 leading-relaxed mt-4 sm:mt-5">
                  &ldquo;{teamMembers[active].description}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls & Indicators (Anchored at fixed bottom) */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 dark:border-white/10 mt-2">
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous team member"
                className="btn-animated group flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low border border-border-subtle hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next team member"
                className="btn-animated group flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low border border-border-subtle hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                <ArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Clickable Card Indicator Dots */}
            <div className="flex items-center gap-2">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Pilih anggota tim ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    active === idx
                      ? "w-8 bg-accent-cyan shadow-sm"
                      : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
