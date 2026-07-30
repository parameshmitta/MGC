import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiClock, FiPlusCircle, FiXCircle, FiMessageSquare, FiMapPin, FiSend } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import { MOCK_PROBLEMS } from '../utils/mockData';
import type { VillageProblem } from '../utils/mockData';

const HELP_CATEGORIES = [
  'Road Damage', 'Water Problem', 'Street Lights', 'Blood Requirement',
  'Medical Emergency', 'Government Issue', 'Temple Work', 'Financial Help',
  'Education', 'Animal Rescue', 'Others'
];

export const VillageHelp: React.FC = () => {
  useSEO({
    title: 'Village Help Portal',
    description: 'Bandarupally Village Help Portal. Villagers can report issues like road damage, water leakage, street light outages and track resolutions in real-time.',
  });

  const [problems, setProblems] = useState<VillageProblem[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Bandarupally');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(HELP_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState('');

  // Comment input
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');

  // Load problems from LocalStorage or Fallback Mock
  useEffect(() => {
    const saved = localStorage.getItem('villageProblems');
    if (saved) {
      try {
        setProblems(JSON.parse(saved));
      } catch {
        setProblems(MOCK_PROBLEMS);
      }
    } else {
      setProblems(MOCK_PROBLEMS);
      localStorage.setItem('villageProblems', JSON.stringify(MOCK_PROBLEMS));
    }
  }, []);

  // Sync to local storage helper
  const syncProblems = (updated: VillageProblem[]) => {
    setProblems(updated);
    localStorage.setItem('villageProblems', JSON.stringify(updated));
  };

  // Submit issue handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !title || !description) return;

    const newIssue: VillageProblem = {
      id: `p-${Date.now()}`,
      name,
      phone,
      village,
      title,
      description,
      category,
      location: location || undefined,
      photo: photo || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      replies: []
    };

    const updated = [newIssue, ...problems];
    syncProblems(updated);

    // Reset Form
    setName('');
    setPhone('');
    setVillage('Bandarupally');
    setTitle('');
    setCategory(HELP_CATEGORIES[0]);
    setDescription('');
    setLocation('');
    setPhoto('');
    setFormOpen(false);
  };

  // Submit comment handler
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
    return matchesCategory && matchesStatus;
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
      
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wider text-glow-gold">
            VILLAGE HELP PORTAL
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-100 mb-6">
            Register your grievance or requirements & monitor resolution progress
          </p>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs uppercase tracking-widest shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <FiPlusCircle className="w-4 h-4" /> Report New Problem
          </button>
        </div>
      </section>

      {/* Grid containing filters, form, and board */}
      <section className="max-w-7xl mx-auto px-4 w-full mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Filters or Form */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Submission Form Modal-like collapsible card */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card p-6 rounded-3xl shadow-lg border border-orange-500/20 overflow-hidden"
              >
                <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-5">
                  Report Village Issue
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <div className="flex flex-col gap-1.5">
                    <label>Your Full Name *</label>
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
                    <label>Issue Title *</label>
                    <input 
                      type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                      placeholder="Brief title"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Category *</label>
                    <select
                      value={category} onChange={(e) => setCategory(e.target.value)}
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {HELP_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Detailed Description *</label>
                    <textarea 
                      required rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the problem in detail..."
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Specific Location (optional)</label>
                    <input 
                      type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Near high school gate"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Photo URL (optional)</label>
                    <input 
                      type="text" value={photo} onChange={(e) => setPhoto(e.target.value)}
                      placeholder="e.g. Image web link"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-3.5 w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:scale-103 text-white font-bold text-xs uppercase tracking-widest shadow-md"
                  >
                    Submit Issue
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filtering Card */}
          <div className="glass-card p-6 rounded-3xl shadow-sm">
            <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-5">
              Filter Problems
            </h3>
            
            <div className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-500">Category</label>
                <select
                  value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  {HELP_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-500">Resolution Status</label>
                <select
                  value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                  className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Solved">Solved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Active Problems Board */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="font-cinzel text-lg font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3">
            Active Issues Board ({filteredProblems.length})
          </h2>

          {filteredProblems.length > 0 ? (
            <div className="flex flex-col gap-6">
              {filteredProblems.map((prob) => {
                const statusDetails = getStatusIconAndColor(prob.status);
                const isCommentsOpen = activeProblemId === prob.id;

                return (
                  <motion.div
                    key={prob.id}
                    layout
                    className="glass-card p-6 rounded-2xl relative overflow-hidden"
                  >
                    
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-amber-500/5 pb-3">
                      <div>
                        <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-900 dark:text-neutral-300 text-[10px] font-bold tracking-wide uppercase mr-2.5">
                          {prob.category}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-semibold">
                          {new Date(prob.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {/* Status badge */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${statusDetails.styles}`}>
                        {statusDetails.icon}
                        {prob.status}
                      </span>
                    </div>

                    {/* Problem Body */}
                    <h3 className="text-base font-black text-amber-950 dark:text-white mb-2 leading-tight">
                      {prob.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {prob.description}
                    </p>

                    {/* Metadata (Reporter, Location) */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 border-t border-amber-500/5 pt-3 mb-4">
                      <span>Reporter: {prob.name} &bull; {prob.phone}</span>
                      {prob.location && (
                        <span className="flex items-center gap-1"><FiMapPin className="text-orange-500" /> {prob.location}</span>
                      )}
                    </div>

                    {/* Image visual */}
                    {prob.photo && (
                      <div className="mb-4 h-48 w-full rounded-xl overflow-hidden bg-neutral-900 border border-amber-500/10">
                        <img src={prob.photo} alt={prob.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Admin Replies display */}
                    {prob.replies && prob.replies.length > 0 && (
                      <div className="mb-4 p-4 rounded-xl bg-orange-600/5 dark:bg-neutral-800/80 border border-orange-500/10 flex flex-col gap-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-amber-400">
                          Official Committee Feedback
                        </span>
                        {prob.replies.map((rep) => (
                          <div key={rep.id} className="text-xs">
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold mb-1">
                              <span>{rep.author}</span>
                              <span>{rep.date}</span>
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                              {rep.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Toggle Comment Area */}
                    <div className="flex items-center justify-between border-t border-amber-500/5 pt-4">
                      <button
                        onClick={() => setActiveProblemId(isCommentsOpen ? null : prob.id)}
                        className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-amber-400 hover:underline"
                      >
                        <FiMessageSquare /> Discussion ({prob.replies ? prob.replies.length : 0})
                      </button>
                    </div>

                    {/* Discussion section details */}
                    <AnimatePresence>
                      {isCommentsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="pt-4 border-t border-amber-500/10 space-y-4">
                            
                            {/* Comment Form */}
                            <div className="flex flex-col gap-3 p-4 rounded-xl bg-amber-500/5 dark:bg-neutral-800/40 border border-amber-500/10">
                              <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 dark:text-white">
                                Add Comment
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <input 
                                  type="text" placeholder="Your Name" value={commenterName} onChange={(e) => setCommenterName(e.target.value)}
                                  className="p-2 rounded-lg border border-amber-500/10 bg-white dark:bg-neutral-900 dark:border-neutral-700 text-xs font-semibold focus:outline-none"
                                />
                                <div className="flex gap-2">
                                  <input 
                                    type="text" placeholder="Write comment message..." value={newComment} onChange={(e) => setNewComment(e.target.value)}
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
