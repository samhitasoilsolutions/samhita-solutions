import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Droplets, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const categoryIcons = [FlaskConical, Droplets];
const categoryPrices = ["₹500", "₹500"];
const categoryUnits = ["/kg", "/litre"];

export default function ProductsCatalog() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = t.productsCatalog.categories[activeIndex];
  const ActiveIcon = categoryIcons[activeIndex];

  return (
    <section className="section-padding bg-background">
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-caption font-medium mb-6">
            <Leaf className="w-3.5 h-3.5" />
            {t.productsCatalog.badge}
          </span>
          <h2 className="text-headline sm:text-display md:text-display-lg text-foreground leading-tight max-w-2xl mx-auto">
            {t.productsCatalog.title}
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-secondary rounded-2xl p-1.5 gap-1">
            {t.productsCatalog.categories.map((category, index) => {
              const Icon = categoryIcons[index];
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-body font-medium transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary text-primary-foreground shadow-apple-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Info Bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 p-6 rounded-2xl bg-secondary/50 border border-border"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <ActiveIcon className="w-5 h-5 text-primary" />
                <h3 className="text-title text-foreground">{active.label}</h3>
                <span className="text-caption text-muted-foreground bg-muted px-3 py-0.5 rounded-full">
                  {active.format}
                </span>
              </div>
              <p className="text-body text-muted-foreground max-w-xl">
                {active.description}
              </p>
            </div>
            <div className="flex items-baseline gap-1 shrink-0">
              <span className="text-display font-bold text-primary">
                {categoryPrices[activeIndex]}
              </span>
              <span className="text-body text-muted-foreground">
                {categoryUnits[activeIndex]}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Product Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id + "-grid"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {active.products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-apple-sm hover:shadow-apple-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <h4 className="text-title text-foreground mb-3">
                  {product.name}
                </h4>
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
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-body text-muted-foreground mb-6">
            {t.productsCatalog.customCTA}
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              <Leaf className="w-4 h-4" />
              {t.productsCatalog.requestQuote}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
