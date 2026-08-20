import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "@/data/projectsData";
import Reveal from "@/components/common/Reveal";
import CTASection from "@/components/common/CTASection";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Sparkles,
  Layers,
  TrendingUp,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id.toString() === id);

  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan | CasstroDev",
    };
  }

  return {
    title: `${project.title} | Portofolio CasstroDev`,
    description: project.description,
    keywords: `${project.title}, ${project.category}, ${project.tags.join(", ")}, software engineering`,
    alternates: { canonical: `/portofolio/${project.id}` },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  // Find prev & next projects for quick navigation
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-surface-off-white dark:bg-[#040d1a] py-12 md:py-20 text-slate-800 dark:text-slate-100">
      <div className="max-w-container-max mx-auto px-4 md:px-8">
        {/* Navigation / Breadcrumb */}
        <Reveal y={-15}>
          <div className="flex items-center justify-between gap-4 mb-8 md:mb-12">
            <Link
              href="/portofolio"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 font-label-md text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Portofolio</span>
            </Link>

            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
              {project.category}
            </span>
          </div>
        </Reveal>

        {/* Hero Section */}
        <div className="max-w-4xl mb-10 md:mb-14">
          <Reveal y={20}>
            <div className="space-y-4">
              <h1 className="font-headline-xl-mobile text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="font-body-lg text-lg md:text-xl text-text-muted dark:text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Project Meta Bar & Specs */}
        <Reveal y={25}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 md:p-6 rounded-2xl bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none mb-10 md:mb-14">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-500" /> Klien
              </span>
              <p className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                {project.client || "Klien Rahasia"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500" /> Durasi
              </span>
              <p className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                {project.duration || "2 Bulan"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Tanggal Rilis
              </span>
              <p className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                {project.date}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-500" /> Kategori
              </span>
              <p className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                {project.category}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Featured Image Banner */}
        <Reveal y={30}>
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-2xl mb-12 md:mb-16 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[550px] object-cover object-top transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </Reveal>

        {/* Content Section: Tech Stack, Use Cases & Benefits */}
        <div className="w-full space-y-10 mb-16">
          {/* Tech Stack Pills */}
          <Reveal y={25}>
            <div className="space-y-3">
              <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-cyan" />
                <span>Teknologi & Tools Utama</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#07162c] text-secondary dark:text-cyan-400 text-xs font-mono font-bold border border-slate-200/90 dark:border-white/10 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Implementasi & Fitur Utama */}
          <Reveal y={30}>
            <div className="bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
              <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Implementasi & Fitur Utama</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200/80 dark:border-white/10 flex items-start gap-3.5 hover:border-emerald-500/30 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                      {useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Manfaat & Hasil Bisnis */}
          <Reveal y={35}>
            <div className="bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
              <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>Dampak & Manfaat Bisnis</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200/80 dark:border-white/10 space-y-2"
                  >
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                      {benefit.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-text-muted dark:text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Prev / Next Project Navigation Bar */}
        <Reveal y={20}>
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
            {prevProject ? (
              <Link
                href={`/portofolio/${prevProject.id}`}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-[#07162c] border border-slate-200 dark:border-white/10 hover:border-blue-500 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left hidden sm:block">
                  <span className="text-xs text-slate-400 block font-mono">Proyek Sebelumnya</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/portofolio/${nextProject.id}`}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-[#07162c] border border-slate-200 dark:border-white/10 hover:border-blue-500 transition-all text-right"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-slate-400 block font-mono">Proyek Selanjutnya</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Reveal>

        <div className="mt-16">
          <CTASection
            title="Punya Proyek Yang Ingin Direalisasikan?"
            description="Mari wujudkan solusi digital kelas enterprise dengan standar rekayasa tertinggi."
            buttonText="Mulai Diskusi Proyek"
            buttonHref="/kontak"
          />
        </div>
      </div>
    </main>
  );
}
