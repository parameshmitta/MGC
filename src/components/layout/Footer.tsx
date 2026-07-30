import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiYoutube, FiMessageSquare } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-950 text-amber-50/90 dark:bg-neutral-950 border-t border-amber-900/30 dark:border-neutral-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & Vision Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-amber-400">
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
              <span className="font-cinzel text-lg font-bold tracking-wider text-amber-400">
                MAHA GANAPATI
              </span>
            </div>
            <p className="text-xs text-amber-100/60 leading-relaxed font-medium">
              Organizing and celebrating the divine Ganesh Chaturthi festival since 2018 in Bandarupally Village. Uniting the community through spirituality, service, and cultural excellence.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.instagram.com/maha_ganapati_committe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-amber-900/50 hover:bg-orange-600 transition-all hover:scale-105 hover:text-white"
                title="Follow on Instagram"
              >
                <FiInstagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-amber-900/50 hover:bg-orange-600 transition-all hover:scale-105 hover:text-white"
                title="Follow on Facebook"
              >
                <FiFacebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-amber-900/50 hover:bg-orange-600 transition-all hover:scale-105 hover:text-white"
                title="Watch on YouTube"
              >
                <FiYoutube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-cinzel text-sm font-bold tracking-widest text-amber-400 uppercase border-b border-amber-900/30 pb-2">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs font-semibold">
              <NavLink to="/" className="text-amber-100/70 hover:text-amber-400 transition-colors">Home</NavLink>
              <NavLink to="/about" className="text-amber-100/70 hover:text-amber-400 transition-colors">About</NavLink>
              <NavLink to="/gallery" className="text-amber-100/70 hover:text-amber-400 transition-colors">Gallery</NavLink>
              <NavLink to="/videos" className="text-amber-100/70 hover:text-amber-400 transition-colors">Videos</NavLink>
              <NavLink to="/village-help" className="text-amber-100/70 hover:text-amber-400 transition-colors">Village Help</NavLink>
              <NavLink to="/events" className="text-amber-100/70 hover:text-amber-400 transition-colors">Events</NavLink>
              <NavLink to="/committee" className="text-amber-100/70 hover:text-amber-400 transition-colors">Committee</NavLink>
              <NavLink to="/sponsors" className="text-amber-100/70 hover:text-amber-400 transition-colors">Sponsors</NavLink>
              <NavLink to="/contact" className="text-amber-100/70 hover:text-amber-400 transition-colors col-span-2">Contact Us</NavLink>
            </div>
          </div>

          {/* Contacts Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-cinzel text-sm font-bold tracking-widest text-amber-400 uppercase border-b border-amber-900/30 pb-2">
              Contact Info
            </h3>
            <ul className="flex flex-col gap-3.5 text-xs font-medium text-amber-100/70">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Maha Ganapati Pandal, Bandarupally Village, Guntur Dist, Andhra Pradesh, India.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-amber-400 transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@mahaganapatibandarupally.com" className="hover:text-amber-400 transition-colors truncate">info@mahaganapatibandarupally.com</a>
              </li>
            </ul>
          </div>

          {/* Devotional Quote or Announcements Board */}
          <div className="flex flex-col gap-4">
            <h3 className="font-cinzel text-sm font-bold tracking-widest text-amber-400 uppercase border-b border-amber-900/30 pb-2">
              Vakratunda Shloka
            </h3>
            <div className="p-3.5 rounded-xl bg-amber-900/20 border border-amber-900/50">
              <p className="font-cinzel text-xs text-amber-200/90 text-center leading-relaxed italic">
                "Vakratunda Mahakaya Suryakoti Samaprabha<br />
                Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada"
              </p>
              <p className="text-[10px] text-amber-400/80 font-bold tracking-widest text-center mt-2.5 uppercase">
                Lord Ganesha Prayer
              </p>
            </div>
            <NavLink
              to="/admin-login"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 font-semibold text-xs tracking-wider uppercase transition-all"
            >
              <FiMessageSquare className="w-3.5 h-3.5" />
              Admin Access
            </NavLink>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-amber-900/40 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-100/50 font-semibold gap-4">
          <p className="text-center sm:text-left">
            &copy; {currentYear} Maha Ganapati Committee, Bandarupally. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed with devotion for{' '}
            <span className="text-amber-400">Bandarupally Village</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
