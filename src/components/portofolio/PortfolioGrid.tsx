"use client";

import { useState } from "react";
import Reveal from "@/components/common/Reveal";

type Filter = "all" | "WEB" | "MOBILE" | "ENTERPRISE";

interface ProjectMetrics {
  icon: string;
  label: string;
}

interface Project {
  title: string;
  category: Filter;
  subCategory: string;
  description: string;
  image: string;
  metrics?: ProjectMetrics[];
  span: "featured" | "standard";
}

const projects: Project[] = [
  {
    title: "Sistem Inti Perbankan Nexus",
    category: "ENTERPRISE",
    subCategory: "FINTECH",
    description:
      "Modernisasi infrastruktur perbankan warisan menjadi arsitektur microservices yang terdistribusi, mengurangi latensi transaksi hingga 40%.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKJZ1GzxjX_f8R1VVEwDDCY17uFkEnmlVyJEXhNVwgD0hHIuVJLfTC-FKWOkThpeR3W4bfDxTiLCcFsnNJ5fEsU9pzWppgPAwG37uHoUnqZ8Z867fLAPfzHcYJ7Lkape4zKhSCUPEX_hdTgBNvBLpbS7jKQLS7OD_KpcGUoxI7eual77CA4rPa-wrCk-krAF__DlbxOQ4xS94gLvBaRAPtsEntVJ4nR488ezRvbz5cmlEELLfBJ7zu",
    metrics: [
      { icon: "speed", label: "10k TPS" },
      { icon: "security", label: "Zero Downtime" },
    ],
    span: "featured",
  },
  {
    title: "Aplikasi Logistik OmniTrack",
    category: "MOBILE",
    subCategory: "LOGISTICS",
    description:
      "Solusi pelacakan armada real-time dengan rute cerdas yang mengoptimalkan konsumsi bahan bakar.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtnuAFPfy2P1E1bN1mdAJeb4BZrJrmDJRCfBC5E9G9f-VZuB9ObsLZbiGRRJEPv0FmYdEfuzyznMBwMd5JxZsaltmm8DRtLl3aZuNogCD8lRLG01o2ag60dtfRXJ8H3n9w4tpzCx3yWjrjkLQPG4R4OldeX6NlGfTXHNPoEi2QW8cuuGQM4yZmyl0AtA4CKad1UpX0dCxQ2Zj_-SI1baZHz8zi50rNvDf1_MER6buEDWcKY_BKiDuQ",
    span: "standard",
  },
  {
    title: "E-Commerce B2B Portal",
    category: "WEB",
    subCategory: "RETAIL",
    description:
      "Platform pemesanan grosir kustom dengan integrasi ERP untuk manajemen inventaris otomatis.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDANUR47CttFW_atGKVqfuALDFxnsKyyhGrLl9SjlUTpb4nT_iLCti1lF2Z6ZorxrTviOyx924RTUmvuC_A5HMQJZAM69gBU0u1f5p770bImvcTsoDA4G3mNVYVVTEdO6C66-i6hGC7CcxOJ2E-CCzuGsGdM-gwzvwpeEso7HTn9ZpH3vLU5RAw6n84F7J_3I8US0NB4Yc6Bxaj598P-SfK3XjcJk82DwgysapdmFH1CALs385DGPB0",
    span: "standard",
  },
];

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "WEB", label: "Web" },
  { value: "MOBILE", label: "Mobile" },
  { value: "ENTERPRISE", label: "Enterprise" },
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <section className="w-full bg-surface-off-white py-section-gap border-y border-border-subtle" id="portfolio-grid">
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Filter Tabs */}
        <Reveal y={24}>
          <div className="flex flex-wrap gap-stack-sm mb-stack-lg" id="filter-tabs">
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2.5 font-label-md text-label-md rounded border transition-colors shadow-sm ${
                  active
                    ? "bg-primary-container text-white border-primary-container hover:bg-primary"
                    : "bg-white text-primary border-border-subtle hover:border-primary hover:bg-surface-container-low"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
          {visibleProjects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 0.08}
              className={`${
                project.span === "featured" ? "col-span-4 md:col-span-8" : "col-span-4 md:col-span-4"
              } h-full`}
            >
            <article
              className={`portfolio-item bg-white border border-border-subtle rounded group hover:shadow-[0px_4px_12px_rgba(6,44,89,0.08)] transition-all duration-300 flex flex-col h-full overflow-hidden relative`}
            >
              <div className={`w-full relative overflow-hidden bg-surface-container ${project.span === "featured" ? "h-80" : "h-52"}`}>
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/95 backdrop-blur-sm text-primary px-3 py-1 font-label-sm text-label-sm rounded border border-border-subtle font-semibold">
                    {project.category}
                  </span>
                  {project.subCategory && (
                    <span className="bg-white/95 backdrop-blur-sm text-primary px-3 py-1 font-label-sm text-label-sm rounded border border-border-subtle">
                      {project.subCategory}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-stack-md md:p-stack-lg flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary mb-stack-sm group-hover:text-primary-container transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-body-md text-text-muted mb-stack-md leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-stack-md flex items-center justify-between border-t border-border-subtle pt-stack-md">
                  {project.metrics ? (
                    <div className="flex gap-4 text-text-muted">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-[18px]">{m.icon}</span>
                          <span className="font-label-sm text-label-sm">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="font-label-sm text-label-sm text-text-muted">CasstroDev</span>
                  )}

                  <a className="text-primary font-label-md text-label-md hover:text-accent-cyan flex items-center gap-1 transition-colors font-semibold group-hover:translate-x-0.5" href="#">
                    Detail Proyek <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </article>
            </Reveal>
          ))}

          {/* Technical Methodology Card */}
          <Reveal delay={0.15} className="col-span-4 md:col-span-8 h-full">
            <div className="bg-primary text-white border border-border-subtle rounded p-stack-lg flex flex-col justify-center relative overflow-hidden shadow-md h-full">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-stack-md text-inverse-primary font-label-md text-label-md uppercase tracking-widest font-semibold">
                <span className="material-symbols-outlined text-accent-cyan">terminal</span>
                Metodologi Craftsmanship
              </div>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg mb-stack-md leading-snug">
                Kami tidak sekadar merakit kode. Kami merekayasa solusi dengan presisi arsitektural.
              </h3>
              <div className="flex flex-wrap gap-stack-sm mt-stack-md">
                <span className="bg-primary-container px-3.5 py-1.5 rounded text-label-sm font-label-sm font-mono border border-secondary-fixed/30">
                  React / Next.js
                </span>
                <span className="bg-primary-container px-3.5 py-1.5 rounded text-label-sm font-label-sm font-mono border border-secondary-fixed/30">
                  Go
                </span>
                <span className="bg-primary-container px-3.5 py-1.5 rounded text-label-sm font-label-sm font-mono border border-secondary-fixed/30">
                  Kubernetes
                </span>
                <span className="bg-primary-container px-3.5 py-1.5 rounded text-label-sm font-label-sm font-mono border border-secondary-fixed/30">
                  PostgreSQL
                </span>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}