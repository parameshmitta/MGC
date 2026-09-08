import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiClock, 
  FiPlusCircle, 
  FiXCircle, 
  FiMessageSquare, 
  FiMapPin, 
  FiSend, 
  FiShield, 
  FiSearch,
  FiZap,
  FiCheck,
  FiExternalLink
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useAuth } from '../context/AuthContext';
import type { VillageProblem } from '../utils/mockData';

export const PROBLEM_TYPES = [
  { id: 'Street Lights', label: 'Street Lights & Electricity', telugu: 'వీధి దీపాలు & విద్యుత్', icon: '💡', desc: 'Outages, broken street bulbs, wire damage' },
  { id: 'Water Problem', label: 'Drinking Water & Pipeline', telugu: 'తాగునీటి సమస్య & పైప్‌లైన్', icon: '💧', desc: 'Borewell issues, pipe leaks, water supply' },
  { id: 'Road Damage', label: 'Roads, Potholes & Drainage', telugu: 'రోడ్లు & మురుగు కాలువలు', icon: '🛣️', desc: 'Potholes, drain overflows, sanitation' },
  { id: 'Medical Emergency', label: 'Medical Emergency & Hospital', telugu: 'వైద్య అత్యవసర సహాయం', icon: '🏥', desc: 'Patient transport, health center coordination' },
  { id: 'Blood Requirement', label: 'Blood Requirement', telugu: 'రక్తదానం సహాయం', icon: '🩸', desc: 'Urgent donor connect in Mulugu / Warangal' },
  { id: 'Temple Work', label: 'Temple & Festival Work', telugu: 'దేవాలయ & పండుగ సేవ', icon: '🏛️', desc: 'Pandal lighting, sound, mandapam seva' },
  { id: 'Agriculture Help', label: 'Farmer & Agriculture Assistance', telugu: 'రైతు & వ్యవసాయ సహాయం', icon: '🌾', desc: 'Motors, canal water flow, farm issues' },
  { id: 'Education & Welfare', label: 'Education & Youth Welfare', telugu: 'విద్య & యువజన సంక్షేమం', icon: '📚', desc: 'School ground repairs, student aid' },
  { id: 'Others', label: 'General Village Grievance', telugu: 'ఇతర ప్రజా సమస్యలు', icon: '⚠️', desc: 'Any other village public concern' },
];

export const BANDARUPALLY_STREETS = [
  'Main Bazaar (మెయిన్ బజార్)',
  'Ganesha Pandal Street (వినాయక మండపం వీధి)',
  'Harijanawada Street (హరిజనవాడ)',
  'BC Colony (బీసీ కాలనీ)',
  'SC Colony (ఎస్సీ కాలనీ)',
  'Old Gram Panchayat Area (గ్రామ పంచాయతీ వీధి)',
  'ZPH High School Road (హైస్కూల్ రోడ్డు)',
  'Temple Street (గుడి వీధి)',
  'Rythu Sangham Road (రైతు సంఘం రోడ్డు)',
  'Cheruvu Katta Area (చెరువు కట్ట)',
  'Other Locality in Bandarupally'
];

export const VillageHelp: React.FC = () => {
  useSEO({
    title: 'Bandarupally Seva',
    description: 'Bandarupally Seva Portal - Mulugu District, Telangana. Villagers can report civic and emergency issues to the Maha Ganapati Committee admin and track resolution.',
  });

  const { isAdmin } = useAuth();

  const [problems, setProblems] = useState<VillageProblem[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchPhone, setSearchPhone] = useState('');
  
  // Submission Success Popup
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village] = useState('Bandarupally (Mulugu Dist, Telangana)');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(PROBLEM_TYPES[0].id);
  const [urgency, setUrgency] = useState<'Normal' | 'High' | 'Urgent'>('Normal');
  const [street, setStreet] = useState(BANDARUPALLY_STREETS[0]);
  const [specificLocation, setSpecificLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');

  // Comment input
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');

  // Admin inline reply
  const [adminReplyText, setAdminReplyText] = useState<{ [id: string]: string }>({});

  // Load problems from LocalStorage (filtering out old mock sample problems to clear board)
  useEffect(() => {
    const saved = localStorage.getItem('villageProblems');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Exclude old sample items p1, p2, p3
        const realItems = parsed.filter((p: any) => p.id !== 'p1' && p.id !== 'p2' && p.id !== 'p3');
        setProblems(realItems);
        localStorage.setItem('villageProblems', JSON.stringify(realItems));
      } catch {
        setProblems([]);
        localStorage.setItem('villageProblems', JSON.stringify([]));
      }
    } else {
      setProblems([]);
      localStorage.setItem('villageProblems', JSON.stringify([]));
    }
  }, []);

  // Admin: Clear all problems list
  const handleClearAllProblems = () => {
    if (window.confirm('Are you sure you want to clear all problems and approved requests?')) {
      syncProblems([]);
    }
  };

  // Sync to local storage helper
  const syncProblems = (updated: VillageProblem[]) => {
    setProblems(updated);
    localStorage.setItem('villageProblems', JSON.stringify(updated));
  };

  // Submit issue handler - Send Request to Admin
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !title || !description) return;

    const ticketId = `MGC-SEVA-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullLocation = `${street}${specificLocation ? ` (${specificLocation})` : ''}, Bandarupally, Mulugu Dist, Telangana`;

    const newIssue: VillageProblem = {
      id: `p-${Date.now()}`,
      ticketId,
      name,
      phone,
      village,
      title,
      description,
      category,
      urgency,
      location: fullLocation,
      photo: photo || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      replies: [
        {
          id: `rep-auto-${Date.now()}`,
          author: 'MGC Seva System',
          message: `Request received and forwarded to Committee Admin & Youth Volunteers. Tracking Ticket: #${ticketId}.`,
          date: new Date().toISOString().split('T')[0]
        }
      ]
    };

    const updated = [newIssue, ...problems];
    syncProblems(updated);

    // Show Confirmation
    setSubmittedTicket(ticketId);

    // Reset Form
    setName('');
    setPhone('');
    setTitle('');
    setCategory(PROBLEM_TYPES[0].id);
    setUrgency('Normal');
    setStreet(BANDARUPALLY_STREETS[0]);
    setSpecificLocation('');
    setDescription('');
    setPhoto('');
    setFormOpen(false);
  };

  // Admin: Update Status directly
  const handleAdminStatusChange = (problemId: string, nextStatus: 'Pending' | 'Accepted' | 'Solved' | 'Rejected') => {
    const updated = problems.map((p) => {
      if (p.id === problemId) return { ...p, status: nextStatus };
      return p;
    });
    syncProblems(updated);
  };

  // Admin: Post Official Reply directly
  const handleAdminReply = (problemId: string) => {
    const txt = adminReplyText[problemId];
    if (!txt) return;

    const updated = problems.map((p) => {
      if (p.id === problemId) {
        const comments = p.replies || [];
        return {
          ...p,
          replies: [
            ...comments,
            {
              id: `rep-admin-${Date.now()}`,
              author: 'Committee Admin (Verified)',
              message: txt,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return p;
    });

    syncProblems(updated);
    setAdminReplyText({ ...adminReplyText, [problemId]: '' });
  };

  // Villager: Submit general comment
  const handleCommentSubmit = (problemId: string) => {
    if (!newComment || !commenterName) return;

    const updated = problems.map((prob) => {
      if (prob.id === problemId) {
        const comments = prob.replies || [];
        return {
          ...prob,
          replies: [
            ...comments,
            {
              id: `rep-${Date.now()}`,
              author: commenterName,
              message: newComment,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return prob;
    });

    syncProblems(updated);
    setNewComment('');
    setCommenterName('');
  };

  // Filters
  const filteredProblems = problems.filter((prob) => {
    const matchesCategory = selectedCategory === 'All' || prob.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || prob.status === selectedStatus;
    const matchesPhone = searchPhone === '' || prob.phone.includes(searchPhone) || (prob.ticketId && prob.ticketId.toLowerCase().includes(searchPhone.toLowerCase()));
    return matchesCategory && matchesStatus && matchesPhone;
  });

  const getStatusIconAndColor = (status: string) => {
    switch (status) {
      case 'Solved':
        return { icon: <FiCheckCircle />, styles: 'bg-green-500/10 text-green-600 border-green-500/20' };
      case 'Accepted':
        return { icon: <FiClock />, styles: 'bg-blue-500/10 text-blue-600 border-blue-500/20' };
      case 'Rejected':
        return { icon: <FiXCircle />, styles: 'bg-red-500/10 text-red-600 border-red-500/20' };
      default:
        return { icon: <FiAlertCircle />, styles: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
    }
  };

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Header Banner with Telangana Mulugu Geography */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white text-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-amber-100 text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
            <FiMapPin className="text-amber-300 w-3.5 h-3.5" />
            <span>Bandarupally &bull; Mulugu Mandal &bull; Mulugu District, Telangana</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold">
            BANDARUPALLY SEVA
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-amber-100 max-w-2xl leading-relaxed">
            Official Civic &amp; Community Welfare Redressal Portal. Report village problems to the Maha Ganapati Committee Admin and track real-time resolution progress.
          </p>

          {/* Action Trigger Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white text-orange-600 hover:bg-orange-50 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <FiPlusCircle className="w-4 h-4" /> Report New Problem
            </button>
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 text-amber-300 border border-amber-400/40 font-bold text-xs uppercase tracking-wider backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
              >
                <FiShield className="w-4 h-4" /> Admin Portal Dashboard <FiExternalLink />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Bandarupally Seva Live Announcement & Helpline Message Bar */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white py-2.5 px-4 shadow-md border-y border-amber-400/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold">
          
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="p-1 px-2 rounded-md bg-white/20 text-white text-xs font-black animate-pulse flex items-center gap-1">
              📢 NOTICE
            </span>
            <span className="text-amber-100 font-medium">
              <strong className="text-white">Bandarupally Seva Helpline:</strong> Report village electricity, water, roads or emergency issues. Committee youth volunteers review &amp; address requests daily!
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <a 
              href="tel:+918555839756"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-orange-700 hover:bg-amber-50 font-black text-[11px] shadow-sm hover:scale-105 transition-all"
            >
              📞 Call: +91 85558 39756
            </a>
            <a 
              href="https://wa.me/918555839756?text=Hello%20Maha%20Ganapati%20Committee,%20I%20have%20a%20village%20issue%20in%20Bandarupally"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] shadow-sm hover:scale-105 transition-all"
            >
              💬 WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* Admin Controls Strip - ONLY visible when authenticated as Admin */}
      {isAdmin && (
        <section className="bg-red-500/10 dark:bg-neutral-900 border-b border-red-500/20 py-2.5 px-4 transition-colors">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white font-black text-[10px] uppercase tracking-wider">
                <FiShield className="w-3 h-3" /> Admin Mode Active
              </span>
              <span className="text-neutral-600 dark:text-neutral-300 font-bold">
                You can approve, mark solved, or post verified feedback on issues.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAllProblems}
                className="px-3 py-1 rounded-lg bg-red-600/15 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/30 text-[11px] font-bold transition-all"
                title="Clear all stored problem records"
              >
                🗑️ Clear All Problems List
              </button>
              <Link
                to="/admin-dashboard"
                className="text-orange-600 dark:text-amber-400 font-bold hover:underline"
              >
                Open Admin Dashboard &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Submission Success Modal */}
      <AnimatePresence>
        {submittedTicket && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="max-w-md w-full glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 text-center shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <FiCheck className="w-8 h-8 stroke-[3]" />
              </div>
              <span className="px-3 py-1 rounded-full bg-orange-600/10 text-orange-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest inline-block mb-2">
                Request Sent to Committee Admin
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-black text-amber-950 dark:text-white mb-2">
                PROBLEM REGISTERED
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
                Your request has been officially recorded and sent to the Maha Ganapati Committee Admin in Bandarupally. The team will inspect and take required action.
              </p>
              
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">Your Tracking Ticket ID</span>
                <span className="font-mono text-base font-black text-orange-600 dark:text-amber-400">#{submittedTicket}</span>
              </div>

              <button
                onClick={() => setSubmittedTicket(null)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-102 transition-transform"
              >
                Done &bull; View on Board
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid containing filters, form, and board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Submission Form & Filters */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Submission Form Card */}
          <AnimatePresence>
            {formOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-6 sm:p-7 rounded-3xl shadow-xl border border-orange-500/20"
              >
                <div className="flex items-center justify-between border-b border-amber-500/10 pb-3 mb-5">
                  <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white flex items-center gap-2">
                    <FiPlusCircle className="text-orange-500" /> Send Problem Request to Admin
                  </h3>
                  <button 
                    onClick={() => setFormOpen(false)}
                    className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500"
                  >
                    <FiXCircle className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  
                  {/* Problem Giving Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-amber-950 dark:text-white font-black flex items-center justify-between">
                      <span>Problem Giving Type (సమస్య రకం) *</span>
                    </label>
                    <select
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {PROBLEM_TYPES.map((pt) => (
                        <option key={pt.id} value={pt.id}>
                          {pt.icon} {pt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Urgency Level */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-600 dark:text-neutral-300">Urgency Level (ప్రాధాన్యత)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Normal', 'High', 'Urgent'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setUrgency(lvl)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                            urgency === lvl
                              ? lvl === 'Urgent' 
                                ? 'bg-red-600 text-white border-red-600 shadow-sm'
                                : lvl === 'High'
                                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                : 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                          }`}
                        >
                          {lvl === 'Urgent' ? '🚨 Urgent' : lvl === 'High' ? '⚡ High' : '🟢 Normal'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Street in Bandarupally */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-600 dark:text-neutral-300">Bandarupally Street / Locality *</label>
                    <select
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none"
                    >
                      {BANDARUPALLY_STREETS.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {/* Specific Landmark */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-600 dark:text-neutral-300">Landmark / House Info (Optional)</label>
                    <input 
                      type="text" 
                      value={specificLocation} 
                      onChange={(e) => setSpecificLocation(e.target.value)}
                      placeholder="e.g. Near Pole #4, opposite temple gate"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  {/* Problem Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-600 dark:text-neutral-300">Problem Title *</label>
                    <input 
                      type="text" 
                      required 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. 3 Street lights not functioning on main road"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  {/* Detailed Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-600 dark:text-neutral-300">Detailed Description *</label>
                    <textarea 
                      required 
                      rows={3} 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Explain how long the problem has existed and impact on villagers..."
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  {/* Reporter Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-600 dark:text-neutral-300">Your Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. K. Paramesh"
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-600 dark:text-neutral-300">Mobile Number *</label>
                      <input 
                        type="tel" 
                        required 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98480xxxxx"
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-neutral-600 dark:text-neutral-300">Photo URL (Optional)</label>
                    <input 
                      type="text" 
                      value={photo} 
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="e.g. Image link or upload photo"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-widest shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <FiSend className="w-4 h-4" /> Send Request to Admin
                  </button>
                </form>
              </motion.div>
            ) : (
              <div className="glass-card p-6 rounded-3xl text-center border border-amber-500/15">
                <div className="w-14 h-14 rounded-2xl bg-orange-600/10 text-orange-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
                  <FiZap className="w-7 h-7" />
                </div>
                <h3 className="font-cinzel text-lg font-black text-amber-950 dark:text-white">
                  Have an Issue in Bandarupally?
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-4 leading-relaxed font-medium">
                  Report streetlights, clean water shortages, drain blockages or emergency needs directly to the youth committee.
                </p>
                <button
                  onClick={() => setFormOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <FiPlusCircle className="w-4 h-4" /> Open Report Form
                </button>
              </div>
            )}
          </AnimatePresence>

          {/* Filtering & Search Card */}
          <div className="glass-card p-6 rounded-3xl shadow-sm border border-amber-500/10">
            <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-4">
              Search &amp; Filter Requests
            </h3>
            
            <div className="flex flex-col gap-3.5 text-xs font-semibold">
              
              {/* Filter by Phone or Ticket */}
              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-500">Track My Request (Phone or Ticket #)</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text" 
                    value={searchPhone} 
                    onChange={(e) => setSearchPhone(e.target.value)}
                    placeholder="Enter phone or ticket ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-500">Problem Type</label>
                <select
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  {PROBLEM_TYPES.map((pt) => (
                    <option key={pt.id} value={pt.id}>{pt.icon} {pt.label}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-500">Resolution Status</label>
                <select
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending Admin Review</option>
                  <option value="Accepted">Accepted &amp; Work in Progress</option>
                  <option value="Solved">Resolved / Solved</option>
                  <option value="Rejected">Declined / Closed</option>
                </select>
              </div>

              {searchPhone && (
                <button
                  onClick={() => setSearchPhone('')}
                  className="text-xs text-orange-600 hover:underline font-bold text-left"
                >
                  Clear search
                </button>
              )}
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Active Requests Board */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-amber-500/10 dark:border-neutral-800 pb-3">
            <h2 className="font-cinzel text-lg sm:text-xl font-black text-amber-950 dark:text-white">
              Bandarupally Seva Requests ({filteredProblems.length})
            </h2>
            <span className="text-[11px] font-bold text-orange-600 dark:text-amber-400">
              {isAdmin ? '🛡️ Admin Controls Active' : 'Public Transparency Board'}
            </span>
          </div>

          {filteredProblems.length > 0 ? (
            <div className="flex flex-col gap-5">
              {filteredProblems.map((prob) => {
                const statusDetails = getStatusIconAndColor(prob.status);
                const isCommentsOpen = activeProblemId === prob.id;

                return (
                  <motion.div
                    key={prob.id}
                    layout
                    className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden border border-amber-500/15"
                  >
                    
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-amber-500/5 pb-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-900 dark:text-amber-300 text-[10px] font-bold tracking-wide uppercase">
                          {prob.category}
                        </span>
                        {prob.urgency && (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                            prob.urgency === 'Urgent'
                              ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                              : prob.urgency === 'High'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {prob.urgency}
                          </span>
                        )}
                        {prob.ticketId && (
                          <span className="text-[10px] font-mono font-bold text-neutral-400">
                            #{prob.ticketId}
                          </span>
                        )}
                      </div>
                      
                      {/* Status badge */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${statusDetails.styles}`}>
                        {statusDetails.icon}
                        {prob.status}
                      </span>
                    </div>

                    {/* Problem Body */}
                    <h3 className="text-base font-black text-amber-950 dark:text-white mb-1.5 leading-snug">
                      {prob.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                      {prob.description}
                    </p>

                    {/* Location & Reporter details */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-neutral-500 dark:text-neutral-400 border-t border-amber-500/5 pt-2.5 mb-3">
                      <span>Reporter: <strong className="text-neutral-700 dark:text-neutral-200">{prob.name}</strong> ({prob.phone})</span>
                      {prob.location && (
                        <span className="flex items-center gap-1 text-orange-600 dark:text-amber-400">
                          <FiMapPin /> {prob.location}
                        </span>
                      )}
                    </div>

                    {/* Image visual if uploaded */}
                    {prob.photo && (
                      <div className="mb-3 h-44 w-full rounded-xl overflow-hidden bg-neutral-900 border border-amber-500/10">
                        <img src={prob.photo} alt={prob.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Admin Direct Actions (if viewing as Admin) */}
                    {isAdmin && (
                      <div className="p-3.5 rounded-xl bg-orange-600/10 dark:bg-neutral-800 border border-orange-500/20 mb-3.5 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-amber-400 flex items-center gap-1">
                            <FiShield /> Admin Action Controls
                          </span>
                          <span className="text-[10px] text-neutral-400 font-semibold">Change Status:</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAdminStatusChange(prob.id, 'Pending')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              prob.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-white/80 dark:bg-neutral-900 border border-amber-500/20 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => handleAdminStatusChange(prob.id, 'Accepted')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              prob.status === 'Accepted' ? 'bg-blue-600 text-white' : 'bg-white/80 dark:bg-neutral-900 border border-blue-500/20 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAdminStatusChange(prob.id, 'Solved')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              prob.status === 'Solved' ? 'bg-emerald-600 text-white' : 'bg-white/80 dark:bg-neutral-900 border border-emerald-500/20 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            Mark Solved
                          </button>
                          <button
                            onClick={() => handleAdminStatusChange(prob.id, 'Rejected')}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                              prob.status === 'Rejected' ? 'bg-red-600 text-white' : 'bg-white/80 dark:bg-neutral-900 border border-red-500/20 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            Reject
                          </button>
                        </div>

                        {/* Direct admin feedback input */}
                        <div className="flex gap-2 mt-1">
                          <input 
                            type="text"
                            placeholder="Post official verified admin reply..."
                            value={adminReplyText[prob.id] || ''}
                            onChange={(e) => setAdminReplyText({ ...adminReplyText, [prob.id]: e.target.value })}
                            className="flex-grow p-2 rounded-lg bg-white dark:bg-neutral-900 border border-amber-500/20 text-xs font-semibold focus:outline-none"
                          />
                          <button
                            onClick={() => handleAdminReply(prob.id)}
                            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase"
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Official Replies display */}
                    {prob.replies && prob.replies.length > 0 && (
                      <div className="mb-3 p-3.5 rounded-xl bg-orange-600/5 dark:bg-neutral-800/80 border border-orange-500/10 flex flex-col gap-2.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-amber-400">
                          Official Committee Feedback &bull; resolution notes
                        </span>
                        {prob.replies.map((rep) => (
                          <div key={rep.id} className="text-xs">
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold mb-0.5">
                              <span className="text-orange-600 dark:text-amber-400 font-bold">{rep.author}</span>
                              <span>{rep.date}</span>
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                              {rep.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Toggle Discussion Area */}
                    <div className="flex items-center justify-between border-t border-amber-500/5 pt-3">
                      <button
                        onClick={() => setActiveProblemId(isCommentsOpen ? null : prob.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-amber-400 hover:underline"
                      >
                        <FiMessageSquare /> Discussion &bull; Add Note ({prob.replies ? prob.replies.length : 0})
                      </button>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        Reported on {new Date(prob.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Discussion detail */}
                    <AnimatePresence>
                      {isCommentsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-3"
                        >
                          <div className="pt-3 border-t border-amber-500/10 space-y-3">
                            <div className="flex flex-col gap-2 p-3 rounded-xl bg-amber-500/5 dark:bg-neutral-800/40 border border-amber-500/10">
                              <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 dark:text-white">
                                Add Note to this Request
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <input 
                                  type="text" 
                                  placeholder="Your Name" 
                                  value={commenterName} 
                                  onChange={(e) => setCommenterName(e.target.value)}
                                  className="p-2 rounded-lg border border-amber-500/10 bg-white dark:bg-neutral-900 dark:border-neutral-700 text-xs font-semibold focus:outline-none"
                                />
                                <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    placeholder="Write comment..." 
                                    value={newComment} 
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="flex-grow p-2 rounded-lg border border-amber-500/10 bg-white dark:bg-neutral-900 dark:border-neutral-700 text-xs font-semibold focus:outline-none"
                                  />
                                  <button
                                    onClick={() => handleCommentSubmit(prob.id)}
                                    className="p-2 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-colors"
                                  >
                                    <FiSend className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-neutral-400 font-semibold text-sm border-2 border-dashed border-amber-500/10 rounded-3xl">
              No reported problems matching filters.
            </div>
          )}

        </div>

      </section>

    </div>
  );
};
export default VillageHelp;
