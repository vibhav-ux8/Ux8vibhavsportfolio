import { useParams, Link } from "react-router";
import { blogPosts } from "../data/blog";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="aspect-[21/9] overflow-hidden rounded-lg bg-muted mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm bg-muted rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-medium mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p className="text-xl leading-relaxed">{post.excerpt}</p>

              {/* Mock article content - in a real app, this would come from the data */}
              <div className="pt-8 space-y-8 text-base">
                <div>
                  <h2 className="text-2xl font-medium mb-4 text-foreground">
                    Introduction
                  </h2>
                  <p>
                    This is where the full article content would appear. In a
                    production environment, you would store the complete article
                    text in your data source—whether that's a CMS, Markdown
                    files, or a database.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium mb-4 text-foreground">
                    Key Insights
                  </h2>
                  <p>
                    The article would continue with detailed sections exploring
                    the topic in depth, sharing insights from real-world
                    experience, case studies, and actionable recommendations for
                    designers and product leaders.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>First key point with detailed explanation</li>
                    <li>Second important insight backed by data</li>
                    <li>Third actionable recommendation</li>
                    <li>Fourth strategic consideration</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-medium mb-4 text-foreground">
                    Practical Applications
                  </h2>
                  <p>
                    This section would dive into practical, actionable steps
                    that readers can implement in their own work. It might
                    include frameworks, checklists, templates, or step-by-step
                    processes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium mb-4 text-foreground">
                    Lessons Learned
                  </h2>
                  <p>
                    Here, you'd share candid reflections on what worked, what
                    didn't, and what you'd do differently next time. This
                    authenticity helps readers learn from both successes and
                    challenges.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-medium mb-4 text-foreground">
                    Conclusion
                  </h2>
                  <p>
                    The article would conclude by tying together the main
                    themes, reinforcing key takeaways, and potentially pointing
                    readers toward additional resources or related topics to
                    explore.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Author CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-border"
          >
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-xl font-medium mb-3">
                Written by Vibhav Kamat
              </h3>
              <p className="text-muted-foreground mb-6">
                Principal Product Designer specializing in AI platforms,
                enterprise systems, and public-sector digital services.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}