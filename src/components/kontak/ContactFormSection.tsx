"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  MessageSquare,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const TARGET_TEXT = "Solusi Digital";
const WORDS = TARGET_TEXT.split(" ");

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: "Web Development",
    budget: "< Rp 15 Juta",
    message: "",
  });

  const containerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tlShimmer = useRef<gsap.core.Timeline | null>(null);

  const setLetterRef = useCallback(
    (el: HTMLSpanElement | null, i: number) => {
      lettersRef.current[i] = el;
    },
    []
  );

  useGSAP(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    /* ── Animasi 3D Letter Pop-In & Shimmer berulang ── */
    const tl = gsap.timeline({ repeat: -1, delay: 0.2, repeatDelay: 1.0 });

    // 1. Entrance: 3D letter pop-in
    tl.fromTo(
      letters,
      {
        y: 30,
        opacity: 0,
        rotateX: -90,
        scale: 0.6,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.04,
        ease: "back.out(1.7)",
      }
    );

    // 2. Continuous Shimmer Glow
    tl.to(letters, {
      color: "#00e5ff",
      textShadow: "0 0 18px rgba(0,229,255,0.7), 0 0 35px rgba(0,229,255,0.4)",
      duration: 0.35,
      stagger: { each: 0.05, from: "start" },
      ease: "power2.inOut",
    });

    tl.to(
      letters,
      {
        color: "var(--color-secondary)",
        textShadow: "0 0 0px transparent",
        duration: 0.4,
        stagger: { each: 0.05, from: "start" },
        ease: "power2.inOut",
      },
      "+=0.15"
    );

    // 3. Pause & smooth reset for repeating loop
    tl.to({}, { duration: 2.5 });

    tl.to(letters, {
      y: -20,
      opacity: 0,
      rotateX: 45,
      scale: 0.8,
      duration: 0.45,
      stagger: 0.02,
      ease: "power2.in",
    });

    tlShimmer.current = tl;
  }, []);

  /* ── Hover: Magnetic Scatter & Regroup ── */
  const handleMouseEnter = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    tlShimmer.current?.pause();

    letters.forEach((letter, i) => {
      const xOffset = (Math.random() - 0.5) * 26;
      const yOffset = (Math.random() - 0.5) * 18;
      const rot = (Math.random() - 0.5) * 22;
      gsap.to(letter, {
        x: xOffset,
        y: yOffset,
        rotation: rot,
        scale: 1.2,
        color: "#00e5ff",
        textShadow: "0 0 14px rgba(0,229,255,0.6)",
        duration: 0.35,
        delay: i * 0.015,
        ease: "power3.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (letters.length === 0) return;

    gsap.to(letters, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      color: "var(--color-secondary)",
      textShadow: "0 0 0px transparent",
      duration: 0.5,
      stagger: 0.025,
      ease: "elastic.out(1, 0.4)",
      onComplete: () => {
        tlShimmer.current?.resume();
      },
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/adityakachef15@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[Konsultasi Proyek CasstroDev] - ${formData.name}`,
          _template: "table",
          "Nama Lengkap": formData.name,
          "Email Bisnis": formData.email,
          "Nomor WhatsApp": formData.whatsapp,
          "Kategori Layanan": formData.service,
          "Estimasi Budget": formData.budget,
          "Deskripsi Proyek": formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-surface-off-white dark:bg-[#040d1a] w-full min-h-[85vh] flex items-center">
      <div className="max-w-container-max mx-auto px-4 md:px-8 w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Reveal y={24}>
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-black dark:text-white font-extrabold tracking-tight mb-4">
              Mari Wujudkan{" "}
              <span
                ref={containerRef}
                className="inline-flex cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: "600px" }}
              >
                {WORDS.map((word, wIdx) => {
                  const charOffset = WORDS.slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0);
                  return (
                    <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
                      {word.split("").map((char, cIdx) => {
                        const globalIndex = charOffset + cIdx;
                        return (
                          <span
                            key={cIdx}
                            ref={(el) => setLetterRef(el, globalIndex)}
                            className="inline-block text-secondary transition-none"
                            style={{ willChange: "transform, opacity, color" }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </span>{" "}
              Perusahaan Anda
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
              Diskusikan kebutuhan rekayasa perangkat lunak Anda bersama tim ahli kami. Kami siap membantu merancang arsitektur sistem yang tepat, presisi, dan siap diskalakan.
            </p>
          </Reveal>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sidebar Contact Info & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal y={30}>
              <div className="bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/40 dark:shadow-none space-y-6">
                <h3 className="font-headline-md text-headline-md text-primary dark:text-white font-bold pb-3 border-b border-slate-200 dark:border-white/10">
                  Informasi Kontak Resmi
                </h3>

                <div className="space-y-4 text-text-muted dark:text-slate-300 text-body-md font-body-md">
                  {/* Email Direct */}
                  <a
                    href="mailto:adityakachef15@gmail.com"
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                        Email Resmi
                      </span>
                      <span className="font-body-md text-body-md font-medium text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        adityakachef15@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Direct WhatsApp */}
                  <a
                    href="https://wa.me/6283873688118"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                        WhatsApp Fast Response
                      </span>
                      <span className="font-body-md text-body-md font-medium text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                        +62 838-7368-8118
                      </span>
                    </div>
                  </a>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                        Jam Kerja Operasional
                      </span>
                      <span className="font-body-md text-body-md font-medium text-slate-900 dark:text-white block">
                        Senin – Jumat: 08:00 – 17:00 WIB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Guarantees */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2.5 font-label-sm text-label-sm text-text-muted dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Jaminan privasi data & NDA perencana bisnis</span>
                  </div>
                  <div className="flex items-center gap-2.5 font-label-sm text-label-sm text-text-muted dark:text-slate-400">
                    <Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Respon awal balasan estimasi dalam &lt; 24 Jam Kerja</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Interactive Form Card */}
          <div className="lg:col-span-7">
            <Reveal y={35}>
              <div className="bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
                {submitted ? (
                  <div className="py-12 px-4 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline-md text-headline-md text-primary dark:text-white font-bold">
                        Pesan Anda Berhasil Terkirim!
                      </h3>
                      <p className="font-body-md text-body-md text-text-muted dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                        Terima kasih telah berkonsultasi dengan CasstroDev. Tim engineering kami akan meninjau detail proyek Anda dan menghubungi dalam waktu &lt; 24 jam.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href="https://wa.me/6283873688118"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-label-md text-label-md font-semibold inline-flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Diskusi via WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            whatsapp: "",
                            service: "Web Development",
                            budget: "< Rp 15 Juta",
                            message: "",
                          });
                        }}
                        className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-label-md text-label-md font-semibold transition-all cursor-pointer inline-block"
                      >
                        Isi Ulang Form
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-secondary" />
                      <h3 className="font-headline-md text-lg sm:text-headline-md font-bold text-primary dark:text-white">
                        Formulir Konsultasi Proyek
                      </h3>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Nama Lengkap <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Masukkan nama lengkap Anda"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Email Bisnis <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="contoh@perusahaan.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp & Service Category Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="whatsapp"
                          className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Nomor WhatsApp <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="whatsapp"
                          type="tel"
                          required
                          placeholder="081234567890"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="service"
                          className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Kategori Layanan
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all cursor-pointer"
                        >
                          <option value="Web Development">Web Development / Portal SaaS</option>
                          <option value="Sistem Informasi">Sistem Informasi & ERP Gudang</option>
                          <option value="UI/UX Design">UI/UX Design & Branding</option>
                          <option value="Enterprise Solution">Solusi Digital Enterprise Custom</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Estimasi Budget Proyek
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all cursor-pointer"
                      >
                        <option value="< Rp 15 Juta">&lt; Rp 15 Juta</option>
                        <option value="Rp 15 Juta - Rp 50 Juta">Rp 15 Juta – Rp 50 Juta</option>
                        <option value="Rp 50 Juta - Rp 100 Juta">Rp 50 Juta – Rp 100 Juta</option>
                        <option value="> Rp 100 Juta">&gt; Rp 100 Juta (Enterprise Scale)</option>
                      </select>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Deskripsi Singkat Kebutuhan Proyek <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="Jelaskan gambaran singkat aplikasi, tujuan bisnis, atau tantangan yang ingin Anda selesaikan..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-animated w-full py-3.5 px-6 rounded-xl bg-primary-container hover:bg-primary disabled:bg-slate-400 text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      {loading ? (
                        <span>Mengirim Pesan...</span>
                      ) : (
                        <>
                          <span>Kirim Permintaan Konsultasi</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
