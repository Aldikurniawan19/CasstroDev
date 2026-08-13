"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const faqs = [
  {
    question: "Berapa lama waktu yang dibutuhkan untuk mengerjakan sebuah proyek?",
    answer:
      "Durasi bergantung pada kompleksitas dan ruang lingkup proyek. Proyek landing page atau aplikasi sederhana umumnya selesai dalam 2–4 minggu, sementara sistem enterprise dapat berlangsung 2–6 bulan. Kami selalu memberikan timeline yang transparan dan terukur sejak awal.",
  },
  {
    question: "Teknologi apa saja yang digunakan CasstroDev?",
    answer:
      "Kami membangun di atas stack modern seperti React, Next.js, Node.js, dan PostgreSQL untuk pengembangan web, serta Figma untuk perancangan UI/UX. Setiap teknologi dipilih berdasarkan kebutuhan proyek Anda, bukan tren semata.",
  },
  {
    question: "Bagaimana proses kerja sama dimulai?",
    answer:
      "Dimulai dengan sesi konsultasi gratis untuk memahami kebutuhan dan tujuan proyek. Setelah itu kami menyusun proposal, arsitektur, dan estimasi. Begitu disepakati, pengembangan berjalan secara iteratif dengan tinjauan berkala bersama Anda.",
  },
  {
    question: "Apakah tersedia layanan maintenance setelah peluncuran?",
    answer:
      "Ya. Kami menyediakan paket pemeliharaan berkelanjutan mulai dari monitoring, perbaikan bug, pembaruan keamanan, hingga penambahan fitur. Hal ini memastikan sistem Anda tetap stabil dan relevan dalam jangka panjang.",
  },
  {
    question: "Berapa perkiraan biaya pengembangan aplikasi web?",
    answer:
      "Biaya dihitung berdasarkan kompleksitas fitur, skala sistem, dan tenggat waktu. Kami menawarkan struktur harga yang jelas tanpa biaya tersembunyi. Hubungi kami untuk mendapatkan estimasi yang disesuaikan dengan kebutuhan Anda.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-section-gap bg-surface-off-white border-t border-border-subtle" id="faq">
      <Reveal y={24} className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-stack-lg flex flex-col md:flex-row md:items-end md:justify-between gap-stack-md">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
              Pertanyaan Umum
            </span>
            <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-text-main mb-stack-sm mt-2">
              FAQ
            </h2>
            <div className="h-1 w-16 bg-accent-cyan rounded-full"></div>
          </div>
          <a
            href="/kontak"
            className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-2 group font-semibold"
          >
            Masih Ada Pertanyaan?
            <span className="text-[16px] group-hover:translate-x-1 transition-transform">
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </span>
          </a>
        </div>
      </Reveal>

      <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-stack-sm">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={faq.question} delay={index * 0.06}>
              <div className="bg-white border border-border-subtle rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-surface-container-lowest transition-colors"
                >
                  <h3 className="font-headline-md text-headline-md text-primary font-semibold">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 font-body-md text-body-md text-text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}