import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import EditBlogPost from "./pages/EditBlogPost";
import NewBlogPost from "./pages/NewBlogPost";
import { AdminViewProvider } from "./contexts/AdminViewContext";

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
  return (
    <BrowserRouter>
      <AdminViewProvider>
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
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/add-project" element={<AddProject />} />
          <Route path="/admin/dashboard/edit-project/:id" element={<EditProject />} />
          <Route path="/admin/dashboard/edit-blog/:slug" element={<EditBlogPost />} />
          <Route path="/admin/blog/new" element={<NewBlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminViewProvider>
    </BrowserRouter>
  );
}