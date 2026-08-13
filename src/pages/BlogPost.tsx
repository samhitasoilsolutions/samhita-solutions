import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Link2, MessageCircle, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { getAllPosts, getPostBySlug, formatBlogDate } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BASE_URL } from "@/lib/seo";
import CTASection from "@/components/home/CTASection";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const post = slug ? getPostBySlug(slug, lang) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  const relatedPosts = getAllPosts(lang).filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(postUrl);
    setCopied(true);
    toast.success(t.blog.linkCopied);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Samhita Soil Solutions Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={postUrl} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      {/* Hero */}
      <section data-section="blog" className="relative bg-foreground text-background pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
        {post.heroImage && (
          <div className="absolute inset-0">
            <img
              src={post.heroImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/80" />
          </div>
        )}
        <div className="container-apple relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-caption font-medium text-background/60 hover:text-background transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blog.backToBlog}
            </Link>

            {post.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-background/10 border border-background/20 text-caption font-medium text-background/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-heading text-display sm:text-display-lg text-background leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-body-lg text-background/70 max-w-2xl mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-background/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-caption font-semibold text-primary-foreground flex-shrink-0">
                  {post.authorInitials}
                </div>
                <div>
                  <div className="text-caption font-medium text-background">{post.author}</div>
                  {post.authorRole && (
                    <div className="text-caption text-background/50">{post.authorRole}</div>
                  )}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-caption text-background/60">
                <Calendar className="w-3.5 h-3.5" />
                {formatBlogDate(post.date, lang)}
              </span>
              {post.readTime && (
                <span className="inline-flex items-center gap-1.5 text-caption text-background/60">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <div className="container-apple py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="blog-content min-w-0"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
            {post.toc.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-apple-sm">
                <h3 className="text-caption font-semibold uppercase tracking-wide text-primary mb-4 pb-3 border-b border-border">
                  {t.blog.inThisArticle}
                </h3>
                <ul className="space-y-1 border-l-2 border-secondary">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-start gap-2.5 -ml-0.5 pl-3 py-1.5 border-l-2 border-transparent hover:border-primary text-body text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary flex-shrink-0 transition-colors" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.quickFacts.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-apple-sm">
                <h3 className="text-caption font-semibold uppercase tracking-wide text-muted-foreground mb-4 pb-3 border-b border-border">
                  {t.blog.quickFacts}
                </h3>
                <dl className="space-y-3">
                  {post.quickFacts.map((fact) => (
                    <div key={fact.label} className="flex justify-between gap-3 text-caption">
                      <dt className="text-muted-foreground">{fact.label}</dt>
                      <dd className="text-foreground font-medium text-right">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-apple-sm">
                <h3 className="text-caption font-semibold uppercase tracking-wide text-muted-foreground mb-4 pb-3 border-b border-border">
                  {t.blog.relatedArticles}
                </h3>
                <ul className="space-y-4">
                  {relatedPosts.map((related) => (
                    <li key={related.slug}>
                      <Link to={`/blog/${related.slug}`} className="group block">
                        <div className="text-body font-medium text-foreground group-hover:text-primary leading-snug mb-1 transition-colors">
                          {related.title}
                        </div>
                        <div className="text-caption text-muted-foreground">
                          {related.readTime}
                          {related.readTime && related.tag ? " · " : ""}
                          {related.tag}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-card border border-border rounded-2xl p-6 shadow-apple-sm">
              <h3 className="text-caption font-semibold uppercase tracking-wide text-muted-foreground mb-4 pb-3 border-b border-border">
                {t.blog.shareArticle}
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${postUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366] text-white text-caption font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-caption font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  {copied ? t.blog.linkCopied : t.blog.copyLink}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {post.authorBio && (
          <div className="mt-14 bg-secondary/40 border border-border rounded-2xl p-7 flex flex-col sm:flex-row gap-6">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-title font-semibold text-primary-foreground flex-shrink-0">
              {post.authorInitials}
            </div>
            <div>
              <div className="text-title font-semibold text-foreground mb-1">{post.author}</div>
              {post.authorRole && (
                <div className="text-caption text-primary font-medium mb-3">{post.authorRole}</div>
              )}
              <p className="text-body text-muted-foreground leading-relaxed">{post.authorBio}</p>
            </div>
          </div>
        )}
      </div>

      <CTASection />
    </>
  );
}
