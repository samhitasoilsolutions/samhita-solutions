import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLanguage();

  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-apple">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden shadow-apple-sm hover:shadow-apple-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-foreground flex items-center justify-center p-6">
                      <span className="font-heading text-body-lg text-background/80 text-center">
                        {post.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full bg-secondary text-primary text-caption font-medium mb-3">
                    {post.tag}
                  </span>
                  <h3 className="text-title text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-caption text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-caption text-muted-foreground">
                    <span>{formatBlogDate(post.date, lang)}</span>
                    {post.readTime && (
                      <>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
