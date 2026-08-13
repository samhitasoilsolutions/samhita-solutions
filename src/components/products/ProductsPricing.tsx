import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProductsPricing() {
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
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-caption font-medium mb-6">
            <Leaf className="w-3.5 h-3.5" />
            {t.productsPricing.badge}
          </span>
          <h2 className="text-headline sm:text-display md:text-display-lg text-foreground leading-tight max-w-lg mx-auto">
            {t.productsPricing.title}
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.productsPricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl p-8 flex flex-col bg-card border border-border shadow-apple-sm"
            >
              <h3 className="text-title mb-2">{plan.name}</h3>
              <p className="text-caption flex-1 text-muted-foreground">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="mt-6 mb-6">
                <span className="text-headline md:text-display font-bold">{plan.price}</span>
                {plan.unit && (
                  <span className="text-body text-muted-foreground">
                    {plan.unit}
                  </span>
                )}
              </div>

              {/* CTA */}
              <Button asChild className="w-full mb-8">
                <Link to="/contact">
                  <Leaf className="w-4 h-4" />
                  {t.productsPricing.getQuote}
                </Link>
              </Button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-caption flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="shrink-0">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
