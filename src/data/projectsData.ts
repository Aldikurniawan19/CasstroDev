export interface BenefitItem {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: "Web Development" | "Sistem Informasi" | "UI/UX Design" | "Lainnya";
  description: string;
  image: string;
  tags: string[];
  date: string;
  useCases: string[];
  benefits: BenefitItem[];
  client?: string;
  duration?: string;
  liveUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "TripGo – Open Trip Booking Engine",
    category: "Web Development",
    description:
      "Solusi digital otomatisasi reservasi & payment gateway 24/7 yang mentransformasi bisnis travel Anda. Mengunci kuota secara presisi, memverifikasi pembayaran instan tanpa cek mutasi manual, serta menghemat 90% waktu operasional admin.",
    image: "/project/rentalimg.png",
    tags: ["React", "Laravel 11", "Midtrans", "MySQL", "Docker"],
    date: "2026-01-15",
    client: "TripGo Indonesia",
    duration: "2 Bulan",
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
    client: "Logistik Nusantara Enterprise",
    duration: "3 Bulan",
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
    client: "Private Executive",
    duration: "3 Minggu",
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
    client: "KasDex Finance Technology",
    duration: "2.5 Bulan",
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
    client: "Koperasi Tani Makmur",
    duration: "1.5 Bulan",
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
    client: "TaskFlow Systems",
    duration: "2 Bulan",
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
