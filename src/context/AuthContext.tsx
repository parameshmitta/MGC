import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';

interface AuthContextType {
  role: UserRole;
  isAdmin: boolean;
  adminName: string;
  loginAsAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
    return isAuth ? 'admin' : 'user';
  });

  const [adminName] = useState('Paramesh (Committee Admin)');

  useEffect(() => {
    const handleStorage = () => {
      const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
      setIsAdmin(isAuth);
      setRoleState(isAuth ? 'admin' : 'user');
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const loginAsAdmin = (user: string, pass: string): boolean => {
    const userTrimmed = user.trim();
    const passTrimmed = pass.trim();

    if (
      (userTrimmed.toLowerCase() === 'paramesh' && passTrimmed === 'paramesh@123') ||
      (userTrimmed === 'admin' && passTrimmed === 'mgc_bandarupally')
    ) {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAdmin(true);
      setRoleState('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAdmin(false);
    setRoleState('user');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'user') {
      // User mode
    } else {
      // Admin preview mode
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAdmin(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        isAdmin,
        adminName,
        loginAsAdmin,
        logoutAdmin,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
