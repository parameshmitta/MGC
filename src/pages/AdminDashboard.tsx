import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiLogOut, 
  FiGrid, 
  FiPlus, 
  FiTrash2, 
  FiMessageSquare, 
  FiTrendingUp, 
  FiFolderPlus, 
  FiShare2, 
  FiUserCheck,
  FiMail,
  FiPhone,
  FiStar,
  FiSearch,
  FiDownload,
  FiMessageCircle,
  FiClock,
  FiSend,
  FiInbox,
  FiCornerDownRight,
  FiExternalLink
} from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';
import type { AnnouncementItem, VillageProblem } from '../utils/mockData';

export type PanelSection = 'statistics' | 'messages' | 'problems' | 'announcements' | 'gallery' | 'sponsors';

export interface ContactMessage {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status?: 'unread' | 'read' | 'replied';
  isStarred?: boolean;
  adminReply?: {
    text: string;
    repliedAt: string;
    repliedBy: string;
  } | null;
}

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-101',
    name: 'Ramesh Goud Mittapally',
    phone: '+91 98480 22334',
    email: 'ramesh.mittapally@gmail.com',
    message: 'Jai Ganesha! Our family wishes to sponsor the Maha Annadanam on Day 5 (Chaturthi celebrations) for 500 devotees. Please let us know the budget and pooja samagri required.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'unread',
    isStarred: true,
  },
  {
    id: 'msg-102',
    name: 'Suresh Kumar Reddy',
    phone: '+91 99890 55421',
    email: 'suresh.reddy@yahoo.com',
    message: 'Namaste committee members. I want to contribute fresh flowers from our farm for the Garbha Gudi alankaram for all 9 days. Kindly share the contact person in Bandarupally.',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    status: 'unread',
    isStarred: false,
  },
  {
    id: 'msg-103',
    name: 'Anitha B',
    phone: '+91 94401 88722',
    email: 'anitha.b1990@gmail.com',
    message: 'What are the evening cultural program timings for youth and children dance competitions this year? We have a group of 8 village kids eager to participate.',
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    status: 'replied',
    isStarred: false,
    adminReply: {
      text: 'Namaste Anitha garu. Cultural events start daily at 7:30 PM after Harathi. Registrations close on Sep 2nd. You can enroll via our Events tab.',
      repliedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      repliedBy: 'Committee Admin'
    }
  },
  {
    id: 'msg-104',
    name: 'Venkatesh Madarapu',
    phone: '+91 85558 39756',
    email: 'venkatesh.bandarupally@gmail.com',
    message: 'How can NRIs living outside Mulugu participate in the live Harathi streaming and contribute online for the 2026 Golden Laddu auction?',
    createdAt: new Date(Date.now() - 3600000 * 68).toISOString(),
    status: 'read',
    isStarred: true,
  }
];

export const AdminDashboard: React.FC = () => {
  useSEO({
    title: 'Admin Dashboard',
    description: 'Management Portal for Maha Ganapati Committee. Monitor devotee messages, village grievances, configure sponsors and announce schedules.',
  });

  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<PanelSection>('statistics');
  const [problems, setProblems] = useState<VillageProblem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);

  // Messages State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'replied' | 'starred'>('all');
  const [messageSearch, setMessageSearch] = useState('');
  const [replyOpenId, setReplyOpenId] = useState<string | number | null>(null);
  const [replyInputText, setReplyInputText] = useState<{ [key: string]: string }>({});

  // Form Inputs for other panels
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
    // 1. Load Messages
    const savedMessages = localStorage.getItem('contactSubmissions');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages(DEFAULT_MESSAGES);
          localStorage.setItem('contactSubmissions', JSON.stringify(DEFAULT_MESSAGES));
        }
      } catch {
        setMessages(DEFAULT_MESSAGES);
      }
    } else {
      setMessages(DEFAULT_MESSAGES);
      localStorage.setItem('contactSubmissions', JSON.stringify(DEFAULT_MESSAGES));
    }

    // 2. Load Problems
    const savedProblems = localStorage.getItem('villageProblems');
    if (savedProblems) setProblems(JSON.parse(savedProblems));

    // 3. Load Announcements
    const savedAnnouncements = localStorage.getItem('announcements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    } else {
      const defaultAnnos: AnnouncementItem[] = [
        { id: 'a1', title: 'Ganesh Chaturthi Utsav 2026 Preparations', date: '2026-08-15', content: 'Meeting schedules are out.', category: 'important' }
      ];
      setAnnouncements(defaultAnnos);
      localStorage.setItem('announcements', JSON.stringify(defaultAnnos));
    }

    // 4. Load Volunteers
    const savedVolunteers = localStorage.getItem('registeredVolunteers');
    if (savedVolunteers) setVolunteers(JSON.parse(savedVolunteers));

    // 5. Try fetching latest messages from Supabase (if available)
    (async () => {
      try {
        const { supabase } = await import('../lib/supabase');
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setMessages((prev) => {
            const existingIds = new Set(prev.map(m => String(m.id)));
            const newFromCloud: ContactMessage[] = data
              .filter((d: any) => !existingIds.has(String(d.id)))
              .map((d: any) => ({
                id: d.id,
                name: d.name,
                email: d.email || 'Not Provided',
                phone: d.phone,
                message: d.message,
                createdAt: d.created_at || new Date().toISOString(),
                status: d.status || 'unread',
                isStarred: d.is_starred || false,
                adminReply: d.admin_reply ? {
                  text: d.admin_reply,
                  repliedAt: d.replied_at || new Date().toISOString(),
                  repliedBy: 'Committee Admin'
                } : null
              }));
            if (newFromCloud.length === 0) return prev;
            const merged = [...newFromCloud, ...prev];
            localStorage.setItem('contactSubmissions', JSON.stringify(merged));
            return merged;
          });
        }
      } catch {
        // Fallback gracefully
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin-login');
  };

  // --- Message Management Handlers ---
  const handleToggleRead = (id: string | number) => {
    const updated = messages.map((m) => {
      if (m.id === id) {
        const nextStatus: 'unread' | 'read' = m.status === 'read' ? 'unread' : 'read';
        return { ...m, status: nextStatus };
      }
      return m;
    });
    setMessages(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
  };

  const handleToggleStar = (id: string | number) => {
    const updated = messages.map((m) => {
      if (m.id === id) {
        return { ...m, isStarred: !m.isStarred };
      }
      return m;
    });
    setMessages(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
  };

  const handleDeleteMessage = (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this message record?')) return;
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
  };

  const handleSendReply = (id: string | number) => {
    const key = String(id);
    const replyText = (replyInputText[key] || '').trim();
    if (!replyText) return;

    const updated = messages.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          status: 'replied' as const,
          adminReply: {
            text: replyText,
            repliedAt: new Date().toISOString(),
            repliedBy: 'Committee Admin'
          }
        };
      }
      return m;
    });

    setMessages(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
    setReplyInputText({ ...replyInputText, [key]: '' });
    setReplyOpenId(null);
  };

  const handleExportCSV = () => {
    if (messages.length === 0) {
      alert('No messages available to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Status', 'Starred', 'Message', 'Admin Reply'];
    const rows = messages.map((m) => [
      m.id,
      new Date(m.createdAt).toLocaleDateString(),
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${m.phone || ''}"`,
      `"${m.email || ''}"`,
      m.status || 'unread',
      m.isStarred ? 'Yes' : 'No',
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${(m.adminReply?.text || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mgc_devotee_messages_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWhatsAppUrl = (phone: string, name: string) => {
    const clean = phone.replace(/\D/g, '');
    const num = clean.startsWith('91') ? clean : `91${clean}`;
    const text = encodeURIComponent(`Namaste ${name} garu! Greetings from Maha Ganapati Committee, Bandarupally. Regarding your message to our committee: `);
    return `https://wa.me/${num}?text=${text}`;
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      if (messageFilter === 'unread' && msg.status !== 'unread' && msg.status) return false;
      if (messageFilter === 'replied' && msg.status !== 'replied') return false;
      if (messageFilter === 'starred' && !msg.isStarred) return false;

      if (messageSearch.trim()) {
        const q = messageSearch.toLowerCase();
        const matchesName = (msg.name || '').toLowerCase().includes(q);
        const matchesPhone = (msg.phone || '').includes(q);
        const matchesEmail = (msg.email || '').toLowerCase().includes(q);
        const matchesContent = (msg.message || '').toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesEmail || matchesContent;
      }
      return true;
    });
  }, [messages, messageFilter, messageSearch]);

  const unreadCount = messages.filter(m => m.status === 'unread' || !m.status).length;
  const repliedCount = messages.filter(m => m.status === 'replied').length;
  const starredCount = messages.filter(m => m.isStarred).length;

  // --- Problems Management ---
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

  // --- Announcements Management ---
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

  // --- Gallery Management ---
  const handleAddPhotoToGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUrl || !galleryCaption) return;
    alert(`Photo records successfully registered for Year ${galleryYear}!`);
    setGalleryUrl('');
    setGalleryCaption('');
  };

  // --- Sponsor Management ---
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
      <header className="bg-amber-950 text-white dark:bg-neutral-900 border-b border-amber-900/30 px-6 py-4.5 flex items-center justify-between shadow-md sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shadow-md shadow-amber-500/20 flex-shrink-0 bg-neutral-950 ring-2 ring-amber-500/20">
            <img src="/logo.jpg" alt="Maha Ganapati Committee Circular Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h1 className="font-cinzel text-base sm:text-lg font-black tracking-wider text-amber-400 leading-none">
              MGC BOARD CONTROL
            </h1>
            <span className="text-[10px] font-black uppercase text-amber-100/60 tracking-wider block mt-0.5">
              Bandarupally Village Portal Admin Dashboard
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            <FiExternalLink className="w-3.5 h-3.5" /> View Website
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs uppercase tracking-wider text-white shadow-md transition-all active:scale-95"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Grid */}
      <div className="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 py-8 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
          {[
            { id: 'statistics', label: 'Dashboard Overview', icon: <FiGrid /> },
            { 
              id: 'messages', 
              label: 'Devotee Messages', 
              icon: <FiMail />,
              badge: unreadCount 
            },
            { 
              id: 'problems', 
              label: 'Village Problems', 
              icon: <FiMessageSquare />,
              badge: problems.filter(p => p.status === 'Pending').length
            },
            { id: 'announcements', label: 'Announcements Board', icon: <FiTrendingUp /> },
            { id: 'gallery', label: 'Media Manager', icon: <FiFolderPlus /> },
            { id: 'sponsors', label: 'Sponsors Hub', icon: <FiShare2 /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id as PanelSection)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all focus:outline-none text-left ${
                activePanel === item.id
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-600/20'
                  : 'bg-white hover:bg-orange-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-amber-950 dark:text-neutral-300 border border-amber-500/5 dark:border-neutral-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {Boolean(item.badge && item.badge > 0) && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activePanel === item.id 
                    ? 'bg-white text-orange-600' 
                    : 'bg-orange-600 text-white animate-pulse'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Dynamic Panels */}
        <main className="flex-grow flex flex-col min-w-0">
          
          {/* PANEL 1: STATISTICS OVERVIEW */}
          {activePanel === 'statistics' && (
            <div className="flex flex-col gap-8">
              <h2 className="font-cinzel text-lg font-black text-amber-950 dark:text-white border-b border-amber-500/10 dark:border-neutral-800 pb-3">
                Dashboard Overview & Summary
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* 1. Devotee Messages Card */}
                <div 
                  onClick={() => setActivePanel('messages')}
                  className="glass-card p-5.5 rounded-2xl flex flex-col justify-between cursor-pointer group hover:border-orange-500/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Devotee Messages</span>
                    <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                      <FiMail className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-3xl font-black text-amber-950 dark:text-white mt-2">
                    {messages.length}
                  </span>
                  <div className="flex items-center justify-between mt-3 text-[10px] font-bold">
                    <span className="text-orange-600 dark:text-amber-400">
                      {unreadCount} Unread Inquiries
                    </span>
                    <span className="text-neutral-400 group-hover:text-orange-600 transition-colors">
                      Open Inbox &rarr;
                    </span>
                  </div>
                </div>

                {/* 2. Active Problems Card */}
                <div 
                  onClick={() => setActivePanel('problems')}
                  className="glass-card p-5.5 rounded-2xl flex flex-col justify-between cursor-pointer group hover:border-orange-500/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Active Problems</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                      <FiMessageSquare className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-3xl font-black text-amber-950 dark:text-white mt-2">
                    {problems.length}
                  </span>
                  <div className="flex items-center justify-between mt-3 text-[10px] font-bold">
                    <span className="text-orange-600 dark:text-amber-400">
                      {problems.filter(p => p.status === 'Pending').length} Pending resolution
                    </span>
                    <span className="text-neutral-400 group-hover:text-orange-600 transition-colors">
                      Manage &rarr;
                    </span>
                  </div>
                </div>
                
                {/* 3. Active Volunteers Card */}
                <div className="glass-card p-5.5 rounded-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Active Volunteers</span>
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <FiUserCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-3xl font-black text-amber-950 dark:text-white mt-2">
                    {volunteers.length}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-bold mt-3 block">
                    Enrolled via Events portal
                  </span>
                </div>

                {/* 4. Announcements Card */}
                <div 
                  onClick={() => setActivePanel('announcements')}
                  className="glass-card p-5.5 rounded-2xl flex flex-col justify-between cursor-pointer group hover:border-orange-500/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Announcements</span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <FiTrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-3xl font-black text-amber-950 dark:text-white mt-2">
                    {announcements.length}
                  </span>
                  <div className="flex items-center justify-between mt-3 text-[10px] font-bold">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Published on live website
                    </span>
                    <span className="text-neutral-400 group-hover:text-emerald-600 transition-colors">
                      Manage &rarr;
                    </span>
                  </div>
                </div>

              </div>

              {/* Quick Preview: Recent Devotee Messages */}
              <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center justify-between border-b border-amber-500/10 dark:border-neutral-800 pb-3 mb-4">
                  <h3 className="font-cinzel text-base font-black text-amber-950 dark:text-white flex items-center gap-2">
                    <FiMail className="text-orange-500" /> Recent Devotee Inquiries ({messages.slice(0, 3).length})
                  </h3>
                  <button
                    onClick={() => setActivePanel('messages')}
                    className="text-xs font-bold text-orange-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    View All Messages ({messages.length}) &rarr;
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {messages.slice(0, 3).map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => setActivePanel('messages')}
                      className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-amber-500/10 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-orange-500/30 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                          {m.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-amber-950 dark:text-white">{m.name}</span>
                            <span className="text-[10px] text-neutral-400">&bull; {m.phone}</span>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                              m.status === 'replied' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' :
                              m.status === 'read' ? 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20' :
                              'bg-amber-500/15 text-amber-600 border-amber-500/30'
                            }`}>
                              {m.status || 'unread'}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1 mt-0.5">
                            {m.message}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 whitespace-nowrap self-end sm:self-auto">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteers list board */}
              <div className="glass-card p-6 rounded-3xl">
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

          {/* PANEL 2: DEVOTEE MESSAGES DASHBOARD */}
          {activePanel === 'messages' && (
            <div className="flex flex-col gap-6">
              
              {/* Messages Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/10 dark:border-neutral-800 pb-4">
                <div>
                  <h2 className="font-cinzel text-xl font-black text-amber-950 dark:text-white flex items-center gap-2">
                    <FiInbox className="text-orange-500" /> Devotee Messages &amp; Inquiries
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Manage direct messages, annadanam requests, pooja inquiries, and volunteer queries sent from the contact portal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-orange-600 dark:text-amber-400 border border-amber-500/20 font-bold text-xs uppercase tracking-wider transition-all"
                    title="Export messages to CSV"
                  >
                    <FiDownload /> Export CSV
                  </button>
                </div>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Messages', count: messages.length },
                    { id: 'unread', label: 'Unread', count: unreadCount },
                    { id: 'replied', label: 'Replied', count: repliedCount },
                    { id: 'starred', label: 'Starred', count: starredCount },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setMessageFilter(tab.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        messageFilter === tab.id
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                          : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-amber-500/10 dark:border-neutral-800 hover:border-amber-500/30'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        messageFilter === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, message..."
                    value={messageSearch}
                    onChange={(e) => setMessageSearch(e.target.value)}
                    className="w-full pl-9.5 pr-4 py-2 rounded-xl border border-amber-500/15 bg-white dark:bg-neutral-900 text-xs font-medium focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  {messageSearch && (
                    <button
                      onClick={() => setMessageSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
                    >
                      &times;
                    </button>
                  )}
                </div>

              </div>

              {/* Messages Card List */}
              <div className="flex flex-col gap-4">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((msg) => {
                    const isUnread = msg.status === 'unread' || !msg.status;
                    const isReplied = msg.status === 'replied';
                    const isReplying = replyOpenId === msg.id;

                    return (
                      <div
                        key={msg.id}
                        className={`glass-card p-6 rounded-2xl relative transition-all duration-300 border-l-4 ${
                          isUnread ? 'border-l-orange-500 bg-orange-50/20 dark:bg-neutral-900/90' :
                          isReplied ? 'border-l-emerald-500' :
                          'border-l-neutral-400 dark:border-l-neutral-700'
                        }`}
                      >
                        {/* Header: Sender info, date & badges */}
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-amber-400/20">
                              {msg.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-sm text-amber-950 dark:text-white">
                                  {msg.name}
                                </h4>
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                  isUnread ? 'bg-orange-500/15 text-orange-600 dark:text-amber-300 border-orange-500/30 animate-pulse' :
                                  isReplied ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                                  'bg-neutral-500/10 text-neutral-500 dark:text-neutral-400 border-neutral-400/20'
                                }`}>
                                  {msg.status || 'unread'}
                                </span>
                              </div>
                              <span className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                                <FiClock className="w-3 h-3" />
                                {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Star button */}
                          <button
                            onClick={() => handleToggleStar(msg.id)}
                            className={`p-2 rounded-xl border transition-all ${
                              msg.isStarred
                                ? 'bg-amber-400/20 text-amber-500 border-amber-400/40'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:text-amber-500'
                            }`}
                            title={msg.isStarred ? 'Unstar Message' : 'Star Message'}
                          >
                            <FiStar className={`w-4 h-4 ${msg.isStarred ? 'fill-amber-400' : ''}`} />
                          </button>
                        </div>

                        {/* Contact Meta Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
                          <a
                            href={`tel:${msg.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                          >
                            <FiPhone className="w-3.5 h-3.5" />
                            <span>{msg.phone}</span>
                          </a>

                          {msg.email && msg.email !== 'Not Provided' && (
                            <a
                              href={`mailto:${msg.email}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors"
                            >
                              <FiMail className="w-3.5 h-3.5" />
                              <span>{msg.email}</span>
                            </a>
                          )}
                        </div>

                        {/* Message Body */}
                        <div className="p-4 rounded-xl bg-white/70 dark:bg-neutral-900/60 border border-amber-500/10 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                          &ldquo;{msg.message}&rdquo;
                        </div>

                        {/* Admin Reply Record (if exists) */}
                        {msg.adminReply && (
                          <div className="mt-3 p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs">
                            <div className="flex items-center justify-between text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                              <span className="flex items-center gap-1">
                                <FiCornerDownRight className="w-3 h-3" /> Official Committee Reply ({msg.adminReply.repliedBy})
                              </span>
                              <span>{new Date(msg.adminReply.repliedAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                              {msg.adminReply.text}
                            </p>
                          </div>
                        )}

                        {/* Inline Reply Composer */}
                        {isReplying && (
                          <div className="mt-4 p-4 rounded-xl bg-amber-50/50 dark:bg-neutral-800/50 border border-orange-500/20 flex flex-col gap-2.5">
                            <label className="text-xs font-bold text-amber-950 dark:text-white">
                              Write Committee Response / Action Note:
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Type response to devotee or internal action note..."
                              value={replyInputText[String(msg.id)] || ''}
                              onChange={(e) => setReplyInputText({ ...replyInputText, [String(msg.id)]: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-amber-500/20 bg-white dark:bg-neutral-900 text-xs focus:outline-none"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setReplyOpenId(null)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSendReply(msg.id)}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-md transition-colors"
                              >
                                <FiSend className="w-3 h-3" /> Save &amp; Mark Replied
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Action Bar */}
                        <div className="mt-4 pt-3.5 border-t border-amber-500/10 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
                          
                          {/* Left: Communication Triggers */}
                          <div className="flex flex-wrap items-center gap-2">
                            
                            {/* WhatsApp Button */}
                            <a
                              href={getWhatsAppUrl(msg.phone, msg.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                            >
                              <FiMessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </a>

                            {/* Call Button */}
                            <a
                              href={`tel:${msg.phone}`}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider transition-all border border-neutral-300 dark:border-neutral-700"
                            >
                              <FiPhone className="w-3.5 h-3.5" /> Call
                            </a>

                            {/* Reply Trigger */}
                            <button
                              onClick={() => setReplyOpenId(isReplying ? null : msg.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider transition-all border border-orange-500/20"
                            >
                              <FiSend className="w-3.5 h-3.5" /> {msg.adminReply ? 'Update Note' : 'Add Reply'}
                            </button>
                          </div>

                          {/* Right: State toggle & Delete */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleRead(msg.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                isUnread 
                                  ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20' 
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
                              }`}
                            >
                              {isUnread ? 'Mark as Read' : 'Mark as Unread'}
                            </button>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                              title="Delete Message"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>

                      </div>
                    );
                  })
                ) : (
                  <div className="glass-card p-12 rounded-3xl text-center flex flex-col items-center justify-center gap-3">
                    <FiInbox className="w-12 h-12 text-neutral-300 dark:text-neutral-600" />
                    <h3 className="font-cinzel text-base font-bold text-amber-950 dark:text-white">
                      No Messages Found
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-sm">
                      {messageSearch 
                        ? `No records matching "${messageSearch}". Try clearing the search keyword.`
                        : 'No messages in this filter category.'}
                    </p>
                    {messageSearch && (
                      <button
                        onClick={() => setMessageSearch('')}
                        className="mt-2 px-4 py-1.5 rounded-xl bg-orange-600 text-white font-bold text-xs"
                      >
                        Clear Search Filter
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* PANEL 3: PROBLEMS MANAGEMENT */}
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

          {/* PANEL 4: ANNOUNCEMENTS MANAGEMENT */}
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

          {/* PANEL 5: MEDIA MANAGER (GALLERY) */}
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
                        <option value="pooja">Pooja &amp; Harathi</option>
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

          {/* PANEL 6: SPONSORS HUB */}
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
