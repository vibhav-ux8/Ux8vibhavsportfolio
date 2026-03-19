import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
import Projects from "./pages/Projects";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
import CaseStudy from "./pages/CaseStudy";
const BlogPost = lazy(() => import("./pages/BlogPost"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-muted-foreground">Loading...</div>
  </div>
);

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

// Wrapper component for lazy-loaded routes
const LazyRoute = ({ Component }: { Component: React.LazyExoticComponent<() => JSX.Element> }) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyRoute Component={Home} />,
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
    element: <LazyRoute Component={About} />,
  },
  {
    path: "/contact",
    element: <LazyRoute Component={Contact} />,
  },
  {
    path: "/work/:id",
    element: <CaseStudy />,
  },
  {
    path: "/blog/:slug",
    element: <LazyRoute Component={BlogPost} />,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);