import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import carouselLab from "@/assets/carousel-lab.jpg";
import carouselManufacturing from "@/assets/carousel-manufacturing.jpg";
import carouselProducts from "@/assets/carousel-products.jpg";
import carouselFieldPrep from "@/assets/carousel-field-prep.jpg";
import carouselSpraying from "@/assets/carousel-spraying.jpg";
import carouselHarvest from "@/assets/carousel-harvest.jpg";

import carouselLabAvif from "@/assets/carousel-lab.avif";
import carouselManufacturingAvif from "@/assets/carousel-manufacturing.avif";
import carouselProductsAvif from "@/assets/carousel-products.avif";
import carouselFieldPrepAvif from "@/assets/carousel-field-prep.avif";
import carouselSprayingAvif from "@/assets/carousel-spraying.avif";
import carouselHarvestAvif from "@/assets/carousel-harvest.avif";

import carouselLabWebp from "@/assets/carousel-lab.webp";
import carouselManufacturingWebp from "@/assets/carousel-manufacturing.webp";
import carouselProductsWebp from "@/assets/carousel-products.webp";
import carouselFieldPrepWebp from "@/assets/carousel-field-prep.webp";
import carouselSprayingWebp from "@/assets/carousel-spraying.webp";
import carouselHarvestWebp from "@/assets/carousel-harvest.webp";

const carouselImages = [
  carouselLab,
  carouselManufacturing,
  carouselProducts,
  carouselFieldPrep,
  carouselSpraying,
  carouselHarvest,
];

const carouselImagesAvif = [
  carouselLabAvif,
  carouselManufacturingAvif,
  carouselProductsAvif,
  carouselFieldPrepAvif,
  carouselSprayingAvif,
  carouselHarvestAvif,
];

const carouselImagesWebp = [
  carouselLabWebp,
  carouselManufacturingWebp,
  carouselProductsWebp,
  carouselFieldPrepWebp,
  carouselSprayingWebp,
  carouselHarvestWebp,
];

export default function StatsBar() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const total = carouselImages.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section data-section="statsBar" className="py-16 md:py-24 bg-background border-b border-border">
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <Factory className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-heading text-headline sm:text-display md:text-display-lg text-foreground mb-3">
            {t.statsBar.title}
          </h2>
          <p className="text-body md:text-body-lg text-muted-foreground max-w-xl mx-auto">
            {t.statsBar.subtitle}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12 md:mb-16">
          {t.statsBar.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-display md:text-display-lg text-foreground mb-1">
                {stat.value}
                <span className="text-headline md:text-display text-primary ml-1">{stat.unit}</span>
              </p>
              <p className="text-body text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden bg-foreground"
        >
          {/* Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <picture>
                  <source srcSet={carouselImagesAvif[current]} type="image/avif" />
                  <source srcSet={carouselImagesWebp[current]} type="image/webp" />
                  <img
                    src={carouselImages[current]}
                    alt={t.statsBar.carouselSlides[current].label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </picture>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-caption font-medium mb-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                      <h3 className="text-title md:text-headline text-white font-semibold mb-1">
                        {t.statsBar.carouselSlides[current].label}
                      </h3>
                      <p className="text-caption md:text-body text-white/70 max-w-md">
                        {t.statsBar.carouselSlides[current].caption}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Nav buttons */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1.5 mt-4">
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-white" : "w-3 bg-white/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
