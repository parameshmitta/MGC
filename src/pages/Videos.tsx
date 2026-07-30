import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiVideo } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { TIMELINE_DATA, getYearGallery } from '../utils/mockData';

export const Videos: React.FC = () => {
  useSEO({
    title: 'Videos Archive',
    description: 'Watch festival videos, visarjan shobha yatra processions, daily harathi, and cultural performance videos from Bandarupally Village.',
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Collect all videos from years 2021 to 2026
  const allVideos = TIMELINE_DATA.filter(item => {
    const yr = parseInt(item.year);
    return yr >= 2021 && yr <= 2026;
  }).flatMap((item) => {
    const gallery = getYearGallery(item.year);
    return gallery.videos.map((vid) => ({
      ...vid,
      year: item.year,
      theme: gallery.theme
    }));
  });

  const filteredVideos = allVideos.filter((vid) =>
    vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vid.year.includes(searchQuery)
  );

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Page Header */}
      <section className="relative py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold">
            VIDEOS PLAYLIST
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-100">
            Relive the beats, dancing, and devotion
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        
        {/* Search */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by video title or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-500/10 bg-white dark:bg-neutral-900 dark:border-neutral-700/80 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVideos.map((vid, index) => (
              <motion.div
                key={`${vid.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl overflow-hidden shadow-md flex flex-col justify-between"
              >
                {/* Embed player */}
                <div className="aspect-video w-full bg-neutral-950">
                  <iframe 
                    src={vid.url} 
                    title={vid.title} 
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                
                {/* Video Info */}
                <div className="p-5 flex justify-between items-start gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-orange-600/10 text-orange-600 dark:bg-amber-400/10 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider mb-2.5 inline-block">
                      Celebration {vid.year}
                    </span>
                    <h3 className="text-sm font-black text-amber-950 dark:text-white leading-tight">
                      {vid.title}
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-semibold mt-1">
                      Theme: {vid.theme}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 flex-shrink-0 bg-amber-500/5 px-2.5 py-1 rounded-md border border-amber-500/10">
                    <FiVideo /> {vid.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400 font-semibold text-sm">
            No video archives matching your query.
          </div>
        )}

      </section>

    </div>
  );
};
export default Videos;
