"use client";

import { useState, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";
import { SquareArrowOutUpRight } from "lucide-react";
import ProjectDetailModal, { type ProjectItem } from "./ProjectDetailModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const PORTFOLIO_TITLE = "Projek yang Pernah Kami Kerjakan";
const PORTFOLIO_WORDS = PORTFOLIO_TITLE.split(" ");

type FilterType = "Semua" | "Web Development" | "Sistem Informasi" | "UI/UX Design" | "Lainnya";

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "TripGo – Open Trip Booking Engine",
    category: "Web Development",
    description:
      "Solusi digital otomatisasi reservasi & payment gateway 24/7 yang mentransformasi bisnis travel Anda. Mengunci kuota secara presisi, memverifikasi pembayaran instan tanpa cek mutasi manual, serta menghemat 90% waktu operasional admin.",
    image: "/project/rentalimg.png",
    tags: ["React", "Laravel 11", "Midtrans", "MySQL", "Docker"],
    date: "2026-01-15",

    useCases: [
      "Pemesanan paket wisata online 24/7 secara mandiri oleh pelanggan.",
      "Pemrosesan verifikasi pembayaran otomatis via Payment Gateway Midtrans.",
      "Penerbitan invoice dan tiket digital ber-QR Code otomatis.",
      "Manajemen kuota peserta dan manifest jadwal trip real-time.",
    ],
    benefits: [
      {
        title: "Efisiensi Waktu Operasional 90%",
        description: "Menghilangkan kebutuhan konfirmasi chat & cek mutasi rekening manual.",
      },
      {
        title: "Pencegahan Double-Booking 100%",
        description: "Kuota peserta terkunci secara otomatis saat pendaftaran.",
      },
      {
        title: "Peningkatan Konversi Penjualan",
        description: "Pelanggan mendapatkan kepastian tiket instan tanpa menunggu jam kerja admin.",
      },
    ],
  },
  {
    id: 2,
    title: "Smartinventori – Enterprise Warehouse Management",
    category: "Sistem Informasi",
    description:
      "Platform pergudangan terdistribusi cerdas yang menghilangkan risiko selisih stok persediaan hingga 98.4%. Dilengkapi audit trail kartu stok FIFO real-time dan pemindaian Barcode/QR Code untuk mempercepat stok opname 6x lebih cepat.",
    image: "/project/projek2.png",
    tags: ["Next.js 14", "Laravel API", "PostgreSQL", "Redis", "Chart.js"],
    date: "2025-11-20",

    useCases: [
      "Pencatatan transaksi barang masuk dan keluar dengan integrasi Barcode/QR Code.",
      "Manajemen stok barang antar-gudang cabang dengan metode kartu stok FIFO.",
      "Notifikasi reorder-point otomatis saat persediaan barang mencapai batas minimum.",
      "Pembuatan laporan audit trail dan neraca persediaan barang otomatis.",
    ],
    benefits: [
      {
        title: "Akurasi Stok Hingga 98.4%",
        description: "Meminimalkan selisih barang dan risiko kerugian hilangnya persediaan.",
      },
      {
        title: "Stock-Opname 6x Lebih Cepat",
        description: "Memotong durasi opname bulanan dari 3 hari menjadi hanya 4 jam.",
      },
      {
        title: "Penghematan Biaya Operasional 30%",
        description: "Mencegah penumpukan barang mati (overstock) di gudang.",
      },
    ],
  },
  {
    id: 3,
    title: "Portofolio Eksekutif & Personal Branding",
    category: "UI/UX Design",
    description:
      "Website personal branding eksekutif berkelas dunia yang memancarkan kredibilitas profesional instan. Memiliki skor Google Lighthouse 98+, kecepatan pemuatan kilat <1 detik, dan terbukti meningkatkan konversi penawaran klien hingga 50%.",
    image: "/project/projek3.png",
    tags: ["HTML5", "CSS3", "JavaScript ES6", "Framer Motion", "SEO Schema"],
    date: "2025-09-10",

    useCases: [
      "Pameran karya (showcase) interaktif dengan kategori filter dan galeri proyek.",
      "Formulir kontak langsung terintegrasi validasi pesan & notifikasi.",
      "Tampilan responsif di seluruh perangkat seluler, tablet, dan desktop.",
      "Struktur meta-tag SEO dinamis (Schema.org) untuk hasil pencarian Google.",
    ],
    benefits: [
      {
        title: "Kredibilitas Profesional Instan",
        description: "Membangun persepsi brand diri yang kuat bagi klien kelas atas.",
      },
      {
        title: "Peningkatan Inbound Prospects 50%",
        description: "Memudahkan calon klien menghubungi dan menawarkan proyek baru.",
      },
      {
        title: "Performa Kecepatan Pemuatan 98+",
        description: "Halaman dapat diakses instan (<1 detik) tanpa beban server berat.",
      },
    ],
  },
  {
    id: 4,
    title: "KasDex – Digital Financial SaaS Platform",
    category: "Sistem Informasi",
    description:
      "Aplikasi SaaS akuntansi modern yang mengubah nota kas fisik berserakan menjadi laporan keuangan terstandar SAK EMKM secara otomatis. Memangkas waktu rekap harian dari 2 jam menjadi 5 menit serta mempermudah kelayakan kredit usaha.",
    image: "/project/projek4.png",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    date: "2025-06-05",

    useCases: [
      "Pencatatan arus kas masuk dan keluar harian dengan kategorisasi beban otomatis.",
      "Pembuatan otomatis Jurnal Umum, Buku Besar, Neraca Saldo, dan Laba/Rugi.",
      "Ekspor laporan keuangan terstandar ke format PDF dan Excel siap pakai.",
      "Dashboard analitik kesehatan finansial bisnis (Cashflow & Runway).",
    ],
    benefits: [
      {
        title: "Rekap Harian Hanya 5 Menit",
        description: "Memotong waktu rekap manual dari 2 jam per hari.",
      },
      {
        title: "Kemudahan Pengajuan Kredit Bank",
        description: "Memiliki laporan keuangan sah terstandar SAK untuk kelayakan usaha.",
      },
      {
        title: "Visibilitas Keuangan Real-Time",
        description: "Mencegah kebocoran arus kas dan membantu keputusan investasi bisnis.",
      },
    ],
  },
  {
    id: 5,
    title: "AgriShare – Manajemen Asset Tani Desa",
    category: "Lainnya",
    description:
      "Portal tata kelola dan penjadwalan peminjaman aset desa terpadu yang 100% transparan. Menghilangkan risiko bentrok jadwal alat pertanian, memastikan akuntabilitas kondisi barang, serta mendongkrak kas pemeliharaan desa sebesar 80%.",
    image: "/project/rentalimg.png",
    tags: ["React 18", "Express.js", "Node.js API", "MySQL", "Sequelize"],
    date: "2025-04-12",

    useCases: [
      "Kalender interaktif ketersediaan dan penjadwalan peminjaman alat pertanian desa.",
      "Registrasi identitas peminjam terverifikasi data NIK warga desa.",
      "Modul berita acara digital pencatatan kondisi alat sebelum dan sesudah dipinjam.",
      "Laporan transparansi penerimaan iuran pemeliharaan alat secara publik.",
    ],
    benefits: [
      {
        title: "Transparansi Aset 100%",
        description: "Menghilangkan potensi konflik bentrok jadwal antar kelompok tani.",
      },
      {
        title: "Akuntabilitas Pemeliharaan Alat",
        description: "Memastikan ada penanggung jawab jelas saat alat rusak.",
      },
      {
        title: "Peningkatan Kas Desa 80%",
        description: "Pengumpulan iuran sewa alat terkumpul tertib dan transparan.",
      },
    ],
  },
  {
    id: 6,
    title: "TaskFlow – Enterprise Agile Board",
    category: "Web Development",
    description:
      "Platform kolaborasi Agile tingkat lanjut dengan sinkronisasi WebSockets real-time (<50ms). Mendorong kecepatan pengiriman fitur (sprint velocity) hingga 35% dan memangkas waktu rapat koordinasi harian menjadi 3x lebih cepat.",
    image: "/project/projek2.png",
    tags: ["Next.js 14", "Tailwind CSS", "WebSockets", "Zustand", "PostgreSQL"],
    date: "2025-02-01",

    useCases: [
      "Papan kerja Kanban drag-and-drop interaktif dengan status alur kerja kustom.",
      "Sinkronisasi status tugas real-time antar anggota tim tanpa refresh halaman.",
      "Grafik sprint burn-down dan analisis beban kerja (WIP limits) tim pengembang.",
      "Manajemen hak akses berdasarkan peran (Role-Based Access Control / RBAC).",
    ],
    benefits: [
      {
        title: "Peningkatan Produktivitas 35%",
        description: "Kecepatan pengiriman fitur (sprint velocity) meningkat signifikan.",
      },
      {
        title: "Standup Harian 3x Lebih Cepat",
        description: "Memangkas waktu rapat koordinasi dari 45 menit menjadi 15 menit.",
      },
      {
        title: "Visibilitas Blocker Instan",
        description: "Menghindari keterlambatan rilis produk karena kendala teknis terpantau cepat.",
      },
    ],
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const titleContainerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tlShimmer = useRef<gsap.core.Timeline | null>(null);

  const setLetterRef = useCallback((el: HTMLSpanElement | null, i: number) => {
    lettersRef.current[i] = el;
  }, []);

  useGSAP(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    /* ── Animasi 3D Letter Pop-In & Shimmer berulang secara kontinu ── */
    const tl = gsap.timeline({ repeat: -1, delay: 0.2, repeatDelay: 1.0 });

    // 1. Entrance: 3D letter pop-in (rotateX: -90, scale: 0.6, back.out)
    tl.fromTo(
      letters,
      {
        y: 30,
        opacity: 0,
        rotateX: -90,
        scale: 0.6,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.03,
        ease: "back.out(1.7)",
      }
    );

    // 2. Continuous Shimmer Glow
    tl.to(letters, {
      color: "#00e5ff",
      textShadow: "0 0 18px rgba(0,229,255,0.7), 0 0 35px rgba(0,229,255,0.4)",
      duration: 0.35,
      stagger: { each: 0.04, from: "start" },
      ease: "power2.inOut",
    });

    tl.to(
      letters,
      {
        color: "var(--color-secondary)",
        textShadow: "0 0 0px transparent",
        duration: 0.4,
        stagger: { each: 0.04, from: "start" },
        ease: "power2.inOut",
      },
      "+=0.15"
    );

    // 3. Pause & smooth reset for repeating loop
    tl.to({}, { duration: 2.5 });

    tl.to(letters, {
      y: -20,
      opacity: 0,
      rotateX: 45,
      scale: 0.8,
      duration: 0.45,
      stagger: 0.015,
      ease: "power2.in",
    });

    tlShimmer.current = tl;
  }, []);

  const handleMouseEnter = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    tlShimmer.current?.pause();

    letters.forEach((letter, i) => {
      const xOffset = (Math.random() - 0.5) * 24;
      const yOffset = (Math.random() - 0.5) * 16;
      const rot = (Math.random() - 0.5) * 20;
      gsap.to(letter, {
        x: xOffset,
        y: yOffset,
        rotation: rot,
        scale: 1.2,
        color: "#00e5ff",
        textShadow: "0 0 14px rgba(0,229,255,0.6)",
        duration: 0.35,
        delay: i * 0.012,
        ease: "power3.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    gsap.to(letters, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      color: "var(--color-secondary)",
      textShadow: "0 0 0px transparent",
      duration: 0.5,
      stagger: 0.02,
      ease: "elastic.out(1, 0.4)",
      onComplete: () => {
        tlShimmer.current?.resume();
      },
    });
  }, []);

  const filteredProjects = projectsData.filter(
    (project) => activeFilter === "Semua" || project.category === activeFilter
  );

  return (
    <section className="w-full bg-slate-50/70 dark:bg-[#040d1a] py-16 md:py-24" id="projek-section">
      <div className="max-w-container-max mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <Reveal y={24} className="max-w-full md:max-w-4xl">
            <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-black dark:text-white tracking-tight mb-3">
              <span
                ref={titleContainerRef}
                className="inline-flex flex-wrap cursor-pointer max-w-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "600px" }}
              >
                {PORTFOLIO_WORDS.map((word, wIdx) => {
                  const charOffset = PORTFOLIO_WORDS.slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0);
                  return (
                    <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
                      {word.split("").map((char, cIdx) => {
                        const globalIndex = charOffset + cIdx;
                        return (
                          <span
                            key={cIdx}
                            ref={(el) => setLetterRef(el, globalIndex)}
                            className="inline-block text-secondary transition-none"
                            style={{ willChange: "transform, opacity, color" }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </span>
            </h2>
            <p className="font-body-md text-body-md text-text-muted max-w-2xl leading-relaxed">
              Berbagai projek yang telah kami kerjakan, mulai dari pengembangan website, sistem informasi, hingga solusi digital enterprise. Klik kartu untuk melihat detail lengkap.
            </p>
          </Reveal>
        </div>

        {}    
        <Reveal y={20} className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {filters.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 sm:px-5 py-2.5 rounded font-label-md text-label-md transition-all duration-200 cursor-pointer ${
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

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            return (
              <Reveal key={project.id} delay={index * 0.08} y={30} className="h-full">
                <article
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
                >
                  
                  {}
                  <div className="relative h-52 sm:h-56 md:h-60 w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                  </div>

                  {}  
                  <div className="p-5 md:p-6 flex flex-col justify-between flex-1">
                    <div>
                      {}  
                      <h3 className="font-headline-md text-headline-md text-primary dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2.5">
                        {project.title}
                      </h3>

                      {}  
                      <p className="font-body-md text-body-md text-text-muted leading-relaxed mb-5 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {}  
                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-white/10 mt-auto">
                      <div className="flex flex-wrap gap-1.5 items-center max-w-[75%]">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-surface-container-low text-secondary border border-border-subtle px-2.5 py-0.5 rounded text-label-sm font-label-sm font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="w-8 h-8 rounded-xl border border-slate-200/90 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center justify-center transition-all shrink-0 cursor-pointer"
                        title="Lihat Detail Proyek"
                      >
                        <SquareArrowOutUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

      </div>

      {}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

