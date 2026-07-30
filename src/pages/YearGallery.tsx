import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiImage, FiVideo, FiCalendar, FiTruck, FiUsers, FiSearch } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { getYearGallery } from '../utils/mockData';
import type { YearGalleryData } from '../utils/mockData';
import { ImageLightbox } from '../components/common/ImageLightbox';

type TabType = 'photos' | 'videos' | 'events' | 'immersion' | 'sponsors';

export const YearGallery: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  
  const [data, setData] = useState<YearGalleryData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [searchQuery, setSearchQuery] = useState('');
  const [photoCategory, setPhotoCategory] = useState<string>('all');
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 6;

  useEffect(() => {
    if (!year) return;
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 2018 || yearNum > 2026) {
      navigate('/gallery');
      return;
    }
    const galleryData = getYearGallery(year);
    setData(galleryData);
    
    // Reset states on year change
    setActiveTab('photos');
    setSearchQuery('');
    setPhotoCategory('all');
    setCurrentPage(1);
  }, [year, navigate]);

  useSEO({
    title: year ? `Year ${year} Gallery` : 'Gallery Year Details',
    description: year ? `Browse the Ganesha Chaturthi photos, videos, and events schedule of Bandarupally from the year ${year}.` : 'Ganesha Bandarupally year details.',
  });

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500" />
      </div>
    );
  }

  // Filter photos
  const filteredPhotos = data.photos.filter((photo) => {
    const matchesSearch = photo.caption.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = photoCategory === 'all' || photo.category === photoCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginated photos
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  const openLightbox = (photoUrl: string) => {
    const idx = data.photos.findIndex((p) => p.url === photoUrl);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: 'photos', label: 'Photos', icon: <FiImage /> },
    { id: 'videos', label: 'Videos', icon: <FiVideo /> },
    { id: 'events', label: 'Daily Events', icon: <FiCalendar /> },
    { id: 'immersion', label: 'Immersion', icon: <FiTruck /> },
    { id: 'sponsors', label: 'Sponsors & Team', icon: <FiUsers /> },
  ];

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Dynamic Cover Banner */}
      <section className="relative h-[45vh] flex items-end bg-neutral-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-102"
          style={{ backgroundImage: `url('${data.coverImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-neutral-950/60 to-neutral-950/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 flex flex-col items-start">
          <Link 
            to="/gallery" 
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400/80 hover:text-amber-400 mb-4 transition-colors focus:outline-none"
          >
            <FiArrowLeft className="stroke-[2.5]" /> Back to Years
          </Link>
          <span className="px-3.5 py-1 rounded-full bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-md mb-2">
            Celebrating {data.year}
          </span>
          <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-wide text-glow-gold">
            {data.theme}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold text-neutral-300">
            Idol Height: {data.idolHeight} &bull; Bandarupally Village
          </p>
        </div>
      </section>

      {/* Tabs navigation */}
      <section className="sticky top-16 z-30 bg-orange-50/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-amber-500/10 dark:border-neutral-800 transition-colors py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar flex items-center justify-start md:justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap focus:outline-none ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-amber-950/85 hover:text-orange-600 hover:bg-orange-50 dark:text-neutral-300 dark:hover:text-amber-400 dark:hover:bg-neutral-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        
        {/* TAB 1: PHOTOS */}
        {activeTab === 'photos' && (
          <div className="flex flex-col gap-8">
            
            {/* Filters bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900 p-4.5 rounded-2xl border border-amber-500/5 dark:border-neutral-800 shadow-sm transition-colors">
              <div className="relative w-full md:w-80">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search photos by caption..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700/80 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              {/* Categories select */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
                {['all', 'idol', 'pooja', 'laddu', 'cultural', 'procession', 'immersion'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setPhotoCategory(cat); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                      photoCategory === cat
                        ? 'bg-amber-500 border-amber-500 text-amber-950 font-black'
                        : 'border-amber-500/10 hover:border-amber-500/30 bg-amber-500/5 text-amber-950 dark:text-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Grid */}
            {currentPhotos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group relative glass-card rounded-2xl overflow-hidden shadow-sm aspect-square cursor-pointer"
                    onClick={() => openLightbox(photo.url)}
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                      <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1">
                        {photo.category}
                      </span>
                      <p className="text-xs font-semibold leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-neutral-400 text-sm font-semibold">
                No photos found matching your filters.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2.5 mt-8">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                      currentPage === idx + 1
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white dark:bg-neutral-900 border border-amber-500/10 hover:bg-orange-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: VIDEOS */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.videos.map((vid) => (
              <motion.div 
                key={vid.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="aspect-video w-full bg-neutral-950 relative">
                  <iframe 
                    src={vid.url} 
                    title={vid.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-black text-amber-950 dark:text-white leading-tight">
                      {vid.title}
                    </h4>
                    <span className="text-[10px] text-neutral-500 font-bold block mt-1">
                      Duration: {vid.duration} mins
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 3: DAILY EVENTS */}
        {activeTab === 'events' && (
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {data.dailyEvents.map((evt, idx) => (
              <motion.div
                key={evt.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl border-l-4 border-l-orange-500 flex flex-col sm:flex-row justify-between items-start gap-4"
              >
                <div className="flex-grow">
                  <span className="text-xs font-bold text-orange-600 dark:text-amber-400 block mb-1">
                    {evt.date}
                  </span>
                  <h4 className="text-base font-black text-amber-950 dark:text-white mb-2 leading-tight">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
                
                <div className="w-full sm:w-44 px-3.5 py-2.5 rounded-xl bg-orange-600/5 dark:bg-neutral-800 border border-orange-500/10 flex-shrink-0">
                  <span className="text-[9px] font-black uppercase tracking-wider text-orange-600 dark:text-amber-400 block mb-1">
                    Maha Prasadam
                  </span>
                  <p className="text-xs font-bold text-amber-950 dark:text-neutral-300">
                    {evt.prasadam}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 4: IMMERSION */}
        {activeTab === 'immersion' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6.5 rounded-2xl"
            >
              <h3 className="font-cinzel text-lg font-bold text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-4">
                Visarjan Story & Timings
              </h3>
              <ul className="flex flex-col gap-4 text-xs font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <li>
                  <strong className="text-orange-600 dark:text-amber-400 block mb-0.5">Visarjan Date:</strong>
                  {data.immersionDetails.date}
                </li>
                <li>
                  <strong className="text-orange-600 dark:text-amber-400 block mb-0.5">Shobha Yatra Route:</strong>
                  {data.immersionDetails.route}
                </li>
                <li>
                  <strong className="text-orange-600 dark:text-amber-400 block mb-0.5">Visarjan Summary:</strong>
                  {data.immersionDetails.description}
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6.5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-4">
                  Shobha Yatra Highlights
                </h3>
                <ul className="list-disc pl-5 text-xs text-neutral-600 dark:text-neutral-400 font-semibold space-y-2">
                  {data.immersionDetails.highlights.map((hl, idx) => (
                    <li key={idx}>{hl}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 p-3 rounded-xl bg-amber-500/5 dark:bg-neutral-800 border border-amber-500/10 text-[10px] text-center font-bold text-neutral-500 dark:text-neutral-400">
                Immersion videos can be watched in the Videos Tab
              </div>
            </motion.div>

          </div>
        )}

        {/* TAB 5: SPONSORS & VOLUNTEERS */}
        {activeTab === 'sponsors' && (
          <div className="flex flex-col gap-12">
            
            {/* Sponsors Grid */}
            <div>
              <h3 className="font-cinzel text-lg font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3 mb-6 flex items-center justify-between">
                <span>Festival Sponsors</span>
                <span className="text-xs font-bold text-orange-600 dark:text-amber-400">Generous Contributors</span>
              </h3>
              
              {data.sponsors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.sponsors.map((sp) => (
                    <div key={sp.id} className="glass-card p-5 rounded-2xl text-center flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-500/10 bg-amber-500/5 flex items-center justify-center text-amber-600 mb-3">
                        <img src={sp.logo} alt={sp.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-sm font-black text-amber-950 dark:text-white truncate max-w-full">
                        {sp.name}
                      </h4>
                      <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">
                        Village: {sp.village}
                      </p>
                      {sp.amount && (
                        <span className="mt-2.5 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-full font-black text-xs">
                          {sp.amount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-400 text-xs font-semibold text-center py-6">
                  No sponsors listed yet for this year.
                </p>
              )}
            </div>

            {/* Volunteers Lists */}
            <div>
              <h3 className="font-cinzel text-lg font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3 mb-6">
                Organizing Volunteers Team
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                {data.volunteers.map((vol, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-amber-500/5 dark:bg-neutral-800 border border-amber-500/10 dark:border-neutral-700/50 rounded-xl text-center text-xs font-bold text-amber-950 dark:text-neutral-300"
                  >
                    {vol}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </section>

      {/* Lightbox Module */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={data.photos}
        initialIndex={lightboxIndex}
      />

    </div>
  );
};
export default YearGallery;
