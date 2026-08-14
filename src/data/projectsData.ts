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
    title: "RentalGo – Web Penyewaan Mobil",
    category: "Web Development",
    description:
      "Solusi digital otomatisasi reservasi & payment gateway 24/7 yang mentransformasi bisnis rental mobil Anda. Mengunci ketersediaan unit secara presisi, memverifikasi pembayaran instan tanpa cek mutasi manual, serta menghemat waktu operasional armada.",
    image: "/project/rentalimg.png",
    tags: ["React", "Laravel 11", "Midtrans", "MySQL", "Docker"],
    date: "2026-01-15",
    client: "RentalGo",
    duration: "2 Bulan",
    liveUrl: "https://rental-mobil-rho.vercel.app/",
    useCases: [
      "Pemesanan unit rental mobil online 24/7 secara mandiri oleh pelanggan.",
      "Pemrosesan verifikasi pembayaran otomatis via Payment Gateway Midtrans.",
      "Penerbitan invoice dan bukti sewa digital ber-QR Code otomatis.",
      "Manajemen ketersediaan armada mobil dan jadwal sewa secara real-time.",
    ],
    benefits: [
      {
        title: "Efisiensi Operasional 90%",
        description: "Menghilangkan kebutuhan konfirmasi chat dan pengecekan mutasi bank manual.",
      },
      {
        title: "Pencegahan Double-Booking 100%",
        description: "Status unit mobil terkunci otomatis begitu pelanggan menyelesaikan transaksi.",
      },
      {
        title: "Kemudahan Akses Pelanggan",
        description: "Pelanggan mendapatkan kepastian booking dan invoice digital instan tanpa menunggu jam kerja admin.",
      },
    ],
  },
  {
    id: 2,
    title: "LuxeStay – Hotel Landing Page",
    category: "Web Development",
    description:
      "Landing page hotel eksklusif dan profesional dengan desain modern, visual memukau, serta navigasi intuitif. Dirancang untuk menonjolkan estetika kamar, fasilitas premium, serta memudahkan calon tamu melakukan reservasi secara langsung.",
    image: "/project/projek2.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "SEO Schema"],
    date: "2025-11-20",
    client: "LuxeStay",
    duration: "1.5 Bulan",
    liveUrl: "https://hotel-ui-l2f8.vercel.app/",
    useCases: [
      "Showcase tipe kamar mewah dengan galeri foto beresolusi tinggi & tur fasilitas interaktif.",
      "Penyajian informasi fasilitas hotel, restoran, ruang pertemuan, dan promo musiman.",
      "Formulir reservasi kamar langsung terintegrasi tombol kontak instan.",
      "Struktur meta-tag SEO Schema untuk visibilitas maksimal di hasil pencarian Google.",
    ],
    benefits: [
      {
        title: "Peningkatan Booking Langsung 40%",
        description: "Mendorong tamu memesan langsung melalui website tanpa komisi tinggi OTA pihak ketiga.",
      },
      {
        title: "Citra Brand Hotel Mewah",
        description: "Desain visual elegan yang memikat calon tamu dan memperkuat reputasi hotel.",
      },
      {
        title: "Akses Super Cepat & Responsif",
        description: "Waktu pemuatan halaman <1 detik dengan pengalaman browsing nyaman di smartphone dan desktop.",
      },
    ],
  },
  {
    id: 3,
    title: "Titik Fokus – Barbershop Landing Page",
    category: "Web Development",
    description:
      "Landing page barbershop kekinian dengan sentuhan visual maskulin, modern, dan elegan. Dilengkapi dengan showcase katalog gaya rambut, pricelist paket layanan, lokasi cabang, serta kemudahan reservasi jadwal pangkas rambut.",
    image: "/project/projek3.png",
    tags: ["React", "Tailwind CSS", "JavaScript ES6", "Framer Motion", "SEO Schema"],
    date: "2025-09-10",
    client: "Titik Fokus",
    duration: "3 Minggu",
    liveUrl: "https://barber-three-silk.vercel.app/",
    useCases: [
      "Katalog inspirasi gaya rambut pria terkini (haircut showcase) & profil kapster profesional.",
      "Informasi lengkap daftar paket treatment, grooming produk, dan pricelist transparan.",
      "Sistem pemesanan jadwal antrean pangkas rambut secara online tanpa perlu menunggu lama.",
      "Integrasi peta rute Google Maps dan tombol interaktif kontak WhatsApp.",
    ],
    benefits: [
      {
        title: "Antrean Pelanggan Tertib & Teratur",
        description: "Pelanggan datang sesuai slot jadwal yang telah dipesan secara online.",
      },
      {
        title: "Daya Tarik Brand Barbershop Modern",
        description: "Membangun identitas barbershop profesional yang menarik segmen pelanggan muda.",
      },
      {
        title: "Kemudahan Akuisisi Pelanggan Baru",
        description: "Calon pelanggan dapat melihat kualitas hasil pangkas rambut dan ulasan dengan mudah.",
      },
    ],
  },
  {
    id: 4,
    title: "RamadhanProject – Web PWA Jadwal & Ibadah",
    category: "Web Development",
    description:
      "Aplikasi web interaktif bertema Ramadhan berbasis Progressive Web App (PWA) yang menyajikan jadwal imsakiyah akurat, waktu sholat real-time berbasis lokasi GPS, tracker ibadah harian, serta kumpulan doa dan inspirasi islami.",
    image: "/project/projek4.png",
    tags: ["React", "Next.js", "PWA", "Tailwind CSS", "Geolocation API"],
    date: "2025-06-05",
    client: "RamadhanProject",
    duration: "1 Bulan",
    liveUrl: "https://ramadhan-app-puce.vercel.app/",
    useCases: [
      "Jadwal imsakiyah dan waktu sholat 5 waktu otomatis berdasarkan koordinat GPS pengguna.",
      "Fitur tracker ibadah Ramadhan harian (puasa, tilawah Al-Qur'an, tarawih, dan sedekah).",
      "Kumpulan doa harian, niat puasa, serta countdown pengingat waktu berbuka dan imsak.",
      "Aplikasi web responsif yang dapat di-install ke homescreen smartphone (PWA) tanpa download dari app store.",
    ],
    benefits: [
      {
        title: "Akses Instan & Hemat Memori",
        description: "Dapat diinstall langsung dari browser sebagai PWA tanpa memakan banyak memori ponsel.",
      },
      {
        title: "Akurasi Waktu Ibadah Real-Time",
        description: "Sinkronisasi otomatis dengan zona waktu lokal pengguna di seluruh Indonesia.",
      },
      {
        title: "Meningkatkan Disiplin Ibadah",
        description: "Fitur tracker harian yang intuitif membantu pengguna memantau capaian ibadah selama Ramadhan.",
      },
    ],
  },
  {
    id: 5,
    title: "LuxeStay – UI/UX Hotel & Villa Booking Platform",
    category: "UI/UX Design",
    description:
      "Perancangan antarmuka dan pengalaman pengguna (UI/UX) komprehensif untuk platform reservasi hotel dan villa premium. Menghadirkan alur pencarian multi-kategori, sistem filter cerdas, galeri interaktif, serta alur checkout dan booking yang seamless dan memanjakan pengguna di berbagai perangkat.",
    image: "/project/projekDesain.png",
    tags: ["Figma", "UI/UX Design", "Design System", "Wireframing", "Prototyping", "User Flow"],
    date: "2025-05-18",
    client: "LuxeStay Hospitality",
    duration: "1.5 Bulan",
    useCases: [
      "Perancangan user flow dan wireframing komprehensif untuk alur pencarian dan reservasi kamar hotel & villa.",
      "Sistem filter multi-kategori (rentang harga, fasilitas, tipe akomodasi, dan lokasi) yang intuitif dan responsif.",
      "Halaman detail villa interaktif dengan galeri foto, tabel spesifikasi kamar, dan widget booking instan.",
      "Penyusunan Master Design System dan panduan komponen UI/UX yang konsisten untuk desktop dan tablet.",
    ],
    benefits: [
      {
        title: "Peningkatan Konversi Pemesanan 45%",
        description: "Alur booking yang terstruktur dan tanpa hambatan (frictionless) memudahkan tamu menyelesaikan reservasi dengan cepat.",
      },
      {
        title: "Pengalaman Visual Premium & Intuitif",
        description: "Tata letak modern dengan hierarki visual yang jelas menonjolkan keunggulan fasilitas hotel dan villa secara optimal.",
      },
      {
        title: "Efisiensi Desain ke Tahap Development",
        description: "Design system dan autolayout Figma yang terstandarisasi mempercepat proses pengkodean tim pengembang hingga 60%.",
      },
    ],
  },
];
