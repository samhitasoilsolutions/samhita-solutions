import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import soilHandsImg from "@/assets/soil-hands.jpg";
import soilHandsImgAvif from "@/assets/soil-hands.avif";
import soilHandsImgWebp from "@/assets/soil-hands.webp";
import teamLabImg from "@/assets/our-journey.jpg";
import teamLabImgAvif from "@/assets/our-journey.avif";
import teamLabImgWebp from "@/assets/our-journey.webp";

const slideImages = [teamLabImg, soilHandsImg];
const slideImagesAvif = [teamLabImgAvif, soilHandsImgAvif];
const slideImagesWebp = [teamLabImgWebp, soilHandsImgWebp];

export default function SustainabilitySection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const total = t.sustainability.slides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = t.sustainability.slides[current];

  return (
    <section data-section="sustainability" className="py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-caption font-medium mb-6"
            >
              <Leaf className="w-3.5 h-3.5" />
              {t.sustainability.badge}
            </motion.span>

            <div className="relative min-h-[420px] sm:min-h-[380px] md:min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <h2 className="text-title sm:text-headline md:text-display mb-6">
                    {slide.title1}
                    <br />
                    {slide.title2}
                  </h2>

                  <div className="space-y-4 text-body md:text-body-lg text-primary-foreground/80 leading-relaxed">
                    <p>{slide.paragraph1}</p>
                    <p>{slide.paragraph2}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <picture>
                    <source srcSet={slideImagesAvif[current]} type="image/avif" />
                    <source srcSet={slideImagesWebp[current]} type="image/webp" />
                    <img
                      src={slideImages[current]}
                      alt={t.sustainability.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute top-6 right-6 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20"
              >
                <span className="text-caption font-medium">{slide.floatingBadge}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Slide indicators - centered below full grid */}
        <div className="flex justify-center gap-2 mt-10">
          {t.sustainability.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary-foreground" : "w-3 bg-primary-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
