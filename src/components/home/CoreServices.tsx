"use client";

import { motion } from "framer-motion";
import { TbWorldWww } from "react-icons/tb";
import { MdDesignServices } from "react-icons/md";
import Reveal from "@/components/common/Reveal";

const services = [
  {
    icon: <TbWorldWww className="text-2xl" />,
    title: "Web Architecture",
    description:
      "Jasa pembuatan website profesional untuk bisnis, company profile, sistem informasi, hingga aplikasi web dengan teknologi modern.",
  },
  {
    icon: <MdDesignServices className="text-2xl" />,
    title: "UI/UX Systems",
    description:
      "Jasa desain UI/UX untuk website dan aplikasi dengan tampilan modern, responsif, dan berorientasi pada kebutuhan pengguna.",
  },
];

export default function CoreServices() {
  return (
    <section className="py-section-gap grid-layout bg-surface-off-white" id="services-summary">
      <Reveal once={false} className="col-span-4 md:col-span-8 xl:col-span-12 mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-stack-md">
        <div className="max-w-2xl">
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-text-main mb-stack-sm">
            Layanan Kami
          </h2>
          <p className="font-body-md text-body-md text-text-muted">
            Solusi web dan desain digital profesional untuk membantu bisnis
            membangun website yang modern, cepat, responsif, dan mudah digunakan.
          </p>
        </div>
        <a
          href="/layanan"
          className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-2 group font-semibold"
        >
          Semua Layanan
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
      </Reveal>

      {services.map((service, index) => (
        <Reveal
          key={service.title}
          delay={index * 0.12}
          once={false}
          className="col-span-4 md:col-span-4 xl:col-span-6 h-full"
        >
          <article className="group bg-white dark:bg-[#07162c] p-6 border border-border-subtle dark:border-white/10 rounded-2xl card-hover flex flex-col h-full shadow-sm">
            {/* Pure Circular Icon Badge with Smooth Slow Loading Animation */}
            <div className="relative w-12 h-12 flex items-center justify-center mb-6 shrink-0">
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
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-primary-container dark:text-cyan-400 rounded-full flex items-center justify-center shadow-sm">
                {service.icon}
              </div>
            </div>

            <h3 className="font-headline-md text-headline-md text-text-main mb-3">{service.title}</h3>
            <p className="font-body-md text-body-md text-text-muted flex-grow leading-relaxed">
              {service.description}
            </p>
          </article>
        </Reveal>
      ))}
    </section>
  );
}