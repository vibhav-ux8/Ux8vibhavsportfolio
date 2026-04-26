import { createBrowserRouter } from "react-router";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";
import BlogPost from "./pages/BlogPost";

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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/work",
    element: <Work />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/work/:id",
    element: <CaseStudy />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);