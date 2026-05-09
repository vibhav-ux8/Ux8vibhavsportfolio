import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { LogOut, FileText, FolderOpen, PlusCircle, Edit2, Trash2 } from "lucide-react";
import { getMergedProjects, deleteProject } from "../data/projects";
import { getMergedBlogPosts } from "../data/blog";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"work" | "blog">("work");
  const [projects, setProjects] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  // Load initial data
  useEffect(() => {
    setProjects(getMergedProjects());
    setBlogPosts(getMergedBlogPosts());
  }, []);

  // Reload projects when Work tab is opened
  useEffect(() => {
    if (activeTab === "work") {
      setProjects(getMergedProjects());
    }
  }, [activeTab]);

  // Reload blog posts when Blog tab is opened
  useEffect(() => {
    if (activeTab === "blog") {
      setBlogPosts(getMergedBlogPosts());
    }
  }, [activeTab]);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminViewEnabled");
    navigate("/");
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
      setProjects(getMergedProjects());
    }
  };

  const handleDeleteBlogPost = (postId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const existingPosts = localStorage.getItem("cmsBlogData");
      const blogData = existingPosts ? JSON.parse(existingPosts) : {};

      // Mark as deleted
      const deletedPosts = localStorage.getItem("cmsDeletedBlogPosts");
      const deletedList = deletedPosts ? JSON.parse(deletedPosts) : [];
      if (!deletedList.includes(postId)) {
        deletedList.push(postId);
        localStorage.setItem("cmsDeletedBlogPosts", JSON.stringify(deletedList));
      }

      setBlogPosts(getMergedBlogPosts());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Content Management</h1>
            <p className="text-sm text-muted-foreground">Manage your projects and blog posts</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("work")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "work"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            Work
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === "blog"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-5 h-5" />
            Blog
          </button>
        </div>

        {/* Work Tab */}
        {activeTab === "work" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Projects</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your project portfolio
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/dashboard/add-project")}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Add Project
              </button>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                        <span>•</span>
                        <span>{project.tags.join(", ")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/dashboard/edit-project/${project.id}`)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Blog Posts</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your blog content
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/blog/new")}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                New Post
              </button>
            </div>

            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <div
                  key={post.slug}
                  className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/dashboard/edit-blog/${post.slug}`)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlogPost(post.slug)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
