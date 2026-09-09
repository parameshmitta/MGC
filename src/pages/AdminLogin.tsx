import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiUser, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { useSEO } from '../hooks/useSEO';

export const AdminLogin: React.FC = () => {
  useSEO({
    title: 'Admin Login',
    description: 'Admin Portal Login for Maha Ganapati Committee Bandarupally. Strictly authorized personnel only.',
  });

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
    if (isAuth) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const userTrimmed = username.trim();
    const passTrimmed = password.trim();

    // Authenticate with user credentials: Paramesh / paramesh@123 (or legacy admin / mgc_bandarupally)
    if (
      (userTrimmed.toLowerCase() === 'paramesh' && passTrimmed === 'paramesh@123') ||
      (userTrimmed === 'admin' && passTrimmed === 'mgc_bandarupally')
    ) {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid Username or Password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/20 dark:bg-neutral-950 px-4 transition-colors duration-300">
      
      {/* Return to website */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 hover:scale-105 active:scale-95 transition-transform"
      >
        <FiArrowLeft className="stroke-[2.5]" /> Return to Portal
      </Link>

      <div className="w-full max-w-md glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Sacred Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl shadow-amber-500/30 mb-4 bg-neutral-950 ring-4 ring-amber-500/20 p-0.5">
            <img src="/logo.jpg" alt="Maha Ganapati Committee Circular Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          
          <h2 className="font-cinzel text-xl font-black text-amber-950 dark:text-white uppercase tracking-wider leading-none">
            Admin Login
          </h2>
          <span className="text-[10px] font-black tracking-widest text-orange-600 dark:text-orange-500 uppercase mt-1">
            Maha Ganapati Committee
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-2">
            <FiAlertCircle className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          
          <div className="flex flex-col gap-1.5">
            <label>Admin Username</label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500 text-neutral-800 dark:text-neutral-100"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Secure Password</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-500 text-neutral-800 dark:text-neutral-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:scale-102 transition-transform"
          >
            Authenticate Credentials
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-neutral-400 font-medium">
          Authorized Committee Personnel Only. Contact Secretary for access.
        </div>

      </div>

    </div>
  );
};
export default AdminLogin;
