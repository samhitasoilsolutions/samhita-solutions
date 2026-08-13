import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import aboutLandscape from "@/assets/about-landscape.jpg";
import aboutLandscapeAvif from "@/assets/about-landscape.avif";
import aboutLandscapeWebp from "@/assets/about-landscape.webp";

export default function AboutCTA() {
  const { t } = useLanguage();

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16">
      <div className="relative mx-auto max-w-[1120px] rounded-xl overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[560px] flex flex-col items-center justify-center py-16 md:py-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <picture>
            <source srcSet={aboutLandscapeAvif} type="image/avif" />
            <source srcSet={aboutLandscapeWebp} type="image/webp" />
            <img
              src={aboutLandscape}
              alt="Green agricultural field landscape"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-foreground/40" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-5 sm:px-6 flex flex-col items-center"
        >
          <h2 className="text-display md:text-display-lg lg:text-display-xl text-white mb-4 md:mb-6 leading-tight">
            {t.aboutCTA.title1}{" "}
            <br className="hidden sm:block" />
            {t.aboutCTA.title2}
          </h2>
          <p className="text-body md:text-body-lg text-white/80 mb-8 md:mb-10 max-w-xl">
            {t.aboutCTA.description}
          </p>

          <Button
            variant="apple"
            size="lg"
            asChild
            className="!bg-white !text-foreground hover:!bg-white/90 rounded-full px-8"
          >
            <Link to="/contact">
              <Leaf className="w-4 h-4 text-primary" />
              {t.aboutCTA.cta}
            </Link>
          </Button>
        </motion.div>

        {/* Bottom tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 flex gap-4 sm:gap-6 md:gap-8 absolute bottom-6 md:bottom-8"
        >
          {t.aboutCTA.tags.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-caption font-medium text-white/80"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-white/60 rotate-45" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
