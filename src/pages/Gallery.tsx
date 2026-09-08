import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { TIMELINE_DATA } from '../utils/mockData';

export const Gallery: React.FC = () => {
  useSEO({
    title: 'Gallery Years',
    description: 'Browse the year-wise Ganesh Chaturthi celebrations in Bandarupally Village. Select a year card (2015 - 2026) to view the exclusive festival photos, videos, schedules, sponsors, and immersion stories.',
  });

  const navigate = useNavigate();

  // We display years from 2015 to 2026
  const galleryYears = TIMELINE_DATA.filter(item => {
    const yr = parseInt(item.year);
    return yr >= 2015 && yr <= 2026;
  });

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Page Header */}
      <section className="relative py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold">
            YEAR WISE GALLERY
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-100">
            Select a year to explore memories and celebrations
          </p>
        </div>
      </section>

      {/* Grid of Year Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryYears.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card flex flex-col rounded-3xl overflow-hidden shadow-lg border border-amber-500/10 dark:border-neutral-800/80 cursor-pointer group"
              onClick={() => navigate(`/gallery/${item.year}`)}
            >
              {/* Cover Image Frame */}
              <div className="h-56 relative overflow-hidden bg-neutral-900">
                <img 
                  src={item.image} 
                  alt={`Ganesha ${item.year}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Year tag */}
                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white text-sm font-black shadow-md flex items-center gap-1.5">
                  <FiCalendar /> {item.year}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-black text-amber-950 dark:text-white leading-tight group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/10 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-amber-400 uppercase tracking-widest">
                  <span>Explore Year Details</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};
export default Gallery;
