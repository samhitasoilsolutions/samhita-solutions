import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactFounder() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-apple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t.contactFounder.title}</h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            {t.contactFounder.description}
          </p>
          <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-sm)]">
            <h3 className="text-xl font-bold mb-1">{t.contactFounder.name}</h3>
            <p className="text-muted-foreground mb-4">
              {t.contactFounder.role}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:samhitasoilsolutions@gmail.com"
                className="inline-flex items-center justify-center gap-2 text-primary hover:underline"
              >
                <Mail className="w-4 h-4" />
                samhitasoilsolutions@gmail.com
              </a>
              <a
                href="tel:+919848549349"
                className="inline-flex items-center justify-center gap-2 text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                +91 98485 49349
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
