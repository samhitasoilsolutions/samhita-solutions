import { motion } from "framer-motion";
import { Leaf, Shield, Award, FlaskConical } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const featureIcons = [Shield, FlaskConical, Award];

export default function WhyChooseUsSection() {
  const { t } = useLanguage();

  return (
    <section data-section="whyChooseUs" className="py-20 md:py-28 bg-background">
      <div className="container-apple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-caption font-medium mb-6">
            <Leaf className="w-3.5 h-3.5 text-primary" />
            {t.whyChooseUsHome.badge}
          </span>

          <h2 className="text-title sm:text-headline md:text-display mb-4 text-foreground max-w-2xl mx-auto">
            {t.whyChooseUsHome.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.whyChooseUsHome.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-title font-semibold mb-3">{feature.title}</h3>
                <p className="text-body text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
