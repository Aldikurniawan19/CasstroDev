"use client";

import React from "react";
import Timeline3D, { TimelineEvent } from "@/components/ui/3d-interactive-timeline";
import { Briefcase, Award, Code, Globe } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const teamTimelineEvents: TimelineEvent[] = [
  {
    id: "indra",
    date: "2023 – Sekarang",
    title: "Nanda Indra Saputra",
    subtitle: "Project Manager • HRD – Training Center",
    description:
      "Mendukung digitalisasi Training Center di PT Saga Hikari Teknindo Sejati melalui pengembangan konten E-Learning interaktif dan transformasi media pembelajaran untuk meningkatkan efektivitas proses pelatihan karyawan.",
    icon: <Briefcase className="w-4 h-4 text-white" />,
    image: "/images/indra.png",
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
    description:
      "Membangun Master Design System dan merancang antarmuka produk digital berskala enterprise, mengoptimalkan alur interaksi pengguna (user flow), serta menghasilkan prototipe interaktif modern.",
    icon: <Award className="w-4 h-4 text-white" />,
    image: "/images/shasy.png",
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
    description:
      "FreeLancer web sejak 2025 mengembangkan antarmuka website modern, responsif, dan interaktif, serta memiliki rekam jejak magang di Divisi IT PT Saga Hikari Teknindo Sejati selama satu tahun.",
    icon: <Code className="w-4 h-4 text-white" />,
    image: "/images/aldi.png",
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
    description:
      "Merancang arsitektur API berskala tinggi, integrasi database terdistribusi, optimasi performa query, serta sistem autentikasi dan keamanan server terpercaya.",
    icon: <Globe className="w-4 h-4 text-white" />,
    image: "/images/bayu.png",
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

      {/* 3D Interactive Timeline Component */}
      <Timeline3D
        events={teamTimelineEvents}
        backgroundColor="bg-transparent"
        primaryColor="bg-blue-600"
        secondaryColor="bg-cyan-500"
        accentColor="bg-cyan-400"
        className="pt-4"
      />
    </section>
  );
}
