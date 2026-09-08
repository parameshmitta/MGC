import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-orange-50 dark:bg-neutral-950"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Sacred Aura */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-44 h-44 rounded-full bg-amber-500 blur-2xl opacity-20"
        />

        {/* Animated Ganesha Silhouette SVG */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="relative w-28 h-28 text-amber-500 dark:text-amber-400"
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="w-full h-full"
          >
            {/* Crown (Mukut) */}
            <path d="M40,25 L50,12 L60,25 Z" />
            <path d="M45,25 L50,18 L55,25" />
            {/* Forehead */}
            <path d="M35,35 Q50,28 65,35" />
            {/* Tilak */}
            <path d="M50,23 L50,33" strokeWidth="3" stroke="red" />
            <circle cx="50" cy="36" r="1.5" fill="red" />
            {/* Ears */}
            <path d="M35,35 C20,38 25,55 38,50" />
            <path d="M65,35 C80,38 75,55 62,50" />
            {/* Trunk */}
            <path d="M50,35 Q44,45 44,53 Q44,65 52,65 Q58,65 58,58 Q58,53 52,53 Q48,53 48,57" />
            {/* Modak (sweet) in trunk/hand */}
            <path d="M54,58 Q52,62 54,64 Q56,64 58,62 Z" fill="currentColor" opacity="0.3" />
            {/* Bottom Curve (Body) */}
            <path d="M38,50 C38,70 62,70 62,50" />
          </svg>
        </motion.div>

        {/* Text Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 font-cinzel text-xl md:text-2xl font-bold tracking-wider text-amber-600 dark:text-amber-500 text-glow-gold text-center"
        >
          MAHA GANAPATI COMMITTEE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-1.5 text-xs font-semibold tracking-widest text-orange-600 dark:text-orange-500/80 uppercase text-center"
        >
          Bandarupally
        </motion.p>

        {/* Simple Progress Line */}
        <div className="w-48 h-1 bg-amber-500/10 dark:bg-neutral-800 rounded-full mt-8 overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="relative h-full w-1/2 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
export default LoadingScreen;
