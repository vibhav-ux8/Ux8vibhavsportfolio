import { Link } from "react-router";
import { Linkedin, Mail, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* About */}
          <div>
            <h3 className="font-medium mb-3">Vibhav Kamat</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Principal Product Designer specializing in AI, enterprise systems, and public-sector digital infrastructure.
            </p>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-medium mb-3">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/vibhav-kamat-504460153/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:vibhav.ux8@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/jordanchen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vibhav Kamat. All rights reserved.
            </p>
            <Link
              to="/admin/login"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}