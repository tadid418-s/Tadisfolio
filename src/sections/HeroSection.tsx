"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaArrowDown, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiMongodb } from "react-icons/si";
import { footerLinks } from "./Footer";
import { useState } from "react";
import LightRays from "@/components/LightRays";
import { FlipWords } from "@/components/flip-words";

const words = ["Frontend Expert.", "Full-Stack Dev.", "UI/UX Enthusiast.", "Critical Thinker.", "Tech-Savvy."];

const techIcons = [
  { icon: <FaReact className="text-cyan-400" />, label: "React" },
  { icon: <SiNextdotjs className="text-white" />, label: "Next.js" },
  { icon: <SiTypescript className="text-blue-400" />, label: "TypeScript" },
  { icon: <FaNodeJs className="text-green-400" />, label: "Node.js" },
  { icon: <SiMongodb className="text-emerald-400" />, label: "MongoDB" },
  { icon: <FaGitAlt className="text-orange-400" />, label: "Git" },
];

/** Magnetic tilt card for the top-right interactive panel */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-60, 60], [8, -8]);
  const rotY = useTransform(x, [-60, 60], [-8, 8]);
  const springX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotY, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const HeroSection = () => {
  const [buttonText, setButtonText] = useState("Copy Email");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText("tadiyosdejene@gmail.com").then(() => {
      setButtonText("Copied ✓");
      setTimeout(() => setButtonText("Copy Email"), 1500);
    });
  };

  const handleScrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={3.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays opacity-50"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
        <div className="absolute w-[600px] h-[250px] rounded-full bg-violet-800/15 blur-[130px] top-0 left-1/2 -translate-x-1/2" />
      </div>

      {/* ── INTERACTIVE: Top-right — 3D Tech Stack card ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
        className="absolute top-24 right-6 md:right-12 z-20 hidden md:block"
        style={{ perspective: "600px" }}
      >
        <TiltCard className="cursor-pointer">
          <div
            className="rounded-xl p-4 w-44"
            style={{
              background: "linear-gradient(145deg, rgba(30,32,40,0.9), rgba(18,20,26,0.95))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Stack</p>
            <div className="grid grid-cols-3 gap-3">
              {techIcons.map(({ icon, label }) => (
                <motion.div
                  key={label}
                  onHoverStart={() => setHoveredTech(label)}
                  onHoverEnd={() => setHoveredTech(null)}
                  whileHover={{ scale: 1.3, y: -3 }}
                  className="flex flex-col items-center gap-1 cursor-default"
                >
                  <span className="text-xl">{icon}</span>
                  {hoveredTech === label && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[8px] text-white/50 font-mono"
                    >
                      {label}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* ── INTERACTIVE: Bottom-left — Live clock / status terminal ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6, type: "spring" }}
        className="absolute bottom-24 left-6 md:left-12 z-20 hidden md:block"
      >
        <TerminalCard />
      </motion.div>

      {/* ── CENTER CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-20 pb-6 text-center">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(35,134,54,0.15)",
              border: "1px solid rgba(35,134,54,0.4)",
              color: "#3fb950",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-[#3fb950] opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-[#3fb950] flex" />
            </span>
            Available for new projects
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[11px] uppercase tracking-[0.35em] text-white/30 font-mono mb-6"
        >
          Full-Stack Developer · Based in Ethiopia
        </motion.p>

        {/* ── NAME — Playfair Display italic, centered, ~50% reduced ── */}
        <div className="overflow-hidden my-4">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.3 }}
            className="text-[clamp(2.6rem,6vw,5.5rem)] font-black italic leading-tight tracking-tight text-white"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Tadiyos Dejene
          </motion.h1>
        </div>

        {/* Role flipper */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.5 }}
          className="mt-4 text-base md:text-xl text-white/45 font-medium"
          style={{ fontFamily: "var(--font-geist), sans-serif" }}
        >
          I&apos;m a <FlipWords words={words} className="text-white/85 font-semibold" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.64, duration: 0.5 }}
          className="mt-5 text-white/38 text-sm md:text-base leading-relaxed max-w-md"
        >
          Building fast, accessible, and visually refined web experiences —
          from pixel-perfect frontends to robust full-stack systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-8"
        >
          <button
            onClick={handleScrollToAbout}
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(180deg, #238636 0%, #1a7f37 100%)",
              border: "1px solid rgba(240,246,252,0.1)",
              boxShadow: "0 0 0 1px rgba(46,164,79,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(180deg, #2ea043 0%, #238636 100%)")}
            onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(180deg, #238636 0%, #1a7f37 100%)")}
          >
            <span>View My Work</span>
            <FaArrowDown className="text-xs group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold text-white/80 transition-all duration-200"
            style={{
              background: "linear-gradient(180deg, #21262d 0%, #161b22 100%)",
              border: "1px solid rgba(240,246,252,0.1)",
              boxShadow: "0 0 0 1px rgba(110,118,129,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(180deg, #30363d 0%, #21262d 100%)")}
            onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(180deg, #21262d 0%, #161b22 100%)")}
          >
            <span>✉️</span>
            <span>{buttonText}</span>
          </button>
        </motion.div>

        {/* Socials */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.92, duration: 0.5 }}
          className="flex items-center gap-5 mt-7"
        >
          {footerLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/30 hover:text-white/70 transition-colors duration-200"
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.nav>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center pb-6 gap-1.5"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <FaArrowDown className="text-white/20 text-xs" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/** Animated terminal card for bottom-left */
function TerminalCard() {
  const lines = [
    { text: "> status", delay: 0, color: "text-white/60" },
    { text: "  ✓ open to work", delay: 0.4, color: "text-emerald-400" },
    { text: "> location", delay: 0.9, color: "text-white/60" },
    { text: "  Addis Ababa, ET", delay: 1.3, color: "text-cyan-400" },
    { text: "> focus", delay: 1.8, color: "text-white/60" },
    { text: "  Frontend + Backend", delay: 2.2, color: "text-violet-400" },
  ];

  return (
    <div
      className="rounded-xl p-4 w-52"
      style={{
        background: "linear-gradient(145deg, rgba(22,27,34,0.95), rgba(13,17,23,0.98))",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[9px] font-mono text-white/20">tadiyos.sh</span>
      </div>
      {/* Lines */}
      <div className="flex flex-col gap-0.5">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, duration: 0.3 }}
            className={`text-[11px] font-mono ${line.color}`}
          >
            {line.text}
          </motion.p>
        ))}
        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
          className="text-[11px] font-mono text-white/40 mt-0.5"
        >
          _
        </motion.span>
      </div>
    </div>
  );
}
