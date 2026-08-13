import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import LogoWall from "@/components/home/LogoWall";
import CoreServices from "@/components/home/CoreServices";
import CaseStudyHighlights from "@/components/home/CaseStudyHighlights";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/common/CTASection";

export const metadata: Metadata = {
  title: "CasstroDev | Software House & Enterprise Solutions",
  description:
    "CasstroDev adalah software house terdepan untuk pengembangan web architecture dan UI/UX design system kelas enterprise.",
  keywords:
    "software house, web development, ui ux design, enterprise software, precision engineering",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <LogoWall />
      <CoreServices />
      <CaseStudyHighlights />
      <FAQ />
      <CTASection
        title="Ready to scale your business?"
        description="Mari diskusikan bagaimana pendekatan rekayasa perangkat lunak presisi kami dapat mempercepat transformasi digital perusahaan Anda."
        buttonText="Mulai Konsultasi Gratis"
        buttonHref="/kontak"
      />
    </>
  );
}