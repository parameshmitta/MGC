import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiGrid, FiPlus, FiTrash2, FiMessageSquare, FiTrendingUp, FiFolderPlus, FiShare2, FiUserCheck } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import type { AnnouncementItem, VillageProblem } from '../utils/mockData';

type PanelSection = 'statistics' | 'problems' | 'announcements' | 'gallery' | 'sponsors';

export const AdminDashboard: React.FC = () => {
  useSEO({
    title: 'Admin Dashboard',
    description: 'Management Portal for Maha Ganapati Committee. Monitor village grievances, configure sponsors and announce schedules.',
  });

  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<PanelSection>('statistics');
  const [problems, setProblems] = useState<VillageProblem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);

  // Form Inputs
  const [annoTitle, setAnnoTitle] = useState('');
  const [annoContent, setAnnoContent] = useState('');
  const [annoCategory, setAnnoCategory] = useState<'important' | 'general' | 'event'>('general');

  const [galleryYear, setGalleryYear] = useState('2026');
  const [galleryUrl, setGalleryUrl] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('idol');

  const [sponsorName, setSponsorName] = useState('');
  const [sponsorAmount, setSponsorAmount] = useState('');
  const [sponsorOrigin, setSponsorOrigin] = useState('');
  const [sponsorLogo, setSponsorLogo] = useState('https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=150&q=80');

  // Problem Feedback Input State
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Check local storage records
    const savedProblems = localStorage.getItem('villageProblems');
    if (savedProblems) setProblems(JSON.parse(savedProblems));

    const savedAnnouncements = localStorage.getItem('announcements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    } else {
      const defaultAnnos = [
        { id: 'a1', title: 'Ganesh Chaturthi Utsav 2026 Preparations', date: '2026-08-15', content: 'Meeting schedules are out.', category: 'important' }
      ] as AnnouncementItem[];
      setAnnouncements(defaultAnnos);
      localStorage.setItem('announcements', JSON.stringify(defaultAnnos));
    }

    const savedVolunteers = localStorage.getItem('registeredVolunteers');
    if (savedVolunteers) setVolunteers(JSON.parse(savedVolunteers));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin-login');
  };

  const handleStatusChange = (problemId: string, nextStatus: 'Pending' | 'Accepted' | 'Solved' | 'Rejected') => {
    const updated = problems.map((p) => {
      if (p.id === problemId) return { ...p, status: nextStatus };
      return p;
    });
    setProblems(updated);
    localStorage.setItem('villageProblems', JSON.stringify(updated));
  };

  const handlePostReply = (problemId: string) => {
    const txt = replyTexts[problemId];
    if (!txt) return;

    const updated = problems.map((p) => {
      if (p.id === problemId) {
        const comments = p.replies || [];
        return {
          ...p,
          replies: [
            ...comments,
            {
              id: `rep-${Date.now()}`,
              author: 'Committee Admin (Verified)',
              message: txt,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return p;
    });

    setProblems(updated);
    localStorage.setItem('villageProblems', JSON.stringify(updated));
    setReplyTexts({ ...replyTexts, [problemId]: '' });
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annoTitle || !annoContent) return;

    const newAnno: AnnouncementItem = {
      id: `a-${Date.now()}`,
      title: annoTitle,
      date: new Date().toISOString().split('T')[0],
      content: annoContent,
      category: annoCategory
    };

    const updated = [newAnno, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('announcements', JSON.stringify(updated));
    setAnnoTitle('');
    setAnnoContent('');
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('announcements', JSON.stringify(updated));
  };

  const handleAddPhotoToGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUrl || !galleryCaption) return;

    // Simulate appending new photo records
    alert(`Photo records successfully registered to the database for Year ${galleryYear}!`);
    setGalleryUrl('');
    setGalleryCaption('');
  };

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName || !sponsorAmount) return;

    alert(`Sponsor contribution registered: ${sponsorName} - ${sponsorAmount}`);
    setSponsorName('');
    setSponsorAmount('');
    setSponsorOrigin('');
  };

  return (
    <div className="min-h-screen bg-orange-50/10 dark:bg-neutral-950 flex flex-col transition-colors duration-300">
      
      {/* Admin header */}
      <header className="bg-amber-950 text-white dark:bg-neutral-900 border-b border-amber-900/30 px-6 py-4.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 text-amber-400">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" className="w-full h-full">
              <path d="M40,25 L50,12 L60,25 Z" />
              <path d="M45,25 L50,18 L55,25" />
              <path d="M50,23 L50,33" strokeWidth="4" stroke="red" />
              <circle cx="50" cy="36" r="1.5" fill="red" />
              <path d="M35,35 C20,38 25,55 38,50" />
              <path d="M65,35 C80,38 75,55 62,50" />
              <path d="M50,35 Q44,45 44,53 Q44,65 52,65 Q58,65 58,58 Q58,53 52,53 Q48,53 48,57" />
              <path d="M38,50 C38,70 62,70 62,50" />
            </svg>
          </div>
          <div>
            <h1 className="font-cinzel text-base font-black tracking-wider text-amber-400 leading-none">
              MGC BOARD CONTROL
            </h1>
            <span className="text-[9px] font-black uppercase text-amber-100/60 tracking-wider">
              Bandarupally Village Portal Admin Dashboard
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs uppercase tracking-wider text-white shadow-md transition-all active:scale-95"
        >
          <FiLogOut /> Logout
        </button>
      </header>

      {/* Main Admin Grid */}
      <div className="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 py-10 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
          {[
            { id: 'statistics', label: 'Dashboard Overview', icon: <FiGrid /> },
            { id: 'problems', label: 'Village Problems', icon: <FiMessageSquare /> },
            { id: 'announcements', label: 'Announcements Board', icon: <FiTrendingUp /> },
            { id: 'gallery', label: 'Media Manager', icon: <FiFolderPlus /> },
            { id: 'sponsors', label: 'Sponsors Hub', icon: <FiShare2 /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id as PanelSection)}
              className={`flex items-center gap-3 px-4.5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all focus:outline-none text-left ${
                activePanel === item.id
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-600/10'
                  : 'bg-white hover:bg-orange-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-amber-950 dark:text-neutral-300 border border-amber-500/5 dark:border-neutral-800'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* Dynamic Panels */}
        <main className="flex-grow flex flex-col">
          
          {/* PANEL 1: STATISTICS */}
          {activePanel === 'statistics' && (
            <div className="flex flex-col gap-8">
              <h2 className="font-cinzel text-lg font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3">
                Dashboard Overview & Summary
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Active Problems</span>
                  <span className="text-3xl font-black text-amber-950 dark:text-white mt-2">
                    {problems.length}
                  </span>
                  <span className="text-[10px] text-orange-600 dark:text-amber-400 font-bold mt-4 block">
                    {problems.filter(p => p.status === 'Pending').length} Pending resolution
                  </span>
                </div>
                
                <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Active Volunteers</span>
                  <span className="text-3xl font-black text-amber-950 dark:text-white mt-2">
                    {volunteers.length}
                  </span>
                  <span className="text-[10px] text-orange-600 dark:text-amber-400 font-bold mt-4 block">
                    Enrolled via Events portal
                  </span>
                </div>

                <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Announcements</span>
                  <span className="text-3xl font-black text-amber-950 dark:text-white mt-2">
                    {announcements.length}
                  </span>
                  <span className="text-[10px] text-orange-600 dark:text-amber-400 font-bold mt-4 block">
                    Published on live website
                  </span>
                </div>
              </div>

              {/* Volunteers list board */}
              <div className="glass-card p-6 rounded-3xl mt-4">
                <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white mb-5 flex items-center gap-1.5 border-b border-amber-500/10 dark:border-neutral-800 pb-2.5">
                  <FiUserCheck className="text-orange-500" /> Enrolled Volunteers ({volunteers.length})
                </h3>
                {volunteers.length > 0 ? (
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs font-medium text-neutral-600 dark:text-neutral-300 text-left border-collapse">
                      <thead>
                        <tr className="border-b border-amber-500/10 dark:border-neutral-800 text-amber-950 dark:text-neutral-400 font-black">
                          <th className="py-2.5">Name</th>
                          <th className="py-2.5">Phone</th>
                          <th className="py-2.5">Interest area</th>
                          <th className="py-2.5">Availability</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-500/5 dark:divide-neutral-800">
                        {volunteers.map((v) => (
                          <tr key={v.id}>
                            <td className="py-3 font-bold text-amber-950 dark:text-white">{v.name}</td>
                            <td className="py-3">{v.phone}</td>
                            <td className="py-3 text-orange-600 dark:text-amber-400 font-semibold">{v.interest}</td>
                            <td className="py-3">{v.availability}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-6 text-neutral-400 text-xs font-semibold">
                    No volunteers registered yet.
                  </p>
                )}
              </div>

            </div>
          )}

          {/* PANEL 2: PROBLEMS MANAGEMENT */}
          {activePanel === 'problems' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-cinzel text-lg font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3">
                Manage Village Problems
              </h2>

              <div className="flex flex-col gap-6">
                {problems.map((prob) => (
                  <div 
                    key={prob.id}
                    className="glass-card p-6 rounded-2xl relative border-l-4 border-l-orange-500"
                  >
                    
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/5 pb-3.5 mb-4 text-[10px] font-bold text-neutral-500">
                      <span>Category: {prob.category} &bull; Date: {new Date(prob.createdAt).toLocaleDateString()}</span>
                      <span className={`px-2 py-0.5 rounded border font-black uppercase ${
                        prob.status === 'Solved' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 
                        prob.status === 'Accepted' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        prob.status === 'Rejected' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                        'bg-amber-500/10 text-amber-600 border-amber-500/20'
                      }`}>
                        {prob.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-amber-950 dark:text-white mb-2 leading-tight">
                      {prob.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {prob.description}
                    </p>

                    <div className="text-[10px] text-neutral-400 font-bold mb-4">
                      Reporter: {prob.name} ({prob.phone}) {prob.location ? `&bull; Location: ${prob.location}` : ''}
                    </div>

                    {/* Actions panel */}
                    <div className="flex flex-wrap gap-2.5 items-center justify-between border-t border-amber-500/5 pt-4">
                      
                      {/* State update triggers */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(prob.id, 'Accepted')}
                          className="px-3.5 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-600 text-[10px] font-bold uppercase tracking-wider transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(prob.id, 'Solved')}
                          className="px-3.5 py-1.5 rounded-lg border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-wider transition-all"
                        >
                          Solve
                        </button>
                        <button
                          onClick={() => handleStatusChange(prob.id, 'Rejected')}
                          className="px-3.5 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-600 text-[10px] font-bold uppercase tracking-wider transition-all"
                        >
                          Reject
                        </button>
                      </div>

                      {/* Reply form */}
                      <div className="flex gap-2 w-full sm:w-80 mt-3 sm:mt-0">
                        <input 
                          type="text" 
                          placeholder="Write reply message..." 
                          value={replyTexts[prob.id] || ''}
                          onChange={(e) => setReplyTexts({ ...replyTexts, [prob.id]: e.target.value })}
                          className="flex-grow p-2 rounded-lg border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 text-xs font-semibold focus:outline-none"
                        />
                        <button
                          onClick={() => handlePostReply(prob.id)}
                          className="px-3.5 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-colors text-xs font-bold"
                        >
                          Reply
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PANEL 3: ANNOUNCEMENTS MANAGEMENT */}
          {activePanel === 'announcements' && (
            <div className="flex flex-col gap-8">
              
              {/* Form to add */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-5">
                  Publish New Announcement
                </h3>
                
                <form onSubmit={handleAddAnnouncement} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <div className="flex flex-col gap-1.5">
                    <label>Announcement Title *</label>
                    <input 
                      type="text" required value={annoTitle} onChange={(e) => setAnnoTitle(e.target.value)}
                      placeholder="e.g. Daily Schedule Update"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Category *</label>
                    <select
                      value={annoCategory} onChange={(e: any) => setAnnoCategory(e.target.value)}
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none"
                    >
                      <option value="important">Important (Red Badge)</option>
                      <option value="event">Event (Gold Badge)</option>
                      <option value="general">General (Blue Badge)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Content Description *</label>
                    <textarea 
                      required rows={3} value={annoContent} onChange={(e) => setAnnoContent(e.target.value)}
                      placeholder="Provide announcements details..."
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2.5 py-3 rounded-xl bg-orange-600 hover:scale-102 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-transform"
                  >
                    Publish live
                  </button>
                </form>
              </div>

              {/* List grid */}
              <div>
                <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3 mb-6">
                  Active Live Announcements ({announcements.length})
                </h3>

                <div className="flex flex-col gap-4">
                  {announcements.map((anno) => (
                    <div 
                      key={anno.id} 
                      className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-amber-500/10 dark:border-neutral-800 flex justify-between items-start gap-4 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 text-[10px] font-bold text-neutral-400 mb-1.5">
                          <span>{anno.date}</span>
                          <span className="uppercase text-orange-500">{anno.category}</span>
                        </div>
                        <h4 className="text-sm font-black text-amber-950 dark:text-white">
                          {anno.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                          {anno.content}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteAnnouncement(anno.id)}
                        className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                        title="Delete Announcement"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* PANEL 4: MEDIA MANAGER (GALLERY) */}
          {activePanel === 'gallery' && (
            <div className="flex flex-col gap-8">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-5 flex items-center gap-2">
                  <FiPlus className="text-orange-500" /> Add Image to Gallery
                </h3>
                
                <form onSubmit={handleAddPhotoToGallery} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label>Select Festival Year</label>
                      <select 
                        value={galleryYear} onChange={(e) => setGalleryYear(e.target.value)}
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none"
                      >
                        {['2026', '2025', '2024', '2023', '2022', '2021'].map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label>Image Category</label>
                      <select 
                        value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value)}
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 focus:outline-none"
                      >
                        <option value="idol">Idol Sthapana</option>
                        <option value="pooja">Pooja & Harathi</option>
                        <option value="laddu">Maha Laddu</option>
                        <option value="immersion">Visarjan Yatra</option>
                        <option value="cultural">Cultural Performance</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Image URL *</label>
                    <input 
                      type="text" required value={galleryUrl} onChange={(e) => setGalleryUrl(e.target.value)}
                      placeholder="e.g. Direct image link (https://...)"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Brief Caption *</label>
                    <input 
                      type="text" required value={galleryCaption} onChange={(e) => setGalleryCaption(e.target.value)}
                      placeholder="e.g. Afternoon Aarati"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2.5 py-3 rounded-xl bg-orange-600 hover:scale-102 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-transform"
                  >
                    Register Image
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* PANEL 5: SPONSORS HUB */}
          {activePanel === 'sponsors' && (
            <div className="flex flex-col gap-8">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-2.5 mb-5 flex items-center gap-2">
                  <FiPlus className="text-orange-500" /> Add Sponsor Contribution
                </h3>

                <form onSubmit={handleAddSponsor} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <div className="flex flex-col gap-1.5">
                    <label>Sponsor / Donor Name *</label>
                    <input 
                      type="text" required value={sponsorName} onChange={(e) => setSponsorName(e.target.value)}
                      placeholder="Donor full name or firm"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label>Donation Amount (e.g. ₹50,116) *</label>
                      <input 
                        type="text" required value={sponsorAmount} onChange={(e) => setSponsorAmount(e.target.value)}
                        placeholder="₹ Amount"
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label>Sponsor Origin Village</label>
                      <input 
                        type="text" value={sponsorOrigin} onChange={(e) => setSponsorOrigin(e.target.value)}
                        placeholder="e.g. Bandarupally"
                        className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label>Sponsor Logo Link</label>
                    <input 
                      type="text" value={sponsorLogo} onChange={(e) => setSponsorLogo(e.target.value)}
                      placeholder="e.g. Image logo url"
                      className="p-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2.5 py-3 rounded-xl bg-orange-600 hover:scale-102 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-transform"
                  >
                    Save Sponsor Record
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
export default AdminDashboard;
