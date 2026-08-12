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
      "Mengorkestrasi setiap proyek dengan disiplin manajemen yang presisi. Memastikan tenggat, ruang lingkup, dan kualitas pengiriman selalu selaras dengan standar rekayasa perusahaan.",
    imageUrl: "/images/indra.png",
  },
  {
    name: "Aldi Kurniawan",
    title: "FullStack Developer",
    description:
      "Merancang dan membangun arsitektur end-to-end, dari basis data hingga antarmuka. Menulis kode yang tangguh, teruji, dan siap diskalakan untuk kebutuhan bisnis modern.",
    imageUrl: "/images/aldi.png",
  },
  {
    name: "Shasy",
    title: "UI/UX",
    description:
      "Menciptakan antarmuka yang intuitif dan pengalaman pengguna yang mulus. Fokus pada desain yang berpusat pada pengguna untuk menghasilkan produk yang fungsional dan estetis.",
    imageUrl: "/images/shasy.png",
  },
];

const rotations = [-4, 3, -3, 5, -2];

export default function TeamCarousel() {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const isActive = (index: number) => index === active;

  return (
    <div className="mx-auto max-w-sm px-4 antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
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
                >
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text and Controls Section */}
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

          <div className="flex gap-4 pt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous team member"
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low border border-border-subtle transition-colors hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next team member"
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low border border-border-subtle transition-colors hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <ArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
