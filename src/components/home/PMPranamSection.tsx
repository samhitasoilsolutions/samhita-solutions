import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import pmPranamFieldImg from "@/assets/nation-vision.jpg";
import pmPranamFieldImgAvif from "@/assets/nation-vision.avif";
import pmPranamFieldImgWebp from "@/assets/nation-vision.webp";

export default function PMPranamSection() {
  const { t } = useLanguage();

  return (
    <section data-section="pmPranam" className="py-20 md:py-28 bg-background">
      <div className="container-apple">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-caption font-medium mb-6">
              <Leaf className="w-3.5 h-3.5 text-primary" />
              {t.pmPranam.badge}
            </span>

            <h2 className="text-title sm:text-headline md:text-display mb-8 text-foreground">
              {t.pmPranam.title1}
              <br />
              {t.pmPranam.title2}
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {t.pmPranam.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full border border-border text-body text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-2xl overflow-hidden mb-8">
              <picture>
                <source srcSet={pmPranamFieldImgAvif} type="image/avif" />
                <source srcSet={pmPranamFieldImgWebp} type="image/webp" />
                <img
                  src={pmPranamFieldImg}
                  alt="Samhita Soil Solutions founder with AP Chief Minister N. Chandrababu Naidu"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </picture>
            </div>

            <p className="text-body md:text-body-lg text-muted-foreground mb-8 leading-relaxed">
              {t.pmPranam.description}
            </p>

            <Button asChild className="w-fit">
              <Link to="/about">
                <Leaf className="w-4 h-4" />
                {t.pmPranam.cta}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
