import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section data-section="cta" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container-apple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-title sm:text-headline md:text-display mb-6">
              {t.cta.title1}
              <br />
              {t.cta.title2}
            </h2>

            <p className="text-body md:text-body-lg text-primary-foreground/80 mb-8 max-w-lg">
              {t.cta.description}
            </p>

            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/contact">
                <Phone className="w-4 h-4" />
                {t.cta.ctaButton}
              </Link>
            </Button>
          </motion.div>

          {/* Right Content - Quick Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-6 lg:justify-end"
          >
            <a
              href="tel:+919848549349"
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-body">{t.cta.callUs}</span>
            </a>
            <a
              href="mailto:samhitasoilsolutions@gmail.com"
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-body">{t.cta.email}</span>
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-body">{t.cta.visitUs}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
