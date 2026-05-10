import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AdminViewContextType {
  isAdminView: boolean;
  toggleAdminView: () => void;
  setAdminView: (value: boolean) => void;
}

const AdminViewContext = createContext<AdminViewContextType | undefined>(undefined);

export function AdminViewProvider({ children }: { children: ReactNode }) {
  const [isAdminView, setIsAdminView] = useState(() => {
    // Check if user is logged in and has admin view enabled
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    const adminViewEnabled = localStorage.getItem("adminViewEnabled") === "true";
    return isLoggedIn && adminViewEnabled;
  });

  const toggleAdminView = () => {
    const newValue = !isAdminView;
    setIsAdminView(newValue);
    localStorage.setItem("adminViewEnabled", String(newValue));
  };

  const setAdminView = (value: boolean) => {
    setIsAdminView(value);
    localStorage.setItem("adminViewEnabled", String(value));
  };

  // Re-check admin status on mount and when localStorage changes
  useEffect(() => {
    const checkAdminStatus = () => {
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      const adminViewEnabled = localStorage.getItem("adminViewEnabled") === "true";
      const shouldBeAdmin = isLoggedIn && adminViewEnabled;

      if (shouldBeAdmin !== isAdminView) {
        setIsAdminView(shouldBeAdmin);
      }
    };

    // Check on mount
    checkAdminStatus();

    // Check when localStorage changes (works across tabs)
    window.addEventListener('storage', checkAdminStatus);

    // Check on custom login event
    window.addEventListener('adminLoginChange', checkAdminStatus);

    // Also check on visibility change (when user returns to tab)
    document.addEventListener('visibilitychange', checkAdminStatus);

    return () => {
      window.removeEventListener('storage', checkAdminStatus);
      window.removeEventListener('adminLoginChange', checkAdminStatus);
      document.removeEventListener('visibilitychange', checkAdminStatus);
    };
  }, [isAdminView]);

  return (
    <AdminViewContext.Provider value={{ isAdminView, toggleAdminView, setAdminView }}>
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
