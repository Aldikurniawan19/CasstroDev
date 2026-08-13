import Link from "next/link";
import Reveal from "@/components/common/Reveal";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full text-white font-body-md text-body-md full-width relative">
      {/* Top Wavy Shape Divider connecting page content & footer */}
      <div className="w-full overflow-hidden leading-none pointer-events-none select-none -mb-1 relative z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 md:h-20 block text-[#002B5B]"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="bg-gradient-to-b from-[#002B5B] to-[#001D3D] relative overflow-hidden">
        {/* Subtle ambient glow in background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <Reveal y={30} className="grid grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto relative z-10">
        {/* Brand Info */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <Link
            href="/"
            className="font-headline-sm text-headline-sm font-bold text-white text-[22px] leading-[1.4] flex items-center group"
          >
            <img src="/images/Logo.png" alt="CasstroDev Logo" className="h-11 w-auto -mr-1" />
            CasstroDev
          </Link>
          <p className="text-slate-300 font-body-md max-w-sm leading-relaxed text-sm">
            Rekayasa perangkat lunak presisi untuk skala enterprise. Membangun sistem digital
            berkinerja tinggi, aman, dan terukur.
          </p>
        </div>

        {/* Navigation & Links */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3.5">
            <span className="font-label-md text-label-md text-white font-bold tracking-wide uppercase text-xs">
              Navigasi
            </span>
            <Link className="text-slate-300 hover:text-accent-cyan transition-colors text-sm" href="/">
              Home
            </Link>
            <Link
              className="text-slate-300 hover:text-accent-cyan transition-colors text-sm"
              href="/layanan"
            >
              Layanan
            </Link>
            <Link
              className="text-slate-300 hover:text-accent-cyan transition-colors text-sm"
              href="/portofolio"
            >
              Portofolio
            </Link>
            <Link
              className="text-slate-300 hover:text-accent-cyan transition-colors text-sm"
              href="/tentang-kami"
            >
              Tentang Kami
            </Link>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="font-label-md text-label-md text-white font-bold tracking-wide uppercase text-xs">
              Layanan
            </span>
            <a
              className="text-slate-300 hover:text-accent-cyan transition-colors text-sm"
              href="/layanan#web"
            >
              Web Architecture
            </a>
            <a
              className="text-slate-300 hover:text-accent-cyan transition-colors text-sm"
              href="/layanan#uiux"
            >
              UI/UX Systems
            </a>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="font-label-md text-label-md text-white font-bold tracking-wide uppercase text-xs">
              Legal
            </span>
            <a className="text-slate-300 hover:text-accent-cyan transition-colors text-sm" href="#">
              Privacy Policy
            </a>
            <a className="text-slate-300 hover:text-accent-cyan transition-colors text-sm" href="#">
              Terms of Service
            </a>
          </div>

          <div className="flex flex-col gap-3.5 col-span-2 md:col-span-1">
            <span className="font-label-md text-label-md text-white font-bold tracking-wide uppercase text-xs">
              Kantor
            </span>
            <p className="text-slate-300 font-body-md text-sm leading-relaxed">
              Jl. Sudirman No. 123
              <br />
              Jakarta Pusat, 10220
              <br />
              Indonesia
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-12 mt-12 pt-8 border-t border-white/10 text-slate-400 font-body-md text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} CasstroDev. All rights reserved.</p>
        </div>
      </Reveal>
      </div>
    </footer>
  );
}