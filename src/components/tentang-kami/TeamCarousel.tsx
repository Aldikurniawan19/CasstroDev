"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
    title: "UI/UX",
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

const rotations = [-4, 3, -3, 5, -2];

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

  const isActive = (index: number) => index === active;

  return (
    <div
      className="mx-auto max-w-sm px-4 antialiased md:max-w-4xl md:px-8 lg:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        {/* Card Stack Image Container */}
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs cursor-pointer">
            <AnimatePresence>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.imageUrl}
                  initial={{ opacity: 0, scale: 0.9, y: 50, rotate: `${rotations[index]}deg` }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index)
                      ? teamMembers.length
                      : teamMembers.length - Math.abs(index - active),
                    rotate: isActive(index) ? "0deg" : `${rotations[index]}deg`,
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: "1000px" }}
                  onClick={() => setActive(index)}
                >
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Info Container */}
        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
                  {teamMembers[active].name}
                </h3>
                <p className="font-label-md text-label-md text-text-muted uppercase tracking-widest font-semibold mt-1">
                  {teamMembers[active].title}
                </p>
                <motion.p className="font-body-lg text-body-lg text-text-main leading-relaxed mt-8">
                  &ldquo;{teamMembers[active].description}&rdquo;
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Indicators */}
          <div className="flex items-center justify-between pt-12">
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
