import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../assets/logo.png";
import { Shield, Sparkles, RefreshCw, Crosshair, CheckCircle2, Zap } from "lucide-react";

interface IntroSplashProps {
  onComplete: () => void;
  isReplay?: boolean;
}

// 18 Insect Items matching the pests on the official client logo (Fly, Cockroach, Termite, Mosquito, Rat, Spider)
interface InsectItem {
  id: number;
  type: "fly" | "cockroach" | "termite" | "mosquito" | "rodent" | "spider";
  label: string;
  initialX: number; // position relative to center (px)
  initialY: number;
  initialScale: number;
  initialRotate: number;
  scatterAngle: number; // degrees 0-360
  scatterDistance: number; // distance in px to flee completely off screen
}

const INSECTS: InsectItem[] = [
  { id: 1, type: "termite", label: "Termite", initialX: -60, initialY: -70, initialScale: 1.1, initialRotate: -25, scatterAngle: 215, scatterDistance: 1100 },
  { id: 2, type: "fly", label: "House Fly", initialX: 55, initialY: -80, initialScale: 1.0, initialRotate: 40, scatterAngle: 310, scatterDistance: 1050 },
  { id: 3, type: "cockroach", label: "Cockroach", initialX: -90, initialY: 10, initialScale: 1.2, initialRotate: -75, scatterAngle: 175, scatterDistance: 1150 },
  { id: 4, type: "rodent", label: "Rat / Rodent", initialX: 45, initialY: 85, initialScale: 1.35, initialRotate: 15, scatterAngle: 65, scatterDistance: 1200 },
  { id: 5, type: "mosquito", label: "Mosquito", initialX: -25, initialY: -110, initialScale: 0.9, initialRotate: -15, scatterAngle: 260, scatterDistance: 1000 },
  { id: 6, type: "spider", label: "Spider", initialX: 95, initialY: -25, initialScale: 1.1, initialRotate: 85, scatterAngle: 20, scatterDistance: 1100 },
  { id: 7, type: "cockroach", label: "Cockroach", initialX: -35, initialY: 95, initialScale: 1.15, initialRotate: 145, scatterAngle: 125, scatterDistance: 1120 },
  { id: 8, type: "termite", label: "Termite", initialX: 80, initialY: 60, initialScale: 1.0, initialRotate: -45, scatterAngle: 35, scatterDistance: 1080 },
  { id: 9, type: "fly", label: "Fly", initialX: -110, initialY: -45, initialScale: 0.95, initialRotate: 165, scatterAngle: 200, scatterDistance: 1040 },
  { id: 10, type: "mosquito", label: "Mosquito", initialX: 110, initialY: -90, initialScale: 0.9, initialRotate: -110, scatterAngle: 340, scatterDistance: 1060 },
  { id: 11, type: "rodent", label: "Rat / Rodent", initialX: -100, initialY: 70, initialScale: 1.25, initialRotate: 30, scatterAngle: 145, scatterDistance: 1220 },
  { id: 12, type: "spider", label: "Spider", initialX: -15, initialY: -45, initialScale: 1.0, initialRotate: 120, scatterAngle: 240, scatterDistance: 1090 },
  { id: 13, type: "cockroach", label: "Cockroach", initialX: 25, initialY: -35, initialScale: 1.1, initialRotate: -55, scatterAngle: 290, scatterDistance: 1130 },
  { id: 14, type: "termite", label: "Termite", initialX: -75, initialY: -15, initialScale: 0.95, initialRotate: -135, scatterAngle: 190, scatterDistance: 1070 },
  { id: 15, type: "fly", label: "Fly", initialX: 30, initialY: 35, initialScale: 0.9, initialRotate: 70, scatterAngle: 80, scatterDistance: 1020 },
  { id: 16, type: "mosquito", label: "Mosquito", initialX: -50, initialY: 45, initialScale: 0.85, initialRotate: -95, scatterAngle: 160, scatterDistance: 1030 },
  { id: 17, type: "rodent", label: "Rodent", initialX: 85, initialY: -115, initialScale: 1.2, initialRotate: -20, scatterAngle: 10, scatterDistance: 1180 },
  { id: 18, type: "termite", label: "Termite", initialX: 5, initialY: -85, initialScale: 1.05, initialRotate: 10, scatterAngle: 275, scatterDistance: 1060 },
];

// Vector SVG component for pests matching the official logo
function InsectSVG({ type }: { type: InsectItem["type"] }) {
  switch (type) {
    case "fly":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full text-slate-900 fill-current drop-shadow-lg">
          {/* Wings */}
          <ellipse cx="14" cy="16" rx="8" ry="4" fill="rgba(224,242,254,0.75)" stroke="#38bdf8" strokeWidth="0.8" transform="rotate(-35 14 16)" />
          <ellipse cx="26" cy="16" rx="8" ry="4" fill="rgba(224,242,254,0.75)" stroke="#38bdf8" strokeWidth="0.8" transform="rotate(35 26 16)" />
          {/* Legs */}
          <path d="M 14 20 L 5 16 M 26 20 L 35 16 M 13 25 L 4 27 M 27 25 L 36 27 M 15 30 L 7 37 M 25 30 L 33 37" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" />
          {/* Head & Red Compound Eyes */}
          <circle cx="20" cy="12" r="4.5" fill="#1e293b" />
          <circle cx="17.5" cy="11" r="1.8" fill="#dc2626" />
          <circle cx="22.5" cy="11" r="1.8" fill="#dc2626" />
          {/* Body */}
          <ellipse cx="20" cy="24" rx="6" ry="8" fill="#0f172a" />
        </svg>
      );
    case "cockroach":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full text-amber-950 fill-current drop-shadow-lg">
          {/* Antennae */}
          <path d="M 17 8 Q 11 0 4 2 M 23 8 Q 29 0 36 2" fill="none" stroke="#7c2d12" strokeWidth="1.3" />
          {/* Legs */}
          <path d="M 12 16 L 3 11 M 28 16 L 37 11 M 10 22 L 2 22 M 30 22 L 38 22 M 12 28 L 4 35 M 28 28 L 36 35" stroke="#7c2d12" strokeWidth="1.6" strokeLinecap="round" />
          {/* Body & Shell */}
          <ellipse cx="20" cy="23" rx="7.5" ry="11.5" fill="#451a03" />
          <path d="M 12.5 18 C 12.5 11 27.5 11 27.5 18 Z" fill="#78350f" />
          <line x1="20" y1="18" x2="20" y2="34" stroke="#1c1917" strokeWidth="1.2" />
        </svg>
      );
    case "termite":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full text-amber-600 fill-current drop-shadow-lg">
          {/* Legs */}
          <path d="M 14 15 L 5 11 M 26 15 L 35 11 M 13 22 L 4 22 M 27 22 L 36 22 M 14 29 L 6 36 M 26 29 L 34 36" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" />
          {/* Head & Pincers */}
          <circle cx="20" cy="11" r="5" fill="#78350f" />
          <path d="M 18 6 Q 16 2 12 3 M 22 6 Q 24 2 28 3" fill="none" stroke="#78350f" strokeWidth="1.2" />
          {/* Abdomen */}
          <ellipse cx="20" cy="25" rx="6.5" ry="9.5" fill="#d97706" />
        </svg>
      );
    case "mosquito":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full text-slate-800 fill-current drop-shadow-lg">
          {/* Needle Probe */}
          <line x1="20" y1="10" x2="20" y2="1" stroke="#09090b" strokeWidth="1.6" />
          {/* Long spindly legs */}
          <path d="M 16 16 L 3 6 M 24 16 L 37 6 M 15 22 L 1 24 M 25 22 L 39 24 M 16 28 L 4 39 M 24 28 L 36 39" stroke="#18181b" strokeWidth="1.3" strokeLinecap="round" />
          {/* Wings */}
          <ellipse cx="12" cy="18" rx="8" ry="3" fill="rgba(255,255,255,0.5)" stroke="#71717a" strokeWidth="0.8" transform="rotate(-30 12 18)" />
          <ellipse cx="28" cy="18" rx="8" ry="3" fill="rgba(255,255,255,0.5)" stroke="#71717a" strokeWidth="0.8" transform="rotate(30 28 18)" />
          {/* Body */}
          <ellipse cx="20" cy="24" rx="3.5" ry="8.5" fill="#27272a" />
        </svg>
      );
    case "rodent":
      return (
        <svg viewBox="0 0 44 44" className="w-full h-full text-stone-800 fill-current drop-shadow-xl">
          {/* Long tail */}
          <path d="M 22 35 Q 30 43 38 41" fill="none" stroke="#e11d48" strokeWidth="2.2" strokeLinecap="round" />
          {/* Ears */}
          <circle cx="15" cy="10" r="3.8" fill="#f43f5e" opacity="0.85" />
          <circle cx="29" cy="10" r="3.8" fill="#f43f5e" opacity="0.85" />
          {/* Body */}
          <ellipse cx="22" cy="23" rx="9.5" ry="12.5" fill="#44403c" />
          {/* Snout & Whiskers */}
          <polygon points="22,5 17,13 27,13" fill="#292524" />
          <line x1="13" y1="9" x2="6" y2="7" stroke="#a8a29e" strokeWidth="1.2" />
          <line x1="31" y1="9" x2="38" y2="7" stroke="#a8a29e" strokeWidth="1.2" />
        </svg>
      );
    case "spider":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full text-zinc-900 fill-current drop-shadow-lg">
          {/* 8 Spider Legs */}
          <path d="M 16 16 Q 6 8 3 2 M 24 16 Q 34 8 37 2 M 15 18 Q 3 16 1 12 M 25 18 Q 37 16 39 12 M 15 22 Q 3 24 2 30 M 25 22 Q 37 24 38 30 M 16 24 Q 7 33 5 39 M 24 24 Q 33 33 35 39"
            fill="none" stroke="#18181b" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="20" cy="17" r="4" fill="#09090b" />
          <circle cx="20" cy="26" rx="6.5" ry="7.5" fill="#18181b" />
          <polygon points="20,22 17,27 23,27" fill="#dc2626" />
        </svg>
      );
  }
}

export function IntroSplash({ onComplete, isReplay = false }: IntroSplashProps) {
  // Stages:
  // 1. "infestation" (0s - 1.8s): Dark infested screen swarmed with wild pests. Logo hidden!
  // 2. "spraying" (1.8s - 3.0s): Crosshairs lock in, protective mist spray burst triggers.
  // 3. "dispersion" (3.0s - 4.4s): All insects scatter furiously in 360 degrees off screen.
  // 4. "logo_reveal" (4.4s - 6.2s): Screen 100% clean! NEW OFFICIAL CLIENT LOGO emerges with glowing target rings & shockwave reveal.
  // 5. "done": Fade out to main application page.
  const [stage, setStage] = useState<"infestation" | "spraying" | "dispersion" | "logo_reveal" | "done">("infestation");

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("spraying"), 1800);
    const timer2 = setTimeout(() => setStage("dispersion"), 3000);
    const timer3 = setTimeout(() => setStage("logo_reveal"), 4400);
    const timer4 = setTimeout(() => {
      setStage("done");
      onComplete();
    }, 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[99999] bg-[#07170E] flex flex-col items-center justify-center overflow-hidden select-none"
      >
        {/* High-Tech Dynamic Grid Background */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 50%, #18A558 0%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#18A558 1px, transparent 1px), linear-gradient(90deg, #18A558 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Top Header Bar */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-2.5 bg-[#05130b] border border-[#18A558]/40 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md">
            <span
              className={`w-3 h-3 rounded-full ${
                stage === "infestation"
                  ? "bg-[#D2143A] animate-ping"
                  : stage === "spraying"
                  ? "bg-amber-400 animate-bounce"
                  : "bg-[#18A558] animate-pulse"
              }`}
            />
            <span className="text-white text-xs font-extrabold tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
              {stage === "infestation" && "Pest Infestation Active — Target Area Sealed"}
              {stage === "spraying" && "Pest Control Specialist Spraying Eco-Mist..."}
              {stage === "dispersion" && "Insects Fleeing & Clearing Property..."}
              {stage === "logo_reveal" && "100% Pest Free — Property Protected"}
            </span>
          </div>

          <button
            onClick={() => {
              setStage("done");
              onComplete();
            }}
            className="bg-white/10 hover:bg-white/20 text-white font-extrabold border border-white/25 text-xs px-4.5 py-2 rounded-full transition-all backdrop-blur-md shadow-xl hover:scale-105"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Skip Intro →
          </button>
        </div>

        {/* Target Reticle Crosshair Sweeping Layer */}
        <div className="relative w-96 h-96 flex items-center justify-center pointer-events-none">
          {/* Target Sight Rings matching official logo crosshairs */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 rounded-full border-2 border-dashed border-[#18A558]/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 rounded-full border border-lime-400/30"
          />

          {/* Crosshair Lines */}
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#18A558]/50 to-transparent" />
          <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-[#18A558]/50 to-transparent" />

          {/* SPRAY MIST & PROTECTIVE SHIELD WAVE (Active on "spraying" and "dispersion") */}
          {(stage === "spraying" || stage === "dispersion" || stage === "logo_reveal") && (
            <>
              {/* Outer Crimson Wave */}
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 3.8, opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute w-72 h-72 rounded-full border-4 border-[#D2143A] bg-[#D2143A]/15 pointer-events-none"
              />
              {/* Inner Lime & Emerald Protective Wave */}
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 4.5, opacity: 0 }}
                transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
                className="absolute w-72 h-72 rounded-full border-4 border-[#18A558] bg-[#18A558]/20 pointer-events-none"
              />
              {/* Chemical Spray Fog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: [0, 0.85, 0], scale: [0.3, 2.5, 3.5] }}
                transition={{ duration: 1.6 }}
                className="absolute inset-0 rounded-full bg-radial from-lime-400/40 via-[#18A558]/30 to-transparent blur-xl pointer-events-none"
              />
            </>
          )}

          {/* ════════════════════════════════════════════════════════════════════════════
              SWARMING INSECTS LAYER (FLEE COMPLETELY FIRST BEFORE LOGO APPEARS)
             ════════════════════════════════════════════════════════════════════════════ */}
          {INSECTS.map((bug) => {
            const rad = (bug.scatterAngle * Math.PI) / 180;
            const scatterX = Math.cos(rad) * bug.scatterDistance;
            const scatterY = Math.sin(rad) * bug.scatterDistance;

            const isFleeing = stage === "dispersion" || stage === "logo_reveal";
            const isScared = stage === "spraying";

            return (
              <motion.div
                key={bug.id}
                initial={{
                  x: bug.initialX,
                  y: bug.initialY,
                  scale: bug.initialScale,
                  rotate: bug.initialRotate,
                  opacity: 1,
                }}
                animate={
                  isFleeing
                    ? {
                        // Flee 100% off screen in 360-degree directions!
                        x: scatterX,
                        y: scatterY,
                        scale: bug.initialScale * 0.3,
                        rotate: bug.initialRotate + (bug.scatterAngle > 180 ? -720 : 720),
                        opacity: 0,
                      }
                    : isScared
                    ? {
                        // Panic twitching when sprayed
                        x: [bug.initialX, bug.initialX + 12, bug.initialX - 12, bug.initialX],
                        y: [bug.initialY, bug.initialY - 10, bug.initialY + 10, bug.initialY],
                        rotate: [bug.initialRotate, bug.initialRotate + 25, bug.initialRotate - 25, bug.initialRotate],
                        scale: [bug.initialScale, bug.initialScale * 1.25, bug.initialScale],
                      }
                    : {
                        // Wild crawling while infesting dark screen
                        x: [bug.initialX, bug.initialX + 5, bug.initialX - 5, bug.initialX],
                        y: [bug.initialY, bug.initialY - 4, bug.initialY + 4, bug.initialY],
                        rotate: [bug.initialRotate, bug.initialRotate + 10, bug.initialRotate - 10, bug.initialRotate],
                      }
                }
                transition={
                  isFleeing
                    ? {
                        duration: 1.2 + (bug.id % 5) * 0.12,
                        ease: [0.4, 0.0, 0.2, 1],
                      }
                    : isScared
                    ? {
                        duration: 0.15,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }
                    : {
                        duration: 0.4 + (bug.id % 3) * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }
                }
                className="absolute z-20 w-12 h-12 pointer-events-none filter drop-shadow-2xl"
              >
                <InsectSVG type={bug.type} />
              </motion.div>
            );
          })}

          {/* ════════════════════════════════════════════════════════════════════════════
              GRAND LOGO REVEAL (APPEARS ONLY AFTER ALL INSECTS ARE GONE!)
             ════════════════════════════════════════════════════════════════════════════ */}
          {stage === "logo_reveal" && (
            <motion.div
              initial={{ scale: 0.1, opacity: 0, rotate: -45 }}
              animate={{ scale: [0.1, 1.25, 1], opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-72 h-72 z-30 flex flex-col items-center justify-center drop-shadow-[0_0_50px_rgba(24,165,88,0.7)]"
            >
              {/* Radiant Light Beam Halo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.6], scale: [0.5, 1.8, 1.5] }}
                transition={{ duration: 1.4 }}
                className="absolute inset-0 rounded-full bg-radial from-amber-300/40 via-lime-400/30 to-transparent blur-2xl pointer-events-none"
              />

              {/* Gold & Emerald Shockwave Ring */}
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                className="absolute w-64 h-64 rounded-full border-4 border-[#18A558] bg-[#18A558]/20 pointer-events-none"
              />

              {/* The Official Circular Client Logo Image */}
              <div className="relative w-64 h-64 rounded-full bg-white p-2.5 shadow-2xl border-4 border-[#18A558] flex items-center justify-center overflow-hidden">
                <img
                  src={logoImg}
                  alt="Official OME Pest Control Services Logo"
                  className="w-full h-full object-contain rounded-full"
                />

                {/* Highlight Flash Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.95, 0] }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-white rounded-full"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Status Banner & Red-on-White Text Badges */}
        <div className="absolute bottom-10 z-30 flex flex-col items-center gap-3 max-w-lg px-6 text-center">
          <AnimatePresence mode="wait">
            {stage === "infestation" && (
              <motion.div
                key="infestation-banner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-2"
              >
                {/* Red Text on White Container Badge */}
                <div className="bg-white border-2 border-[#D2143A] text-[#D2143A] text-xs font-extrabold px-6 py-2 rounded-full shadow-2xl tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D2143A] animate-ping" />
                  Warning: Active Infestation (Termites, Rats, Cockroaches, Flies)
                </div>
                <p className="text-white/70 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Infesting Residential & Commercial Premises Across AP & TS
                </p>
              </motion.div>
            )}

            {stage === "spraying" && (
              <motion.div
                key="spraying-banner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="bg-white border-2 border-[#18A558] text-[#0C2D1C] text-xs font-extrabold px-6 py-2 rounded-full shadow-2xl tracking-wider uppercase flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-[#18A558] animate-spin" />
                  Target Locked · Applying High-Pressure Eco-Mist Treatment
                </div>
                <p className="text-[#18A558] text-xs font-extrabold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Envu & Tata Rallis CIB-Approved Odourless Formulations Active
                </p>
              </motion.div>
            )}

            {stage === "dispersion" && (
              <motion.div
                key="dispersion-banner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="bg-white border-2 border-[#18A558] text-[#18A558] text-xs font-extrabold px-6 py-2 rounded-full shadow-2xl tracking-wider uppercase flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#18A558]" />
                  Insects Clearing Out Complete!
                </div>
                <p className="text-white/80 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Preparing Official OME Brand Reveal...
                </p>
              </motion.div>
            )}

            {stage === "logo_reveal" && (
              <motion.div
                key="reveal-banner"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="bg-white border-2 border-[#D2143A] text-[#D2143A] text-sm font-extrabold px-7 py-2.5 rounded-full shadow-2xl tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#18A558]" />
                  OME PEST CONTROL SERVICES
                </div>
                <p className="text-[#18A558] text-xs font-extrabold tracking-wide uppercase bg-black/40 px-4 py-1 rounded-full border border-[#18A558]/40">
                  Govt Licensed · Rank #1 Pest Management
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
