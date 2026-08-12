"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION = 2400;

export default function SplashScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), SPLASH_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#002B5B] to-[#001D3D]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {/* Expanding rings */}
          <motion.div
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-accent-cyan/30"
            animate={{ scale: [0.8, 1.5], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/10"
            animate={{ scale: [0.7, 1.6], opacity: [0.9, 0] }}
            transition={{ duration: 2.2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
          />

          {/* Logo */}
          <motion.img
            src="/images/Logo.png"
            alt="CasstroDev"
            className="relative w-44 sm:w-56 h-auto z-10"
            initial={{ opacity: 0, scale: 0.55, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* Brand name */}
          <motion.span
            className="relative z-10 mt-6 font-label-md text-label-md text-white/80 uppercase tracking-[0.35em] font-semibold"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            CasstroDev
          </motion.span>

          {/* Loading bar */}
          <div className="relative z-10 mt-10 h-1 w-44 sm:w-52 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-cyan rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}