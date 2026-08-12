import type { Metadata } from "next";
import ServicesHero from "@/components/layanan/ServicesHero";
import ServiceGrid from "@/components/layanan/ServiceGrid";
import CTASection from "@/components/common/CTASection";

export const metadata: Metadata = {
  title: "Layanan Rekayasa Perangkat Lunak | CasstroDev",
  description:
    "Layanan rekayasa software enterprise: Pengembangan Web dan Desain Sistem UI/UX.",
  keywords:
    "layanan software house, web architecture, web development, ui ux design system",
  alternates: { canonical: "/layanan" },
};

export default function LayananPage() {
  return (
    <>
      <ServicesHero />
      <ServiceGrid />
      <CTASection
        title="Siap Membangun Produk Digital Anda?"
        description="Jadwalkan konsultasi teknis dengan insinyur senior kami untuk membahas arsitektur dan persyaratan proyek Anda."
        buttonText="Konsultasi Teknis Gratis"
        buttonHref="/tentang-kami#contact"
      />
    </>
  );
}