import { motion } from "framer-motion";
import { Leaf, FlaskConical, Droplets, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import productPfWp from "@/assets/product-pf-wp.webp";
import productPfLf from "@/assets/product-pf-lf.webp";
import productNematicide from "@/assets/product-nematicide.jpeg";

import productPfWpAvif from "@/assets/product-pf-wp.avif";
import productPfLfAvif from "@/assets/product-pf-lf.avif";

const bioPesticideImages = [productPfWp, productPfLf, productPfLf, productPfLf, productPfLf, productNematicide];
const bioFertilizerImages = [productPfLf, productPfLf, productPfLf, productPfLf];

const bioPesticideImagesAvif = [productPfWpAvif, productPfLfAvif, productPfLfAvif, productPfLfAvif, productPfLfAvif, undefined];
const bioFertilizerImagesAvif = [productPfLfAvif, productPfLfAvif, productPfLfAvif, productPfLfAvif];

interface ProductCardProps {
  product: { name: string; description: string; benefits: readonly string[] };
  index: number;
  image: string;
  imageAvif?: string;
}

function ProductCard({ product, index, image, imageAvif }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-apple-sm hover:shadow-apple-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="flex gap-4 mb-4">
        <picture>
          {imageAvif && <source srcSet={imageAvif} type="image/avif" />}
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="w-20 h-20 rounded-xl object-cover shrink-0 bg-secondary"
          />
        </picture>
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="text-title text-foreground leading-snug">{product.name}</h4>
        </div>
      </div>
      <p className="text-caption text-muted-foreground leading-relaxed mb-5 flex-1">
        {product.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {product.benefits.map((benefit) => (
          <span
            key={benefit}
            className="inline-flex items-center gap-1 text-caption text-primary bg-secondary px-2.5 py-1 rounded-lg"
          >
            <Check className="w-3 h-3" />
            {benefit}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

interface ProductCategoryProps {
  title: string;
  icon: React.ElementType;
  format: string;
  subtitle?: string;
  products: readonly { name: string; description: string; benefits: readonly string[] }[];
  images: string[];
  imagesAvif: (string | undefined)[];
}

function ProductCategory({ title, icon: Icon, format, subtitle, products, images, imagesAvif }: ProductCategoryProps) {
  return (
    <div>
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="text-headline text-foreground">{title}</h3>
          <span className="text-caption text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {format}
          </span>
        </div>
        {subtitle && (
          <p className="text-body text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
      </motion.div>

      {/* Divider */}
      <div className="border-t border-border mb-8" />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} image={images[index] || productPfLf} imageAvif={imagesAvif[index]} />
        ))}
      </div>
    </div>
  );
}

export default function ProductsSolutions() {
  const { t } = useLanguage();

  return (
    <section className="pt-10 md:pt-14 lg:pt-18 pb-20 md:pb-28 lg:pb-36 bg-background">
      <div className="container-apple">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-caption font-semibold text-primary mb-4">
              <Leaf className="w-3.5 h-3.5" />
              {t.productsSolutions.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:max-w-lg"
          >
            <h2 className="text-title sm:text-headline md:text-display text-foreground leading-tight">
              {t.productsSolutions.title}
            </h2>
          </motion.div>
        </div>

        {/* Bio-Pesticides */}
        <ProductCategory
          title={t.productsSolutions.bioPesticidesTitle}
          icon={FlaskConical}
          format={t.productsSolutions.bioPesticidesFormat}
          subtitle={t.productsSolutions.bioPesticidesSubtitle}
          products={t.productsSolutions.bioPesticides}
          images={bioPesticideImages}
          imagesAvif={bioPesticideImagesAvif}
        />

        {/* Spacer */}
        <div className="my-16" />

        {/* Bio-Fertilizers */}
        <ProductCategory
          title={t.productsSolutions.bioFertilizersTitle}
          icon={Droplets}
          format={t.productsSolutions.bioFertilizersFormat}
          subtitle={t.productsSolutions.bioFertilizersSubtitle}
          products={t.productsSolutions.bioFertilizers}
          images={bioFertilizerImages}
          imagesAvif={bioFertilizerImagesAvif}
        />
      </div>
    </section>
  );
}
