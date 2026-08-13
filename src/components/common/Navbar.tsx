"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const navItems = [
  { name: "Home", href: "/", id: "home" },
  { name: "Layanan", href: "/layanan", id: "layanan" },
  { name: "Portofolio", href: "/portofolio", id: "portofolio" },
  { name: "Tentang Kami", href: "/tentang-kami", id: "tentang-kami" },
  { name: "Kontak", href: "/kontak", id: "kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, { y: -24, autoAlpha: 0, duration: 0.6, ease: "power3.out" });
    }
  }, []);

  const activeId =
    pathname === "/" ? "home" : (pathname.split("/")[1] as string | undefined) ?? "";

  return (
    <header
      ref={headerRef}
      className="bg-white/80 dark:bg-surface/80 font-body-md text-body-md docked full-width top-0 sticky backdrop-blur-xl border-b border-border-subtle dark:border-outline-variant z-50 transition-all duration-300"
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
        {/* Brand */}
        <Link
          href="/"
          className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-container flex items-center hover:opacity-90 transition-opacity"
        >
          <img src="/images/Logo.png" alt="CasstroDev Logo" className="h-11 w-auto -mr-1" />
          asstroDev
        </Link>
        <nav className="hidden md:flex gap-8 items-center" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`font-headline-md text-[16px] leading-[1.3] transition-colors relative py-1 ${
                  isActive
                    ? "text-primary dark:text-primary-container font-semibold border-b-2 border-accent-cyan"
                    : "text-text-muted dark:text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Trailing Action */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/kontak"
            className="bg-primary-container text-on-primary px-6 py-2.5 rounded font-label-md text-label-md hover:bg-primary transition-colors inline-block text-center shadow-sm"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          aria-label="Toggle Mobile Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="material-symbols-outlined text-[24px]" id="menu-icon">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${open ? "block" : "hidden"} md:hidden bg-white dark:bg-surface border-b border-border-subtle px-margin-mobile py-6 transition-all duration-300`}
      >
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`font-headline-md text-lg py-2 border-b border-border-subtle/50 transition-colors ${
                  isActive
                    ? "text-primary dark:text-primary-container font-bold pl-2 border-l-4 border-l-accent-cyan"
                    : "text-text-muted dark:text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            href="/kontak"
            onClick={() => setOpen(false)}
            className="mt-2 bg-primary-container text-on-primary px-6 py-3 rounded font-label-md text-label-md text-center block w-full hover:bg-primary transition-colors"
          >
            Hubungi Kami
          </Link>
        </nav>
      </div>
    </header>
  );
}