"use client";

import Reveal from "@/components/common/Reveal";
import {
  Monitor,
  LayoutGrid,
  Smartphone,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProcessStep {
  step: string;
  desc: string;
}

interface ServiceItem {
  id: string;
  badge: string;
  icon: typeof Monitor;
  iconBg: string;
  title: string;
  description: string;
  techStack: string[];
  deliverables: string[];
  process: ProcessStep[];
}

const services: ServiceItem[] = [
  {
    id: "web",
    badge: "Frontend & Backend",
    icon: Monitor,
    iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-100 dark:border-blue-800/40",
    title: "Pengembangan Web Architecture",
    description:
      "Membangun aplikasi web modern, responsif, dan teroptimasi menggunakan arsitektur microservices & SSR mutakhir untuk performa tinggi di semua perangkat.",
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    deliverables: [
      "Aplikasi SPA / SSR Kustom Berkecepatan Tinggi",
      "Integrasi API & Payment Gateway Aman",
      "Dashboard Admin & Sistem Manajemen Konten",
    ],
    process: [
      { step: "01. Arsitektur", desc: "Perancangan skema database & aliran data" },
      { step: "02. Iterasi Sprint", desc: "Pengembangan modular dengan review reguler" },
      { step: "03. Peluncuran", desc: "Optimasi SEO, QA, & deployment aman" },
    ],
  },
  {
    id: "uiux",
    badge: "Penelitian & Estetika",
    icon: LayoutGrid,
    iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-100 dark:border-purple-800/40",
    title: "Desain UI/UX & Design System",
    description:
      "Menggabungkan empati pengguna dengan presisi estetika untuk menciptakan antarmuka intuitif, modern, serta panduan design system terukur.",
    techStack: ["Figma", "Design System", "Protopie", "User Research"],
    deliverables: [
      "Prototipe Interaktif High-Fidelity",
      "Design System & Component Library Terpusat",
      "Riset & Pengujian Pengalaman Pengguna (Usability)",
    ],
    process: [
      { step: "01. Riset Pengguna", desc: "Menganalisis kebutuhan & strategi UX" },
      { step: "02. Wireframing", desc: "Penyusunan arsitektur informasi & visual" },
      { step: "03. Serah Terima", desc: "Dokumentasi & komponen siap developer" },
    ],
  },
];

export default function ServiceGrid() {
  return (
    <section className="max-w-container-max mx-auto px-4 md:px-8 py-16 md:py-24" id="services-grid">

      {/* 2-COLUMN MODERN SERVICE CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {services.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <Reveal
              key={item.id}
              delay={index * 0.1}
              y={30}
              className="h-full"
            >
              <article
                className="group bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
                id={item.id}
              >
                {/* Subtle Ambient Top Accent Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Header Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform duration-300 ${item.iconBg}`}>
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold bg-surface-container-low text-text-muted border border-border-subtle">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-headline-md text-headline-md text-primary dark:text-white mb-3 group-hover:text-secondary transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mb-6">
                    <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest font-semibold block mb-2.5">
                      Tech Stack Utama
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-surface-container-low text-secondary border border-border-subtle text-label-sm font-label-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Checklist Container */}
                  <div className="bg-surface-container-low dark:bg-surface-container rounded-xl p-4 sm:p-5 border border-border-subtle mb-6">
                    <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest font-semibold block mb-3">
                      Hasil Kerja (Deliverables)
                    </span>
                    <ul className="space-y-2.5">
                      {item.deliverables.map((deliv) => (
                        <li key={deliv} className="flex items-start gap-2.5 font-body-md text-body-md text-text-main">
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process Stage Badges */}
                  <div className="mb-6">
                    <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest font-semibold block mb-3">
                      Tahapan Proses Kerja
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {item.process.map((proc) => (
                        <div
                          key={proc.step}
                          className="bg-surface-container-lowest border border-border-subtle p-3 rounded-xl"
                        >
                          <span className="font-label-sm text-label-sm text-primary font-bold block mb-0.5">
                            {proc.step}
                          </span>
                          <span className="font-body-md text-body-md text-text-muted leading-tight block">
                            {proc.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-4 border-t border-border-subtle mt-auto flex items-center justify-between">
                  <a
                    href="/tentang-kami#contact"
                    className="inline-flex items-center gap-2 font-label-md text-label-md font-semibold text-primary hover:text-secondary transition-all group/link"
                  >
                    <span>Konsultasi Layanan Ini</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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