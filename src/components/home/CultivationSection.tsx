import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import biopesticidesImg from "@/assets/biopesticide-product.webp";
import biopesticidesImgAvif from "@/assets/biopesticide-product.avif";
import biofertilizersImg from "@/assets/biofertilizer-product.webp";
import biofertilizersImgAvif from "@/assets/biofertilizer-product.avif";

const productImages = [biopesticidesImg, biofertilizersImg];
const productImagesAvif = [biopesticidesImgAvif, biofertilizersImgAvif];

export default function CultivationSection() {
  const { t } = useLanguage();

  return (
    <section data-section="cultivation" className="py-20 md:py-28 bg-secondary/30">
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-caption font-medium mb-6">
              <Leaf className="w-3.5 h-3.5 text-primary" />
              {t.cultivation.badge}
            </span>

            <h2 className="text-title sm:text-headline md:text-display mb-6 text-foreground">
              {t.cultivation.title1}
              <br />
              {t.cultivation.title2}
            </h2>

            <p className="text-body md:text-body-lg text-muted-foreground mb-8 leading-relaxed">
              {t.cultivation.description}
            </p>

            <Button asChild>
              <Link to="/products">
                <Leaf className="w-4 h-4" />
                {t.cultivation.cta}
              </Link>
            </Button>
          </motion.div>

          {/* Right Content - Product Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.cultivation.products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to="/products"
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
                >
                  <picture>
                    <source srcSet={productImagesAvif[index]} type="image/avif" />
                    <img
                      src={productImages[index]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-title font-semibold text-primary-foreground mb-2">
                          {product.title}
                        </h3>
                        <p className="text-caption text-primary-foreground/70">
                          {product.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary-foreground/70 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
