import type { Metadata } from "next";
import AboutHero from "@/components/tentang-kami/AboutHero";
import VisionMission from "@/components/tentang-kami/VisionMission";
import TeamGrid from "@/components/tentang-kami/TeamGrid";
import EngineeringCulture from "@/components/tentang-kami/EngineeringCulture";
import CTASection from "@/components/common/CTASection";

export const metadata: Metadata = {
  title: "Tentang Kami | CasstroDev Engineering",
  description:
    "Kisah, nilai-nilai inti, budaya kerja, dan kepemimpinan tim CasstroDev — firma rekayasa perangkat lunak berstandar tinggi di Indonesia.",
  keywords:
    "tentang kami software house, rekayasa presisi, tim pengembang software, budi santoso, arief rahman",
  alternates: { canonical: "/tentang-kami" },
};

export default function TentangKamiPage() {
  return (
    <>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <AboutHero />
        <VisionMission />
        <TeamGrid />
        <EngineeringCulture />
      </div>
      <CTASection
        title="Tertarik Bekerjasama dengan Tim Kami?"
        description="Mari diskusikan arsitektur sistem digital yang ingin Anda bangun bersama tim ahli kami."
        buttonText="Hubungi Kami Sekarang"
        buttonHref="#contact"
      />
    </>
  );
}