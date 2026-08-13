import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import fieldWorkImg from "@/assets/field-work.jpg";
import govtCertifiedImg from "@/assets/govt-certified.png";
import trustedFarmersImg from "@/assets/trusted-farmers.png";
import labInnovationImg from "@/assets/lab-innovation.png";
import sustainableHarvestImg from "@/assets/sustainable-harvest.png";

import fieldWorkImgAvif from "@/assets/field-work.avif";
import govtCertifiedImgAvif from "@/assets/govt-certified.avif";
import trustedFarmersImgAvif from "@/assets/trusted-farmers.avif";
import labInnovationImgAvif from "@/assets/lab-innovation.avif";
import sustainableHarvestImgAvif from "@/assets/sustainable-harvest.avif";

import fieldWorkImgWebp from "@/assets/field-work.webp";
import govtCertifiedImgWebp from "@/assets/govt-certified.webp";
import trustedFarmersImgWebp from "@/assets/trusted-farmers.webp";
import labInnovationImgWebp from "@/assets/lab-innovation.webp";
import sustainableHarvestImgWebp from "@/assets/sustainable-harvest.webp";

const cardImages = [labInnovationImg, sustainableHarvestImg, govtCertifiedImg, trustedFarmersImg];
const cardImagesAvif = [labInnovationImgAvif, sustainableHarvestImgAvif, govtCertifiedImgAvif, trustedFarmersImgAvif];
const cardImagesWebp = [labInnovationImgWebp, sustainableHarvestImgWebp, govtCertifiedImgWebp, trustedFarmersImgWebp];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-apple">
        {/* Header */}
        <div className="mb-8 md:mb-12 max-w-xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-caption font-semibold text-primary mb-4"
          >
            <Leaf className="w-4 h-4" />
            {t.whyChooseUsAbout.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-display md:text-display-lg text-foreground mb-4"
          >
            {t.whyChooseUsAbout.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-body md:text-body-lg text-muted-foreground"
          >
            {t.whyChooseUsAbout.subtitle}
          </motion.p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {/* Tall left image — spans 2 rows on md+, full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden"
          >
            <picture>
              <source srcSet={fieldWorkImgAvif} type="image/avif" />
              <source srcSet={fieldWorkImgWebp} type="image/webp" />
              <img
                src={fieldWorkImg}
                alt="Samhita team working with farmers in the field"
                loading="lazy"
                className="w-full h-full object-cover min-h-[250px] sm:min-h-[300px] md:min-h-0"
              />
            </picture>
          </motion.div>

          {/* 4 cards */}
          {t.whyChooseUsAbout.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary/50 rounded-2xl p-5 md:p-6 border border-border flex flex-col"
            >
              <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden mb-4">
                <picture>
                  <source srcSet={cardImagesAvif[index]} type="image/avif" />
                  <source srcSet={cardImagesWebp[index]} type="image/webp" />
                  <img
                    src={cardImages[index]}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <h3 className="text-title text-foreground mb-2">{card.title}</h3>
              <p className="text-caption text-muted-foreground">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
