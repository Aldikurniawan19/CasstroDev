"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";

const advantages = [
  {
    icon: "timer",
    title: "Cepat & Tepat Waktu",
    description:
      "Proses pengerjaan terstruktur dengan target yang jelas, sehingga proyek selesai tepat waktu tanpa mengorbankan kualitas.",
  },
  {
    icon: "devices",
    title: "Responsif di Semua Perangkat",
    description:
      "Website dirancang responsif dan nyaman digunakan di berbagai perangkat, mulai dari smartphone, tablet, hingga desktop.",
  },
  {
    icon: "speed",
    title: "Optimasi Kecepatan & SEO",
    description:
      "Website dioptimalkan agar memiliki performa cepat, struktur yang baik, dan lebih siap ditemukan melalui mesin pencari.",
  },
];

export default function CaseStudyHighlights() {
  return (
    <section className="py-section-gap grid-layout bg-white border-t border-border-subtle" id="advantages">
      <Reveal once={false} className="col-span-4 md:col-span-8 xl:col-span-12 mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-stack-md">
        <div>
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-text-main mb-stack-sm">
            Mengapa Memilih Kami?
          </h2>
          <p className="font-body-md text-body-md text-text-muted max-w-2xl">
            Menghadirkan solusi digital yang cepat, responsif, dan berkualitas 
            dengan mengutamakan kebutuhan bisnis serta pengalaman pengguna.
          </p>
        </div>
        <a
          href="/kontak"
          className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-2 group font-semibold"
        >
          Mulai Konsultasi
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
      </Reveal>

      <Reveal once={false} className="col-span-4 md:col-span-8 xl:col-span-12">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
          {advantages.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.1}
              once={false}
              className="col-span-4 md:col-span-4 h-full"
            >
              <article className="group bg-surface-container-lowest dark:bg-[#07162c] border border-border-subtle dark:border-white/10 p-stack-lg rounded-2xl card-hover flex flex-col justify-between h-full shadow-sm">
                <div>
                  {/* Pure Circular Icon Badge with Smooth Slow Loading Animation */}
                  <div className="relative w-12 h-12 flex items-center justify-center mb-stack-md shrink-0">
                    {/* Circular Animated SVG Loading Ring */}
                    <svg
                      viewBox="0 0 48 48"
                      className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none -rotate-90"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="none"
                        stroke="rgba(0, 86, 179, 0.12)"
                        strokeWidth="2"
                        className="dark:stroke-white/10"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="none"
                        stroke="#0056b3"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="30 110"
                        className="dark:stroke-accent-cyan"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{
                          pathLength: 1,
                          opacity: 1,
                          strokeDashoffset: [0, -140],
                        }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{
                          pathLength: { duration: 1.4, ease: "easeOut", delay: index * 0.15 },
                          opacity: { duration: 0.5, delay: index * 0.15 },
                          strokeDashoffset: {
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.15 + 0.4,
                          },
                        }}
                      />
                    </svg>

                    {/* Solid Circular Icon Background (No Hover Scale) */}
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-2xl select-none leading-none">
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-headline-md text-headline-md text-text-main mb-stack-sm font-semibold">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}