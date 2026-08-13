import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutStats() {
  const { t } = useLanguage();

  return (
    <section className="pt-6 md:pt-12 pb-12 md:pb-24 bg-background">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {t.aboutStats.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-secondary/50 border border-border"
            >
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary mb-3 md:mb-4" />
              <p className="text-display font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-title text-foreground mb-2 md:mb-3">{stat.label}</p>
              <p className="text-caption md:text-body text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
