import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import aboutLandscapeImg from "@/assets/about-landscape.jpg";
import aboutLandscapeImgAvif from "@/assets/about-landscape.avif";
import aboutLandscapeImgWebp from "@/assets/about-landscape.webp";

export default function WhoWeAre() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={aboutLandscapeImgAvif} type="image/avif" />
          <source srcSet={aboutLandscapeImgWebp} type="image/webp" />
          <img
            src={aboutLandscapeImg}
            alt="Green agricultural landscape"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="relative z-10 py-20 md:py-32">
        <div className="container-apple text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground text-caption font-medium px-4 py-2 rounded-full mb-8">
              <Leaf className="w-4 h-4" />
              {t.whoWeAre.badge}
            </span>
            <h2 className="text-headline sm:text-display md:text-display-lg text-primary-foreground mb-6">
              {t.whoWeAre.title}
            </h2>
            <p className="text-body md:text-body-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t.whoWeAre.description}
            </p>
            <Button variant="apple" size="lg" asChild>
              <Link to="/contact">
                {t.whoWeAre.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
