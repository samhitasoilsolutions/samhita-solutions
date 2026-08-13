import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import productsHeroImg from "@/assets/products-hero.jpg";
import productsHeroImgAvif from "@/assets/products-hero.avif";
import productsHeroImgWebp from "@/assets/products-hero.webp";

export default function ProductsHero() {
  const { t } = useLanguage();

  return (
    <section data-section="products" className="relative h-[520px] pt-20 flex items-end justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet={productsHeroImgAvif} type="image/avif" />
          <source srcSet={productsHeroImgWebp} type="image/webp" />
          <img
            src={productsHeroImg}
            alt="Modern greenhouse with organic crops"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-apple pb-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-caption font-medium mb-5">
            <Leaf className="w-3.5 h-3.5" />
            {t.productsHero.badge}
          </span>

          <h1 className="font-heading text-display-lg lg:text-display-xl text-white leading-[1.1] mb-4">
            {t.productsHero.title1}
            <br />
            {t.productsHero.title2}
          </h1>

          <p className="text-body-lg text-white/70 max-w-md">
            {t.productsHero.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
