import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AdminViewContextType {
  isAdminView: boolean;
}

const AdminViewContext = createContext<AdminViewContextType | undefined>(undefined);

export function AdminViewProvider({ children }: { children: ReactNode }) {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdminView(!!session);
    });

    // React to sign-in / sign-out in real time (also works across tabs)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminView(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AdminViewContext.Provider value={{ isAdminView }}>
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
