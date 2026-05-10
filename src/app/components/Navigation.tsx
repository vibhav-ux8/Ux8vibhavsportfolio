import { Link, useLocation } from "react-router";
import { Menu, X, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { House, UserCircle, Briefcase, PenNib, EnvelopeSimple } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import logoImage from "figma:asset/d817f10c5a8dcea24cbac0c933d18bd131f71370.png";
import { useAdminView } from "../contexts/AdminViewContext";
import { useTheme } from "../contexts/ThemeContext";

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAdminView, toggleAdminView } = useAdminView();
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isAdminLoggedIn") === "true");
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const links = [
    { path: "/", label: "Home", Icon: House },
    { path: "/about", label: "About", Icon: UserCircle },
    { path: "/work", label: "Work", Icon: Briefcase },
    { path: "/blog", label: "Blog", Icon: PenNib },
    { path: "/contact", label: "Contact", Icon: EnvelopeSimple },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="Vibhav Kamat UX Portfolio" 
              className="h-12 w-auto rounded-[4px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 group ${
                  isActive(link.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-primary scale-110"
                    : "text-muted-foreground/60 group-hover:text-foreground group-hover:scale-105"
                }`}>
                  <link.Icon size={20} weight="thin" />
                </div>
                <span className={`text-[13px] tracking-[0.01em] transition-all duration-300 ${
                  isActive(link.path) ? "font-semibold" : "font-normal"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}

            {/* Admin View Toggle */}
            {isLoggedIn && (
              <button
                onClick={toggleAdminView}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 group ${
                  isAdminView ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                title={isAdminView ? "Switch to Public View" : "Switch to Admin View"}
              >
                <div className="transition-all duration-300 group-hover:scale-105">
                  {isAdminView ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
                <span className="text-[13px] tracking-[0.01em] transition-all duration-300 font-normal">
                  {isAdminView ? "Admin" : "Public"}
                </span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex flex-col items-center gap-1.5 transition-all duration-300 group text-muted-foreground hover:text-foreground"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              <div className="transition-all duration-300 group-hover:scale-105">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <span className="text-[13px] tracking-[0.01em] transition-all duration-300 font-normal">
                {theme === 'light' ? 'Dark' : 'Light'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 text-base transition-colors ${
                    isActive(link.path)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className={isActive(link.path) ? "text-primary" : "text-muted-foreground/70"}>
                    <link.Icon size={24} weight="light" />
                  </div>
                  <span>{link.label}</span>
                </Link>
              ))}

              {/* Admin View Toggle (Mobile) */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    toggleAdminView();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 text-base transition-colors ${
                    isAdminView ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div className={isAdminView ? "text-primary" : "text-muted-foreground/70"}>
                    {isAdminView ? <Eye size={24} /> : <EyeOff size={24} />}
                  </div>
                  <span>{isAdminView ? "Admin View" : "Public View"}</span>
                </button>
              )}

              {/* Theme Toggle (Mobile) */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 text-base transition-colors text-muted-foreground"
              >
                <div className="text-muted-foreground/70">
                  {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                </div>
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}