"use client";

import Reveal from "@/components/common/Reveal";
import {
  BrainCircuit,
  Code2,
  Layers,
  ShieldCheck,
  FileCode2,
  Zap,
} from "lucide-react";

const culturePillars = [
  {
    icon: BrainCircuit,
    title: "Deep Work & Focus Flow",
    description:
      "Kami menciptakan lingkungan kerja bebas gangguan untuk memfasilitasi pemikiran arsitektural yang mendalam dan penyelesaian masalah sistem kompleks secara presisi.",
    tag: "Fokus Utama",
  },
  {
    icon: Code2,
    title: "Rigorous Code Craftsmanship",
    description:
      "Setiap baris kode melalui pengujian otomatis, static analysis, dan peer code review yang ketat sebelum digabungkan ke lingkungan produksi.",
    tag: "Kualitas Kode",
  },
  {
    icon: Layers,
    title: "Arsitektur Scalable & Modular",
    description:
      "Sistem dirancang dengan arsitektur modular yang independen, memastikan kemudahan integrasi, skalabilitas tinggi, dan bebas masalah ketergantungan.",
    tag: "Skalabilitas",
  },
  {
    icon: ShieldCheck,
    title: "Security & Quality First",
    description:
      "Standar keamanan data, enkripsi, dan audit mutu diintegrasikan sejak fase perancangan pertama (Security & Privacy by Design).",
    tag: "Keamanan Sistem",
  },
  {
    icon: FileCode2,
    title: "Dokumentasi Transparan",
    description:
      "Kode yang bersih selalu dilengkapi dokumentasi arsitektur dan API yang jelas untuk menjamin efisiensi pemeliharaan jangka panjang.",
    tag: "Transparansi",
  },
  {
    icon: Zap,
    title: "Eksekusi & Solusi Tanpa Ego",
    description:
      "Diskusi teknis kami selalu berfokus pada efektivitas solusi bisnis terbaik bagi klien, meminimalkan birokrasi dan memaksimalkan hasil.",
    tag: "Kolaborasi",
  },
];

export default function EngineeringCulture() {
  return (
    <section
      className="py-16 md:py-24 border-t border-border-subtle overflow-hidden"
      id="culture"
    >
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <Reveal y={24} once={false}>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold block mb-2">
            Budaya Kerja & Rekayasa
          </span>
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary dark:text-white font-extrabold tracking-tight mb-4">
            Prinsip Rekayasa & Standar Kualitas Kami
          </h2>
          <div className="h-1 w-16 bg-accent-cyan rounded-full mx-auto mb-6"></div>
          <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
            Ruang kerja kami adalah laboratorium rekayasa tempat keahlian teknis, dedikasi pada presisi, dan standar kualitas tinggi berpadu untuk membangun perangkat lunak kelas enterprise.
          </p>
        </Reveal>
      </div>

      {/* Grid Kartu Pilar Budaya Rekayasa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {culturePillars.map((pillar, index) => {
          const IconComponent = pillar.icon;
          const isEven = index % 2 === 0;
          return (
            <Reveal
              key={pillar.title}
              y={0}
              x={isEven ? -40 : 40}
              delay={index * 0.06}
              once={false}
            >
              <div className="h-full bg-white dark:bg-[#07162c] border border-border-subtle dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between hover:border-secondary/50">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low dark:bg-slate-800 text-secondary flex items-center justify-center border border-border-subtle dark:border-white/10 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-surface-container-low dark:bg-slate-800 text-secondary border border-border-subtle dark:border-white/10">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary dark:text-white font-bold mb-3 group-hover:text-secondary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}