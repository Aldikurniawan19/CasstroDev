"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface TeamMemberDetail {
  id: string;
  step: string;
  name: string;
  title: string;
  imageUrl: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  };
  experiences: {
    role: string;
    company: string;
    period: string;
    highlight: string;
  }[];
}

const teamDetails: TeamMemberDetail[] = [
  {
    id: "indra",
    step: "01 / 04",
    name: "Nanda Indra Saputra",
    title: "Project Manager",
    imageUrl: "/images/indra.png",
    education: {
      degree: "S1 Sistem Informasi",
      institution: "Universitas Dian Nuswantoro",
      period: "2019 – 2023",
    },
    experiences: [
      {
        role: "Project Manager & IT Consultant",
        company: "CasstroDev",
        period: "2023 – Sekarang",
        highlight: "Mengelola 15+ proyek aplikasi enterprise dengan metodologi Agile/Scrum tepat waktu.",
      },
      {
        role: "IT Business Analyst",
        company: "Software Solutions",
        period: "2021 – 2023",
        highlight: "Menyusun SRS dan menerjemahkan kebutuhan bisnis klien menjadi blueprint arsitektur sistem.",
      },
    ],
  },
  {
    id: "shasy",
    step: "02 / 04",
    name: "Shasy Kirana Syaharani",
    title: "UI/UX Designer",
    imageUrl: "/images/shasy.png",
    education: {
      degree: "S1 Desain Komunikasi Visual",
      institution: "Institut Seni & Teknologi",
      period: "2019 – 2023",
    },
    experiences: [
      {
        role: "Lead UI/UX Designer",
        company: "CasstroDev",
        period: "2023 – Sekarang",
        highlight: "Membangun Master Design System dan merancang antarmuka produk digital skala enterprise.",
      },
      {
        role: "Product Designer",
        company: "Digital Studio",
        period: "2021 – 2023",
        highlight: "Merancang 20+ antarmuka aplikasi mobile dan dashboard analitik interaktif.",
      },
    ],
  },
  {
    id: "aldi",
    step: "03 / 04",
    name: "Aldi Kurniawan",
    title: "FrontEnd Developer",
    imageUrl: "/images/aldi.png",
    education: {
      degree: "S1 Teknik Informatika",
      institution: "Universitas Teknologi",
      period: "2019 – 2023",
    },
    experiences: [
      {
        role: "Senior FrontEnd Engineer",
        company: "CasstroDev",
        period: "2023 – Sekarang",
        highlight: "Mengembangkan antarmuka React/Next.js responsif dengan optimasi Core Web Vitals <1.2s.",
      },
      {
        role: "Web Interface Developer",
        company: "Tech Agency",
        period: "2021 – 2023",
        highlight: "Membangun pustaka komponen UI reusable bertipe data ketat (TypeScript).",
      },
    ],
  },
  {
    id: "bayu",
    step: "04 / 04",
    name: "Bayu Dwi Aditya Saputra",
    title: "BackEnd Developer",
    imageUrl: "/images/bayu.png",
    education: {
      degree: "S1 Teknik Informatika",
      institution: "Universitas Sains & Teknologi",
      period: "2019 – 2023",
    },
    experiences: [
      {
        role: "Lead BackEnd Engineer",
        company: "CasstroDev",
        period: "2023 – Sekarang",
        highlight: "Merancang RESTful API & arsitektur database PostgreSQL terukur berkecepatan tinggi.",
      },
      {
        role: "BackEnd Developer",
        company: "Enterprise Cloud Solutions",
        period: "2021 – 2023",
        highlight: "Mengelola otentikasi JWT terenkripsi, skema Redis caching, dan container Docker.",
      },
    ],
  },
];

export default function TeamExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.max(2600, track.scrollWidth * 1.9)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p <= 0.167) {
              setActiveIndex(0);
            } else if (p >= 0.833) {
              setActiveIndex(teamDetails.length - 1);
            } else {
              const horizProgress = (p - 0.167) / (0.833 - 0.167);
              const idx = Math.min(
                teamDetails.length - 1,
                Math.floor(horizProgress * teamDetails.length)
              );
              setActiveIndex(idx);
            }
          },
        },
      });

      // Stage 1: Entrance Zoom-In Reveal (Duration 0.25)
      tl.fromTo(
        track,
        { scale: 0.78, opacity: 0, y: 70 },
        { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );

      // Stage 2: Horizontal Card-by-Card Scroll Animation (Duration 1.0)
      tl.to(track, {
        x: getScrollAmount,
        duration: 1.0,
        ease: "none",
      });

      // Stage 3: Exit Zoom-Out Unreveal Symmetrical to Entrance (Duration 0.25)
      tl.to(track, {
        scale: 0.78,
        opacity: 0,
        y: -70,
        duration: 0.25,
        ease: "power2.in",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-6 sm:py-10 md:py-16 border-t border-border-subtle overflow-hidden flex flex-col justify-center bg-surface-off-white dark:bg-[#040d1a]"
      id="team-qualifications"
    >
      {/* Header Info */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 sm:gap-4">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold block mb-1">
              KUALIFIKASI PERSOAL ANGGOTA TIM
            </span>
            <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary dark:text-white font-extrabold tracking-tight">
              Rekam Jejak Tim Kami
            </h2>
            <div className="h-1 w-16 bg-accent-cyan rounded-full mt-2 sm:mt-3"></div>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Track */}
      <div className="w-full overflow-hidden relative">
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 md:gap-10 px-3 sm:px-6 md:px-12 w-max items-stretch relative z-10 origin-center"
        >
          {teamDetails.map((member, idx) => (
            <div
              key={member.id}
              className={`w-[90vw] sm:w-[78vw] md:w-[70vw] lg:w-[62vw] max-w-3xl shrink-0 bg-white dark:bg-[#07162c] border border-border-subtle dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                activeIndex === idx
                  ? "border-secondary/60 shadow-2xl ring-1 ring-secondary/20 scale-100 opacity-100"
                  : "opacity-80 scale-95"
              }`}
            >
              <div>
                {/* Profile Header Block */}
                <div className="flex flex-row items-center justify-between gap-3 pb-3 sm:pb-6 mb-3 sm:mb-6 border-b border-border-subtle dark:border-white/10">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 border-secondary/50 group-hover:border-secondary transition-colors shadow-md">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-secondary uppercase tracking-widest block mb-0.5">
                        {member.title}
                      </span>
                      <h3 className="font-headline-md text-base sm:text-xl md:text-2xl font-extrabold text-primary dark:text-white leading-tight">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-extrabold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 shrink-0">
                    {member.step}
                  </span>
                </div>

                {/* Content Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6">
                  {/* Left Side: Experience */}
                  <div className="md:col-span-7 space-y-2 sm:space-y-4">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-muted dark:text-slate-400">
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                      <span>Pengalaman Kerja & Proyek</span>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      {member.experiences.map((exp, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-lowest dark:bg-slate-900/80 border border-border-subtle dark:border-white/5 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-primary dark:text-white leading-tight">
                              {exp.role}
                            </h4>
                            <span className="text-[10px] sm:text-[11px] font-mono text-amber-500 font-semibold shrink-0">
                              {exp.period}
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs text-secondary font-semibold block">
                            {exp.company}
                          </span>
                          <p className="text-[11px] sm:text-xs text-text-muted dark:text-slate-300 leading-normal sm:leading-relaxed pt-0.5">
                            {exp.highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Education */}
                  <div className="md:col-span-5 space-y-2 sm:space-y-4">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-muted dark:text-slate-400">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-cyan" />
                      <span>Pendidikan</span>
                    </div>
                    <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-lowest dark:bg-slate-900/80 border border-border-subtle dark:border-white/5 space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-primary dark:text-white leading-tight">
                        {member.education.degree}
                      </h4>
                      <span className="text-[11px] sm:text-xs text-secondary font-semibold block">
                        {member.education.institution}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-accent-cyan font-semibold block">
                        {member.education.period}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer to guarantee the last card remains fully centered before unpinning */}
          <div className="w-[12vw] sm:w-[16vw] md:w-[20vw] shrink-0 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* Progress Dots Indicator */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
        {teamDetails.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-6 sm:w-8 bg-secondary"
                : "w-1.5 sm:w-2 bg-slate-300 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
