import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Bandarupally Seva', path: '/village-help' },
  { name: 'Events', path: '/events' },
  { name: 'Committee', path: '/committee' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const { isAdmin } = useAuth();
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

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3 shadow-lg shadow-black/5'
          : isHome
          ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
          : 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md py-4 border-b border-amber-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <NavLink to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400/90 shadow-md shadow-amber-500/30 flex-shrink-0 bg-neutral-950 ring-2 ring-amber-400/30 transition-transform duration-300 group-hover:scale-105">
              <img src="/logo.jpg" alt="Maha Ganapati Committee Circular Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent leading-none">
                MAHA GANAPATI
              </span>
              <span className={`text-[10px] font-bold tracking-widest uppercase leading-none mt-0.5 transition-colors ${
                !scrolled && isHome ? 'text-amber-200/90' : 'text-amber-950/70 dark:text-neutral-300'
              }`}>
                Bandarupally
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => {
                  if (!scrolled && isHome) {
                    return `px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none ${
                      isActive
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-400/40 shadow-sm backdrop-blur-sm'
                        : 'text-white/90 hover:text-amber-300 hover:bg-white/10'
                    }`;
                  }
                  return `px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/15 to-amber-500/15 text-orange-600 dark:text-amber-400 border border-orange-500/30'
                      : 'text-amber-950/80 hover:text-orange-600 hover:bg-orange-50 dark:text-neutral-300 dark:hover:text-amber-400 dark:hover:bg-neutral-800/50'
                  }`;
                }}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Utilities & Mobile trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Show Admin Panel shortcut ONLY when actually logged in as Admin */}
            {isAdmin && (
              <NavLink
                to="/admin-dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                title="Admin Dashboard (Active)"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>🛡️ Admin Mode</span>
              </NavLink>
            )}

            <ThemeToggle />
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-full lg:hidden border transition-all focus:outline-none ${
                !scrolled && isHome
                  ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                  : 'border-amber-500/20 bg-amber-500/10 dark:bg-neutral-800 dark:border-neutral-700/80 text-amber-600 dark:text-amber-400 hover:scale-105 active:scale-95'
              }`}
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
              
              {isAdmin && (
                <div className="pt-4 mt-4 border-t border-amber-500/10 dark:border-neutral-800">
                  <NavLink
                    to="/admin-dashboard"
                    className="block text-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold transition-all text-xs uppercase tracking-widest shadow-md"
                  >
                    🛡️ Admin Dashboard
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
