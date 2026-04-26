// =====================================================================
// src/app/App.tsx — REPLACEMENT
// Wraps the app in <AuthProvider>, protects admin routes with
// <RequireAuth>, and adds routes for the new admin pages.
// =====================================================================

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";
import BlogPost from "./pages/BlogPost";

// Admin
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminBlog from "./pages/AdminBlog";
import ProjectEditor from "./pages/ProjectEditor";
import BlogEditor from "./pages/BlogEditor";
// Optional: legacy AddProject — keep for now if other code links to it
import AddProject from "./pages/AddProject";

import { AuthProvider, RequireAuth } from "./lib/auth";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-6xl font-medium mb-4">404</h1>
      <p className="text-muted-foreground mb-6">Page not found</p>
      <a href="/" className="text-foreground hover:underline">
        Return home
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<CaseStudy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin: login is public; everything else is protected */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <RequireAuth>
                <AdminProjects />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              <RequireAuth>
                <ProjectEditor />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/projects/:id/edit"
            element={
              <RequireAuth>
                <ProjectEditor />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/blog"
            element={
              <RequireAuth>
                <AdminBlog />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/blog/new"
            element={
              <RequireAuth>
                <BlogEditor />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/blog/:id/edit"
            element={
              <RequireAuth>
                <BlogEditor />
              </RequireAuth>
            }
          />

          {/* Legacy — remove once you migrate off the old AddProject form */}
          <Route
            path="/admin/dashboard/add-project"
            element={
              <RequireAuth>
                <AddProject />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
