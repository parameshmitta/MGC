import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiEye, FiHeart, FiPhone, FiFacebook, FiInstagram, FiMessageSquare } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { TIMELINE_DATA, COMMITTEE_MEMBERS } from '../utils/mockData';

export const About: React.FC = () => {
  useSEO({
    title: 'About',
    description: 'Learn about the history, mission, and vision of the Maha Ganapati Committee in Bandarupally Village. Meet our organizing members and browse our historical timeline from 2015 to 2026.',
  });

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Page Header */}
      <section className="relative py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300/80 shadow-lg shadow-black/25 mb-4 bg-neutral-950 ring-2 ring-white/20 p-0.5"
          >
            <img src="/logo.jpg" alt="Maha Ganapati Committee Circular Logo" className="w-full h-full object-cover rounded-full" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold"
          >
            OUR HISTORY & MISSION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-100"
          >
            Maha Ganapati Committee - Bandarupally
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border-t-4 border-t-orange-600"
          >
            <div className="p-4 rounded-full bg-orange-600/10 text-orange-600 mb-5">
              <FiAward className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-amber-950 dark:text-white mb-3">Our Mission</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              To celebrate Ganesh Chaturthi with utmost devotion, maintaining ecological responsibility by using clay Ganesha idols and organic colors, while building an inclusive platform for village bonding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border-t-4 border-t-amber-500"
          >
            <div className="p-4 rounded-full bg-amber-500/10 text-amber-500 mb-5">
              <FiEye className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-amber-950 dark:text-white mb-3">Our Vision</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              To inspire the younger generation of Bandarupally to protect cultural traditions, organize humanitarian services like mass feeding (Annadanam), and support villagers in times of emergency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border-t-4 border-t-red-600"
          >
            <div className="p-4 rounded-full bg-red-600/10 text-red-600 mb-5">
              <FiHeart className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-amber-950 dark:text-white mb-3">Community Service</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Extending help beyond the festival by setting up the Bandarupally Seva Portal, connecting villagers to resolve road, lighting, and water issues collectively with transparency.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Why We Celebrate Ganesha */}
      <section className="py-12 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-950 dark:text-white">
            WHY WE CELEBRATE GANESH FESTIVAL
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto mt-3 rounded-full" />
          <p className="mt-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Ganesh Chaturthi is not just a festival for Bandarupally; it is a spiritual anchor. It marks the time when students, NRIs, elders, and youth return to the village. The shared prayers, dhol drums, decorative lighting, and distribution of holy prasadam restore peace and build an unbreakable sense of community harmony.
          </p>
        </div>
      </section>

      {/* Vertical Animated Timeline Section */}
      <section className="py-20 bg-orange-50/20 dark:bg-neutral-950 transition-colors duration-300 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              FESTIVAL TIMELINE JOURNEY
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-bold tracking-widest uppercase">
              Our milestones and idol details from 2015 to 2026 present
            </p>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="relative">
            {/* Center Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-amber-500/20 -translate-x-1/2" />

            {/* Timeline Cards */}
            <div className="space-y-12">
              {TIMELINE_DATA.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={item.year} className="relative flex flex-col md:flex-row items-start md:items-center">
                    
                    {/* Circle Pin indicator */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 border-4 border-white dark:border-neutral-900 shadow-md -translate-x-1/2 z-10 flex items-center justify-center text-[10px] font-bold text-white">
                      {item.year.slice(2)}
                    </div>

                    {/* Content Container */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:self-end md:ml-auto'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-6 rounded-2xl relative overflow-hidden"
                      >
                        {/* Year Badge */}
                        <span className="inline-block px-3 py-1 bg-orange-600/10 text-orange-600 dark:bg-amber-400/10 dark:text-amber-400 rounded-full text-xs font-bold mb-3">
                          Year {item.year}
                        </span>

                        <h3 className="font-cinzel text-lg font-black text-amber-950 dark:text-white mb-2 leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        <div className="flex flex-col gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-semibold border-t border-amber-500/10 dark:border-neutral-800 pt-3">
                          <div>
                            <span className="text-orange-600 dark:text-amber-400">Specialty:</span> {item.specialty}
                          </div>
                        </div>

                        {/* Image decoration */}
                        <div className="mt-4 h-40 w-full overflow-hidden rounded-xl">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Committee Directory Grid */}
      <section className="py-20 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-amber-950 dark:text-white">
              MEET OUR COMMITTEE MEMBERS
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-bold tracking-widest uppercase">
              Working transparently for the betterment of Bandarupally
            </p>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMMITTEE_MEMBERS.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col items-center text-center group"
              >
                {/* Photo Frame */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500/20 group-hover:border-amber-500 transition-colors duration-300 mb-4">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: member.objectPosition || 'center' }}
                  />
                </div>

                <h3 className="text-lg font-black text-amber-950 dark:text-white leading-tight">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-orange-600 dark:text-amber-400 uppercase tracking-widest mt-1 block">
                  {member.role}
                </span>

                <div className="flex items-center gap-1.5 mt-4 text-xs font-bold text-neutral-500 dark:text-neutral-400 bg-amber-500/5 dark:bg-neutral-800 px-3.5 py-1.5 rounded-full border border-amber-500/10 dark:border-neutral-700/50">
                  <FiPhone className="text-orange-500" /> {member.phone}
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-3.5 mt-4 text-neutral-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {member.socials.facebook && (
                    <a href={member.socials.facebook} className="hover:scale-110 active:scale-95 transition-transform">
                      <FiFacebook className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a href={member.socials.instagram} className="hover:scale-110 active:scale-95 transition-transform">
                      <FiInstagram className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.whatsapp && (
                    <a href={member.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:scale-110 active:scale-95 transition-transform">
                      <FiMessageSquare className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
export default About;
