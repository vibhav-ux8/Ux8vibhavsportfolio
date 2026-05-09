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

  // Listen for login/logout changes
  useEffect(() => {
    const handleStorageChange = () => {
      const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      if (!isLoggedIn) {
        setIsAdminView(false);
        localStorage.removeItem("adminViewEnabled");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
