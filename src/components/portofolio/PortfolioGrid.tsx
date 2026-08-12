"use client";

import { useState } from "react";
import Reveal from "@/components/common/Reveal";
import { SquareArrowOutUpRight } from "lucide-react";

type FilterType = "Semua" | "Web Development" | "Sistem Informasi" | "UI/UX Design" | "Lainnya";

interface ProjectItem {
  id: number;
  title: string;
  category: FilterType;
  description: string;
  image: string;
  tags: string[];
  date: string;
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "TripGo – Open Trip Booking",
    category: "Web Development",
    description:
      "Website open trip dengan fitur booking, pembayaran online otomatis, dan sistem kelola invoice digital.",
    image: "/project/rentalimg.png",
    tags: ["Laravel", "Bootstrap", "Midtrans", "MySQL"],
    date: "2026-01-15",
  },
  {
    id: 2,
    title: "Smartinventori",
    category: "Sistem Informasi",
    description:
      "Sistem informasi inventori barang berbasis web untuk manajemen stok, laporan pencatatan, dan grafik analitik.",
    image: "/project/projek2.png",
    tags: ["Laravel", "Tailwind CSS", "Chart.js", "MySQL"],
    date: "2025-11-20",
  },
  {
    id: 3,
    title: "Portfolio Personal",
    category: "UI/UX Design",
    description:
      "Website portofolio pribadi responsif untuk menampilkan profil profesional, keahlian, dan pameran karya terbaik.",
    image: "/project/projek3.png",
    tags: ["HTML", "CSS", "JavaScript", "AOS"],
    date: "2025-09-10",
  },
  {
    id: 4,
    title: "KasDex – Laporan Keuangan",
    category: "Sistem Informasi",
    description:
      "Platform akuntansi digital dan pencatatan kas bisnis terintegrasi dengan pembuat laporan keuangan otomatis.",
    image: "/project/projek4.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    date: "2025-06-05",
  },
  {
    id: 5,
    title: "Sistem Peminjaman Alat Pertanian",
    category: "Lainnya",
    description:
      "Sistem berbasis web untuk pengelolaan dan peminjaman alat pertanian desa secara terstruktur dan transparan.",
    image: "/project/rentalimg.png",
    tags: ["React", "Express.js", "Tailwind CSS", "MySQL"],
    date: "2025-04-12",
  },
  {
    id: 6,
    title: "TaskFlow – Management Board",
    category: "Web Development",
    description:
      "Aplikasi manajemen tugas tim berbasis board interaktif untuk pemantauan alur kerja secara real-time.",
    image: "/project/projek2.png",
    tags: ["Next.js", "Tailwind CSS", "Zustand", "PostgreSQL"],
    date: "2025-02-01",
  },
];

const filters: FilterType[] = [
  "Semua",
  "Web Development",
  "Sistem Informasi",
  "UI/UX Design",
  "Lainnya",
];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Semua");

  const filteredProjects = projectsData.filter(
    (project) => activeFilter === "Semua" || project.category === activeFilter
  );

  return (
    <section className="w-full bg-slate-50/70 dark:bg-[#040d1a] py-16 md:py-24" id="projek-section">
      <div className="max-w-container-max mx-auto px-4 md:px-8">
        
        {/* HEADER SECTION */}
        <div className="mb-10 md:mb-12">
          <Reveal y={24} className="max-w-2xl">
            <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary dark:text-white tracking-tight mb-3">
              Projek yang Pernah Kami Kerjakan
            </h2>
            <p className="font-body-md text-body-md text-text-muted max-w-2xl leading-relaxed">
              Berbagai projek yang telah kami kerjakan, mulai dari pengembangan website, sistem informasi, hingga solusi digital enterprise.
            </p>
          </Reveal>
        </div>

        {/* FILTER BAR */}
        <Reveal y={20} className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {filters.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 sm:px-5 py-2.5 rounded font-label-md text-label-md transition-all duration-200 ${
                    isActive
                      ? "bg-primary-container text-on-primary shadow-md hover:bg-primary"
                      : "bg-white dark:bg-surface text-primary-container border border-primary-container/60 hover:bg-primary-container/10 hover:border-primary-container"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 3-COLUMN PROJECT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            return (
              <Reveal key={project.id} delay={index * 0.08} y={30} className="h-full">
                <article className="group bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full">
                  
                  {/* Top Preview Image Container */}
                  <div className="relative h-52 sm:h-56 md:h-60 w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 md:p-6 flex flex-col justify-between flex-1">
                    <div>
                      {/* Header: Title */}
                      <h3 className="font-headline-md text-headline-md text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-secondary transition-colors leading-snug mb-2.5">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-5 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer Row: Tech Tags + External Link Button */}
                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-white/10 mt-auto">
                      <div className="flex flex-wrap gap-1.5 items-center max-w-[80%]">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-surface-container-low text-secondary border border-border-subtle px-2.5 py-0.5 rounded text-label-sm font-label-sm font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href="/tentang-kami#contact"
                        className="w-8 h-8 rounded-xl border border-slate-200/90 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center justify-center transition-all shrink-0"
                        title="Lihat Detail Proyek"
                      >
                        <SquareArrowOutUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}