import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import EditBlogPost from "./pages/EditBlogPost";
import NewBlogPost from "./pages/NewBlogPost";
import { AdminViewProvider } from "./contexts/AdminViewContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CMSProvider } from "./contexts/CMSContext";
import { initializeStorage } from "./lib/supabase";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-medium mb-4">404</h1>
      <p className="text-muted-foreground mb-6">Page not found</p>
      <a href="/" className="text-primary hover:underline">
        Return home
      </a>
    </div>
  </div>
);

export default function App() {
  useEffect(() => {
    // Initialize Supabase storage bucket on app load
    initializeStorage();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AdminViewProvider>
          <CMSProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/work" element={<Work />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/work/:id" element={<CaseStudy />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/work/add" element={<AddProject />} />
            <Route path="/work/edit/:id" element={<EditProject />} />
            <Route path="/blog/edit/:slug" element={<EditBlogPost />} />
            <Route path="/blog/new" element={<NewBlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </CMSProvider>
        </AdminViewProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}