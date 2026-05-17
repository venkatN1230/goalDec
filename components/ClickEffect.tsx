"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);

      // Cleanup old ripples
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full border-2 border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            style={{
              left: ripple.x - 20, // Center the 40px circle
              top: ripple.y - 20,
              width: 40,
              height: 40,
            }}
          >
            {/* Inner pulse ring to match HUD style */}
            <motion.div
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="absolute inset-0 rounded-full border border-cyan-300"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
