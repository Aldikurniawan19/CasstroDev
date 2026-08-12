import type { Metadata } from "next";
import PortfolioHero from "@/components/portofolio/PortfolioHero";
import PortfolioGrid from "@/components/portofolio/PortfolioGrid";
import CTASection from "@/components/common/CTASection";

export const metadata: Metadata = {
  title: "Portofolio Proyek & Studi Kasus | CasstroDev",
  description:
    "Kumpulan studi kasus dan portofolio proyek rekayasa perangkat lunak enterprise untuk Fintech, Logistik, Retail, dan EdTech.",
  keywords:
    "portofolio software house, studi kasus software engineering, perbankan nexus, omnitrack logistics, b2b ecommerce",
  alternates: { canonical: "/portofolio" },
};

export default function PortofolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <CTASection
        title="Punya Proyek Yang Ingin Direalisasikan?"
        description="Mari wujudkan solusi digital kelas enterprise dengan standar rekayasa tertinggi."
        buttonText="Mulai Diskusi Proyek"
        buttonHref="/tentang-kami#contact"
      />
    </>
  );
}