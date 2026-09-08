import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiPhone, FiFacebook, FiInstagram, FiMessageSquare } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { COMMITTEE_MEMBERS } from '../utils/mockData';

export const Committee: React.FC = () => {
  useSEO({
    title: 'Committee Members',
    description: 'Meet the executive body of Maha Ganapati Committee Bandarupally. View roles, contact details, and social handles of Mitta Paramesh and other officers.',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredMembers = COMMITTEE_MEMBERS.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesRole = true;
    if (roleFilter === 'officers') {
      matchesRole = member.role === 'Core Member';
    } else if (roleFilter === 'members') {
      matchesRole = member.role !== 'Core Member';
    }
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Header Banner */}
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
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold">
            COMMITTEE TEAM
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-100">
            Dedicated team leading Ganesh Utsav & Village Welfare
          </p>
        </div>
      </section>

      {/* Main Grid and Search controls */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-amber-500/5 dark:border-neutral-800 shadow-sm transition-colors mb-12">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search member by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700/80 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Role filter buttons */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Members' },
              { id: 'officers', label: 'Core Members' },
              { id: 'members', label: 'Executive Body' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setRoleFilter(btn.id)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  roleFilter === btn.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-amber-500/5 hover:bg-amber-500/10 text-amber-950 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

        </div>

        {/* Member Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card glass-card-hover p-6 rounded-3xl flex flex-col items-center text-center group"
              >
                
                {/* Image Avatar */}
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-amber-500/20 group-hover:border-amber-500 transition-colors duration-300 mb-4 shadow-md bg-neutral-100">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: member.objectPosition || 'center' }}
                    loading="lazy"
                  />
                </div>

                <h3 className="text-base font-black text-amber-950 dark:text-white leading-tight">
                  {member.name}
                </h3>
                <span className="px-3.5 py-1 rounded-full bg-orange-600/10 text-orange-600 dark:bg-amber-400/10 dark:text-amber-400 font-bold text-[10px] uppercase tracking-widest mt-1.5 inline-block">
                  {member.role}
                </span>

                {/* Call Button */}
                <a 
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  className="mt-6 flex items-center gap-1.5 text-xs font-bold text-neutral-500 dark:text-neutral-400 bg-amber-500/5 dark:bg-neutral-800 hover:bg-orange-600/10 hover:text-orange-600 transition-colors px-4 py-2 rounded-xl border border-amber-500/10 dark:border-neutral-700/80"
                >
                  <FiPhone /> Call: {member.phone}
                </a>

                {/* Social media handles */}
                <div className="flex items-center gap-4 mt-5 text-neutral-400 dark:text-neutral-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {member.socials.facebook && (
                    <a href={member.socials.facebook} className="hover:scale-110 active:scale-95 transition-transform">
                      <FiFacebook className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a href={member.socials.instagram} className="hover:scale-110 active:scale-95 transition-transform">
                      <FiInstagram className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {member.socials.whatsapp && (
                    <a href={member.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:scale-110 active:scale-95 transition-transform">
                      <FiMessageSquare className="w-4.5 h-4.5" />
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400 font-semibold text-sm">
            No committee members match your search parameters.
          </div>
        )}

      </section>

    </div>
  );
};
export default Committee;
