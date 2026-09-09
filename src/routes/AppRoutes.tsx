import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Page Components
import Home from '../pages/Home';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import YearGallery from '../pages/YearGallery';
import VillageHelp from '../pages/VillageHelp';
import Events from '../pages/Events';
import Committee from '../pages/Committee';
import Contact from '../pages/Contact';
import MahaBathukamma from '../pages/MahaBathukamma';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

// Dynamic route protection component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:year" element={<YearGallery />} />
        <Route path="maha-bathukamma" element={<MahaBathukamma />} />
        <Route path="bathukamma" element={<Navigate to="/maha-bathukamma" replace />} />
        <Route path="videos" element={<Navigate to="/gallery" replace />} />
        <Route path="village-help" element={<VillageHelp />} />
        <Route path="events" element={<Events />} />
        <Route path="committee" element={<Committee />} />
        <Route path="sponsors" element={<Navigate to="/" replace />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;
