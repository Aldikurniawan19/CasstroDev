"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import {
  Monitor,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

interface ServiceTheme {
  accentBg: string;
  iconBg: string;
  badge: string;
  tag: string;
  checkIcon: string;
  link: string;
}

interface ServiceItem {
  id: string;
  badge: string;
  icon: typeof LayoutGrid;
  theme: ServiceTheme;
  title: string;
  description: string;
  techStack: string[];
  results: string[];
}

const services: ServiceItem[] = [
  {
    id: "uiux",
    badge: "Penelitian & Estetika",
    icon: LayoutGrid,
    theme: {
      accentBg: "bg-purple-100/50 dark:bg-purple-900/20",
      iconBg: "bg-purple-100/80 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300",
      badge: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border-purple-100/80 dark:border-purple-800/40",
      tag: "bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800/30",
      checkIcon: "text-purple-600 dark:text-purple-400",
      link: "text-purple-600 hover:text-purple-700 dark:text-purple-400 hover:dark:text-purple-300",
    },
    title: "Desain UI/UX & Design System",
    description:
      "Menggabungkan empati pengguna dengan presisi estetika untuk menciptakan antarmuka intuitif, modern, serta panduan design system terukur.",
    techStack: ["Figma", "Design System", "Prototipe", "User Research"],
    results: [
      "Prototipe interaktif high-fidelity",
      "Design system & component library terpusat",
      "Riset & pengujian pengalaman pengguna (usability)",
    ],
  },
  {
    id: "web",
    badge: "Frontend & Backend",
    icon: Monitor,
    theme: {
      accentBg: "bg-blue-100/50 dark:bg-blue-900/20",
      iconBg: "bg-blue-100/80 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300",
      badge: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border-blue-100/80 dark:border-blue-800/40",
      tag: "bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800/30",
      checkIcon: "text-blue-600 dark:text-blue-400",
      link: "text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:dark:text-blue-300",
    },
    title: "Pengembangan Web Architecture",
    description:
      "Membangun aplikasi web modern, responsif, dan teroptimasi menggunakan arsitektur microservices & SSR mutakhir untuk performa tinggi di semua perangkat.",
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    results: [
      "Aplikasi SPA / SSR kustom berkecepatan tinggi",
      "Integrasi API & payment gateway aman",
      "Dashboard admin & sistem manajemen konten",
    ],
  },
];

export default function ServiceGrid() {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="max-w-container-max mx-auto px-4 md:px-8 pt-0 sm:pt-2 md:pt-4 pb-14 md:pb-20" id="services-grid">
      {/* 2-COLUMN MODERN SERVICE CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 md:gap-10 items-start">
        {services.map((item, index) => {
          const IconComponent = item.icon;
          const isExpanded = !!expandedIds[item.id];

          return (
            <Reveal
              key={item.id}
              delay={index * 0.1}
              y={30}
              className="w-full"
            >
              <article
                className="group bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-auto relative overflow-hidden"
                id={item.id}
              >
                {/* Decorative Top-Left Accent Corner Cutout */}
                <div
                  className={`absolute top-0 left-0 w-20 h-20 sm:w-28 sm:h-28 ${item.theme.accentBg} rounded-br-[28px] sm:rounded-br-[40px] pointer-events-none transition-transform duration-300 group-hover:scale-105`}
                />

                <div>
                  {/* Header Row: Squircle Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 ${item.theme.iconBg}`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>
                    <span
                      className={`px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border ${item.theme.badge}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-2.5 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-5">
                    {item.description}
                  </p>

                  {/* Dropdown Toggle Option */}
                  <div className="mb-2">
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-accent-cyan transition-colors py-1 cursor-pointer select-none"
                    >
                      <span>
                        {isExpanded ? "Sembunyikan Detail" : "Lihat Detail Layanan & Tech Stack"}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Collapsible Dropdown Details (Tech Stack & Hasil) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-2 space-y-4 sm:space-y-6">
                          {/* Tech Stack Utama */}
                          <div>
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase block mb-2 sm:mb-2.5">
                              TECH STACK UTAMA
                            </span>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {item.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium border ${item.theme.tag}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="w-full h-px bg-slate-100 dark:bg-white/5" />

                          {/* Hasil Yang Anda Dapatkan */}
                          <div>
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase block mb-2 sm:mb-3">
                              HASIL YANG ANDA DAPATKAN
                            </span>
                            <ul className="space-y-2 sm:space-y-2.5">
                              {item.results.map((result) => (
                                <li
                                  key={result}
                                  className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${item.theme.checkIcon}`}
                                  />
                                  <span>{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Action Button */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-white/5 mt-4">
                  <a
                    href="/kontak"
                    className={`inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold transition-all group/link ${item.theme.link}`}
                  >
                    <span>Konsultasi Layanan Ini</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}