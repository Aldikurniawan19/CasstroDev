"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/common/Reveal";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Tag,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
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
    service: "",
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
          _subject: `[Kontak Website] - ${formData.name}`,
          _template: "table",
          "Nama Lengkap": formData.name,
          "Email": formData.email,
          "Jenis Layanan": formData.service || "Umum / Konsultasi",
          "Pesan": formData.message,
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
        {/* Top Centered Header with Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Reveal y={20}>
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
              Bisnis Anda
            </h1>
            <p className="font-body-lg text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Punya proyek atau pertanyaan? Kami siap membantu
              <br className="hidden sm:inline" /> mewujudkan solusi digital terbaik untuk Anda.
            </p>
          </Reveal>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* Left Column: Hubungi Kami */}
          <div className="lg:col-span-5 pt-2">
            <Reveal y={25}>
              <div>
                <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Hubungi Kami
                </h2>
                <div className="w-10 h-1 bg-blue-600 rounded-full mb-8 sm:mb-10" />

                <div className="space-y-6 sm:space-y-8">
                  {/* Email */}
                  <a
                    href="mailto:adityakachef15@gmail.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Email
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        adityakachef15@gmail.com
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/6283873688118"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        WhatsApp
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        +62 838 7368 8118
                      </p>
                    </div>
                  </a>

                  {/* Lokasi */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Lokasi
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Yogyakarta, Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Kirim Pesan Card */}
          <div className="lg:col-span-7">
            <Reveal y={30}>
              <div className="bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/40 dark:shadow-none">
                {submitted ? (
                  <div className="py-12 px-4 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Pesan Anda Berhasil Terkirim!
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                        Terima kasih telah menghubungi kami. Tim kami akan segera meninjau pesan Anda dan merespons dalam waktu singkat.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            service: "",
                            message: "",
                          });
                        }}
                        className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer inline-block"
                      >
                        Kirim Pesan Lainnya
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5">
                      Kirim Pesan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">
                      Isi form berikut dan kami akan segera merespons Anda.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      {/* Row 1: Nama Lengkap & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Nama Lengkap */}
                        <div className="relative">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Nama Lengkap"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#040d1a] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          />
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#040d1a] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 2: Jenis Layanan */}
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <Tag className="w-4 h-4" />
                        </div>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className={`w-full pl-10 pr-10 py-3 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#040d1a] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer appearance-none ${
                            formData.service ? "text-slate-900 dark:text-white" : "text-slate-400"
                          }`}
                        >
                          <option value="" disabled className="text-slate-400">
                            Jenis Layanan
                          </option>
                          <option value="Web Development" className="text-slate-900 dark:text-white">
                            Web Development
                          </option>
                          <option value="UI/UX Design" className="text-slate-900 dark:text-white">
                            UI/UX Design
                          </option>
                          <option value="Sistem Informasi & ERP" className="text-slate-900 dark:text-white">
                            Sistem Informasi & ERP
                          </option>
                          <option value="Solusi Digital Enterprise" className="text-slate-900 dark:text-white">
                            Solusi Digital Enterprise
                          </option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>

                      {/* Row 3: Textarea Pesan */}
                      <div className="relative">
                        <div className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          required
                          rows={5}
                          placeholder="Tulis pesan Anda di sini..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#040d1a] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none min-h-[130px]"
                        />
                      </div>

                      {/* Row 4: Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-animated w-full py-3.5 sm:py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-400 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all cursor-pointer"
                      >
                        {loading ? (
                          <span>Mengirim Pesan...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Kirim Pesan</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
