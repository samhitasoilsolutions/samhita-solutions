import { motion } from "framer-motion";
import { Sprout, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import stepPloughing from "@/assets/step-ploughing.jpg";
import stepSeedTreatment from "@/assets/step-seed-treatment.jpg";
import stepNursery from "@/assets/step-nursery.jpg";
import stepFieldApplication from "@/assets/step-field-application.jpg";
import stepCropProtection from "@/assets/step-crop-protection.jpg";
import stepResult from "@/assets/carousel-harvest.jpg";

import stepPloughingAvif from "@/assets/step-ploughing.avif";
import stepSeedTreatmentAvif from "@/assets/step-seed-treatment.avif";
import stepNurseryAvif from "@/assets/step-nursery.avif";
import stepFieldApplicationAvif from "@/assets/step-field-application.avif";
import stepCropProtectionAvif from "@/assets/step-crop-protection.avif";
import stepResultAvif from "@/assets/carousel-harvest.avif";

import stepPloughingWebp from "@/assets/step-ploughing.webp";
import stepSeedTreatmentWebp from "@/assets/step-seed-treatment.webp";
import stepNurseryWebp from "@/assets/step-nursery.webp";
import stepFieldApplicationWebp from "@/assets/step-field-application.webp";
import stepCropProtectionWebp from "@/assets/step-crop-protection.webp";
import stepResultWebp from "@/assets/carousel-harvest.webp";

const stepImages = [
  stepPloughing,
  stepSeedTreatment,
  stepNursery,
  stepFieldApplication,
  stepCropProtection,
  stepResult,
];

const stepImagesAvif = [
  stepPloughingAvif,
  stepSeedTreatmentAvif,
  stepNurseryAvif,
  stepFieldApplicationAvif,
  stepCropProtectionAvif,
  stepResultAvif,
];

const stepImagesWebp = [
  stepPloughingWebp,
  stepSeedTreatmentWebp,
  stepNurseryWebp,
  stepFieldApplicationWebp,
  stepCropProtectionWebp,
  stepResultWebp,
];

export default function PaddyCultivationSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-caption font-medium mb-6">
            <Sprout className="w-3.5 h-3.5 text-primary" />
            {t.paddyCultivation.badge}
          </span>

          <h2 className="text-title sm:text-headline md:text-display text-foreground mb-4 max-w-2xl mx-auto">
            {t.paddyCultivation.title}
          </h2>
          <p className="text-body md:text-body-lg text-muted-foreground max-w-xl mx-auto">
            {t.paddyCultivation.subtitle}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {t.paddyCultivation.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-colors ${
                index === 5 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <picture>
                  <source srcSet={stepImagesAvif[index]} type="image/avif" />
                  <source srcSet={stepImagesWebp[index]} type="image/webp" />
                  <img
                    src={stepImages[index]}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <span className="absolute bottom-3 left-4 text-display font-bold text-white/30 leading-none">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="text-title font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-caption leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10 md:mt-12"
        >
          <Button asChild>
            <Link to="/products">
              <Sprout className="w-4 h-4" />
              {t.hero.exploreProducts}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
