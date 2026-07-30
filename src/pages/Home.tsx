import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiCalendar, FiUsers, FiImage, FiVideo, FiInstagram, FiHeart, FiMessageCircle, FiPlay } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { TIMELINE_DATA, ANNOUNCEMENTS, INSTAGRAM_POSTS } from '../utils/mockData';

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

  // Statistics Data
  const stats = [
    { label: 'Years Celebration', value: TIMELINE_DATA.length, icon: <FiCalendar className="w-6 h-6" /> },
    { label: 'Festival Photos', value: '1,200+', icon: <FiImage className="w-6 h-6" /> },
    { label: 'Video Highlights', value: '80+', icon: <FiVideo className="w-6 h-6" /> },
    { label: 'Volunteers Enrolled', value: '150+', icon: <FiUsers className="w-6 h-6" /> },
  ];

  // Carousel images
  const carouselImages = [
    'https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
        {/* Background Image with Saffron-Dark Mask */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1609137144813-9f5b3576f3f0?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-neutral-950/70 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,140,0,0.15),transparent_60%)]" />

        <div className="relative max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 text-amber-400 mb-6"
          >
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full text-glow-gold">
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
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm font-bold tracking-widest text-orange-400 uppercase mb-3"
          >
            Welcome to the Divine Portal
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wide text-glow-gold"
          >
            MAHA GANAPATI COMMITTEE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 font-cinzel text-lg sm:text-2xl font-semibold text-amber-300 tracking-wider"
          >
            Bandarupally Village
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed"
          >
            Unifying our village in the glory of Ganesha Chaturthi. Join us for daily poojas, cultural nights, grand annadanam, and community service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/gallery')}
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-lg shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all"
            >
              View Gallery
            </button>
            <button
              onClick={() => navigate('/village-help')}
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest bg-white/10 border border-white/20 hover:bg-white/20 text-white hover:scale-105 active:scale-95 transition-all backdrop-blur-sm"
            >
              Village Help
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-lg shadow-amber-400/15 hover:scale-105 active:scale-95 transition-all"
            >
              Donate Now
            </button>
          </motion.div>

        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-16 bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-amber-500/5 dark:bg-neutral-800/40 border border-amber-500/10 dark:border-neutral-800"
              >
                <div className="p-3.5 rounded-full bg-orange-600/10 dark:bg-amber-400/10 text-orange-600 dark:text-amber-400 mb-4">
                  {stat.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-bold mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Announcements Section */}
      <section className="py-20 bg-orange-50/20 dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              LATEST ANNOUNCEMENTS
            </h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="flex flex-col gap-5">
            {ANNOUNCEMENTS.map((anno, idx) => (
              <motion.div
                key={anno.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                  <span className="text-xs font-bold text-orange-600 dark:text-amber-400 flex items-center gap-1.5">
                    <FiCalendar /> {anno.date}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                    anno.category === 'important' 
                      ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                      : anno.category === 'event' 
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {anno.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-amber-950 dark:text-white mb-2 leading-tight">
                  {anno.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {anno.content}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Recent Festival Carousel */}
      <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              RECENT FESTIVAL GLIMPSES
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-bold tracking-widest uppercase">
              Swipe to explore previous years celebrations
            </p>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl relative border border-amber-500/10 dark:border-neutral-800">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              className="h-[50vh] sm:h-[65vh] w-full"
            >
              {carouselImages.map((img, idx) => (
                <SwiperSlide key={idx} className="relative w-full h-full">
                  <img src={img} alt="Festival slide" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-12 text-white">
                    <span className="text-xs font-bold text-orange-400 tracking-wider uppercase">Ganesh Chaturthi</span>
                    <h3 className="text-xl sm:text-3xl font-black mt-1 font-cinzel text-glow-gold">Divine Celebrations in Bandarupally</h3>
                    <p className="text-xs text-neutral-300 mt-2 max-w-xl">Every year, the committee and residents join hands to build high clay idols, distribute meals, and host dynamic cultural events.</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* 5. Instagram Feed Grid (Mirror System) */}
      <section className="py-20 bg-orange-50/20 dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-500/10 dark:border-neutral-800 pb-6 mb-12">
            <div>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white flex items-center gap-2">
                <FiInstagram className="text-orange-500" /> INSTAGRAM FEED
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
                Follow our official social handle for real-time video updates
              </p>
            </div>
            <a 
              href="https://www.instagram.com/maha_ganapati_committe"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 hover:scale-105 active:scale-95 transition-all text-white font-bold text-xs uppercase tracking-widest shadow-md"
            >
              <FiInstagram className="w-4 h-4" /> Follow @maha_ganapati_committe
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
                className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md aspect-square border border-amber-500/10 dark:border-neutral-800/80 cursor-pointer"
                onClick={() => window.open(post.instagramUrl, '_blank')}
              >
                {/* Media Image */}
                <img 
                  src={post.mediaUrl} 
                  alt="Instagram Media" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badges (Reels, Videos) */}
                {post.type === 'reel' && (
                  <span className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white text-xs z-10">
                    <FiPlay className="w-3.5 h-3.5 fill-white" />
                  </span>
                )}
                {post.type === 'video' && (
                  <span className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white text-xs z-10">
                    <FiPlay className="w-3.5 h-3.5" />
                  </span>
                )}

                {/* Engagement Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex items-center justify-end gap-3.5 text-sm font-semibold">
                    <span className="flex items-center gap-1"><FiHeart className="fill-white" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><FiMessageCircle className="fill-white" /> {post.comments}</span>
                  </div>
                  
                  <div>
                    <p className="text-xs line-clamp-3 text-neutral-200 mb-2 leading-relaxed">
                      {post.caption}
                    </p>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                      Posted on {post.date}
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
