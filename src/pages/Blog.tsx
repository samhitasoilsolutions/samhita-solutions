import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import CTASection from "@/components/home/CTASection";
import { getAllPosts } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Blog() {
  const { lang } = useLanguage();
  const [featured, ...rest] = getAllPosts(lang);

  return (
    <>
      <BlogHero featured={featured} />
      <BlogGrid posts={rest} />
      <CTASection />
    </>
  );
}
