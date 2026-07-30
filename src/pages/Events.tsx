import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCalendar, FiMapPin, FiUsers, FiX, FiCheckCircle } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const UPCOMING_EVENTS = [
  {
    id: 'ue1',
    title: 'Ganesha Clay Idol Sthapana & Pooja',
    date: '2026-09-15',
    time: '08:30 AM onwards',
    location: 'Main Bazar Pandal, Bandarupally',
    desc: 'Installation ceremony (Sthapana) of the 15ft Ganesha clay idol with Vedic chants and Ganapati Homa.',
    prasadam: 'Modak, Undrallu, Payasam'
  },
  {
    id: 'ue2',
    title: 'Maha Annadanam (Mass Devotional Feeding)',
    date: '2026-09-18',
    time: '12:00 PM - 04:00 PM',
    location: 'ZPH High School Grounds, Bandarupally',
    desc: 'Mass food distribution drive serving fresh meals to over 5,000 devotees from Bandarupally and neighboring villages.',
    prasadam: 'Complete Andhra Traditional Feast'
  },
  {
    id: 'ue3',
    title: 'Shobha Yatra & Reservoir Visarjan',
    date: '2026-09-19',
    time: '02:00 PM onwards',
    location: 'From Pandal to Bandarupally Cheruvu',
    desc: 'Visarjan procession with dhol beats, flowers, and village kolatam dances, ending at local reservoir.',
    prasadam: 'Pulihora & Laddu'
  }
];

const PAST_EVENTS = [
  {
    id: 'pe1',
    title: 'Eco Ganesha Free Clay Distribution Drive',
    date: '2026-07-20',
    location: 'Panchayat Office, Bandarupally',
    desc: 'Distributed 500 small eco-friendly clay idols to village homes to encourage green celebrations at home.'
  },
  {
    id: 'pe2',
    title: 'Laddu Prasadam Auction 2025',
    date: '2025-09-19',
    location: 'Main Pandal stage',
    desc: 'Annual holy laddu auction. Dedicated youth group bought the laddu for ₹1,50,000; amount donated to government school renovations.'
  }
];

export const Events: React.FC = () => {
  useSEO({
    title: 'Events & Countdown',
    description: 'Track upcoming Ganesh Chaturthi events in Bandarupally Village. View the Ganesha Chaturthi countdown timer and register to volunteer for community works.',
  });

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  // Volunteer Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Food Distribution');
  const [availability, setAvailability] = useState('All Days');

  useEffect(() => {
    // Ganesh Chaturthi date: Sept 15, 2026
    const targetDate = new Date('2026-09-15T08:30:00+05:30').getTime();

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newVolunteer = {
      id: Date.now(),
      name,
      phone,
      interest,
      availability,
      registeredAt: new Date().toISOString()
    };

    const saved = localStorage.getItem('registeredVolunteers');
    const list = saved ? JSON.parse(saved) : [];
    list.push(newVolunteer);
    localStorage.setItem('registeredVolunteers', JSON.stringify(list));

    setSuccess(true);
    setName('');
    setPhone('');
    setTimeout(() => {
      setSuccess(false);
      setModalOpen(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Countdown Section */}
      <section className="relative py-24 bg-neutral-900 overflow-hidden flex flex-col items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 scale-102"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1567591974574-e852636b04a3?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900 to-neutral-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          <span className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-3">
            Sacred Calendar Countdown
          </span>
          <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-wide mb-8 text-glow-gold">
            GANESH CHATURTHI COUNTDOWN
          </h1>

          {/* Countdown Clock Grid */}
          <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-2xl w-full">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((t) => (
              <div key={t.label} className="glass-card bg-neutral-900/60 border-neutral-800/80 p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-white">
                <span className="text-2xl sm:text-5xl font-black tracking-tight text-orange-500 font-mono">
                  {String(t.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-bold uppercase tracking-wider mt-2.5">
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-neutral-400 max-w-md leading-relaxed">
            Festival Sthapana begins on September 15, 2026 at 08:30 AM. Bookings for Annadanam and Harathi sponsors are open.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:scale-105 active:scale-95 transition-all text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-600/10"
          >
            <FiUsers /> Register as Volunteer
          </button>
        </div>
      </section>

      {/* 2. Events List Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Upcoming Events Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3.5">
            Upcoming Festival Events (2026)
          </h2>

          <div className="flex flex-col gap-6">
            {UPCOMING_EVENTS.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-orange-600 dark:text-amber-400 mb-3">
                  <span className="flex items-center gap-1.5"><FiCalendar /> {event.date}</span>
                  <span className="flex items-center gap-1.5"><FiClock /> {event.time}</span>
                </div>

                <h3 className="text-base font-black text-amber-950 dark:text-white leading-tight mb-2">
                  {event.title}
                </h3>
                
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {event.desc}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 border-t border-amber-500/5 pt-3 mb-3">
                  <span className="flex items-center gap-1"><FiMapPin className="text-orange-500" /> {event.location}</span>
                </div>

                {/* Highlight Prasadam */}
                <div className="p-3 rounded-xl bg-orange-600/5 dark:bg-neutral-800 border border-orange-500/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-orange-600 dark:text-amber-400">Holy Prasadam:</span>
                  <span className="font-bold text-amber-950 dark:text-neutral-300">{event.prasadam}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Milestones Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3.5">
            Past Events & Milestones
          </h2>

          <div className="flex flex-col gap-5">
            {PAST_EVENTS.map((event) => (
              <div
                key={event.id}
                className="glass-card p-5 rounded-2xl border-l-4 border-l-neutral-400"
              >
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-bold mb-2">
                  <FiCalendar /> {event.date}
                </div>
                <h4 className="text-sm font-black text-amber-950 dark:text-white mb-2 leading-tight">
                  {event.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2.5">
                  {event.desc}
                </p>
                <span className="text-[10px] text-neutral-400 font-bold block">
                  Location: {event.location}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Volunteer Registration Drawer Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setModalOpen(false)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-white dark:bg-neutral-900 border border-amber-500/10 rounded-3xl p-6 shadow-2xl transition-colors"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none"
              >
                <FiX className="w-5 h-5" />
              </button>

              {success ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <FiCheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                  <h3 className="font-cinzel text-lg font-black text-amber-950 dark:text-white mb-2">
                    REGISTRATION SUCCESSFUL!
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Thank you for enrolling. The committee will contact you soon.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-cinzel text-lg font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-5">
                    Register as Volunteer
                  </h3>
                  
                  <form onSubmit={handleVolunteerSubmit} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    <div className="flex flex-col gap-1.5">
                      <label>Full Name *</label>
                      <input 
                        type="text" required value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label>Mobile Number *</label>
                      <input 
                        type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter mobile"
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label>Area of Interest</label>
                      <select
                        value={interest} onChange={(e) => setInterest(e.target.value)}
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none"
                      >
                        <option value="Food Distribution">Food Distribution (Annadanam)</option>
                        <option value="Traffic Control">Traffic Control & Parking</option>
                        <option value="Decorations">Pandal Decor & Lighting</option>
                        <option value="Cultural Event Coordination">Cultural Event Coordination</option>
                        <option value="Emergency First-Aid">Emergency First-Aid / Helpdesk</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label>Availability</label>
                      <select
                        value={availability} onChange={(e) => setAvailability(e.target.value)}
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none"
                      >
                        <option value="All Days">All Days (9 Days)</option>
                        <option value="First & Last Day Only">First & Last Day Only</option>
                        <option value="Weekends Only">Weekends Only</option>
                        <option value="Morning Shifts only">Morning Shifts only</option>
                        <option value="Evening Shifts only">Evening Shifts only</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="mt-3.5 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:scale-102 transition-transform"
                    >
                      Submit Registration
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default Events;
