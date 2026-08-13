"use client";

import Reveal from "@/components/common/Reveal";
import {
  BrainCircuit,
  Code2,
  Layers,
  ShieldCheck,
  FileCode2,
  Zap,
  CheckCircle2,
  GitPullRequest,
  Cpu,
  Terminal,
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

const engineeringStats = [
  {
    value: "100%",
    label: "Peer Code Review",
    desc: "Setiap PR ditinjau oleh tim senior",
    icon: GitPullRequest,
  },
  {
    value: "Automated",
    label: "CI/CD Pipeline",
    desc: "Pengujian & deployment otomatis",
    icon: Cpu,
  },
  {
    value: "Zero-Debt",
    label: "Clean Code Policy",
    desc: "Refactoring & optimasi berkala",
    icon: Terminal,
  },
  {
    value: "High",
    label: "Test Coverage",
    desc: "Unit & Integration test terstandar",
    icon: CheckCircle2,
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
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

      {/* Engineering Banner / Key Highlights */}
      <Reveal y={30} once={false}>
        <div className="bg-primary dark:bg-[#07162c] text-white rounded-3xl p-8 md:p-12 border border-slate-800 dark:border-white/10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringStats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-5 rounded-2xl bg-slate-800/80 dark:bg-slate-900/90 border border-slate-700/60 dark:border-white/10 hover:border-secondary/60 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <StatIcon className="w-5 h-5 text-accent-cyan" />
                    <span className="text-sm font-semibold tracking-wide text-slate-300">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}