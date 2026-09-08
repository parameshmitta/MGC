import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiDollarSign, FiHeart, FiShield } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { SPONSORS_DATA } from '../utils/mockData';

export const Sponsors: React.FC = () => {
  useSEO({
    title: 'Sponsors & Donors',
    description: 'Explore the list of generous sponsors and donors of Maha Ganapati Committee Bandarupally. Learn how contributions are utilized for organic clay distributions and mass feeding.',
  });

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold">
            OUR SPONSORS & DONORS
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-100">
            Gratitude to those who support our community festivals
          </p>
        </div>
      </section>

      {/* Main grids */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        
        {/* Donation utility chart card */}
        <div className="bg-white dark:bg-neutral-900 border border-amber-500/10 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm transition-colors mb-16">
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 dark:text-white mb-6 border-b border-amber-500/10 dark:border-neutral-800 pb-3">
            How Your Contributions Are Utilized
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-semibold">
            {[
              { title: 'Eco-Friendly Idols', pct: '25%', desc: 'Procuring 100% organic clay Ganesha idols and distributing small clay idols to village homes.', icon: <FiShield className="w-5 h-5" /> },
              { title: 'Maha Annadanam', pct: '45%', desc: 'Distributing clean, nutritious vegetarian meals (prasadam) to thousands of devotees during festival days.', icon: <FiHeart className="w-5 h-5" /> },
              { title: 'Decor & Lighting', pct: '15%', desc: 'Aesthetic street illumination, floral decorations, and sound systems for devotional chants.', icon: <FiAward className="w-5 h-5" /> },
              { title: 'Village Charity', pct: '15%', desc: 'Supporting local government schools, street repairs, and medical emergency funds for underprivileged families.', icon: <FiDollarSign className="w-5 h-5" /> }
            ].map((u) => (
              <div key={u.title} className="p-5 rounded-2xl bg-amber-500/5 dark:bg-neutral-800/40 border border-amber-500/10">
                <div className="flex items-center justify-between text-orange-600 dark:text-amber-400 mb-3.5">
                  <div className="p-2 rounded-full bg-orange-600/10 dark:bg-amber-400/10">{u.icon}</div>
                  <span className="text-lg font-black">{u.pct}</span>
                </div>
                <h4 className="text-sm font-black text-amber-950 dark:text-white mb-1.5">{u.title}</h4>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsors Display list */}
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 dark:text-white mb-8 border-b border-amber-500/10 dark:border-neutral-800 pb-3">
            Honorable Donors Directory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPONSORS_DATA.map((sp) => (
              <motion.div
                key={sp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center text-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-500/10 bg-amber-500/5 flex items-center justify-center mb-3">
                    <img src={sp.logo} alt={sp.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-sm font-black text-amber-950 dark:text-white leading-tight">
                    {sp.name}
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-semibold block mt-1">
                    Origin: {sp.village}
                  </span>
                  <span className="text-[10px] text-orange-600 dark:text-amber-400 font-black block mt-0.5">
                    Year: {sp.year}
                  </span>
                </div>
                
                {sp.amount && (
                  <span className="mt-5 px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-full font-black text-xs">
                    {sp.amount}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sponsor call to action */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-600/5 to-amber-500/5 border border-amber-500/10 dark:border-neutral-800 p-8 rounded-3xl">
          <h3 className="font-cinzel text-lg font-black text-amber-950 dark:text-white mb-2">
            Want to Sponsor Annadanam or Laddu Prasadam?
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto mb-6">
            If you wish to contribute to the Ganesha celebrations or book a specific day morning/evening prasadam sponsor, please reach out to the committee core member Mitta Paramesh or write to us.
          </p>
          <a 
            href="tel:+918555839756"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:scale-105 active:scale-95 transition-all text-white font-bold text-xs uppercase tracking-widest shadow-md"
          >
            Contact Committee
          </a>
        </div>

      </section>

    </div>
  );
};
export default Sponsors;
