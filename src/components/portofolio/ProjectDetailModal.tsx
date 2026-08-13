"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ArrowRight,
  Layers,
  Sparkles,
  MessageSquareHeart,
} from "lucide-react";
import DeviceMockup from "./DeviceMockup";

export interface BenefitItem {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  date?: string;

  useCases: string[];
  benefits: BenefitItem[];
}

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto bg-slate-950/80 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            key={`modal-content-${project.id}`}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800 dark:text-slate-100"
          >
            {/* Header */}
            <div className="px-5 sm:px-8 py-5 border-b border-slate-200/90 dark:border-white/10 flex items-center justify-between gap-4 shrink-0 bg-slate-50/70 dark:bg-[#040d1a]/80">
              <div>
                <span className="inline-block bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-xs tracking-widest uppercase font-semibold px-3 py-0.5 rounded-full mb-1.5">
                  {project.category}
                </span>
                <h2
                  id="modal-project-title"
                  className="text-xl sm:text-2xl font-bold tracking-tight text-primary dark:text-white"
                >
                  {project.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                type="button"
                aria-label="Tutup detail proyek"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.3)_transparent]">
              {/* Device Showcase & Description */}
              <section className="space-y-4">
                <DeviceMockup
                  imageSrc={project.image}
                  altText={project.title}
                  title={`casstrodev.com/showcase/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                />

                <div className="bg-slate-50/80 dark:bg-[#040d1a] border border-slate-200/90 dark:border-white/10 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5 font-mono">
                    <Sparkles className="w-4 h-4 shrink-0 text-accent-cyan" />
                    <span>Ringkasan Solusi & Value Proposition</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>
              </section>

              {/* Use Cases */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-primary dark:text-white font-bold text-base sm:text-lg">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3>Kegunaan Aplikasi (Fitur & Fungsi Operasional)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {project.useCases.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200/90 dark:border-white/10 flex items-start gap-3 hover:border-emerald-500/30 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Business Benefits */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-primary dark:text-white font-bold text-base sm:text-lg">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3>Keuntungan Menggunakan Aplikasi (Efisiensi Bisnis)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  {project.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200/90 dark:border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-secondary mb-1.5 leading-snug">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tech Stack */}
              <section className="space-y-3 pt-2 border-t border-slate-200/90 dark:border-white/10">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider font-mono">
                  <Cpu className="w-4 h-4 text-secondary" />
                  <span>Teknologi yang Digunakan (Tech Stack)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-md bg-slate-100 dark:bg-[#040d1a] text-slate-800 dark:text-slate-200 text-xs font-mono font-medium border border-slate-200/90 dark:border-white/10 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-8 py-4 bg-slate-50/80 dark:bg-[#040d1a] border-t border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center sm:text-left font-medium">
                <MessageSquareHeart className="w-4 h-4 text-secondary shrink-0 hidden sm:block" />
                <span>Siap optimalkan operasional bisnis Anda? Mari diskusikan bersama kami.</span>
              </div>
              <a
                href="/kontak"
                onClick={onClose}
                className="btn-animated px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Konsultasi Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
