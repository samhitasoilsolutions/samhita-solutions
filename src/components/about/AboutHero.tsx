import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import aboutHeroImg from "@/assets/about-hero.jpg";
import aboutHeroImgAvif from "@/assets/about-hero.avif";
import aboutHeroImgWebp from "@/assets/about-hero.webp";

export default function AboutHero() {
  const { t } = useLanguage();

  return (
    <section data-section="about" className="relative min-h-[60vh] lg:min-h-[85vh] bg-background overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] lg:min-h-[85vh]">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center px-6 md:px-12 lg:pl-[max(2rem,calc((100vw-1120px)/2+2rem))] lg:pr-16 py-20 md:py-28 lg:py-36"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded-full px-4 py-1.5 w-fit mb-6 md:mb-8">
            <Leaf className="w-3.5 h-3.5 text-primary" />
            {t.aboutHero.badge}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-foreground leading-[1.1] tracking-tight mb-4 md:mb-6">
            {t.aboutHero.title1}
            <br />
            {t.aboutHero.title2}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            {t.aboutHero.description}
          </p>
        </motion.div>

        {/* Right Image — extends to screen edge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative min-h-[280px] sm:min-h-[350px] lg:min-h-0"
        >
          <picture>
            <source srcSet={aboutHeroImgAvif} type="image/avif" />
            <source srcSet={aboutHeroImgWebp} type="image/webp" />
            <img
              src={aboutHeroImg}
              alt="Aerial view of lush green farmlands in Andhra Pradesh"
              className="absolute top-8 bottom-8 md:top-16 md:bottom-16 lg:top-[112px] lg:bottom-[112px] left-0 right-0 w-full h-[calc(100%-64px)] md:h-[calc(100%-128px)] lg:h-[calc(100%-224px)] object-cover"
            />
          </picture>

          {/* Pill tags over image */}
          <div className="absolute bottom-[calc(2rem+1.5rem)] md:bottom-[calc(4rem+1.5rem)] lg:bottom-[calc(112px+1.5rem)] left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 flex gap-2 sm:gap-3">
            {t.aboutHero.pillTags.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 sm:gap-1.5 bg-foreground/70 backdrop-blur-md text-primary-foreground text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
              >
                <Leaf className="w-3 h-3" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
