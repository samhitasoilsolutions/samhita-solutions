import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

export default function BlogHero({ featured }: { featured?: BlogPost }) {
  const { t, lang } = useLanguage();

  return (
    <section data-section="blog" className="relative pt-40 pb-16 md:pt-48 md:pb-20 bg-secondary/40 overflow-hidden">
      <div className="container-apple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-caption font-medium mb-5">
            <Newspaper className="w-3.5 h-3.5" />
            {t.blog.badge}
          </span>

          <h1 className="font-heading text-display-lg lg:text-display-xl text-foreground leading-[1.1] mb-4">
            {t.blog.title}
          </h1>

          <p className="text-body-lg text-muted-foreground max-w-md">
            {t.blog.description}
          </p>
        </motion.div>

        {!featured && (
          <p className="text-body-lg text-muted-foreground">{t.blog.empty}</p>
        )}

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center rounded-3xl border border-border bg-card p-4 md:p-6 shadow-apple-sm hover:shadow-apple-lg transition-all duration-300"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-foreground flex items-center justify-center p-8">
                    <span className="font-heading text-title text-background/80 text-center">
                      {featured.tag}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-primary text-caption font-medium mb-4">
                  {featured.tag}
                </span>
                <h2 className="text-headline sm:text-display text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-body text-muted-foreground mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-caption text-muted-foreground mb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatBlogDate(featured.date, lang)}
                  </span>
                  {featured.readTime && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 text-body font-medium text-primary">
                  {t.blog.readMore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
