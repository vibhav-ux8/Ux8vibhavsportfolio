import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { House, UserCircle, Briefcase, PenNib, EnvelopeSimple } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import logoImage from "figma:asset/d817f10c5a8dcea24cbac0c933d18bd131f71370.png";

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
              className="h-12 w-auto"
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}