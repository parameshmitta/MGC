import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiMaximize2, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight, 
  FiAward, 
  FiLayers, 
  FiUsers, 
  FiArrowRight,
  FiCheckCircle,
  FiImage
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { BATHUKAMMA_EDITIONS } from '../utils/mockData';

export const MahaBathukamma: React.FC = () => {
  useSEO({
    title: 'Maha Bathukamma Celebrations | Bandarupally',
    description: 'Explore the iconic Maha Bathukamma tradition organized by Maha Ganapati Committee in Bandarupally Village across landmark editions from 2018 to 2025.',
  });

  const navigate = useNavigate();
  // State for active photo on each edition card
  const [activeCardPhotos, setActiveCardPhotos] = useState<Record<string, number>>({});
  // State for fullscreen lightbox
  const [lightboxState, setLightboxState] = useState<{
    editionId: string;
    photoIndex: number;
  } | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredEditions = activeFilter === 'all' 
    ? BATHUKAMMA_EDITIONS 
    : BATHUKAMMA_EDITIONS.filter(e => e.year === activeFilter);

  // Flatten all photos for continuous lightbox browsing, with the main spotlight photo first
  const allPhotosList = [
    {
      url: '/bathukamma/maha_bathukamma_committee_main.jpg',
      edition: {
        id: 'main-spotlight',
        year: 'All Years',
        order: 'Spotlight',
        title: 'Bandarupally Youth Force with Maha Bathukamma',
        subtitle: 'The Artisans Behind the Monument',
        image: '/bathukamma/maha_bathukamma_committee_main.jpg',
        photos: ['/bathukamma/maha_bathukamma_committee_main.jpg'],
        height: 'Iconic',
        flowersUsed: 'Fresh Marigolds & Traditional Flora',
        description: 'The dedicated Maha Ganapati Committee volunteers who crafted the colossal floral wonder bringing the entire Bandarupally village together.',
        highlights: ['Maha Ganapati Committee youth unity', 'Handcrafted floral masterpiece']
      },
      photoIndex: 0,
      totalInEdition: 1,
    },
    ...BATHUKAMMA_EDITIONS.flatMap(ed => 
      ed.photos.map((url, idx) => ({
        url,
        edition: ed,
        photoIndex: idx,
        totalInEdition: ed.photos.length,
      }))
    )
  ];

  const currentFlatIndex = lightboxState
    ? allPhotosList.findIndex(
        p => p.edition.id === lightboxState.editionId && p.photoIndex === lightboxState.photoIndex
      )
    : -1;

  const currentPhotoItem = currentFlatIndex >= 0 ? allPhotosList[currentFlatIndex] : null;

  const handleNextPhoto = () => {
    if (currentFlatIndex < 0) return;
    const nextIdx = (currentFlatIndex + 1) % allPhotosList.length;
    const nextItem = allPhotosList[nextIdx];
    setLightboxState({
      editionId: nextItem.edition.id,
      photoIndex: nextItem.photoIndex,
    });
  };

  const handlePrevPhoto = () => {
    if (currentFlatIndex < 0) return;
    const prevIdx = (currentFlatIndex - 1 + allPhotosList.length) % allPhotosList.length;
    const prevItem = allPhotosList[prevIdx];
    setLightboxState({
      editionId: prevItem.edition.id,
      photoIndex: prevItem.photoIndex,
    });
  };

  const setCardPhoto = (editionId: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardPhotos(prev => ({ ...prev, [editionId]: idx }));
  };

  return (
    <div className="flex flex-col w-full pb-20 overflow-hidden">
      
      {/* 1. Devotional Floral Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center bg-neutral-950 overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        {/* Background Atmosphere: Main Committee with Maha Bathukamma Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/bathukamma/maha_bathukamma_committee_main.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22),transparent_70%)]" />

        <div className="relative max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
          
          {/* Decorative Floral Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>తెలంగాణ పూల పండుగ • Floral Heritage of Bandarupally</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-wide text-glow-gold"
          >
            MAHA BATHUKAMMA
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 font-cinzel text-base sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent tracking-widest flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
          >
            <span className="h-[1px] w-6 sm:w-16 bg-amber-400/50 hidden sm:inline-block" />
            6 ICONIC EDITIONS (2018 • 2019 • 2021 • 2022 • 2024 • 2025)
            <span className="h-[1px] w-6 sm:w-16 bg-amber-400/50 hidden sm:inline-block" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 max-w-2xl leading-relaxed"
          >
            A monumental cultural marvel sculpted with thousands of fresh marigolds and seasonal blossoms by the Maha Ganapati Committee youth, celebrating womanhood, nature, and village solidarity.
          </motion.p>

          {/* Main Featured Spotlight Photo: Committee with Maha Bathukamma */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.7 }}
            onClick={() => setLightboxState({ editionId: 'main-spotlight', photoIndex: 0 })}
            className="mt-8 relative max-w-3xl w-full rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl shadow-orange-600/30 group cursor-pointer bg-neutral-950"
          >
            <div className="h-64 sm:h-96 w-full relative overflow-hidden">
              <img 
                src="/bathukamma/maha_bathukamma_committee_main.jpg" 
                alt="Maha Ganapati Youth Committee with Maha Bathukamma" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <FiAward /> Main Spotlight Photo
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left flex items-end justify-between text-white">
                <div>
                  <span className="font-cinzel text-base sm:text-2xl font-black text-glow-gold block">
                    Bandarupally Youth Force with Maha Bathukamma
                  </span>
                  <p className="text-xs text-neutral-200 mt-1 max-w-xl hidden sm:block">
                    The dedicated Maha Ganapati Committee volunteers who crafted the colossal floral wonder bringing the village together.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white group-hover:bg-amber-500 transition-colors">
                  <FiMaximize2 className="w-3.5 h-3.5" /> Fullscreen
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Year Pill Jumpers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-2 justify-center items-center"
          >
            {BATHUKAMMA_EDITIONS.map((ed) => (
              <a
                key={ed.year}
                href={`#${ed.id}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-amber-500/20 text-amber-200 border border-amber-400/30 hover:border-amber-400 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <FiCalendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{ed.order} ({ed.year})</span>
              </a>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Hero to Body Transition */}
      <div className="w-full h-8 bg-gradient-to-b from-neutral-950 to-white dark:to-neutral-900 border-b border-amber-500/10 dark:border-neutral-800" />

      {/* 2. Overview Stats & Cultural Story */}
      <section className="py-12 sm:py-16 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 dark:bg-neutral-800/50 border border-amber-500/20 text-center flex flex-col items-center">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 dark:text-amber-400 mb-2">
                <FiAward className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-amber-950 dark:text-white">6</span>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 mt-1 uppercase tracking-wider">Milestone Editions</span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 dark:bg-neutral-800/50 border border-amber-500/20 text-center flex flex-col items-center">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 dark:text-amber-400 mb-2">
                <FiLayers className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-amber-950 dark:text-white">20+ Feet</span>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 mt-1 uppercase tracking-wider">Peak Height Record</span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 dark:bg-neutral-800/50 border border-amber-500/20 text-center flex flex-col items-center">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 dark:text-amber-400 mb-2">
                <FiImage className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-amber-950 dark:text-white">8+</span>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 mt-1 uppercase tracking-wider">Historic Photographs</span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 dark:bg-neutral-800/50 border border-amber-500/20 text-center flex flex-col items-center">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 dark:text-amber-400 mb-2">
                <FiUsers className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-amber-950 dark:text-white">1,500+</span>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 mt-1 uppercase tracking-wider">Village Devotees</span>
            </div>
          </div>

          {/* Cultural Significance Banner */}
          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-amber-500/20 relative overflow-hidden bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-yellow-500/5">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-amber-400">
                The Pride of Bandarupally
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-amber-950 dark:text-white mt-1">
                A Grand Tribute to Telangana's Living Flower Festival
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Bathukamma is Telangana's state festival honoring Goddess Gauri as the life-giver and embodiment of Mother Earth. In Bandarupally Village, the Maha Ganapati Committee volunteers take this veneration to a majestic scale by handcrafting a gigantic central <strong>MAHA BATHUKAMMA</strong>.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                From the inaugural landmark in <strong>2018</strong> through <strong>2019, 2021, 2022, 2024, and 2025</strong>, this annual monument has grown in height, artistry, and devotional grandeur, becoming the pride of our village where hundreds of families celebrate with traditional Bathukamma folk songs and dances.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The Landmark Editions Showcase */}
      <section className="py-12 sm:py-20 bg-orange-50/25 dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <FiCalendar className="w-3.5 h-3.5" /> Landmark Retrospective
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              CHRONOLOGY OF MAHA BATHUKAMMA
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              Click on any photograph to view in high definition fullscreen
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-3 rounded-full" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-amber-500/20 hover:border-amber-400'
              }`}
            >
              All 6 Editions
            </button>
            {BATHUKAMMA_EDITIONS.map(ed => (
              <button
                key={ed.year}
                onClick={() => setActiveFilter(ed.year)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === ed.year
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-amber-500/20 hover:border-amber-400'
                }`}
              >
                {ed.order} ({ed.year})
              </button>
            ))}
          </div>

          {/* Grid of Edition Cards */}
          <div className="flex flex-col gap-12">
            {filteredEditions.map((edition, idx) => {
              const isEven = idx % 2 === 1;
              const currentPhotoIndex = activeCardPhotos[edition.id] ?? 0;
              const activePhoto = edition.photos[currentPhotoIndex] || edition.image;

              return (
                <motion.div
                  id={edition.id}
                  key={edition.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                  className="glass-card rounded-3xl overflow-hidden border border-amber-500/20 dark:border-neutral-800 shadow-xl bg-white dark:bg-neutral-900"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}>
                    
                    {/* Left: Image Container */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="flex flex-col gap-3">
                        <div 
                          className="relative group rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 cursor-pointer bg-neutral-950 aspect-[4/5] sm:aspect-[3/4]"
                          onClick={() => setLightboxState({ editionId: edition.id, photoIndex: currentPhotoIndex })}
                        >
                          <img
                            src={activePhoto}
                            alt={`${edition.title} Photo ${currentPhotoIndex + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 group-hover:from-black/60 transition-colors" />

                          {/* Badges on Image */}
                          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                            <FiAward /> {edition.order} Edition
                          </div>

                          <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 font-bold text-xs">
                            {edition.year}
                          </div>

                          {/* Bottom Click to Expand */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                            <span className="font-cinzel text-base font-bold text-glow-gold">
                              {edition.title}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] group-hover:bg-amber-500 transition-colors">
                              <FiMaximize2 className="w-3.5 h-3.5" /> Fullscreen
                            </span>
                          </div>
                        </div>

                        {/* If edition has multiple photos, show photo thumbnails selector */}
                        {edition.photos.length > 1 && (
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mr-1">
                              View Angles:
                            </span>
                            {edition.photos.map((pUrl, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={(e) => setCardPhoto(edition.id, pIdx, e)}
                                className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                                  currentPhotoIndex === pIdx
                                    ? 'border-orange-500 ring-2 ring-orange-500/40 scale-105'
                                    : 'border-amber-400/30 opacity-70 hover:opacity-100'
                                }`}
                              >
                                <img src={pUrl} alt={`Angle ${pIdx + 1}`} className="w-full h-full object-cover" />
                                <span className="absolute bottom-0 right-0 bg-black/75 text-[9px] font-black text-white px-1 rounded-tl">
                                  #{pIdx + 1}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Detailed Content */}
                    <div className={`lg:col-span-7 flex flex-col items-start ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-orange-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest border border-amber-500/20">
                          Milestone Year {edition.year}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold">
                          Height: {edition.height}
                        </span>
                        {edition.photos.length > 1 && (
                          <span className="px-3 py-1 rounded-full bg-orange-600/10 text-orange-600 dark:text-orange-400 text-xs font-bold">
                            📸 {edition.photos.length} Photos Available
                          </span>
                        )}
                      </div>

                      <h3 className="font-cinzel text-2xl sm:text-4xl font-black text-amber-950 dark:text-white leading-tight">
                        {edition.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-orange-600 dark:text-amber-400 mt-1 uppercase tracking-wider">
                        {edition.subtitle}
                      </p>

                      <p className="mt-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {edition.description}
                      </p>

                      {/* Floral Specifications */}
                      <div className="mt-5 p-4 rounded-xl bg-amber-500/5 dark:bg-neutral-800/60 border border-amber-500/15 w-full">
                        <div className="text-[11px] font-black uppercase tracking-widest text-amber-900 dark:text-amber-300 mb-1">
                          🌺 Natural Floral Composition
                        </div>
                        <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                          {edition.flowersUsed}
                        </div>
                      </div>

                      {/* Highlights checklist */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                        {edition.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                            <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="mt-7 flex items-center gap-3">
                        <button
                          onClick={() => setLightboxState({ editionId: edition.id, photoIndex: currentPhotoIndex })}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-md shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all"
                        >
                          <FiMaximize2 className="w-3.5 h-3.5" />
                          View Full Photograph
                        </button>
                        <button
                          onClick={() => navigate('/gallery')}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                        >
                          <span>Festival Gallery</span>
                          <FiArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentPhotoItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setLightboxState(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxState(null)}
              className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
              aria-label="Close Lightbox"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
              aria-label="Previous Photo"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
              aria-label="Next Photo"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <motion.div
              key={currentPhotoItem.url}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[92vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-neutral-950 border border-amber-400/30 p-2"
            >
              <img
                src={currentPhotoItem.url}
                alt={currentPhotoItem.edition.title}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-2xl"
              />

              <div className="p-4 text-center text-white max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1 border border-amber-500/30">
                  {currentPhotoItem.edition.order} Edition • Year {currentPhotoItem.edition.year} 
                  {currentPhotoItem.totalInEdition > 1 && (
                    <span>(Photo {currentPhotoItem.photoIndex + 1} of {currentPhotoItem.totalInEdition})</span>
                  )}
                </div>
                <h3 className="font-cinzel text-lg sm:text-2xl font-black text-glow-gold">
                  {currentPhotoItem.edition.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                  {currentPhotoItem.edition.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MahaBathukamma;
