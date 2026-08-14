"use client";

import React from "react";
import Timeline3D, { TimelineEvent } from "@/components/ui/3d-interactive-timeline";
import Reveal from "@/components/common/Reveal";

const teamTimelineEvents: TimelineEvent[] = [
  {
    id: "indra",
    date: "2023 – Sekarang",
    title: "Nanda Indra Saputra",
    subtitle: "Project Manager • HRD – Training Center",
    roleName: "Pengembangan & Manajemen Proyek",
    iconCode: "</>",
    image: "/images/indra.png",
    description:
      "Mendukung digitalisasi Training Center di PT Saga Hikari Teknindo Sejati melalui pengembangan konten E-Learning interaktif dan transformasi media pembelajaran untuk meningkatkan efektivitas pelatihan karyawan.",
    bulletPoints: [
      "Pengembangan konten E-Learning interaktif & kurikulum digital",
      "Transformasi media pembelajaran & standarisasi materi",
      "Peningkatan efektivitas & monitoring proses pelatihan karyawan",
    ],
    category: "Project Management",
    education: {
      degree: "S1 Sistem Informasi",
      institution: "Universitas Dian Nuswantoro",
      period: "2019 – 2023",
    },
  },
  {
    id: "shasy",
    date: "2021 – Sekarang",
    title: "Shasy Kirana Syaharani",
    subtitle: "Lead UI/UX Designer",
    roleName: "Perancangan UI/UX & Design Systems",
    iconCode: "✦",
    image: "/images/shasy.png",
    description:
      "Membangun sistem desain terpadu dan antarmuka produk digital berskala enterprise dengan pengalaman pengguna yang intuitif, rapi, dan berbasis riset.",
    bulletPoints: [
      "Perancangan Master Design System & Styleguide modern",
      "Riset pengalaman pengguna, Wireframing & Interactive Prototyping",
      "Optimasi user flow, responsivitas antarmuka, dan estetika visual",
    ],
    category: "UI/UX Design",
    education: {
      degree: "S1 Desain Komunikasi Visual",
      institution: "Institut Seni & Teknologi",
      period: "2019 – 2023",
    },
  },
  {
    id: "aldi",
    date: "2025 – Sekarang",
    title: "Aldi Kurniawan",
    subtitle: "FrontEnd Developer • Freelancer",
    roleName: "Rekayasa FrontEnd & Interaksi",
    iconCode: "</>",
    image: "/images/aldi.png",
    description:
      "Mengembangkan aplikasi website modern dengan teknologi terkini, performa optimal, dan kode terstruktur, dengan rekam jejak industri di bidang teknologi informasi.",
    bulletPoints: [
      "Freelance Web Developer (2025 – Sekarang)",
      "Magang Divisi IT PT Saga Hikari Teknindo Sejati (1 Tahun)",
      "Pengembangan antarmuka responsif, modern, dan integrasi API",
    ],
    category: "FrontEnd Engineering",
    education: {
      degree: "S1 Sistem Informasi",
      institution: "Universitas Teknologi Yogyakarta",
      period: "2021 – 2025",
    },
  },
  {
    id: "bayu",
    date: "2021 – Sekarang",
    title: "Bayu Dwi Aditya Saputra",
    subtitle: "BackEnd Developer",
    roleName: "Arsitektur Backend & Database",
    iconCode: "{ }",
    image: "/images/bayu.png",
    description:
      "Merancang fondasi sistem backend yang tangguh, aman, dan berlatensi rendah untuk mendukung ekosistem digital enterprise dengan ketersediaan tinggi.",
    bulletPoints: [
      "Perancangan arsitektur RESTful API & mikroservis performa tinggi",
      "Integrasi & optimasi database relasional dan noSQL terdistribusi",
      "Keamanan server, autentikasi terenkripsi, dan stabilitas query",
    ],
    category: "BackEnd Engineering",
    education: {
      degree: "S1 Teknik Informatika",
      institution: "Universitas Sains & Teknologi",
      period: "2019 – 2023",
    },
  },
];

export default function TeamExperienceSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-border-subtle overflow-hidden" id="team-qualifications">
      {/* Section Header */}
      <Reveal y={20}>
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 px-4">
          <span className="font-label-sm text-label-sm text-cyan-500 uppercase tracking-widest font-semibold block mb-2">
            KUALIFIKASI PERSONAL ANGGOTA TIM
          </span>
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary dark:text-white font-extrabold tracking-tight mb-3">
            Rekam Jejak Tim Kami
          </h2>
          <p className="font-body-md text-body-md text-text-muted max-w-2xl mx-auto">
            Dedikasi, pengalaman profesional, dan latar belakang pendidikan dari para spesialis di balik setiap produk digital CasstroDev.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full mx-auto mt-4"></div>
        </div>
      </Reveal>

      {/* Pinned Paper Timeline Component */}
      <Timeline3D
        events={teamTimelineEvents}
        backgroundColor="bg-transparent"
        className="pt-4"
      />
    </section>
  );
}
