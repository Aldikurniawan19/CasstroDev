"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_DURATION = 1800;

// Precompute 24 smooth points along ellipse path
const STEPS = 24;
const RX = 100; // horizontal radius in px
const RY = 36;  // vertical radius in px

const pathAX: number[] = [];
const pathAY: number[] = [];
const pathBX: number[] = [];
const pathBY: number[] = [];

for (let i = 0; i <= STEPS; i++) {
  const angleA = (i / STEPS) * 2 * Math.PI;
  const angleB = angleA + Math.PI; // 180 deg offset for second electron

  pathAX.push(Math.cos(angleA) * RX);
  pathAY.push(Math.sin(angleA) * RY);

  pathBX.push(Math.cos(angleB) * RX);
  pathBY.push(Math.sin(angleB) * RY);
}

export default function SplashScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    const hideTimer = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, SPLASH_DURATION);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="splash-screen"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#002B5B] to-[#001D3D] text-white select-none cursor-default"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0.95 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          {/* Soft ambient background glow */}
          <motion.div
            className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-accent-cyan/10 rounded-full filter blur-[90px] pointer-events-none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Centered Atomic Model Brand Mark */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            
            {/* Atomic Orbital Container */}
            <motion.div
              className="relative flex items-center justify-center w-52 h-52 sm:w-64 sm:h-64"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* Rotating Atomic Oval Track 1 (Horizontal Start 0deg) */}
              <motion.div
                className="absolute w-48 h-18 sm:w-56 sm:h-20 rounded-[50%] border border-accent-cyan/40 shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {/* Uniform Electron 1A */}
                <motion.span
                  className="absolute w-2.5 h-2.5 bg-accent-cyan rounded-full shadow-[0_0_10px_#00e5ff]"
                  animate={{ x: pathAX, y: pathAY }}
                  transition={{
                    x: { duration: 3.6, repeat: Infinity, ease: "linear" },
                    y: { duration: 3.6, repeat: Infinity, ease: "linear" },
                  }}
                />
                {/* Uniform Electron 1B (180 deg offset) */}
                <motion.span
                  className="absolute w-2.5 h-2.5 bg-accent-cyan rounded-full shadow-[0_0_10px_#00e5ff]"
                  animate={{ x: pathBX, y: pathBY }}
                  transition={{
                    x: { duration: 3.6, repeat: Infinity, ease: "linear" },
                    y: { duration: 3.6, repeat: Infinity, ease: "linear" },
                  }}
                />
              </motion.div>

              {/* Rotating Atomic Oval Track 2 (Tilted Start 60deg) */}
              <motion.div
                className="absolute w-48 h-18 sm:w-56 sm:h-20 rounded-[50%] border border-accent-cyan/40 shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center pointer-events-none"
                animate={{ rotate: [60, 420] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {/* Uniform Electron 2A */}
                <motion.span
                  className="absolute w-2.5 h-2.5 bg-accent-cyan rounded-full shadow-[0_0_10px_#00e5ff]"
                  animate={{ x: pathAX, y: pathAY }}
                  transition={{
                    x: { duration: 3.2, repeat: Infinity, ease: "linear" },
                    y: { duration: 3.2, repeat: Infinity, ease: "linear" },
                  }}
                />
                {/* Uniform Electron 2B (180 deg offset) */}
                <motion.span
                  className="absolute w-2.5 h-2.5 bg-accent-cyan rounded-full shadow-[0_0_10px_#00e5ff]"
                  animate={{ x: pathBX, y: pathBY }}
                  transition={{
                    x: { duration: 3.2, repeat: Infinity, ease: "linear" },
                    y: { duration: 3.2, repeat: Infinity, ease: "linear" },
                  }}
                />
              </motion.div>

              {/* Rotating Atomic Oval Track 3 (Tilted Start -60deg) */}
              <motion.div
                className="absolute w-48 h-18 sm:w-56 sm:h-20 rounded-[50%] border border-accent-cyan/40 shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center pointer-events-none"
                animate={{ rotate: [-60, 300] }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              >
                {/* Uniform Electron 3A */}
                <motion.span
                  className="absolute w-2.5 h-2.5 bg-accent-cyan rounded-full shadow-[0_0_10px_#00e5ff]"
                  animate={{ x: pathAX, y: pathAY }}
                  transition={{
                    x: { duration: 4.0, repeat: Infinity, ease: "linear" },
                    y: { duration: 4.0, repeat: Infinity, ease: "linear" },
                  }}
                />
                {/* Uniform Electron 3B (180 deg offset) */}
                <motion.span
                  className="absolute w-2.5 h-2.5 bg-accent-cyan rounded-full shadow-[0_0_10px_#00e5ff]"
                  animate={{ x: pathBX, y: pathBY }}
                  transition={{
                    x: { duration: 4.0, repeat: Infinity, ease: "linear" },
                    y: { duration: 4.0, repeat: Infinity, ease: "linear" },
                  }}
                />
              </motion.div>

              {/* Atomic Nucleus Ambient Pulse */}
              <motion.div
                className="absolute w-16 h-16 sm:w-24 sm:h-24 bg-accent-cyan/25 rounded-full filter blur-xl"
                animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Central Logo */}
              <motion.img
                src="/images/Logo.png"
                alt="CasstroDev Logo"
                className="relative z-10 w-16 sm:w-22 h-auto drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                initial={{ opacity: 0, scale: 0.75, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              className="font-bold text-xl sm:text-2xl tracking-[0.25em] text-white uppercase"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              CASSTRO<span className="text-accent-cyan font-extrabold">DEV</span>
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}