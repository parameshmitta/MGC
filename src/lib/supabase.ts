import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://thwzycuapzbwpmbuhpnf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod3p5Y3VhcHpid3BtYnVocG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjQ2OTAsImV4cCI6MjEwNDU0MDY5MH0.uC-gjkwl0BicONhyN27p_fwyR5hQ5Xl7263zyaZ0tVI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
