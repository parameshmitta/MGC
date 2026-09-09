import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { 
  FiCalendar, 
  FiUsers, 
  FiImage, 
  FiInstagram, 
  FiHeart, 
  FiMessageCircle, 
  FiPlay, 
  FiArrowRight, 
  FiCheckCircle,
  FiTool,
  FiHelpCircle,
  FiAward
} from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { ANNOUNCEMENTS, INSTAGRAM_POSTS, BATHUKAMMA_EDITIONS } from '../utils/mockData';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Home: React.FC = () => {
  useSEO({
    title: 'Home',
    description: 'Welcome to the official website of Maha Ganapati Committee, Bandarupally. View festival celebrations, submit village issues, browse galleries and join hands in volunteering.',
  });

  const navigate = useNavigate();

  // Helper function to format ISO dates to friendly text
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Statistics Data
  const stats = [
    { label: 'Years Celebration', value: '15+', icon: <FiCalendar className="w-6 h-6" /> },
    { label: 'Festival Photos', value: '1,200+', icon: <FiImage className="w-6 h-6" /> },
    { label: 'Devotees Blessed', value: '25,000+', icon: <FiHeart className="w-6 h-6" /> },
    { label: 'Volunteers Enrolled', value: '150+', icon: <FiUsers className="w-6 h-6" /> },
  ];

  // Carousel slides with real celebration photos
  const carouselSlides = [
    {
      year: 'Maha Bathukamma',
      title: 'Maha Bathukamma Celebrations',
      image: '/bathukamma/maha_bathukamma_committee_main.jpg',
      desc: 'Bandarupally youth committee proudly presenting the monumental floral Maha Bathukamma tradition.',
      link: '/maha-bathukamma',
    },
    {
      year: '2026',
      title: 'Maha Ganapati 2026 (Coming Soon)',
      image: '/celebrations/ganesha_2026.jpg',
      desc: 'Grand 15+ years celebration preparations underway in Bandarupally village with divine Bullock Cart Darshanam.',
    },
    {
      year: '2025',
      title: 'Vishwa Roopa Darshanam (2025)',
      image: '/celebrations/ganesha_2025.jpg',
      desc: 'Spectacular Vishwaroopa Darshanam celebrations with youth committee & village devotees.',
    },
    {
      year: '2024',
      title: 'Mayura Mukuta Ganesha (2024)',
      image: '/celebrations/ganesha_2024.jpg',
      desc: 'Grand Ganesh Chaturthi celebrations with the holy idol and committee members.',
    },
    {
      year: '2023',
      title: 'Kailasa Natha Alankaram (2023)',
      image: '/celebrations/ganesha_2023.jpg',
      desc: 'Divine celebration with floral canopy decor, youth seva, and community bonding.',
    },
    {
      year: '2022',
      title: 'Siddhi Vinayaka Mahotsavam (2022)',
      image: '/celebrations/ganesha_2022.jpg',
      desc: 'A memorable milestone celebration and dedicated committee members.',
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero Section - Full Bleed Devotional Experience */}
      <section className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
        {/* Ambient Devotional Lighting & Subtle Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,140,0,0.16),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
          
          {/* Logo with Divine Radial Aura */}
          <div className="relative mb-5">
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/40 via-orange-500/40 to-yellow-500/40 rounded-full blur-xl opacity-60 animate-pulse" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-500/50 hover:scale-105 transition-all duration-500 bg-neutral-950 ring-4 ring-amber-400/30 p-0.5"
            >
              <img 
                src="/logo.jpg" 
                alt="Maha Ganapati Committee Circular Logo" 
                className="w-full h-full object-cover rounded-full" 
              />
            </motion.div>
          </div>

          {/* Devotional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>15+ Years of Devotion &amp; Seva • Bandarupally</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-wide text-glow-gold"
          >
            MAHA GANAPATI COMMITTEE
          </motion.h1>

          {/* Subtitle with Flanking Flourish */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 font-cinzel text-base sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent tracking-widest flex items-center justify-center gap-3"
          >
            <span className="h-[1px] w-8 sm:w-16 bg-amber-400/40" />
            BANDARUPALLY VILLAGE
            <span className="h-[1px] w-8 sm:w-16 bg-amber-400/40" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 max-w-2xl leading-relaxed font-normal"
          >
            Unifying our village in the glory of Ganesha Chaturthi. Join us for daily sacred poojas, cultural nights, grand annadanam, and collective village welfare initiatives.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3.5 sm:gap-4 justify-center items-center"
          >
            <button
              onClick={() => navigate('/gallery')}
              className="flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-lg shadow-orange-600/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all"
            >
              <FiImage className="w-4 h-4" />
              View Gallery
            </button>
            <button
              onClick={() => navigate('/village-help')}
              className="flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white border border-white/30 hover:border-amber-400/50 hover:scale-105 active:scale-95 transition-all backdrop-blur-md shadow-lg"
            >
              <FiHeart className="w-4 h-4 text-orange-400" />
              Bandarupally Seva
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-black shadow-lg shadow-amber-400/25 hover:scale-105 active:scale-95 transition-all"
            >
              <FiCalendar className="w-4 h-4" />
              Donate / Seva
            </button>
          </motion.div>

        </div>

        {/* Floating Scroll Indicator */}
        <a
          href="#stats"
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors group cursor-pointer"
          aria-label="Scroll down to stats"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-amber-300">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border border-amber-400/40 flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </motion.div>
        </a>
      </section>

      {/* Hero to Content Soft Gradient Transition */}
      <div className="w-full h-8 bg-gradient-to-b from-neutral-950 to-white dark:to-neutral-900 border-b border-amber-500/10 dark:border-neutral-800" />

      {/* 2. Stats Section */}
      <section id="stats" className="py-16 sm:py-20 bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-amber-500/5 dark:bg-neutral-800/40 border border-amber-500/15 dark:border-neutral-800 hover:border-amber-500/40 dark:hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/20 text-orange-600 dark:text-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300 ring-1 ring-amber-500/20">
                  {stat.icon}
                </div>
                <span className="text-3xl sm:text-4xl font-black text-amber-950 dark:text-white leading-none tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-bold mt-2.5">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Announcements Section */}
      <section className="py-16 sm:py-20 bg-orange-50/20 dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <FiCalendar className="w-3.5 h-3.5" /> Official Notice Board
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              LATEST ANNOUNCEMENTS
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-3 rounded-full" />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {ANNOUNCEMENTS.map((anno, idx) => (
              <motion.div
                key={anno.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card glass-card-hover p-6 sm:p-7 rounded-2xl relative overflow-hidden group border border-amber-500/15 dark:border-neutral-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                  <span className="text-xs font-bold text-orange-600 dark:text-amber-400 flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5" /> {formatDate(anno.date)}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                    anno.category === 'important' 
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30' 
                      : anno.category === 'event' 
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  }`}>
                    {anno.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-amber-950 dark:text-white mb-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                  {anno.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {anno.content}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Recent Festival Carousel */}
      <section className="py-16 sm:py-20 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <FiImage className="w-3.5 h-3.5" /> Festival Archives
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              RECENT FESTIVAL GLIMPSES
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
              Swipe to explore previous years grand celebrations and divine alankarams
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-3 rounded-full" />
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl relative border border-amber-500/15 dark:border-neutral-800">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="h-[55vh] sm:h-[68vh] w-full"
            >
              {carouselSlides.map((slide, idx) => (
                <SwiperSlide 
                  key={idx} 
                  className="relative w-full h-full cursor-pointer group" 
                  onClick={() => navigate((slide as any).link || `/gallery/${slide.year}`)}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* High contrast gradient scrim for maximum text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                  
                  <div className="absolute bottom-10 left-6 right-6 sm:left-14 sm:right-14 text-white">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3.5 py-1 rounded-full bg-orange-600 text-xs font-bold text-white tracking-wider uppercase shadow-md">
                        {slide.year.startsWith('20') ? `Year ${slide.year}` : slide.year}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-300 font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-400/30">
                        Click to view details <FiArrowRight />
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black font-cinzel text-glow-gold">
                      {slide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-200 mt-2 max-w-2xl line-clamp-2 leading-relaxed">
                      {slide.desc}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* 5. MAHA BATHUKAMMA Spotlight Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-orange-50/40 to-amber-50/20 dark:from-neutral-950 dark:to-neutral-900 transition-colors duration-300 relative overflow-hidden">
        {/* Subtle Decorative Floral Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 to-amber-500/15 text-orange-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3 border border-orange-500/20">
              🌺 తెలంగాణ పూల పండుగ • Bandarupally Tradition
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              MAHA BATHUKAMMA
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl mx-auto">
              Celebrating Bandarupally's monumental floral heritage across landmark editions: <strong>2018</strong>, <strong>2019</strong>, <strong>2021</strong>, <strong>2022</strong>, <strong>2024</strong>, and <strong>2025</strong>. Handcrafted by dedicated youth volunteers using thousands of fresh blossoms.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-3 rounded-full" />
          </div>

          {/* 6 Cards Grid (2 rows of 3 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BATHUKAMMA_EDITIONS.map((ed, idx) => (
              <motion.div
                key={ed.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate('/maha-bathukamma')}
                className="glass-card flex flex-col rounded-2xl overflow-hidden shadow-lg border border-amber-500/20 dark:border-neutral-800 cursor-pointer group bg-white dark:bg-neutral-900"
              >
                {/* Photo Frame */}
                <div className="h-64 sm:h-72 relative overflow-hidden bg-neutral-950">
                  <img
                    src={ed.image}
                    alt={ed.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-xs shadow-md flex items-center gap-1">
                    <FiAward className="w-3.5 h-3.5" />
                    <span>{ed.order}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-amber-400/30 text-amber-300 font-bold text-xs">
                    {ed.year}
                  </div>

                  {/* Height Tag on Bottom Left of Image */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                      Height: {ed.height}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-cinzel text-base sm:text-lg font-black text-amber-950 dark:text-white leading-tight group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                      {ed.title}
                    </h3>
                    <p className="text-xs text-orange-600 dark:text-amber-400 font-bold mt-1">
                      {ed.subtitle}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                      {ed.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-500/10 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-amber-400 uppercase tracking-wider">
                    <span>View Edition Details</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Centered CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/maha-bathukamma')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-xl shadow-orange-600/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore All Maha Bathukamma Editions</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Village Welfare & Seva Spotlight Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-500/10 via-orange-50/30 to-amber-500/5 dark:from-neutral-950 dark:via-neutral-900/60 dark:to-neutral-950 border-y border-amber-500/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-amber-500/20 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/10 dark:bg-amber-400/10 text-orange-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 border border-orange-500/20">
                  <FiHeart className="w-3.5 h-3.5" /> Bandarupally Social Welfare
                </div>
                <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white leading-tight">
                  SERVING OUR VILLAGE BEYOND THE FESTIVAL
                </h2>
                <p className="mt-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                  The Maha Ganapati Youth Committee actively works year-round to support Bandarupally residents. Report village civic problems such as streetlights, water supply, or road repairs directly to our team.
                </p>

                <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-lg">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-amber-500/10 text-xs font-bold text-amber-950 dark:text-neutral-200">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                    <span>Streetlight Outages</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-amber-500/10 text-xs font-bold text-amber-950 dark:text-neutral-200">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                    <span>Drinking Water Supply</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-amber-500/10 text-xs font-bold text-amber-950 dark:text-neutral-200">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                    <span>Road &amp; Sanitation</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-amber-500/10 text-xs font-bold text-amber-950 dark:text-neutral-200">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                    <span>Community Assistance</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate('/village-help')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-lg shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <FiTool className="w-4 h-4" />
                    Submit a Village Problem
                  </button>
                  <button
                    onClick={() => navigate('/village-help')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-amber-500/10 hover:bg-amber-500/20 text-orange-600 dark:text-amber-400 border border-amber-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <FiHelpCircle className="w-4 h-4" />
                    Track Resolved Issues
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40">
                  <img 
                    src="/celebrations/ganesha_2015_youth.jpg" 
                    alt="Maha Ganapati Youth Volunteers" 
                    className="w-full h-72 sm:h-80 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/celebrations/ganesha_2025.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Bandarupally Youth Force</span>
                    <p className="text-sm font-semibold mt-1">Dedicated volunteers working for village unity and welfare.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. Instagram Feed Grid */}
      <section className="py-16 sm:py-20 bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-500/15 dark:border-neutral-800 pb-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-widest mb-2">
                <FiInstagram className="w-3.5 h-3.5" /> Social Media Updates
              </div>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white flex items-center gap-2">
                INSTAGRAM FEED
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                Follow our official social handle for festival videos, dhol-tasha beats, and daily harathi
              </p>
            </div>
            <a 
              href="https://www.instagram.com/maha_ganapati_committe"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 sm:mt-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 hover:scale-105 active:scale-95 transition-all text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg"
            >
              <FiInstagram className="w-4 h-4" /> Follow @maha_ganapati_committee
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTAGRAM_POSTS.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl aspect-square border border-amber-500/15 dark:border-neutral-800/80 cursor-pointer transition-all duration-300"
                onClick={() => window.open(post.instagramUrl, '_blank')}
              >
                {/* Media Image with fallback */}
                <img 
                  src={post.mediaUrl} 
                  alt="Instagram Media" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/celebrations/ganesha_2025.jpg';
                  }}
                />

                {/* Badges (Reels, Videos) */}
                {post.type === 'reel' && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs z-10 flex items-center gap-1 font-bold border border-white/20">
                    <FiPlay className="w-3 h-3 fill-white" /> Reel
                  </span>
                )}
                {post.type === 'video' && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs z-10 flex items-center gap-1 font-bold border border-white/20">
                    <FiPlay className="w-3 h-3" /> Video
                  </span>
                )}

                {/* Engagement Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex items-center justify-end gap-3.5 text-sm font-semibold">
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                      <FiHeart className="fill-red-500 text-red-500" /> {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                      <FiMessageCircle className="fill-white" /> {post.comments}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-xs line-clamp-3 text-neutral-200 mb-2 leading-relaxed">
                      {post.caption}
                    </p>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      Posted on {formatDate(post.date)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
export default Home;
