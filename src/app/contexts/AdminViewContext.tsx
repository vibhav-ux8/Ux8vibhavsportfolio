import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AdminViewContextType {
  isAdminView: boolean;
  isLoggedIn: boolean;
  toggleAdminView: () => void;
}

const AdminViewContext = createContext<AdminViewContextType | undefined>(undefined);

export function AdminViewProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminViewEnabled, setAdminViewEnabled] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (!session) setAdminViewEnabled(true); // reset toggle on logout
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdminView = isLoggedIn && adminViewEnabled;
  const toggleAdminView = () => setAdminViewEnabled(prev => !prev);

  return (
    <AdminViewContext.Provider value={{ isAdminView, isLoggedIn, toggleAdminView }}>
      {children}
    </AdminViewContext.Provider>
  );
}

export function useAdminView() {
  const context = useContext(AdminViewContext);
  if (context === undefined) {
    throw new Error('useAdminView must be used within an AdminViewProvider');
  }
  return context;
}
