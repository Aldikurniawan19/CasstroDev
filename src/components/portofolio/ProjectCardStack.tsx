"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

type Filter = "all" | "WEB" | "MOBILE" | "ENTERPRISE";

interface ProjectMetrics {
  icon: string;
  label: string;
}

interface ProjectItem extends CardStackItem {
  category: Filter;
  subCategory?: string;
  metrics?: ProjectMetrics[];
}

export function ProjectCard({
  item,
  active,
}: {
  item: ProjectItem;
  active: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      {/* image */}
      <div className="absolute inset-0 overflow-hidden bg-surface-container-lowest">
        <img
          src={item.imageSrc}
          alt={item.title}
          className="h-full w-full object-cover"
          draggable={false}
          loading="eager"
        />
      </div>

      {/* gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* badges */}
      <div className="absolute left-5 top-5 flex gap-2">
        <span className="rounded bg-white/95 px-3 py-1 font-label-sm text-label-sm font-semibold text-primary backdrop-blur-sm">
          {item.category}
        </span>
        {item.subCategory ? (
          <span className="rounded bg-white/95 px-3 py-1 font-label-sm text-label-sm text-text-muted backdrop-blur-sm">
            {item.subCategory}
          </span>
        ) : null}
      </div>

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-5">
        <h3
          className={`font-headline-lg text-headline-lg font-bold text-white leading-tight transition-all duration-300 ${
            active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90"
          }`}
        >
          {item.title}
        </h3>
        {item.description ? (
          <p
            className={`mt-1.5 line-clamp-2 font-body-md text-body-md leading-relaxed text-white/80 transition-all duration-300 ${
              active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-60"
            }`}
          >
            {item.description}
          </p>
        ) : null}

        <motion.div
          className="mt-3 flex items-center justify-between"
          initial={false}
          animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className="flex gap-4 text-white/80">
            {(item.metrics ?? []).map((m) => (
              <div key={m.label} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  {m.icon}
                </span>
                <span className="font-label-sm text-label-sm">{m.label}</span>
              </div>
            ))}
          </div>
          <span className="flex items-center gap-1 font-label-md text-label-md font-semibold text-accent-cyan">
            Detail Proyek
            <SquareArrowOutUpRight className="h-4 w-4" />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectCardStack({ filter }: { filter?: Filter }) {
  const reduceMotion = useReducedMotion();

  const allItems: ProjectItem[] = [
    {
      id: 1,
      title: "Platform Rental & Booking Digital",
      category: "WEB",
      subCategory: "RENTAL & SERVICES",
      description:
        "Sistem manajemen persewaan terintegrasi dengan pemesanan otomatis, pelacakan unit, dan payment gateway.",
      imageSrc: "/project/rentalimg.png",
      metrics: [
        { icon: "schedule", label: "Real-time Booking" },
        { icon: "verified", label: "Auto Payment" },
      ],
    },
    {
      id: 2,
      title: "Sistem Inti Perbankan Nexus",
      category: "ENTERPRISE",
      subCategory: "FINTECH",
      description:
        "Modernisasi infrastruktur perbankan warisan menjadi arsitektur microservices yang terdistribusi, mengurangi latensi transaksi hingga 40%.",
      imageSrc: "/project/projek2.png",
      metrics: [
        { icon: "speed", label: "10k TPS" },
        { icon: "security", label: "Zero Downtime" },
      ],
    },
    {
      id: 3,
      title: "Aplikasi Logistik OmniTrack",
      category: "MOBILE",
      subCategory: "LOGISTICS",
      description:
        "Solusi pelacakan armada real-time dengan rute cerdas yang mengoptimalkan konsumsi bahan bakar dan manajemen pengiriman.",
      imageSrc: "/project/projek3.png",
    },
    {
      id: 4,
      title: "E-Commerce B2B Portal & Enterprise POS",
      category: "WEB",
      subCategory: "RETAIL",
      description:
        "Platform pemesanan grosir kustom dengan integrasi ERP untuk manajemen inventaris otomatis dan sinkronisasi stok multi-cabang.",
      imageSrc: "/project/projek4.png",
    },
  ];

  const items = allItems.filter(
    (item) => !filter || filter === "all" || item.category === filter
  );

  return (
    <div className="w-full">
      <CardStack
        items={items}
        initialIndex={0}
        maxVisible={7}
        autoAdvance
        intervalMs={2800}
        pauseOnHover
        showDots
        cardWidth={reduceMotion ? 520 : 620}
        cardHeight={reduceMotion ? 360 : 400}
        renderCard={(item, state) => (
          <ProjectCard item={item as ProjectItem} active={state.active} />
        )}
      />
    </div>
  );
}