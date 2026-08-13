import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import journeyImg from "@/assets/our-journey.jpg";
import journeyImgAvif from "@/assets/our-journey.avif";
import journeyImgWebp from "@/assets/our-journey.webp";

export default function OurHistory() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-caption font-semibold text-primary mb-4">
            <Leaf className="w-4 h-4" />
            {t.ourHistory.badge}
          </span>
          <h2 className="text-display md:text-display-lg text-foreground">
            {t.ourHistory.title1}
            <br className="hidden sm:block" />
            {" "}{t.ourHistory.title2}
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center"
        >
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-headline md:text-display text-foreground mb-4">
              {t.ourHistory.heading}
            </h3>
            <p className="text-body md:text-body-lg text-muted-foreground">
              {t.ourHistory.description}
            </p>
          </div>
          <div className="order-1 lg:order-2 aspect-[4/3] rounded-2xl overflow-hidden">
            <picture>
              <source srcSet={journeyImgAvif} type="image/avif" />
              <source srcSet={journeyImgWebp} type="image/webp" />
              <img
                src={journeyImg}
                alt="Samhita Soil Solutions team in the laboratory"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
