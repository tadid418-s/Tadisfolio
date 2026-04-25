"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Sequence:
 * 1. "مرحباً"  → rolls down into place
 * 2. ", ሰLabela"  → rolls down alongside a comma
 * 3. ", Hello" → rolls down alongside a comma
 * 4. Hold → overlay fades + micro-zooms out → site fades in
 */

const SEGMENTS = [
  { word: "Hello" },
  { word: "ሰላም", prefix: ", " },
  { word: "مرحباً", prefix: " , " },


];

const ITEM_DELAY = 0.2;   // seconds between each word rolling in
const FIRST_DELAY = 0.3;   // delay before the first word appears
const HOLD_AFTER = 1100;   // ms to hold after last word before zooming
const ZOOM_DURATION = 1100;  // ms for zoom-out overlay

type Phase = "animating" | "hold" | "zoom" | "done";

export const SplashScreen = ({ children }: { children: React.ReactNode }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("animating");

  /* Reveal words one by one */
  useEffect(() => {
    if (phase !== "animating") return;

    if (visibleCount < SEGMENTS.length) {
      const delay = visibleCount === 0 ? FIRST_DELAY * 1000 : ITEM_DELAY * 1000;
      const t = setTimeout(() => setVisibleCount(c => c + 1), delay);
      return () => clearTimeout(t);
    }

    // All words revealed → hold
    const t = setTimeout(() => setPhase("hold"), HOLD_AFTER);
    return () => clearTimeout(t);
  }, [phase, visibleCount]);

  useEffect(() => {
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("zoom"), 100);
      return () => clearTimeout(t);
    }
    if (phase === "zoom") {
      const t = setTimeout(() => setPhase("done"), ZOOM_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isDone = phase === "done";
  const isZooming = phase === "zoom";
  const allShown = visibleCount >= SEGMENTS.length;

  return (
    <>
      <AnimatePresence>
        {!isDone && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: "#030712" }}
            animate={isZooming ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
            transition={isZooming
              ? { duration: ZOOM_DURATION / 1000, ease: [0.4, 0, 0.6, 1] }
              : { duration: 0 }
            }
          >
            {/* White ambient glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isZooming ? 0 : allShown ? 0.12 : 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(ellipse 45% 28% at 50% 50%, rgba(255,255,255,0.65) 0%, transparent 70%)",
              }}
            />

            {/* ── Word row ── */}
            <div className="flex items-center" style={{ overflow: "hidden" }}>
              {SEGMENTS.map(({ word, prefix }, i) => (
                <AnimatePresence key={i}>
                  {visibleCount > i && (
                    <motion.span
                      key={`seg-${i}`}
                      initial={{ y: "-100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        y: { type: "spring", stiffness: 95, damping: 16 },
                        opacity: { duration: 0.25, ease: "easeOut" },
                      }}
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--font-geist), var(--font-sans), sans-serif",
                        fontSize: "clamp(0.78rem, 1.6vw, 1.05rem)",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.90)",
                        whiteSpace: "nowrap",
                        textTransform: "none",
                      }}
                    >
                      {prefix}{word}
                    </motion.span>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site fades in */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDone ? 1 : 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
};
