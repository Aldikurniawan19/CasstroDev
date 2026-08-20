"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  X,
  Kanban,
  Palette,
  Code2,
  Server,
} from "lucide-react";

export interface EducationInfo {
  degree: string;
  institution: string;
  period: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  period: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  imagePosition?: string;
  category: string;
  badgeClass: string;
  achievements: string[];
  education: EducationInfo;
}

const teamMembers: TeamMember[] = [
  {
    id: "indra",
    name: "Nanda Indra Saputra",
    title: "Project Manager • HRD",
    specialization: "Pengembangan & Manajemen Proyek",
    period: "2023 – Sekarang",
    description:
      "Mengelola proyek dari perencanaan hingga penyelesaian melalui koordinasi tim, komunikasi dengan client, serta pengawasan terhadap waktu, ruang lingkup, dan kualitas proyek.",
    fullDescription:
      "Mendukung digitalisasi Training Center di PT Saga Hikari Teknindo Sejati melalui pengembangan konten E-Learning interaktif dan transformasi media pembelajaran untuk meningkatkan efektivitas pelatihan karyawan.",
    imageUrl: "/images/indra.png",
    imagePosition: "object-[center_10%]",
    category: "Project Management",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    achievements: [
      "Pengembangan konten E-Learning interaktif & kurikulum digital",
      "Transformasi media pembelajaran & standarisasi materi",
      "Peningkatan efektivitas & monitoring proses pelatihan karyawan",
    ],
    education: {
      degree: "S1 Sistem Informasi",
      institution: "Universitas Dian Nuswantoro",
      period: "2019 – 2023",
    },
  },
  {
    id: "shasy",
    name: "Shasy Kirana Syaharani",
    title: "Lead UI/UX Designer",
    specialization: "Perancangan UI/UX & Design Systems",
    period: "2021 – Sekarang",
    description:
      "Menerjemahkan kebutuhan pengguna menjadi rancangan antarmuka dan pengalaman yang intuitif. Berkolaborasi dengan tim untuk memastikan setiap desain dapat diwujudkan menjadi produk digital yang fungsional.",
    fullDescription:
      "Membangun sistem desain terpadu dan antarmuka produk digital berskala enterprise dengan pengalaman pengguna yang intuitif, rapi, dan berbasis riset mendalam.",
    imageUrl: "/images/shasy.png",
    imagePosition: "object-[center_15%]",
    category: "UI/UX Design",
    badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    achievements: [
      "Perancangan Master Design System & Styleguide modern",
      "Riset pengalaman pengguna, Wireframing & Interactive Prototyping",
      "Optimasi user flow, responsivitas antarmuka, dan estetika visual",
    ],
    education: {
      degree: "S1 Desain Komunikasi Visual",
      institution: "Institut Seni & Teknologi",
      period: "2019 – 2023",
    },
  },
  {
    id: "aldi",
    name: "Aldi Kurniawan",
    title: "FrontEnd Developer • Freelancer",
    specialization: "Rekayasa FrontEnd & Interaksi",
    period: "2025 – Sekarang",
    description:
      "Mengubah rancangan UI/UX menjadi antarmuka web yang responsif dan interaktif. Berkolaborasi dengan UI/UX dan Backend untuk memastikan tampilan berjalan optimal sesuai kebutuhan pengguna.",
    fullDescription:
      "Mengembangkan aplikasi website modern dengan teknologi terkini, performa optimal, dan kode terstruktur, dengan rekam jejak industri di bidang teknologi informasi.",
    imageUrl: "/images/aldi.png",
    imagePosition: "object-[center_10%]",
    category: "FrontEnd Engineering",
    badgeClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    achievements: [
      "Freelance Web Developer (2025 – Sekarang)",
      "Magang Divisi IT PT Saga Hikari Teknindo Sejati (1 Tahun)",
      "Pengembangan antarmuka responsif, modern, dan integrasi API",
    ],
    education: {
      degree: "S1 Sistem Informasi",
      institution: "Universitas Teknologi Yogyakarta",
      period: "2021 – 2025",
    },
  },
  {
    id: "bayu",
    name: "Bayu Dwi Aditya Saputra",
    title: "BackEnd Developer",
    specialization: "Arsitektur Backend & Database",
    period: "2021 – Sekarang",
    description:
      "Membangun sistem di balik produk digital melalui pengelolaan logika, database, dan integrasi API. Memastikan sistem berjalan aman, stabil, dan terhubung dengan baik dengan sisi frontend.",
    fullDescription:
      "Merancang fondasi sistem backend yang tangguh, aman, dan berlatensi rendah untuk mendukung ekosistem digital enterprise dengan ketersediaan tinggi.",
    imageUrl: "/images/bayu.png",
    imagePosition: "object-[center_12%]",
    category: "BackEnd Engineering",
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    achievements: [
      "Internship - Web Developer & IT Auditor | Diskominfo Kabupaten Sleman",
      "Internship - IT Division | PT Saga Hikari Teknindo Sejati (1 Tahun)",
      "Freelance Web Developer (2025 – Sekarang)",
    ],
    education: {
      degree: "S1 Sistem Informasi",
      institution: "Universitas Teknologi Yogyakarta",
      period: "2023 – Sekarang",
    },
  },
];

// Stacking visual configurations for cards behind the active card
const stackStyles = [
  { scale: 1.0, y: 0, x: 0, rotate: 0, opacity: 1 },
  { scale: 0.94, y: 14, x: 18, rotate: 6, opacity: 0.9 },
  { scale: 0.88, y: 26, x: -16, rotate: -5, opacity: 0.78 },
  { scale: 0.82, y: 36, x: 20, rotate: 4, opacity: 0.65 },
];

export default function TeamCarousel() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  }, []);

  useEffect(() => {
    if (isHovered || selectedMember !== null) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered, selectedMember]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

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

  const currentMember = teamMembers[active];

  return (
    <div
      className="mx-auto max-w-sm px-4 antialiased md:max-w-4xl md:px-8 lg:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-16 lg:gap-x-20 md:items-stretch items-center">
        {/* Card Stack Image Container with Drag Gestures */}
        <div className="flex flex-col items-center justify-center pb-4 sm:pb-0">
          <div className="relative h-72 sm:h-84 md:h-96 w-full max-w-[280px] xs:max-w-xs sm:max-w-sm">
            {teamMembers.map((member, index) => {
              const offset = (index - active + teamMembers.length) % teamMembers.length;
              const isActive = offset === 0;
              const style = stackStyles[offset] || stackStyles[stackStyles.length - 1];

              return (
                <motion.div
                  key={member.id}
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
                      className={`h-full w-full object-cover ${member.imagePosition || "object-[center_15%]"} pointer-events-none transition-transform duration-300`}
                    />

                    {/* Active Card Glow Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
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

        {/* Content Info Container - stretches to full height of the card stack */}
        <div className="flex flex-col justify-between py-1 h-full min-h-[300px] md:min-h-[384px]">
          {/* Dynamic Content Area */}
          <div className="flex-1 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full space-y-3.5"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary dark:text-white leading-tight">
                    {currentMember.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary dark:text-accent-cyan uppercase tracking-widest font-bold mt-1">
                    {currentMember.title}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                  &ldquo;{currentMember.description}&rdquo;
                </p>

                {/* Trigger Button to View Detailed Rekam Jejak */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(currentMember)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-primary dark:text-cyan-400 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-white/10 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm group/btn"
                  >
                    <Sparkles className="w-4 h-4 text-accent-cyan shrink-0" />
                    <span>Lihat Rekam Jejak &amp; Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls & Indicators - pushed to bottom to align with the card stack */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 dark:border-white/10 mt-6 md:mt-auto">
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous team member"
                className="btn-animated group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-surface-container-low border border-border-subtle hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-primary transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next team member"
                className="btn-animated group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-surface-container-low border border-border-subtle hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              >
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
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

      {/* ======================================================== */}
      {/* DETAIL MODAL POPUP (Rekam Jejak & Kualifikasi Lengkap)   */}
      {/* ======================================================== */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedMember && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="member-modal-title"
              >
                {/* Backdrop Overlay - Pure Opacity (Independent GPU Layer) */}
                <motion.div
                  key="modal-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "linear" }}
                  onClick={() => setSelectedMember(null)}
                  className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Card - GPU Hardware Accelerated Transform */}
                <motion.div
                  key={`modal-content-${selectedMember.id}`}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{
                    duration: 0.24,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100 transform-gpu will-change-transform will-change-opacity"
                >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-slate-200/90 dark:border-white/10 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-[#040d1a]/90 shrink-0">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shrink-0 shadow-sm">
                    <img
                      src={selectedMember.imageUrl}
                      alt={selectedMember.name}
                      className={`w-full h-full object-cover ${selectedMember.imagePosition || "object-[center_15%]"}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${selectedMember.badgeClass}`}>
                        {selectedMember.category}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {selectedMember.period}
                      </span>
                    </div>
                    <h3 id="member-modal-title" className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight truncate">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs text-secondary dark:text-cyan-400 font-semibold truncate">
                      {selectedMember.title}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  aria-label="Tutup modal"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.3)_transparent]">
                {/* Full Focus & Overview */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                    <span>Fokus Rekayasa &amp; Kontribusi</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {selectedMember.fullDescription}
                  </p>
                </div>

                {/* Detailed Track Record Milestones */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Briefcase className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Rekam Jejak &amp; Pengalaman Praktis</span>
                  </div>
                  <div className="space-y-2.5">
                    {selectedMember.achievements.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/30 transition-colors"
                      >
                        <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Credentials */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Latar Belakang Akademik &amp; Pendidikan</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shrink-0 font-bold">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {selectedMember.education.degree}
                        </h4>
                        <p className="text-xs text-text-muted dark:text-slate-400 truncate">
                          {selectedMember.education.institution}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                      {selectedMember.education.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 sm:px-6 py-4 bg-slate-50/80 dark:bg-[#040d1a] border-t border-slate-200/90 dark:border-white/10 flex items-center justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
