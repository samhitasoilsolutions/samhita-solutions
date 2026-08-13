import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import founderImg from "@/assets/founder.jpg";
import founderImgAvif from "@/assets/founder.avif";
import founderImgWebp from "@/assets/founder.webp";

export default function FounderSection() {
  const { t } = useLanguage();

  return (
    <section data-section="founder" className="py-20 md:py-28 bg-secondary/50">
      <div className="container-apple">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square lg:aspect-auto overflow-hidden">
              <picture>
                <source srcSet={founderImgAvif} type="image/avif" />
                <source srcSet={founderImgWebp} type="image/webp" />
                <img
                  src={founderImg}
                  alt="Balusu Parvathi Rajyam - Founder"
                  className="w-full h-full object-cover object-top"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent lg:bg-gradient-to-r" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center text-primary-foreground">
              <Quote className="w-10 h-10 text-primary-foreground/30 mb-6" />

              <blockquote className="text-body md:text-body-lg lg:text-headline leading-relaxed mb-8">
                {t.founder.quote}
              </blockquote>

              <div className="mb-8">
                <p className="text-title font-semibold">{t.founder.name}</p>
                <p className="text-body text-primary-foreground/70">
                  {t.founder.role}
                </p>
              </div>

              <Button variant="hero-outline" asChild className="w-fit">
                <Link to="/about">
                  {t.founder.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
