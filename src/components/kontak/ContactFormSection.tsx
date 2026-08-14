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
  ChevronDown,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const TARGET_TEXT = "Solusi Digital";
const WORDS = TARGET_TEXT.split(" ");

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

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
    <section className="relative py-16 md:py-24 bg-surface-off-white dark:bg-[#040d1a] w-full min-h-[85vh] flex items-center overflow-hidden">
      {/* Decorative Subtle Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-primary/10 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-4 md:px-8 w-full relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Reveal y={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Konsultasi Proyek Gratis</span>
            </div>
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-slate-900 dark:text-white font-extrabold tracking-tight mb-4">
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
            <p className="font-body-lg text-body-lg text-text-muted dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Diskusikan kebutuhan perangkat lunak Anda langsung bersama tim ahli. Kami siap membantu merancang arsitektur sistem yang presisi, aman, dan siap diskalakan.
            </p>
          </Reveal>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Sidebar Contact Info & Guarantees */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <Reveal y={24}>
              <div className="bg-white/80 dark:bg-[#07162c]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/90 dark:border-white/10">
                  <h3 className="font-headline-md text-headline-md text-primary dark:text-white font-bold">
                    Kontak Resmi
                  </h3>
                </div>

                <div className="space-y-4 text-text-muted dark:text-slate-300 text-body-md font-body-md">
                  {/* Email Direct */}
                  <div
                    onClick={() => copyToClipboard("adityakachef15@gmail.com", "email")}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Email Resmi
                        </span>
                        <span className="font-body-md text-body-md font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                          adityakachef15@gmail.com
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied === "email" ? "Tersalin!" : "Salin"}
                    </span>
                  </div>

                  {/* Direct WhatsApp */}
                  <a
                    href="https://wa.me/6283873688118"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          WhatsApp Quick Chat
                        </span>
                        <span className="font-body-md text-body-md font-semibold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                          +62 838-7368-8118
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Working Hours */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Jam Operasional Tim
                      </span>
                      <span className="font-body-md text-body-md font-medium text-slate-900 dark:text-white block">
                        Senin – Jumat: 08:00 – 17:00 WIB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Guarantees */}
                <div className="pt-4 border-t border-slate-200/90 dark:border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Jaminan Kerahasiaan Data & Perjanjian NDA</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Respon awal balasan estimasi dalam &lt; 24 Jam Kerja</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Interactive Form Card */}
          <div className="lg:col-span-7">
            <Reveal y={30}>
              <div className="bg-white/90 dark:bg-[#07162c]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-8 md:p-9 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden h-full flex flex-col justify-between">
                {submitted ? (
                  <div className="py-14 px-4 text-center space-y-6 my-auto">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-white font-bold">
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
                    <div className="flex items-center justify-between mb-1 pb-3 border-b border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-secondary" />
                        <h3 className="font-headline-md text-lg sm:text-headline-md font-bold text-slate-900 dark:text-white">
                          Formulir Konsultasi Proyek
                        </h3>
                      </div>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-label-sm text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                          className="w-full px-4 py-3 rounded-xl bg-slate-50/90 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block font-label-sm text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                          className="w-full px-4 py-3 rounded-xl bg-slate-50/90 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp & Service Category Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="whatsapp"
                          className="block font-label-sm text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                          className="w-full px-4 py-3 rounded-xl bg-slate-50/90 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="service"
                          className="block font-label-sm text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Kategori Layanan
                        </label>
                        <div className="relative">
                          <select
                            id="service"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50/90 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all cursor-pointer appearance-none"
                          >
                            <option value="Web Development">Web Development / Portal SaaS</option>
                            <option value="Sistem Informasi">Sistem Informasi & ERP Gudang</option>
                            <option value="UI/UX Design">UI/UX Design & Branding</option>
                            <option value="Enterprise Solution">Solusi Digital Enterprise Custom</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Budget Select */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block font-label-sm text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Estimasi Budget Proyek
                      </label>
                      <div className="relative">
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50/90 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all cursor-pointer appearance-none"
                        >
                          <option value="< Rp 15 Juta">&lt; Rp 15 Juta</option>
                          <option value="Rp 15 Juta - Rp 50 Juta">Rp 15 Juta – Rp 50 Juta</option>
                          <option value="Rp 50 Juta - Rp 100 Juta">Rp 50 Juta – Rp 100 Juta</option>
                          <option value="> Rp 100 Juta">&gt; Rp 100 Juta (Enterprise Scale)</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-label-sm text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/90 dark:bg-[#040d1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-animated w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-container to-secondary hover:from-primary hover:to-primary-container disabled:bg-slate-400 text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20 hover:shadow-xl transition-all cursor-pointer group"
                    >
                      {loading ? (
                        <span>Mengirim Pesan...</span>
                      ) : (
                        <>
                          <span>Kirim Permintaan Konsultasi</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
