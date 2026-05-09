import { useParams, Link } from "react-router";
import { useEffect } from "react";
import { getMergedBlogPosts } from "../data/blog";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ShareButton } from "../components/ShareButton";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function BlogPost() {
  const { slug } = useParams();
  const blogPosts = getMergedBlogPosts();
  const post = blogPosts.find((p) => p.slug === slug);

  // Set Open Graph meta tags for social media sharing
  useEffect(() => {
    if (post) {
      // Set page title
      document.title = `${post.title} | Vibhav Kamat`;

      // Get or create meta tags
      const setMetaTag = (property: string, content: string, isOg = true) => {
        const attr = isOg ? "property" : "name";
        let meta = document.querySelector(`meta[${attr}="${property}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute(attr, property);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      // Open Graph tags
      setMetaTag("og:title", post.title);
      setMetaTag("og:description", post.excerpt);
      setMetaTag("og:image", post.image);
      setMetaTag("og:url", window.location.href);
      setMetaTag("og:type", "article");
      
      // Twitter Card tags
      setMetaTag("twitter:card", "summary_large_image", false);
      setMetaTag("twitter:title", post.title, false);
      setMetaTag("twitter:description", post.excerpt, false);
      setMetaTag("twitter:image", post.image, false);
      
      // Standard meta tags
      setMetaTag("description", post.excerpt, false);
    }

    // Cleanup: reset title on unmount
    return () => {
      document.title = "Vibhav Kamat | Principal Product Designer";
    };
  }, [post]);

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

              {/* Rich Content Blocks */}
              {post.content && post.content.length > 0 ? (
                <div className="pt-8 space-y-8">
                  {post.content.map((block) => (
                    <div key={block.id}>
                      {/* Text Block */}
                      {block.type === 'text' && (
                        <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
                          {block.content}
                        </p>
                      )}

                      {/* Heading Block */}
                      {block.type === 'heading' && (
                        <>
                          {block.metadata?.level === 2 && (
                            <h2 className="text-2xl font-medium mb-4 text-foreground">
                              {block.content}
                            </h2>
                          )}
                          {block.metadata?.level === 3 && (
                            <h3 className="text-xl font-medium mb-3 text-foreground">
                              {block.content}
                            </h3>
                          )}
                          {block.metadata?.level === 4 && (
                            <h4 className="text-lg font-medium mb-2 text-foreground">
                              {block.content}
                            </h4>
                          )}
                        </>
                      )}

                      {/* Image Block */}
                      {block.type === 'image' && block.content && (
                        <figure className="my-8">
                          <img
                            src={block.content}
                            alt={block.metadata?.alt || ''}
                            className="w-full rounded-lg"
                          />
                          {block.metadata?.caption && (
                            <figcaption className="text-sm text-muted-foreground text-center mt-3">
                              {block.metadata.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      {/* Audio Block */}
                      {block.type === 'audio' && block.content && (
                        <figure className="my-8">
                          <audio controls className="w-full">
                            <source src={block.content} />
                            Your browser does not support the audio element.
                          </audio>
                          {block.metadata?.caption && (
                            <figcaption className="text-sm text-muted-foreground mt-3">
                              {block.metadata.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      {/* Video Block */}
                      {block.type === 'video' && block.content && (
                        <figure className="my-8">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                            {block.content.includes('youtube.com') || block.content.includes('youtu.be') ? (
                              <iframe
                                src={block.content.replace('watch?v=', 'embed/')}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : block.content.includes('vimeo.com') ? (
                              <iframe
                                src={block.content.replace('vimeo.com/', 'player.vimeo.com/video/')}
                                className="w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video controls className="w-full h-full">
                                <source src={block.content} />
                                Your browser does not support the video element.
                              </video>
                            )}
                          </div>
                          {block.metadata?.caption && (
                            <figcaption className="text-sm text-muted-foreground text-center mt-3">
                              {block.metadata.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // Fallback mock content if no content blocks exist
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
              )}
            </div>
          </motion.div>

          {/* Share Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            {post && (
              <ShareButton
                title={post.title}
                excerpt={post.excerpt}
                url={`/blog/${post.slug}`}
                image={post.image}
              />
            )}
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