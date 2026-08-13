import type { Metadata } from "next";
import ContactFormSection from "@/components/kontak/ContactFormSection";

export const metadata: Metadata = {
  title: "Kontak & Konsultasi Teknis | CasstroDev",
  description:
    "Hubungi tim insinyur perangkat lunak CasstroDev untuk konsultasi arsitektur web, sistem informasi, dan solusi digital enterprise.",
  keywords:
    "kontak software house, konsultasi IT, jasa pembuatan website, konsultan software indonesia",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <>
      <ContactFormSection />
    </>
  );
}
