"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, Cpu, ShieldCheck } from "lucide-react";

const SPLASH_DURATION = 2200;

const TECH_LOGS = [
  "INVENTARISASI ARSITEKTUR SISTEM...",
  "MEMUAT INTI MODUL PRESIASI...",
  "SISTEM SIAP DILUNCURKAN...",
];

export default function SplashScreen() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // Mouse Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const { clientX, clientY } = e;
    const targetX = (clientX - window.innerWidth / 2) / 25;
    const targetY = (clientY - window.innerHeight / 2) / 25;
    mouseX.set(targetX);
    mouseY.set(targetY);
  };

  useEffect(() => {
    const startTime = Date.now();
    const duration = SPLASH_DURATION - 300;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct > 65) setLogIndex(2);
      else if (pct > 30) setLogIndex(1);

      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 20);

    const hideTimer = setTimeout(() => {
      setHidden(true);
    }, SPLASH_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="splash-screen"
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#002B5B] to-[#001D3D] text-white select-none cursor-default"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            opacity: 0,
          }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          {/* Cybernetic Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff0d_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Interactive Mouse Ambient Glow */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-accent-cyan/20 via-blue-600/15 to-transparent rounded-full filter blur-[100px] pointer-events-none opacity-80"
          />

          {/* Holographic Spinning HUD Rings */}
          <div className="relative flex items-center justify-center mb-6">
            <motion.div
              className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-accent-cyan/25 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-blue-500/20 border-t-accent-cyan"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Glowing Orbit Dots */}
            <motion.div
              className="absolute w-64 h-64 sm:w-80 sm:h-80"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute top-0 left-1/2 w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_12px_#00e5ff]" />
              <span className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_#60a5fa]" />
            </motion.div>

            {/* Central Interactive Logo Card */}
            <motion.div
              style={{ x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.7, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="relative z-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(0,229,255,0.15)] flex flex-col items-center justify-center group"
            >
              <motion.img
                src="/images/Logo.png"
                alt="CasstroDev Logo"
                className="w-24 sm:w-32 h-auto drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Brand Name & Tech Badge */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="flex flex-col items-center z-10 gap-2 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-[11px] uppercase tracking-widest font-semibold shadow-sm">
              <Cpu className="w-3 h-3 animate-pulse" />
              <span>CasstroDev Core Engine v2.4</span>
            </div>

            <h1 className="font-headline-xl text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              CASSTRO<span className="text-accent-cyan">DEV</span>
            </h1>
          </motion.div>

          {/* Progress Bar & Interactive 0-100% Counter */}
          <div className="relative z-10 mt-8 w-64 sm:w-80 flex flex-col items-center gap-3">
            {/* Live Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800/80 rounded-full p-0.5 border border-white/10 relative overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-accent-cyan to-cyan-300 rounded-full shadow-[0_0_12px_#00e5ff]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>

            {/* Live HUD Percentage & Dynamic Status Log */}
            <div className="w-full flex items-center justify-between font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-accent-cyan/90 font-medium tracking-wide">
                <Sparkles className="w-3 h-3 animate-spin" />
                {TECH_LOGS[logIndex]}
              </span>
              <span className="font-bold text-white tracking-wider text-sm">
                {progress}%
              </span>
            </div>
          </div>

          {/* Bottom Security Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 flex items-center gap-2 text-xs font-mono text-slate-400 tracking-wider uppercase"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Rekayasa Perangkat Lunak Presisi Tinggi</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}