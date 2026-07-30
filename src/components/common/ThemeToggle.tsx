import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full border border-amber-500/20 bg-amber-500/10 dark:bg-neutral-800 dark:border-neutral-700/80 text-amber-600 dark:text-amber-400 hover:scale-105 hover:bg-amber-500/20 active:scale-95 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -10, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
export default ThemeToggle;
