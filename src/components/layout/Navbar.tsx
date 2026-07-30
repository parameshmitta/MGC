import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Videos', path: '/videos' },
  { name: 'Village Help', path: '/village-help' },
  { name: 'Events', path: '/events' },
  { name: 'Committee', path: '/committee' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <NavLink to="/" className="flex items-center gap-2.5 focus:outline-none">
            {/* Sacred Ganesha Logo Outline */}
            <div className="w-10 h-10 text-orange-600 dark:text-amber-500 flex-shrink-0">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-full h-full">
                <path d="M40,25 L50,12 L60,25 Z" />
                <path d="M45,25 L50,18 L55,25" />
                <path d="M35,35 Q50,28 65,35" />
                <path d="M50,23 L50,33" strokeWidth="3.5" stroke="red" />
                <circle cx="50" cy="36" r="1.5" fill="red" />
                <path d="M35,35 C20,38 25,55 38,50" />
                <path d="M65,35 C80,38 75,55 62,50" />
                <path d="M50,35 Q44,45 44,53 Q44,65 52,65 Q58,65 58,58 Q58,53 52,53 Q48,53 48,57" />
                <path d="M38,50 C38,70 62,70 62,50" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider bg-gradient-to-r from-orange-600 to-amber-500 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent leading-none">
                MAHA GANAPATI
              </span>
              <span className="text-[10px] font-bold tracking-widest text-amber-950/70 dark:text-neutral-300 uppercase leading-none mt-0.5">
                Bandarupally Village
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-amber-400 border border-orange-500/20'
                      : 'text-amber-950/80 hover:text-orange-600 hover:bg-orange-50 dark:text-neutral-300 dark:hover:text-amber-400 dark:hover:bg-neutral-800/50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Utilities & Mobile trigger */}
          <div className="flex items-center gap-3.5">
            <ThemeToggle />
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full lg:hidden border border-amber-500/20 bg-amber-500/10 dark:bg-neutral-800 dark:border-neutral-700/80 text-amber-600 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-white dark:bg-neutral-900 border-b border-amber-500/10 dark:border-neutral-800 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5 max-h-[80vh] overflow-y-auto">
              {MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                        : 'text-amber-950/80 dark:text-neutral-300 hover:bg-orange-50 dark:hover:bg-neutral-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
              <div className="pt-4 mt-4 border-t border-amber-500/10 dark:border-neutral-800">
                <NavLink
                  to="/admin-login"
                  className="block text-center w-full px-4 py-3 rounded-xl border border-dashed border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-500/5 transition-all text-xs uppercase tracking-widest"
                >
                  Admin Portal
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
