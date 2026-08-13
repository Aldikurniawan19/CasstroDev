"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mail,
  GripVertical,
} from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; actionId: string }[];
  ctaUrl?: string;
  ctaText?: string;
  isFallback?: boolean;
}

const FAQ_KNOWLEDGE_BASE: Record<
  string,
  {
    answer: string;
    ctaUrl?: string;
    ctaText?: string;
  }
> = {
  biaya: {
    answer:
      "Estimasi biaya pembuatan aplikasi atau website disesuaikan dengan skala dan fitur proyek. Paket landing page / company profile mulai dari Rp 5–15 Juta, sedangkan Sistem Informasi / SaaS / Enterprise disesuaikan dengan arsitektur fitur.",
    ctaUrl: "/kontak",
    ctaText: "Minta Estimasi Biaya di /kontak",
  },
  durasi: {
    answer:
      "Proyek landing page & portal responsif membutuhkan waktu 1–3 minggu. Untuk Aplikasi Web, Sistem Informasi Gudang, atau Platform SaaS kustom memakan waktu 4–8 minggu dengan sprint terukur.",
    ctaUrl: "/kontak",
    ctaText: "Jadwalkan Timeline Proyek",
  },
  revisi: {
    answer:
      "Kami memberikan 3x Garansi Revisi Mayor pada tahap desain UI/UX & Wireframe, serta Revisi Minor Tak Terbatas selama masa sprint pengembangan sebelum rilis final produk.",
    ctaUrl: "/kontak",
    ctaText: "Diskusikan Proyek Anda",
  },
  sourcecode: {
    answer:
      "Ya! 100% Hak Milik Intelektual (IP) & Source Code menjadi milik penuh perusahaan Anda setelah serah terima proyek selesai. Kami juga menyerahkan repositori GitHub/GitLab lengkap.",
    ctaUrl: "/kontak",
    ctaText: "Mulai Kerjasama Proyek",
  },
  pembayaran: {
    answer:
      "Sistem pembayaran terbagi dalam 3 termin transparan: DP 30% (Kontrak Diteken) ➔ Termin 40% (Demo Fitur Beta Release) ➔ Pelunasan 30% (Saat Rilis Final & Serah Terima).",
    ctaUrl: "/kontak",
    ctaText: "Konsultasi Syarat Kerjasama",
  },
  hosting: {
    answer:
      "Seluruh paket pengembangan kami sudah mencakup Gratis Domain (.COM / .ID selama 1 tahun) serta konfigurasi deployment Cloud Server VPS (AWS / Google Cloud / Vercel Enterprise) siap pakai.",
    ctaUrl: "/kontak",
    ctaText: "Tanyakan Setup Hosting",
  },
  mobile: {
    answer:
      "Bisa! Selain aplikasi web responsif (PWA), kami juga mengembangkan aplikasi mobile cross-platform (React Native / Flutter) yang siap rilis di Google Play Store & Apple App Store.",
    ctaUrl: "/kontak",
    ctaText: "Konsultasi Apps Mobile",
  },
  keamanan: {
    answer:
      "Kami menandatangani Surat Perjanjian Kerahasiaan (NDA) resmi dan menerapkan standar enkripsi SSL/TLS, proteksi OWASP Top 10, serta cadangan database terenkripsi berkala.",
    ctaUrl: "/kontak",
    ctaText: "Pelajari Standar Keamanan",
  },
  techstack: {
    answer:
      "Kami menggunakan arsitektur modern berkinerja tinggi seperti Next.js, React, TypeScript, Tailwind CSS, Node.js, Laravel, PostgreSQL, Docker, dan Redis.",
    ctaUrl: "/portofolio",
    ctaText: "Lihat Contoh Proyek Kami",
  },
  alur: {
    answer:
      "Proses kerja terdiri dari 4 tahap: 1. Konsultasi & Riset Kebutuhan ➔ 2. Perancangan UI/UX & Arsitektur ➔ 3. Pengembangan Modular (Sprint) ➔ 4. Pengujian (QA), Rilis & Pemeliharaan.",
    ctaUrl: "/kontak",
    ctaText: "Mulai Konsultasi Gratis",
  },
  garansi: {
    answer:
      "Setiap proyek CasstroDev dilengkapi garansi perbaikan bug gratis pasca-rilis serta dukungan pemeliharaan sistem berkala (Security Updates & Server Backup).",
    ctaUrl: "/kontak",
    ctaText: "Tanyakan Layanan Maintenance",
  },
};

const INITIAL_CHIPS = [
  { label: "💰 Estimasi Biaya Proyek", actionId: "biaya" },
  { label: "⏱️ Durasi Pengerjaan", actionId: "durasi" },
  { label: "🔄 Batas Jumlah Revisi", actionId: "revisi" },
];

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bot" | "wa">("bot");
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const waNumber = "6283873688118";
  const defaultMessage = encodeURIComponent(
    "Halo CasstroDev, saya ingin konsultasi mengenai pembuatan proyek software/aplikasi."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${defaultMessage}`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Halo! 👋 Saya AstroChat. Silakan ketik pertanyaan Anda atau pilih topik di bawah ini:",
      options: INITIAL_CHIPS,
    },
  ]);

  const [dragBounds, setDragBounds] = useState({ top: -600, left: -800, right: 0, bottom: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (typeof window !== "undefined") {
        setDragBounds({
          top: -window.innerHeight + 100,
          left: -window.innerWidth + 100,
          right: 0,
          bottom: 0,
        });
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Keyword Matching Logic (Rule-Based NLP)
  const findMatchingKey = (query: string): string | null => {
    const q = query.toLowerCase();

    if (
      q.includes("revisi") ||
      q.includes("ubah") ||
      q.includes("ganti") ||
      q.includes("revision") ||
      q.includes("edit") ||
      q.includes("perbaikan")
    ) {
      return "revisi";
    }

    if (
      q.includes("source") ||
      q.includes("code") ||
      q.includes("koding") ||
      q.includes("hak") ||
      q.includes("milik") ||
      q.includes("pemilik") ||
      q.includes("repo") ||
      q.includes("github") ||
      q.includes("gitlab") ||
      q.includes("akses")
    ) {
      return "sourcecode";
    }

    if (
      q.includes("pembayaran") ||
      q.includes("termin") ||
      q.includes("dp") ||
      q.includes("lunas") ||
      q.includes("cicil") ||
      q.includes("transfer") ||
      q.includes("kontrak")
    ) {
      return "pembayaran";
    }

    if (
      q.includes("domain") ||
      q.includes("server") ||
      q.includes("hosting") ||
      q.includes("vps") ||
      q.includes("aws") ||
      q.includes("gcp") ||
      q.includes("cloud") ||
      q.includes("deploy")
    ) {
      return "hosting";
    }

    if (
      q.includes("mobile") ||
      q.includes("android") ||
      q.includes("ios") ||
      q.includes("hp") ||
      q.includes("playstore") ||
      q.includes("appstore") ||
      q.includes("apk")
    ) {
      return "mobile";
    }

    if (
      q.includes("biaya") ||
      q.includes("harga") ||
      q.includes("bayar") ||
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("rate") ||
      q.includes("murah") ||
      q.includes("budget")
    ) {
      return "biaya";
    }

    if (
      q.includes("durasi") ||
      q.includes("lama") ||
      q.includes("waktu") ||
      q.includes("deadline") ||
      q.includes("hari") ||
      q.includes("bulan") ||
      q.includes("minggu") ||
      q.includes("cepat")
    ) {
      return "durasi";
    }

    if (
      q.includes("tech") ||
      q.includes("stack") ||
      q.includes("bahasa") ||
      q.includes("framework") ||
      q.includes("react") ||
      q.includes("next") ||
      q.includes("laravel") ||
      q.includes("node") ||
      q.includes("postgres")
    ) {
      return "techstack";
    }

    if (
      q.includes("alur") ||
      q.includes("tahap") ||
      q.includes("proses") ||
      q.includes("langkah") ||
      q.includes("cara") ||
      q.includes("kerja") ||
      q.includes("mulai")
    ) {
      return "alur";
    }

    if (
      q.includes("garansi") ||
      q.includes("bug") ||
      q.includes("maintenance") ||
      q.includes("rawat") ||
      q.includes("support") ||
      q.includes("pelihara") ||
      q.includes("aman") ||
      q.includes("nda") ||
      q.includes("privasi") ||
      q.includes("rahasia")
    ) {
      return q.includes("nda") || q.includes("privasi") || q.includes("rahasia")
        ? "keamanan"
        : "garansi";
    }

    return null;
  };

  const processBotResponse = (actionIdOrKeyword: string, userQueryText: string) => {
    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userQueryText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate Bot Typing
    setTimeout(() => {
      setIsTyping(false);
      const matchedKey = findMatchingKey(actionIdOrKeyword) || actionIdOrKeyword;
      const kbItem = FAQ_KNOWLEDGE_BASE[matchedKey];

      if (kbItem) {
        // Matched Known Answer
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: kbItem.answer,
          ctaUrl: kbItem.ctaUrl,
          ctaText: kbItem.ctaText,
          options: INITIAL_CHIPS.filter((c) => c.actionId !== matchedKey).slice(0, 2),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Fallback Strategy (Unrecognized Question)
        const fallbackMsg: ChatMessage = {
          id: `bot-fallback-${Date.now()}`,
          sender: "bot",
          text: "Mohon maaf, AstroChat saat ini belum dapat menjawab pertanyaan tersebut. Untuk respons yang lebih cepat dan mendalam, silakan hubungi tim kami langsung melalui WhatsApp atau Email:",
          isFallback: true,
          ctaUrl: waUrl,
          ctaText: "💬 Chat Langsung via WhatsApp",
          options: [
            { label: "📧 Kirim Form Konsultasi (/kontak)", actionId: "go_kontak" },
            { label: "🔄 Tanya Pertanyaan Lain", actionId: "reset_chat" },
          ],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    }, 450);
  };

  const handleSelectOption = (actionId: string, label: string) => {
    if (actionId === "go_kontak") {
      setIsOpen(false);
      window.location.href = "/kontak";
      return;
    }
    if (actionId === "reset_chat") {
      handleResetChat();
      return;
    }
    processBotResponse(actionId, label);
  };

  const handleSendMessageSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    setInputText("");
    processBotResponse(query, query);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Chatbot telah direset. Silakan ketik pertanyaan Anda atau pilih topik yang tersedia:",
        options: INITIAL_CHIPS,
      },
    ]);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      dragConstraints={dragBounds}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans select-none touch-none"
    >
      {/* Interactive Floating Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.94 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-white dark:bg-[#07162c] border border-slate-200/90 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[560px] h-[540px]"
          >
            {/* Widget Header with Dual Tabs & Drag Handle */}
            <div className="bg-slate-900 dark:bg-slate-950 p-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing p-1 -ml-1" title="Geser posisi widget">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white leading-tight">
                      AstroChat
                    </h4>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online &amp; Fast Response
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Tutup widget chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Selector Buttons */}
              <div className="grid grid-cols-2 gap-1.5 bg-slate-800/80 p-1 rounded-xl font-mono text-label-sm">
                <button
                  type="button"
                  onClick={() => setActiveTab("bot")}
                  className={`py-1.5 px-3 rounded-lg font-mono text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "bot"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>AstroChat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("wa")}
                  className={`py-1.5 px-3 rounded-lg font-mono text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "wa"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Hubungi WA</span>
                </button>
              </div>
            </div>

            {/* TAB 1: CHATBOT AUTOMATION & CUSTOM INPUT */}
            {activeTab === "bot" ? (
              <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/60 dark:bg-slate-900/60">
                {/* Chat Messages Log */}
                <div className="p-4 overflow-y-auto space-y-3.5 flex-1 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.3)_transparent]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Message Bubble */}
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none"
                        }`}
                      >
                        {msg.text}

                        {/* CTA Button if available */}
                        {msg.ctaUrl && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60">
                            {msg.ctaUrl.startsWith("http") ? (
                              <a
                                href={msg.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                              >
                                <span>{msg.ctaText}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <Link
                                href={msg.ctaUrl}
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <span>{msg.ctaText || "Selengkapnya"}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Quick Option Chips */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {msg.options.map((opt) => (
                            <button
                              key={opt.actionId}
                              type="button"
                              onClick={() => handleSelectOption(opt.actionId, opt.label)}
                              className="btn-animated px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 border border-slate-200 dark:border-slate-700 text-xs font-medium shadow-sm cursor-pointer"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <span className="italic">AstroChat sedang mengetik...</span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Interactive Text Input & Controls Bar */}
                <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-2.5 space-y-2 shrink-0">
                  <form
                    onSubmit={handleSendMessageSubmit}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ketik pertanyaan Anda..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      aria-label="Kirim pertanyaan"
                      className="btn-animated w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="flex items-center justify-between px-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <button
                      type="button"
                      onClick={handleResetChat}
                      className="hover:text-blue-500 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Obrolan</span>
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Hubungi WA</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: DIRECT WHATSAPP ACTION */
              <div className="p-5 flex-1 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                      <MessageCircle className="w-6 h-6 fill-white/20" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Hubungi Tim via WhatsApp
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Dapatkan respon langsung dari insinyur dan konsultan CasstroDev untuk diskusi proyek Anda.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Nomor WA Resmi: +62 838-7368-8118</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Email: adityakachef15@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>Bebas Konsultasi &amp; Estimasi Proyek</span>
                    </div>
                  </div>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animated w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer"
                >
                  <span>Buka Chat WhatsApp</span>
                  <Send className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-grab active:cursor-grabbing"
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/25 flex items-center justify-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
          aria-label="Buka AstroChat & WhatsApp"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageCircle className="w-7 h-7 fill-white/20" />
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
