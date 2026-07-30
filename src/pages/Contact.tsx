import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiCheckCircle, FiSend, FiInstagram, FiFacebook, FiMessageCircle } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';

export const Contact: React.FC = () => {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with the Maha Ganapati Committee in Bandarupally Village. Reach out for donations, volunteering, or queries through email, phone, or contact form.',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    const contactLog = {
      id: Date.now(),
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString()
    };

    const saved = localStorage.getItem('contactSubmissions');
    const list = saved ? JSON.parse(saved) : [];
    list.push(contactLog);
    localStorage.setItem('contactSubmissions', JSON.stringify(list));

    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold">
            CONTACT US
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-100">
            Connect with committee officers directly
          </p>
        </div>
      </section>

      {/* Main layouts grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Contact details */}
        <div className="flex flex-col gap-6">
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3">
            Get in Touch
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
            Have questions about upcoming pooja schedules, donating material, or volunteering? Reach out through any of our channels or submit the contact form. We are here to help.
          </p>
          
          <ul className="flex flex-col gap-5 text-xs text-neutral-600 dark:text-neutral-400 font-semibold mt-4">
            <li className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-full bg-amber-500/5 dark:bg-neutral-800 border border-amber-500/10 text-orange-600 dark:text-amber-400">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-amber-950 dark:text-white block mb-0.5">Festival Pandal Location</strong>
                Maha Ganapati Pandal, Main Bazaar, Bandarupally Village, Guntur Dist, Andhra Pradesh, India.
              </div>
            </li>
            
            <li className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-full bg-amber-500/5 dark:bg-neutral-800 border border-amber-500/10 text-orange-600 dark:text-amber-400">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-amber-950 dark:text-white block mb-0.5">Phone Contact</strong>
                <a href="tel:+919876543210" className="hover:text-orange-600 transition-colors">+91 98765 43210</a> (Paramesh)
              </div>
            </li>

            <li className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-full bg-amber-500/5 dark:bg-neutral-800 border border-amber-500/10 text-orange-600 dark:text-amber-400">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-amber-950 dark:text-white block mb-0.5">Email Queries</strong>
                <a href="mailto:info@mahaganapatibandarupally.com" className="hover:text-orange-600 transition-colors">info@mahaganapatibandarupally.com</a>
              </div>
            </li>
          </ul>

          {/* Social connections */}
          <div className="flex items-center gap-3 mt-6">
            <a 
              href="https://www.instagram.com/maha_ganapati_committe" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-amber-500/5 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold text-[10px] uppercase border border-amber-500/10 hover:border-amber-500/30"
            >
              <FiInstagram /> Instagram
            </a>
            <a 
              href="https://facebook.com" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-amber-500/5 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold text-[10px] uppercase border border-amber-500/10 hover:border-amber-500/30"
            >
              <FiFacebook /> Facebook
            </a>
            <a 
              href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-amber-500/5 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold text-[10px] uppercase border border-amber-500/10 hover:border-amber-500/30"
            >
              <FiMessageCircle /> WhatsApp
            </a>
          </div>

        </div>

        {/* Right Column: Form */}
        <div>
          <div className="glass-card p-6.5 rounded-3xl shadow-sm border border-amber-500/10 dark:border-neutral-800">
            <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-5">
              Submit Grievance or Enquiry
            </h3>

            {success ? (
              <div className="py-12 text-center flex flex-col items-center">
                <FiCheckCircle className="w-14 h-14 text-green-500 mb-3 animate-bounce" />
                <h4 className="font-cinzel text-base font-black text-amber-950 dark:text-white mb-1.5">
                  MESSAGE SENT!
                </h4>
                <p className="text-xs text-neutral-500">
                  Thank you. Committee representatives will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
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
                  <label>Email Address (optional)</label>
                  <input 
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label>Message Content *</label>
                  <textarea 
                    required rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message..."
                    className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:scale-102 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <FiSend /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

      {/* Google Map Embed of Bandarupally */}
      <section className="mt-12 max-w-7xl mx-auto px-4 w-full h-[400px] rounded-3xl overflow-hidden shadow-md border border-amber-500/10 dark:border-neutral-800 bg-neutral-900">
        <iframe 
          src="https://maps.google.com/maps?q=Bandarupally,Andhra%20Pradesh,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy"
          title="Google Map Bandarupally"
        />
      </section>

    </div>
  );
};
export default Contact;
